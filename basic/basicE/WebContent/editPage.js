
var update = function(){
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	parameter = parameter.split('=')[1];
	// 部署名
	var originId = parameter;
	var updateName = $('#updateName').val();
	var requestQuery = {
			originDpId : originId,
			updateDpName : updateName,
			};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
	type : 'POST',
	dataType:'json',
	url : '/myFirstApp/DpUpdateServlet',
	data : requestQuery,
	async : false,
	success : function(json) {
	// サーバーとの通信に成功した時の処理
	// 確認のために返却値を出力
	console.log('返却値', json);
	location.href = 'http://localhost:8080/myFirstApp/department.html';
	},
	error:function(XMLHttpRequest, textStatus, errorThrown){
	// サーバーとの通信に失敗した時の処理
	alert('データの通信に失敗しました');
	console.log(errorThrown)
	}
	});
}
$(document).ready(function () {
	'use strict';

	// 初期表示用
	$('#editConfirm').click(update);



});/**
 *
 */