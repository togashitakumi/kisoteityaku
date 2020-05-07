/* 社員情報を表示するファンクション */
var count = 0;
var seCount = 0;
var ed;
var userEmId;
var userRole;
var display = function() {
	// サーバーからデータを取得する
	count = 0;
	var requestQuery = {
			q : 1
		};

	$
			.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/myFirstApp/DisplayServlet',
				data : requestQuery,
				async : false,
				success : function(json) {
					if (json === "No") {
						// 画面遷移
						location.href = './login.html';
					} else {
						if (userRole !== "マネージャー") {
							var tableElemnt = '';
							for (var i = 0; i < json.length; i++) {
								var display = json[i];
								tableElemnt += '<tr> <td>' + display.syainId
										+ '</td><td>' + display.syainName
										+ '</td>';
								count++;
							}
							var editElemnt = '<button id="edit1" value="'+ userEmId+'">編集</button>';
							$('#display').append(tableElemnt);
							$('#editBoxMem').append(editElemnt);
						}else{

						// サーバーとの通信に成功した時の処理
						// 確認のために返却値を出力
						console.log('返却値', json);
						// 取得したデータを画面に表示する
						var tableElemnt = '';
						for (var i = 0; i < json.length; i++) {
							var display = json[i];
							tableElemnt += '<tr> <td>' + display.syainId
									+ '</td><td>' + display.syainName
									+ '</td><td><button id="edit' + (i + 1)
									+ '" value="' + display.syainId
									+ '">編集</button></td>'
									+ '<td><button id="delete' + (i + 1)
									+ '" value="' + display.syainId
									+ '">削除</button></td></tr>';
							count++;

						}
						var createElement = '<input type="text"placeholder="EMP????" id="newId"></input>'
								+ '<input type="text"placeholder="名前" id="newName"></input>'
								+ '<input type="text"placeholder="年齢" id="newAge"></input>'
								+ '<p><label><input type="radio"name="sex" value="男">男</label>'
								+ '<label><input type="radio"name="sex" value="女">女</label></p>'
								+ '<input type="text"placeholder="P?????" id="newImgId"></input>'
								+ '<input type="text"placeholder="〒〇〇〇-〇〇〇〇 住所" id="newAdress"></input>'
								+ '<input type="text"placeholder="部署Id" id="newDpId"></input>'
								+ '<button id="create">新規作成</button>';
						// HTMLに挿入
						$('#display').append(tableElemnt);
						$('#createbox').append(createElement);
						}
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// サーバーとの通信に失敗した時の処理
					alert('データの通信に失敗しました');
					console.log(errorThrown)
				}
			});
	for (var i = 1; i <= count; i++) {
		$('#edit' + i).click(editArea);
		$('#delete' + i).click(deleteEp);
	}
	$('#search').click(pull);
}
var create = function() {
	var newId = $('#newId').val();
	var newName = $('#newName').val();
	var newAge = $('#newAge').val();
	var newSex = $('input[name="sex"]:checked').val();
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
	console.log('requestQuery', requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/myFirstApp/DisplayServlet',
		data : requestQuery,
		async : false,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			// 登録完了のアラート
			$('#display').empty();
			display();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});

}

var update = function() {
	var getDpId = document.upForm.updateDp;
	var num = getDpId.selectedIndex;
	var updateDpId = getDpId.options[num].value;
	var updateId = $('#updateId').val();
	var updateName = $('#updateName').val();
	var updateAge = $('#updateAge').val();
	var updateSex = $('input[name="upSex"]:checked').val();
	var updateImgId = $('#updateImgId').val();
	var updateAdress = $('#updateAdress').val();
	var updateoriginId = ed;
	var requestQuery = {
		originId : updateoriginId,
		updateName : updateName,
		updateAge : updateAge,
		updateSex : updateSex,
		updateImgId : updateImgId,
		updateAdress : updateAdress,
		updateDpId : updateDpId
	};
	console.log('requestQuery', requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/myFirstApp/UpdateServlet',
		data : requestQuery,
		async : false,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			$('#display').empty();
			$('#editBox').empty();
			display();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}
var editArea = function() {
	$('#editBox').empty();
	var a = $(this).attr("id");
	console.log($(this).attr("id"));
	ed = $('#' + a + '').val();
	var editBox = '<p>'
			+ ed
			+ 'の編集</p>'
			+ '</p><input type="text"placeholder="名前" id="updateName"></input>'
			+ '</p><input type="text"placeholder="年齢" id="updatAge"></input>'
			+ '<p><label><input type="radio"name="sex" value="男">男</label><label><input type="radio"name="sex" value="女">女</label></p>'
			+ '</p><input type="text"placeholder="写真ID" id="updateImgId"></input>'
			+ '</p><input type="text"placeholder="住所" id="updateAdress"></input>'
			+ '<form name="upForm"><select name="updateDp">';
	var requestQuery = {
		q : 1
	};
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : '/myFirstApp/BusyoDisplayServlet',
		data : requestQuery,
		async : false,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			// 取得したデータを画面に表示する

			for (var i = 0; i < json.length; i++) {
				var dpDisplay = json[i];
				editBox += '<option id = "editpull' + (i + 1) + '" value="'
						+ dpDisplay.departmentId + '">'
						+ dpDisplay.departmentName + '</option>';
				seCount++;
			}
			editBox += '</select></form>'
					+ '<button id="editConfirm">編集確定</button>';
			// HTMLに挿入
			$('#editBox').append(editBox);
			$('#editConfirm').click(update);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}

	});
}
var deleteEp = function() {
	// 部署名
	var c = $(this).attr("id");
	console.log($(this).attr("id"));
	var delId = $('#' + c + '').val();
	var requestQuery = {
		delId : delId,
	};
	console.log('requestQuery', requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/myFirstApp/DeleteServlet',
		data : requestQuery,
		async : false,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			$('#display').empty();
			display();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}
var pull = function() {
	var requestQuery = {
		q : 1
	};
	$
			.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/myFirstApp/BusyoDisplayServlet',
				data : requestQuery,
				async : false,
				success : function(json) {
					// サーバーとの通信に成功した時の処理
					// 確認のために返却値を出力
					console.log('返却値', json);
					// 取得したデータを画面に表示する
					var tableElemnt = '<p>検索フォーム</p><form name="form"><select name="department">'
							+ '<option value="">なし</option>';
					for (var i = 0; i < json.length; i++) {
						var dpDisplay = json[i];
						tableElemnt += '<option id = "search' + (i + 1)
								+ '" value="' + dpDisplay.departmentId + '">'
								+ dpDisplay.departmentName + '</option>';
						seCount++;
					}
					tableElemnt += '</select></form>'
							+ '<input type="text"placeholder="EMP????" id="searchId"></input>'
							+ '<input type="text"placeholder="名前" id="searchName"></input>'
							+ '<button id="searchServlet">検索</button>';
					// HTMLに挿入
					$('#searchBox').append(tableElemnt);
					$('#searchServlet').click(search);
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// サーバーとの通信に失敗した時の処理
					alert('データの通信に失敗しました');
					console.log(errorThrown)
				}

			});
}
var search = function() {
	// サーバーからデータを取得する
	$('#display').empty();
	var getDepartmentId = document.form.department;
	var num = getDepartmentId.selectedIndex;
	var departmentId = getDepartmentId.options[num].value;
	console.log(departmentId);
	var requestQuery = {
		departmentId : departmentId,
		searchId : $('#searchId').val(),
		searchName : $('#searchName').val()
	};
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : '/myFirstApp/SearchServlet',
		data : requestQuery,
		async : false,
		success : function(json) {
			if (json.length == 0) {
				var zero = "検索結果がありません。";
				$('#zero').html(zero);
			} else {
				// サーバーとの通信に成功した時の処理
				// 確認のために返却値を出力
				console.log('返却値', json);
				// 取得したデータを画面に表示する
				var tableElemnt = '';
				for (var i = 0; i < json.length; i++) {
					var display = json[i];
					tableElemnt += '<tr> <td>' + display.syainId + '</td><td>'
							+ display.syainName + '</td><td><button id="edit'
							+ (i + 1) + '" value="' + display.syainName
							+ '">編集</button></td>' + '<td><button id="delete'
							+ (i + 1) + '" value="' + display.syainName
							+ '">削除</button></td></tr>';
					count++;
				}
				// HTMLに挿入
				$('#display').append(tableElemnt);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}
var session = function(){
	var requestQuery = {
			q : 1
		};
		$.ajax({
			type : 'POST',
			dataType:'json',
			url : '/myFirstApp/SessionServlet',
			async : false,
			data : requestQuery,
			success : function(json) {
					userEmId = json.userEmId;
					userRole = json.userRole;
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				// サーバーとの通信に失敗した時の処理
				alert('データの通信に失敗しました');
				console.log(errorThrown)
			}
		});
}
$(document).ready(function() {
	session();
	display();
	$('#create').click(create);

});