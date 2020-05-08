var header = function() {
	var a;
		a = '<a href="./syainzyouhou.html">社員一覧</a>'
				+ '<a href="./department.html">部署一覧</a>'
				+ '<a href="./Expense.html">経費一覧</a>'
				+ '<a href="./expenseRegist.html">経費申請</a>'

	$('#header').append(a);
}
$(document).ready(function() {
	header();

});