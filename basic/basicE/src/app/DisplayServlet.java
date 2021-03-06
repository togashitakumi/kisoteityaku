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
 * Servlet implementation class DisplayServlet
 */
@WebServlet("/DisplayServlet")
public class DisplayServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public DisplayServlet() {
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

		DataBase.driver();

		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "basic";
		String pass = "basic";

		// 実行するSQL文
		String sql = "select SHAIN_ID, SHAIN_NAME from SYAIN_ZYOUHOU order by SHAIN_ID";

		// 趣味リスト（Hobby型のリスト）
		List<Display> displaylist = new ArrayList<>();

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
				displaylist.add(display);
			}
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

		// アクセスした人に応答するためのJSONを用意する

		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString(displaylist));
	}



	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String  creId= request.getParameter("creId");
		String  creName= request.getParameter("creName");
		String  creAge= request.getParameter("creAge");
		String  creSex= request.getParameter("creSex");
		String  creImgId= request.getParameter("creImgId");
		String  creAdress= request.getParameter("creAdress");
		String  creDpId= request.getParameter("creDpId");


		DataBase.driver();
		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "basic";
		String pass = "basic";
		// 実行するSQL文
		String sql = "insert into SYAIN_ZYOUHOU (SHAIN_ID,SHAIN_NAME,NENNREI,SEIBETU,SYASHIN_ID,ZYUUSYO,BUSYO_ID) values('"+creId+"','"+creName+"','"+creAge+"','"+creSex+"','"+creImgId+"','"+creAdress+"','"+creDpId+"')";
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
		PrintWriter pw = response.getWriter();
		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString("ok"));

	}


}
