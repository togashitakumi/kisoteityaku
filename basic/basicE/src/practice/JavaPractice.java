package practice;

public class JavaPractice {

	public static void main(String[] args) {
		// 「String」䛿文字列を保持するため䛾型です
		String itemName = "リンゴ";
		// 「int」䛿整数を保持するため䛾型です
		int stock = 10;
		// System.out.println(<出力したい文字列>)䛿コンソールに文字を出力するため䛾メソッドです。
		// 「+」を使用すると複数䛾文字列を結合できます。
		System.out.println(itemName + "䛿" + stock + "個あります。");
		// stockが10以上なら「まだまだ余裕があるよ」、10未満5以上なら「在庫が減ってきたよ」、5未満なら「残りわずか!」と表示する
		if (stock >= 10) {
			System.out.println("まだまだ余裕があるよ");
		} else if (stock < 10 && stock >= 5) {
			System.out.println("在庫が減ってきたよ");
		} else {
			System.out.println("残りわずか!");
		}

	}

}
