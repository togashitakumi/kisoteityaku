var display = function() {
	// サーバーからデータを取得する
	var requestQuery = {q : 1};
	$.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/myFirstApp/BusyoDisplayServlet',
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
								+ (i + 1)
								+ '</td><td>'
								+ display.departmentName
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
var create = function(){
	// 部署名
	var newDepartmentName = $('#newDp').val();
	var requestQuery = {
			creDp : newDepartmentName,
			};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
	type : 'POST',
	dataType:'json',
	url : '/myFirstApp/BusyoDisplayServlet',
	data : requestQuery,
	success : function(json) {
	// サーバーとの通信に成功した時の処理
	// 確認のために返却値を出力
	console.log('返却値', json);
	// 登録完了のアラート
	display();
	},
	error:function(XMLHttpRequest, textStatus, errorThrown){
	// サーバーとの通信に失敗した時の処理
	alert('データの通信に失敗しました');
	console.log(errorThrown)
	}
	});
}
$(document).ready(function() {
	display();
	$('#create').click(create);
});