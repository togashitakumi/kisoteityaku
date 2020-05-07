package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String userId = request.getParameter("userId");
		String password = request.getParameter("password");

		// アクセスした人に応答するためのJSONを用意する
		PrintWriter pw = response.getWriter();

		// JDBCドライバの準備
		try {

		    // JDBCドライバのロード
		    Class.forName("oracle.jdbc.driver.OracleDriver");

		} catch (ClassNotFoundException e) {
		    // ドライバが設定されていない場合はエラーになります
		    throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
		}

		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String Url = "jdbc:oracle:thin:@localhost:1521:XE";

		String User = "basic";
		String Pass = "basic";

		String sql =
				"select \n" +
				"SHAIN_ID, ROLE \n" +
				"from \n" +
				"USER_PASS \n" +
				"where 1=1 \n" +
				"and USER_ID='"+userId+"' \n" +
				"and PASSWORD='"+password+"' ";
		System.out.println(sql);

		// DBへ接続してSQLを実行
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(Url, User, Pass);

				Statement stmt = con.createStatement();

				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
				ResultSet rs1 = stmt.executeQuery(sql);)

			{
			// SQLの取得結果がある時（ユーザIDとパスワードが一致しているユーザーがいる）は「ok」という文字列を画面に返却
			// そうでないときは「ng」を返却
			// 返却データを作成
			Map <String, String> responseData = new HashMap<>();
			if (rs1.next()) {
				// ログインの結果
				responseData.put("result", "ok");
				// ユーザーコードとユーザー名（画面でユーザー名を表示したいため）
				responseData.put("userEmId",rs1.getString("SHAIN_ID") );
				responseData.put("userRole",rs1.getString("ROLE") );

				// ユーザー情報をセッションに保存
				 HttpSession session = request.getSession();
				 session.setAttribute("userEmId", rs1.getString("SHAIN_ID") );
				 session.setAttribute("userRole", rs1.getString("ROLE") );
				 String status = (String)session.getAttribute("SHAIN_ID");

			}else{
				responseData.put("result", "ng");

			}
			pw.append(new ObjectMapper().writeValueAsString(responseData));

		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}


	}
	//---- ここから実装 -Part1- --------------------------------------------
//	private PreparedStatement createPreparedStatement(Connection con, String userId, String password) throws SQLException {
//		System.out.println("userId="+userId);
//		System.out.println("password="+password);
//		// 実行するSQL文
//		String sql =
//		"select \n" +
//		"SHAIN_ID, ROLE \n" +
//		"from \n" +
//		"USER_PASS \n" +
//		"where 1=1 \n" +
//		"and USER_ID=? \n" +
//		"and PASSWORD=? ";
//	    PreparedStatement stmt = con.prepareStatement(sql);
//	    stmt.setString(1, userId);
//	    stmt.setString(2, password);
//
//
//	    return stmt;
//	}

}
