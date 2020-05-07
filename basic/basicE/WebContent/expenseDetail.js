var count = 0;
var userEmId;
var userRole;
var name;
var expense = function() {
	// サーバーからデータを取得する
	count = 0;
	var parameter = location.search.substring(1, location.search.length);
	parameter = decodeURIComponent(parameter);
	parameter = parameter.split('=')[1];
	var requestQuery = {
		appliId : parameter
	};

	$
			.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/myFirstApp/ExpenseDetailServlet',
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
						var expense = json[0];
						var a;
						if (expense.status == "1") {
							a = "承認";
						} else if (expense.status == "2") {
							a = "却下";
						} else {
							a = "申請中";
						}
						if(expense.updateDay === null){
							update = "なし";
							tableElemnt += '<tr> <td>'
								+ expense.appliId
								+ '</td><td>'
								+ expense.appliDay
								+ '</td><td>'
								+ update
								+ '</td><td>'
								+ expense.appliName
								+ '</td><td>'
								+ expense.title
								+ '</td><td>'
								+ expense.payName
								+ '</td><td>'
								+ expense.payment
								+ '</td><td>'
								+ a
								+ '</td><td>'
								+ update
								+ '</td><td><button id = "return">戻る</button></td></tr>';
						}else{
						tableElemnt += '<tr> <td>'
								+ expense.appliId
								+ '</td><td>'
								+ expense.appliDay
								+ '</td><td>'
								+ expense.updateDay
								+ '</td><td>'
								+ expense.appliName
								+ '</td><td>'
								+ expense.title
								+ '</td><td>'
								+ expense.payName
								+ '</td><td>'
								+ expense.payment
								+ '</td><td>'
								+ a
								+ '</td><td>'
								+ expense.changerName
								+ '</td><td><button id = "return">戻る</button></td></tr>';
						}
						// HTMLに挿入
						$('#expense').append(tableElemnt);
						$('#return').click(returnEx);
						var divElement = '';
						if (userRole === "マネージャー") {
							if (expense.status != "1" && expense.status != "2") {
								divElement = '<button id = "approval">承認</button>'
										+ '<button id = "rejection">却下</button>'
										+ '<textarea id = "reason" placeholder="却下理由を記入"></textarea>'
							} else if (expense.status == "2") {
								divElement = '<p>却下理由</p>' + '<p>'
										+ expense.reason + '</p>'
							}
						} else {
							if (expense.status == "2") {
								divElement = '<p>却下理由</p>' + '<p>'
										+ expense.reason + '</p>'
							}
						}
						$('#approval').append(divElement);

					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// サーバーとの通信に失敗した時の処理
					alert('データの通信に失敗しました');
					console.log(errorThrown)
				}
			});
	$('#approval' ).click(approval);
	$('#rejection').click(rejection);

}
var returnEx = function() {
	location.href = './Expense.html';
}
var approval = function(){
	var parameter = location.search.substring(1, location.search.length);
	parameter = decodeURIComponent(parameter);
	parameter = parameter.split('=')[1];
	var requestQuery = {
			appliId : parameter,
			changerName: name,
			status: "1",
		};
	console.log('requestQuery', requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/myFirstApp/ApprovalServlet',
		data : requestQuery,
		async : false,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			alert('承認しました');
			$('#expense').empty();
			expense();

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
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
		a = '<a href="./syainzyouhou.html">社員一覧</a>'
				+ '<a href="./department.html">部署一覧</a>'
				+ '<a href="./Expense.html">経費一覧</a>'
				+ '<a href="./Expense.html">経費管理</a>'
	$('#header').append(a);
}
var nameGet = function() {
	// サーバーからデータを取得する
	count = 0;
	var requestQuery = {
		empId : userEmId
	};

	$.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/myFirstApp/NameServlet',
				data : requestQuery,
				async : false,
				success : function(json) {
							// サーバーとの通信に成功した時の処理
							// 確認のために返却値を出力
							console.log('返却値', json);
							// 取得したデータを画面に表示する
							var a = json[0];
							name = a.syainName

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
	header();
	nameGet();
	expense();

});