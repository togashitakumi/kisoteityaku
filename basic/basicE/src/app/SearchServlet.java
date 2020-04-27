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

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class SearchServlet
 */
@WebServlet("/SearchServlet")
public class SearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SearchServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String empId = request.getParameter("searchId");
		String empName = request.getParameter("searchName");
		String dpId = request.getParameter("departmentId");
		System.out.println(empId);
		System.out.println(empName);
		System.out.println(dpId);
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
		String sql = "select SHAIN_ID,SHAIN_NAME,NENNREI,SEIBETU,SYASHIN_ID,ZYUUSYO,BUSYO_ID from SYAIN_ZYOUHOU where 1=1";
		if(empId != null&& empId.length() != 0){
		     sql += " and SHAIN_ID = '"+empId+"'";
		}
		if(empName != null&& empName.length() != 0){
			sql +=" and SHAIN_NAME like '%"+empName+"%'";
		}
		if(dpId != null&& dpId.length() != 0){
			sql += " and BUSYO_ID ='"+dpId+"'";
		}
		System.out.println(sql);

		// 趣味リスト（Display型のリスト）
		List<Display> searchList = new ArrayList<>();

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
				Display display = new Display();
				// SQLの取得結果をインスタンスに代入
				display.setSyainId(rs1.getString("SHAIN_ID"));
				display.setSyainName(rs1.getString("SHAIN_NAME"));

				// 値を格納したHobbyインスタンスをリストに追加
				searchList.add(display);
			}
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

		// アクセスした人に応答するためのJSONを用意する
		PrintWriter pw = response.getWriter();
		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString(searchList));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
