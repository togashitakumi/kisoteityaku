package app;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
//		String empId = request.getParameter("syainId");
//		String empName = request.getParameter("syainName");
//		String dpId = request.getParameter("bussyoId");
//		try {
//
//			// JDBCドライバのロード
//			Class.forName("oracle.jdbc.driver.OracleDriver");
//
//		} catch (ClassNotFoundException e) {
//			// ドライバが設定されていない場合はエラーになります
//			throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
//		}
//
//		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
//		String url = "jdbc:oracle:thin:@localhost:1521:XE";
//		String user = "basic";
//		String pass = "basic";
//
//		// 実行するSQL文
//		if(empName == )
//		String sql = "select SY.SYAINID,HO.HOBBY_ID,CA.CATEGORY_ID,CA.CATEGORY_NAME,HO.HOBBY_NAME from MS_SYAIN SY,MS_SYAIN_HOBBY SH,MS_HOBBY HO,MS_CATEGORY CA where 1=1 and SY.SYAINID = SH.SYAINID and SH.HOBBY_ID = HO.HOBBY_ID and HO.CATEGORY_ID = CA.CATEGORY_ID and SY.SYAINID = '"
//				+ syainId + "'";
//
//		// 趣味リスト（Hobby型のリスト）
//		List<Display> searchList = new ArrayList<>();
//
//		// エラーが発生するかもしれない処理はtry-catchで囲みます
//		// この場合はDBサーバへの接続に失敗する可能性があります
//		try (
//				// データベースへ接続します
//				Connection con = DriverManager.getConnection(url, user, pass);
//
//				// SQLの命令文を実行するための準備をおこないます
//				Statement stmt = con.createStatement();
//
//				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
//				ResultSet rs1 = stmt.executeQuery(sql);) {
//			// SQL実行後の処理内容
//
//			// SQL実行結果を商品リストに追加していく。
//			while (rs1.next()) {
//				// 一つ分の成績情報を入れるためReSScordインスタンスを生成
//				Hobby hobby = new Hobby();
//				// SQLの取得結果をインスタンスに代入
//				hobby.setHobby(rs1.getString("HOBBY_NAME"));
//				hobby.setHobbyCategory(rs1.getString("CATEGORY_NAME"));
//
//				// 値を格納したHobbyインスタンスをリストに追加
//				list.add(hobby);
//			}
//		} catch (Exception e) {
//			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
//		}
//
//		// アクセスした人に応答するためのJSONを用意する
//		PrintWriter pw = response.getWriter();
//		// JSONで出力する
//		pw.append(new ObjectMapper().writeValueAsString(list));

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
