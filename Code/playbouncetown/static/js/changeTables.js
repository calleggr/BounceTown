$(document).ready(function(){
	
	var lastTF = document.getElementById('lasttf-table');
	var lastTen = document.getElementById('lastten-table');
	var topTF = document.getElementById('toptf-table');
	var topTen = document.getElementById('topten-table');
	var hilo = document.getElementById("hilo-table");
	var lohi = document.getElementById("lohi-table");
	
	$('#topten').click(function(){
		$(lastTF).addClass("hidden");
		$(lastTen).addClass("hidden");
		$(topTF).addClass("hidden");
		$(topTen).removeClass("hidden");
		$(hilo).addClass("hidden");
		$(lohi).addClass("hidden");
	});
	$('#toptf').click(function(){
		$(lastTF).addClass("hidden");
		$(lastTen).addClass("hidden");
		$(topTF).removeClass("hidden");
		$(topTen).addClass("hidden");
		$(hilo).addClass("hidden");
		$(lohi).addClass("hidden");
	});
	$('#hilo').click(function(){
		$(lastTF).addClass("hidden");
		$(lastTen).addClass("hidden");
		$(topTF).addClass("hidden");
		$(topTen).addClass("hidden");
		$(hilo).removeClass("hidden");
		$(lohi).addClass("hidden");
	});
	$('#lohi').click(function(){
		$(lastTF).addClass("hidden");
		$(lastTen).addClass("hidden");
		$(topTF).addClass("hidden");
		$(topTen).addClass("hidden");
		$(hilo).addClass("hidden");
		$(lohi).removeClass("hidden");
	});
	$('#lasttf').click(function(){
		$(lastTF).removeClass("hidden");
		$(lastTen).addClass("hidden");
		$(topTF).addClass("hidden");
		$(topTen).addClass("hidden");
		$(hilo).addClass("hidden");
		$(lohi).addClass("hidden");
	});
	$('#lastten').click(function(){
		$(lastTF).addClass("hidden");
		$(lastTen).removeClass("hidden");
		$(topTF).addClass("hidden");
		$(topTen).addClass("hidden");
		$(hilo).addClass("hidden");
		$(lohi).addClass("hidden");
	});
	
});