/* 社員情報を表示するファンクション */
var count = 0;
var seCount=0;
var ed;
var display = function() {
	// サーバーからデータを取得する
	count = 0;
	var requestQuery = {q : 1};
	$.ajax({
				type : 'GET',
				dataType : 'json',
				url : '/myFirstApp/DisplayServlet',
				data : requestQuery,
				async : false,
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
								+ '</td><td><button id="edit'+(i + 1)+'" value="'+display.syainName+'">編集</button></td>'
								+'<td><button id="delete'+(i + 1)+'" value="'+display.syainName+'">削除</button></td></tr>';
						count++;
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
	async : false,
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

var update = function(){
	var updateId = $('#updateId').val();
	var updateName = $('#updateName').val();
	var updateAge = $('#updateAge').val();
	var updateSex = $('#updateSex').val();
	var updateImgId = $('#updateImgId').val();
	var updateAdress = $('#updateAdress').val();
	var updateDpId = $('#updateDpId').val();
	var updateoriginName = ed;
	var requestQuery = {
			originName : originName,
			updateName : updateName,
			updateAge  : updateAge,
			updateSex : updateSex,
			updateImgId : updateImgId,
			updateAdress : updateAdress,
			updateDpId : updateDpId
			};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
	type : 'POST',
	dataType:'json',
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
	error:function(XMLHttpRequest, textStatus, errorThrown){
	// サーバーとの通信に失敗した時の処理
	alert('データの通信に失敗しました');
	console.log(errorThrown)
	}
	});
}
var editArea = function(){
	$('#editBox').empty();
	var a =$(this).attr("id");
	console.log($(this).attr("id"));
	eb =$('#'+a+'').val();
	var editBox='<p>'+eb+'の編集</p><input type="text"placeholder="変更後" id="updateName"></input>'
				+'</p><input type="text"placeholder="名前" id="updateName"></input>'
				+'</p><input type="text"placeholder="年齢" id="updatAge"></input>'
				+'</p><input type="text"placeholder="性別" id="updateSex"></input>'
				+'</p><input type="text"placeholder="写真ID" id="updateImgId"></input>'
				+'</p><input type="text"placeholder="住所" id="updateAdress"></input>'
				+'</p><input type="text"placeholder="部署ID" id="updateDpId"></input>'
				+'<button id="editConfirm">編集確定</button>';
	$('#editBox').append(editBox);
	$('#editConfirm').click(update);
}
var deleteEp = function(){
	// 部署名
	var c =$(this).attr("id");
	console.log($(this).attr("id"));
	var delName = $('#'+c+'').val();
	var requestQuery = {
			delName : delName,
			};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
	type : 'POST',
	dataType:'json',
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
	error:function(XMLHttpRequest, textStatus, errorThrown){
	// サーバーとの通信に失敗した時の処理
	alert('データの通信に失敗しました');
	console.log(errorThrown)
	}
	});
}
var pull = function(){
	var requestQuery = {q : 1};
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
					var tableElemnt = '<p>検索フォーム</p><form name="form"><select name="department">';
					for (var i = 0; i < json.length; i++) {
						var dpDisplay = json[i];
							tableElemnt += '<option id = "search'+(i + 1)+'" value="'+dpDisplay.departmentId+'">'+dpDisplay.departmentName+'</option>';
							seCount++;
					}
					tableElemnt += '</select></form>'
						+'<input type="text"placeholder="EMP????" id="searchId"></input>'
						+'<input type="text"placeholder="名前" id="searchName"></input>'
						+'<button id="searchServlet">検索</button>';
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
	display();
	var getDepartmentId = document.form.department;
	var num = getDepartmentId.selectedIndex;
	var departmentId = getDepartmentId.options[num].value;
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
								+ '</td><td><button id="edit'+(i + 1)+'" value="'+display.syainName+'">編集</button></td>'
								+'<td><button id="delete'+(i + 1)+'" value="'+display.syainName+'">削除</button></td></tr>';
						count++;
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
	$('#create').click(create);
	for(var i =1; i<=count;i++){
		$('#edit'+i).click(editArea);
		$('#delete'+i).click(deleteEp);
	}
	$('#search').click(pull);
});