/* 画像を拡大するファンクション */
var scalUpImage = function() {
	$('#js-item-image').addClass("expand");
}
/* 画像を縮小するファンクション */
var scaldownImage = function() {
	$('#js-item-image').removeClass("expand");
}
/* 商品情報を取得するファンクション */
var getItem = function() {
	// 入力された商品コード
	var inputItemCd = $('#js-search-input').val();
	console.log(inputItemCd);
	var requestQuery = {
		itemCd : inputItemCd
	};
	// サーバーからデータを取得する
	$.ajax({
		type : 'GET',
		url : '/myFirstApp/ItemDetailServlet',
		dataType : 'json',
		data : requestQuery,
		success : function(data) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', data);
			// 取得したデータを画面に表示する
			$('#js-item-image').attr('src', data.url);
			$('#js-item-cd').html(data.itemCd);
			$('#js-item-name').html(data.itemName);
			$('#js-item-kana').html(data.itemNameKana);
			$('#js-item-price').html(data.salesPrice);
			$('#js-item-stock').html(data.stock + '個');
			$('#js-item-description').html(data.description);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
		}
	});
}
var getItem_name = function() {
	// 入力された商品名
	var inputItemName = $('#js-search-input-name').val();
	console.log(inputItemName);
	var requestQuery = {
		itemName : inputItemName
	};
	// サーバーからデータを取得する
	$.ajax({
		type : 'GET',
		url : '/myFirstApp/ItemSearchServlet',
		dataType : 'json',
		data : requestQuery,
		success : function(data) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', data);
			// 取得したデータを画面に表示する
			$('#js-item-image').attr('src', data.url);
			$('#js-item-cd').html(data.itemCd);
			$('#js-item-name').html(data.itemName);
			$('#js-item-kana').html(data.itemNameKana);
			$('#js-item-price').html(data.salesPrice);
			$('#js-item-stock').html(data.stock + '個');
			$('#js-item-description').html(data.description);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
		}
	});
}
$(document).ready(function() {
	// 画像にマウスオーバーイベント設定
	$('#js-item-image').mouseover(scalUpImage);
	$('#js-item-image').mouseout(scaldownImage);

	// 検索ボタンを押したときのイベント
	$('#js-search-button').click(getItem);
	$('#js-search-button-name').click(getItem_name);
});
