/* Namespace */
var rh = rh || {};
rh.bt = rh.bt || {};
rh.bt.home = rh.bt.home || {};

rh.bt.home.enableButtons = function() {
	$("#new-game-btn").click(function() {
		$('input[name=invited_player_email]').val("");
	    $('#new-game-modal').modal('show');
	});
};

/* main */
$(document).ready( function() {
	rh.bt.home.enableButtons();
});