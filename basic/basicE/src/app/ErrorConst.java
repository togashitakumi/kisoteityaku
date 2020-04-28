package app;

public class ErrorConst {
	// セッションエラー
		public static String ERR_SESSION = "1001";
		// セッションに登録されているユーザーとリクエストのユーザーが異なるエラー
		public static String ERR_WRONG_USER = "1001";

		// DBの処理エラー
		public static String ERR_DB_CONNECTION = "2001";
		//未入力エラー
		public static String ERR_VALIDATION = "2001";
}
