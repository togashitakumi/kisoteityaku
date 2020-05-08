package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class RejectServlet
 */
@WebServlet("/RejectServlet")
public class RejectServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public RejectServlet() {
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
		Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String updateDay = sdf.format(cal.getTime());
		String changerName = request.getParameter("changerName");
		String status = request.getParameter("status");
		String reason = request.getParameter("reason");
		String  appliId= request.getParameter("appliId");
		PrintWriter pw = response.getWriter();
		if(reason == null){
			// レスポンスに書き込み
			pw.append(new ObjectMapper().writeValueAsString("reason"));
			// 処理を中断
			return;
			}

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
		String sql = "update EXPENSES  \n" +
				"set  \n" +
				"KOUSHINBI = '"+updateDay+"', \n" +
				"KOUSINSHA = '"+changerName+"', \n" +
				"RIYUU = '"+reason+"', \n" +
				"STATUS = "+status+" \n" +
				" where 1=1 and SHINSEI_ID = '"+appliId+"'" ;
		// エラーが発生するかもしれない処理はtry-catchで囲みます
		// この場合はDBサーバへの接続に失敗する可能性があります
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
		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString("ok"));

	}

}
