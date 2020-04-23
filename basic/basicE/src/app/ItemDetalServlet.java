package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class ItemDetalServlet
 */
@WebServlet("/ItemDetailServlet")
public class ItemDetalServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ItemDetalServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String itemCd = request.getParameter("itemCd");
		System.out.println("itemCd=" + itemCd);
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
		String user = "webapp";
		String pass = "webapp";
		// 実行するSQL文
		String sql = "select ITEM_CD,NAME,NAME_KANA,DESCRIPTION,URL,SALES_PRICE,TAX_TYPE,ITEM_GROUP_CD,STOCK from MS_ITEM where ITEM_CD = '"+itemCd+"'";
		Item item = new Item();
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
			// SQL実行結果を保持している変数rsから商品情報を取得
			// rs.nextは取得した商品情報表に次の行があるとき(取得結果があるとき)、trueになり、if文の中が実行される
			// 次の行がないときはfalseになり、実行されない
			if (rs1.next()) {
				item.setItemCd(rs1.getString("ITEM_CD")); // Item型の変数itemに商品コードをセット
				item.setItemName(rs1.getString("NAME"));// Item型の変数itemに商品名をセット
				item.setItemNameKana(rs1.getString("NAME_KANA"));// Item型の変数itemに商品名カナをセット
				item.setDescription(rs1.getString("DESCRIPTION"));// Item型の変数itemに商品説明をセット
				item.setUrl(rs1.getString("URL"));// Item型の変数itemに画像URLをセット
				item.setSalesPrice(rs1.getInt("SALES_PRICE"));// Item型の変数itemに販売単価をセット
				item.setTaxType(rs1.getString("TAX_TYPE"));// Item型の変数itemに税区分をセット
				item.setItemGroupCode(rs1.getString("ITEM_GROUP_CD"));// Item型の変数itemに商品分類コードをセット
				item.setStock(rs1.getInt("STOCK"));//Item型の変数itemに在庫をセット
			}
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細:[%s]", e.getMessage()), e);
		}
		// 商品情報を保持するItem型䛾変数itemを宣言
		if ("0001".equals(itemCd)) {
			item.setItemCd("0001"); // Item型䛾変数itemに商品コードをセット
			item.setItemName("国内産 ふじ りんご 1個");// Item型䛾変数itemに商品名をセット
			item.setItemNameKana("コクサン フジ リンゴ 1コ");// Item型䛾変数itemに商品名カナをセット
			item.setDescription("・内容量:250g ・原材料:ふじ ・商品サイズ(高さx奥行x幅):80.0mm×85.0mm×85.0mm");// Item型䛾変数itemに商品説明をセット
			item.setUrl("./images/apple.jpg");// Item型䛾変数itemに画像URLをセット
			item.setSalesPrice(200);// Item型䛾変数itemに販売単価をセット
			item.setTaxType("01");// Item型䛾変数itemに税区分をセット
			item.setItemGroupCode("01");// Item型䛾変数itemに商品分類コードをセット
			item.setStock(20);// Item型䛾変数itemに在庫をセット
		} else if ("0002".equals(itemCd)) {
			item.setItemCd("0002"); // Item型䛾変数itemに商品コードをセット
			item.setItemName("輸入 アップルマンゴー 1個");// Item型䛾変数itemに商品名をセット
			item.setItemNameKana("ユニュウ アップルマンゴー 1コ");// Item型䛾変数itemに商品名カナをセット
			item.setDescription("・内容量:400g ・原材料:アップルマンゴー ・商品サイズ(高さx奥行x幅):100.0mm×140.0mm×190.0mm");// Item型䛾変数itemに商品説明をセット
			item.setUrl("./images/mango.jpg");// Item型䛾変数itemに画像URLをセット
			item.setSalesPrice(730);// Item型䛾変数itemに販売単価をセット
			item.setTaxType("01");// Item型䛾変数itemに税区分をセット
			item.setItemGroupCode("01");// Item型䛾変数itemに商品分類コードをセット
			item.setStock(20);// Item型䛾変数itemに在庫をセット
		} else if ("0003".equals(itemCd)) {
			item.setItemCd("0003"); // Item型䛾変数itemに商品コードをセット
			item.setItemName("静岡県産 サン・グリーンズ マスクメロン 1個");// Item型䛾変数itemに商品名をセット
			item.setItemNameKana("シズオカサン サン・グリーンズ マスクメロン 1コ");// Item型䛾変数itemに商品名カナをセット
			item.setDescription("・内容量:1200g ・原材料:メロン ・商品サイズ(高さx奥行x幅):185mm×160mm×155mm");// Item型䛾変数itemに商品説明をセット
			item.setUrl("./images/melon.jpg");// Item型䛾変数itemに画像URLをセット
			item.setSalesPrice(6000);// Item型䛾変数itemに販売単価をセット
			item.setTaxType("01");// Item型䛾変数itemに税区分をセット
			item.setItemGroupCode("01");// Item型䛾変数itemに商品分類コードをセット
			item.setStock(5);// Item型䛾変数itemに在庫をセット
		}
		// アクセスした人に応答するため䛾JSONを用意する
		PrintWriter pw = response.getWriter();
		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString(item));
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
