var count = 0;
var b;
var display = function() {
	// サーバーからデータを取得する
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
					var tableElemnt = '';
					for (var i = 0; i < json.length; i++) {
						var display = json[i];
						tableElemnt += '<tr> <td>'
								+ (i + 1)
								+ '</td><td id="department'+(i + 1)+'">'
								+ display.departmentName
								+ '</td><td><button id="edit'+(i + 1)+'" value="'+display.departmentId+'">編集</button></td><td><button id="delete'+(i + 1)+'" value="'+display.departmentId+'">削除</button></td></tr>';
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
	for(var i =1; i<=count;i++){
		$('#edit'+i+'').click(editArea);
		$('#delete'+i+'').click(deleteDp);
	}
}
var create = function(){
	// 部署名
	var newDepartId = $('#newId').val();
	var newDepartmentName = $('#newDp').val();
	var requestQuery = {
			creId : newDepartId,
			creDp : newDepartmentName,
			};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
	type : 'POST',
	dataType:'json',
	url : '/myFirstApp/BusyoDisplayServlet',
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
	// 部署名
	var originId = b;
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
var deleteDp = function(){
	// 部署名
	var c =$(this).attr("id");
	console.log($(this).attr("id"));
	var delId = $('#'+c+'').val();
	var requestQuery = {
			delId : delId,
			};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
	type : 'POST',
	dataType:'json',
	url : '/myFirstApp/DpDeleteServlet',
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
var editArea = function(){
	$('#editBox').empty();
	var a =$(this).attr("id");
	console.log($(this).attr("id"));
	b =$('#'+a+'').val();
	var editBox='';

	var editBox='<p id="originId">'+b+'</p><input type="text"placeholder="変更後" id="updateName"></input>'
				+'<button id="editConfirm">編集確定</button><a href=""edit.html" id="editP">移動</a>';
	$('#editBox').append(editBox);
	$('#editConfirm').click(update);
	$('#editP').attr('href', 'edit.html?q=' + b);
}

$(document).ready(function() {
	display();
	//$('#display').ready('load',display);
	$('#create').click(create);




});