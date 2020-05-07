function login() {
	// 入力されたユーザーIDとパスワード
	var requestQuery = {
		userId : $('#login-id').val()
		,password:$('#login-pass').val()
	};
	// サーバーからデータを取得する
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/myFirstApp/LoginServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			if(json.result === "ok"){
				// ユーザー名をローカルストレージに保存
				localStorage.setItem('userName',json.userName);
				localStorage.setItem('userCd',json.userCd);
				// 画面遷移
				location.href='./syainzyouhou.html';
			}else{
				alert('ユーザーIDかパスワードが間違っています');
			}
			/** localStorage01 実装ここまで part1 **/
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}


/**
 * 読み込み時の動作
 */
$(document).ready(function() {

	// ログインボタンを押したときのイベント
	$('#login-button').click(login);


});