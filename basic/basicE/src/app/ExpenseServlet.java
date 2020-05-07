package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class ExpenseServlet
 */
@WebServlet("/ExpenseServlet")
public class ExpenseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public ExpenseServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String q = request.getParameter("q");
		PrintWriter pw = response.getWriter();
		HttpSession session = request.getSession();
		String status = (String)session.getAttribute("userEmId");
		String role = (String)session.getAttribute("userRole");
		if(status == null) {
			pw.append(new ObjectMapper().writeValueAsString("No"));
			return;
		}

		try {

			// JDBCドライバのロード
			Class.forName("oracle.jdbc.driver.OracleDriver");

		} catch (ClassNotFoundException e) {
			// ドライバが設定されていない場合はエラーになります
			throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
		}

		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "basic";
		String pass = "basic";

		// 実行するSQL文
		//メンバーかどうかで判定
		String sql;
		if(role == "マネージャー"){
		sql = "select \n" +
				"* \n" +
				"from \n" +
				"EXPENSES \n" +
				"order by \n" +
				"SHINSEI_ID ";
		}else{
			sql = "select \n" +
					"* \n" +
					"from \n" +
					"EXPENSES \n" +
					"where 1=1 \n" +
					"and SHAIN_ID ='"+status+"'" ;
		}
		System.out.println(sql);
		// 趣味リスト（Hobby型のリスト）
		List<Expense> expenselist = new ArrayList<>();

		// エラーが発生するかもしれない処理はtry-catchで囲みます
		// この場合はDBサーバへの接続に失敗する可能性があります
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(url, user, pass);

				// SQLの命令文を実行するための準備をおこないます
				Statement stmt = con.createStatement();

				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
				ResultSet rs1 = stmt.executeQuery(sql);) {
			// SQL実行後の処理内容

			// SQL実行結果を商品リストに追加していく。
			while (rs1.next()) {
				// 一つ分の成績情報を入れるためReSScordインスタンスを生成
				Expense expense = new Expense();
				// SQLの取得結果をインスタンスに代入
				expense.setAppliId(rs1.getString("SHINSEI_ID"));
				expense.setAppliDay(rs1.getString("SHINSEIBI"));
				expense.setAppliName(rs1.getString("SHINSEISHA"));
				expense.setTitle(rs1.getString("TITLE"));
				expense.setPayment(rs1.getString("KINGAKU"));
				expense.setPayName(rs1.getString("SHIHARAISAKI"));
				expense.setUpdateDay(rs1.getString("KOUSHINBI"));
				expense.setChangerName(rs1.getString("KOUSINSHA"));
				expense.setStatus(rs1.getInt("STATUS"));
				expense.setReason(rs1.getString("RIYUU"));
				expense.setEmpId(rs1.getString("SHAIN_ID"));

				// 値を格納したHobbyインスタンスをリストに追加
				expenselist.add(expense);
			}
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

		// アクセスした人に応答するためのJSONを用意する

		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString(expenselist));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
