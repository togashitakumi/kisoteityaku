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
 * Servlet implementation class ExpenseDetailServlet
 */
@WebServlet("/ExpenseDetailServlet")
public class ExpenseDetailServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public ExpenseDetailServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String appliId = request.getParameter("appliId");
		PrintWriter pw = response.getWriter();
		HttpSession session = request.getSession();
		String status = (String)session.getAttribute("userEmId");
		String role = (String)session.getAttribute("userRole");
		if(status == null) {
			pw.append(new ObjectMapper().writeValueAsString("No"));
			return;
		}

		DataBase.driver();

		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "basic";
		String pass = "basic";

		// 実行するSQL文
		//メンバーかどうかで判定
		String sql = "select \n" +
					"* \n" +
					"from \n" +
					"EXPENSES \n" +
					"where 1=1 \n" +
					"and SHINSEI_ID ='"+appliId+"'" ;

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
		String  new_appliId= request.getParameter("appliId");
		String  new_appliDay= request.getParameter("appliDay");
		String  new_appliName= request.getParameter("appliName");
		String  new_title= request.getParameter("title");
		String  new_payName= request.getParameter("payName");
		String  new_payment= request.getParameter("payment");
		int  new_status= 0;
		String  new_empId= request.getParameter("empId");


		// JDBCドライバの準備
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
		String sql = "insert into EXPENSES (SHINSEI_ID,SHINSEIBI,SHINSEISHA,TITLE,SHIHARAISAKI, \n" +
				"	KINGAKU,STATUS,SHAIN_ID) \n" +
				"values('"+new_appliId+"','"+new_appliDay+"','"+new_appliName+"','"+new_title+"','"+new_payName+"','"+new_payment+"','"+new_status+"','"+new_empId+"')" ;
		// エラーが発生するかもしれない処理はtry-catchで囲みます
		// この場合はDBサーバへの接続に失敗する可能性があります
		System.out.println(sql);
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(url, user, pass);
				// SQLの命令文を実行するための準備をおこないます
				Statement stmt = con.createStatement();) {
			// SQLの命令文を実行し、その件数をint型のresultCountに代入します
			int resultCount = stmt.executeUpdate(sql);
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細:[%s]", e.getMessage()), e);
		}
		// アクセスした人に応答するためのJSONを用意する
		PrintWriter pw = response.getWriter();
		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString("ok"));
	}

}
