var userEmId;
var userRole;
var create = function(){
	// 部署名
	var new_appliId = $('#new_appliId').val();
	var new_appliDay = $('#new_appliDay').val();
	var new_appliName = $('#new_appliName').val();
	var new_title = $('#new_title').val();
	var new_payName = $('#new_payName').val();
	var new_payment = $('#new_payment').val();
	var requestQuery = {
			appliId : new_appliId,
			appliDay : new_appliDay,
			appliName : new_appliName,
			title : new_title,
			payName : new_payName,
			payment : new_payment,
			empId : userEmId,
			};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
	type : 'POST',
	dataType:'json',
	url : '/myFirstApp/ExpenseDetailServlet',
	data : requestQuery,
	async : false,
	success : function(json) {
	// サーバーとの通信に成功した時の処理
	// 確認のために返却値を出力
	console.log('返却値', json);
	alert('登録が完了しました。');
	// 登録完了のアラート
	},
	error:function(XMLHttpRequest, textStatus, errorThrown){
	// サーバーとの通信に失敗した時の処理
	alert('データの通信に失敗しました');
	console.log(errorThrown)
	}
	});

}
var session = function() {
	var requestQuery = {
		q : 1
	};
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/myFirstApp/SessionServlet',
		async : false,
		data : requestQuery,
		success : function(json) {
			userEmId = json.userEmId;
			userRole = json.userRole;
			if(userEmId == null){
				location.href = './login.html';
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}
var logout = function() {
	var requestQuery = {
		q : 1
	};
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/myFirstApp/LogoutServlet',
		async : false,
		data : requestQuery,
		success : function(json) {
			console.log(json);
			session();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}
$(document).ready(function() {
	session();
	$('#create').click(create);
	$('#logout').click(logout);



});