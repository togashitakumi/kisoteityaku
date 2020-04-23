/* 社員情報を表示するファンクション */
var display = function() {
	// サーバーからデータを取得する
	var requestQuery = {q : 1};
	$.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/myFirstApp/DisplayServlet',
				data : requestQuery,
				success : function(json) {
					// サーバーとの通信に成功した時の処理
					// 確認のために返却値を出力
					console.log('返却値', json);
					// 取得したデータを画面に表示する
					var tableElemnt = '';
					for (var i = 0; i < json.length; i++) {
						var display = json[i];
						tableElemnt += '<tr> <td>'
								+ display.syainId
								+ '</td><td>'
								+ display.syainName
								+ '</td><td><button id="edit">編集</button></td><td><button id="delete">削除</button></td></tr>';
					}
					// HTMLに挿入
					$('#display').append(tableElemnt);
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// サーバーとの通信に失敗した時の処理
					alert('データの通信に失敗しました');
					console.log(errorThrown)
				}
			});
}

$(document).ready(function() {
	display();

});