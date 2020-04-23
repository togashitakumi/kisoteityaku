/* 商品情報を登録するファンクション */
var registItem = function() {
	// 入力された
	var inputItemCd = $('#js-regist-input-code').val();
	var inputItemName = $('#js-regist-input-name').val();
	var inputItemNameKana = $('#js-regist-input-kana').val();
	var inputSalesPrice = $('#js-regist-input-price').val();
	var inputStock = $('#js-regist-input-stock').val();
	var inputUrl = $('#js-regist-input-url').val();
	var inputDescription = $('#js-regist-input-description').val();
	console.log(inputItemCd);
	var requestQuery = {
		itemCd : inputItemCd,
		itemName : inputItemName,
		itemNameKana : inputItemNameKana,
		salesPrice : inputSalesPrice,
		stock : inputStock,
		imageUrl : inputUrl,
		description : inputDescription
	};
	console.log('requestQuery',requestQuery);
	// サーバーからデータを取得する
	$.ajax({
		type : 'POST',
		url : '/myFirstApp/ItemRegistServlet',
		dataType : 'json',
		data : requestQuery,
		success : function(json) {
			// 確認のために返却値を出力
			console.log('返却値', json);
			alert('登録が完了しました');
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
		}
	});
}
$(document).ready(function() {
	// 登録ボタンを押したときのイベント
	$('#js-regist-button').click(registItem);
});
/**
 *
 */