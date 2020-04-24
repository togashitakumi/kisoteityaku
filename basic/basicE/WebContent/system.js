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
var create = function(){
	var newId = $('#newId').val();
	var newName = $('#newName').val();
	var newAge = $('#newAge').val();
	var newSex = $('#newSex').val();
	var newImgId = $('#newImgId').val();
	var newAdress = $('#newAdress').val();
	var newDpId = $('#newDpId').val();
	var requestQuery = {
			creId : newId,
			creName : newName,
			creAge : newAge,
			creSex : newSex,
			creImgId : newImgId,
			creAdress : newAdress,
			creDpId : newDpId,
			};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
	type : 'POST',
	dataType:'json',
	url : '/myFirstApp/DisplayServlet',
	data : requestQuery,
	success : function(json) {
	// サーバーとの通信に成功した時の処理
	// 確認のために返却値を出力
	console.log('返却値', json);
	// 登録完了のアラート
	$('#display').empty();
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