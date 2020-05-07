var count = 0;
var userEmId;
var userRole;
var expense = function() {
	// サーバーからデータを取得する
	count = 0;
	var requestQuery = {
		q : 1
	};

	$
			.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/myFirstApp/ExpenseServlet',
				data : requestQuery,
				async : false,
				success : function(json) {
					if (json === "No") {
						// 画面遷移
						location.href = './login.html';
					} else {

							// サーバーとの通信に成功した時の処理
							// 確認のために返却値を出力
							console.log('返却値', json);
							// 取得したデータを画面に表示する
							var tableElemnt = '';
							for (var i = 0; i < json.length; i++) {
								var expense = json[i];
								var a;
								if(expense.status=="1"){
									a = "承認";
								}else if(expense.status=="2"){
									a = "却下";
								}else{
									a = "申請中";
								}
								tableElemnt += '<tr> <td>' + expense.appliId
										+ '</td><td>' + expense.appliDay
										+ '</td><td>' + expense.updateDay
										+ '</td><td>' + expense.appliName
										+ '</td><td>' + expense.title
										+ '</td><td>' + expense.payment
										+ '</td><td>' + a
										+ '</td><td><button id="detail' + (i + 1)
										+ '" value="' + expense.appliId
										+ '">詳細</button></td></tr>';
								count++;
							}
							// HTMLに挿入
							$('#expense').append(tableElemnt);

					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// サーバーとの通信に失敗した時の処理
					alert('データの通信に失敗しました');
					console.log(errorThrown)
				}
			});
	for (var i = 1; i <= count; i++) {
		$('#detail' + i).click(detail);
	}
}
var detail = function(){

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
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}
var header = function() {
	var a;
	if (userRole === "マネージャー") {
		a = '<a href="./syainzyouhou.html">社員一覧</a>'
				+ '<a href="./department.html">部署一覧</a>'
				+ '<a href="./Expense.html">経費一覧</a>'
				+ '<a href="./Expense.html">経費管理</a>'
	} else {
		a = '<a href="./syainzyouhou.html">社員一覧</a>'
				+ '<a href="./department.html">部署一覧</a>'
				+ '<a href="./Expense.html">経費一覧</a>';
	}
	$('#header').append(a);
}
$(document).ready(function() {
	session();
	header();
	expense();

});