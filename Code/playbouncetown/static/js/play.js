$(document).ready(function(){

	/*Known Bugs:
	-If you start a line, drag outside, then release, the line is invincible? It won't erase.
	*/
	
	
	//Number of points on the line (is fine where it is, increase for even more accuracy at performance price)
	var numPointsOnLine = 100;
	//Define the enemies array
	var enemies = [];
	//The game is updated every 'gameSpeed' seconds. Probably could just keep this where it is.
	var gameSpeed = 20;
	//Define the main character
	var hero = new MainC();
	//Get the context of the canvas and clear it
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	
	//Tells us if a game is in play or not.
	var gameInPlay = true;
	//Decides when to make a new enemy, and the score.
	var count = 0;
	var score = 0;
	//Max number of enemies on the screen at once
	var numEnemies = 4;
	//Are we in the process of drawing a line (basically the mouse is down and is moving)
	var lineBeingDrawn=false;
	var line = new Line();
	//Get the offsets. useful for drawing the line
	var offsets = document.getElementById('canvas').getBoundingClientRect();
	var top = offsets.top;
	var left = offsets.left;
	ctx.clearRect(top,left,500,500);
	
	var enemyTimer = 166; //Multiply by 20 to get the milliseconds it takes to make an enemy.
	
	//If the mouse is being moved WHILE HELD DOWN, draw the line.
	$('canvas').mousemove(function(e){
		if(e.which == 1){
			if(!lineBeingDrawn){
				if(!line.finished){
					line.p1x = e.pageX-left;
					line.p1y = e.pageY-top;
					line.p2x = line.p1x;
					line.p2y = line.p1y;
					lineBeingDrawn = true;
				}
			}else{
				if(!line.finished){
					line.p2x = (e.pageX-left);
					line.p2y = (e.pageY-top);
					
				}
			}
		}
	});
	
	$(document).mouseup(function(e){
		console.log(lineBeingDrawn);
		if(lineBeingDrawn){
			//Are we in the x and y confines of the canvas?
			var inX = (e.pageX < (left+500)) && (e.pageX > (left));
			var inY = (e.pageY < (top + 500)) && (e.pageY > top);
			
			//If we aren't, clear the line.
			if((!(inX && inY)) || line.getDistance() < 20){
				line.clear();
				lineBeingDrawn = false;
				
			//If we are, the line is done.
			}else{
				line.finished = true;
				lineBeingDrawn = false;
				line.createPoints();
			}
		}
	});
	
	var timePassed = 0;
	playGame();
	function playGame(){
		sleep(1000);
		timePassed = setInterval(function() {
		//Clear the canvas
		ctx.clearRect(0,0,500,500);
		
		ctx.fillStyle = "#d8d8d8";
		ctx.font = "bold 70px Arial";
		ctx.fillText(""+Math.round(score*10)/10,375,475);
		//Draw the line
		ctx.beginPath();
		ctx.moveTo(line.getP1x(),line.getP1y());
		ctx.lineTo(line.getP2x(),line.getP2y());
		ctx.stroke();
		//End draw line
		
		//Draw the hero
		ctx.fillStyle=hero.getColor();
		ctx.beginPath();
		ctx.arc(hero.getX(),hero.getY(),hero.radius,0,2*Math.PI,true);
		ctx.fill();
		//End draw hero
		
		//Draw enemies
		for(var i = 0; i< enemies.length;i++){
			ctx.fillStyle = enemies[i].getColor();
			ctx.beginPath();
			ctx.arc(enemies[i].getX(),enemies[i].getY(),enemies[i].radius,0,2*Math.PI,true);
			ctx.fill();
			enemies[i].move();
		}
		//End draw enemies
		
		//Move the hero
		hero.move();
		
		//Check line collision
		if(line.finished){
			for(var i = 0;i<numPointsOnLine;i++){
				var dxline = Math.abs(line.xPoints[i]-hero.getX());
				var dyline = Math.abs(line.yPoints[i]-hero.getY());
				var dist = Math.sqrt(Math.pow(dxline,2) + Math.pow(dyline,2));
				
				if(dist < (hero.radius)){
					//console.log("Collided");
					hero.collideWithLine(line);
					line.clear();
					i = enemies.length;
					break;
				}
			}
		}
		
		//Check enemy collisions
		for(var i = 0;i<enemies.length;i++){
			var x1 = enemies[i].getX();
			var y1 = enemies[i].getY();
			var dx = x1 - hero.getX();
			var dy = y1 - hero.getY();
			var dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
			if(dist < (hero.radius + enemies[i].radius)){
				killInterval();
				break;
			}
		}
		//Basic kill function for now.
		score+=gameSpeed/1000;
		count+=1;
		//Make a new enemy
		if(((count%enemyTimer == 0) && (enemies.length < numEnemies)) || (score > 20 && enemies.length <= numEnemies) || (score > 40 && enemies.length <= numEnemies+1)){
			enemies.push(new Enemy());
		}
	
	
	
	
	
	},gameSpeed);
	}
	
	
	
	function killInterval(){
		gameInPlay = false;
		clearInterval(timePassed);
		ctx.clearRect(0,0,500,500);
		clearCharacters();
		ctx.fillStyle = "red";
		ctx.font = "bold 16px Arial";
		ctx.fillText("You lose! Game will restart in 1 second.",115,230);
		ctx.fillStyle = "blue";
		ctx.font = "italic 16px Arial";
		ctx.fillText("Your Score: " + Math.round(score*10)/10,215,250);
		//$('#score').html(Math.round(score));
		console.log(Math.round(score));
		$('#new_score').val(Math.round(score));
		$('#btn-submit-score').click();
		
	}
	


	function sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds) {
				break;
			}
		}
	}
	
	function clearCharacters(){
		this.hero = null;
		this.enemies = [];
		this.line = null;
	}
	
	window.onkeyup = function(e){
		var key = e.keyCode ? e.keyCode : e.which;
		//console.log(key);
		if(key == 80){
			location.reload();
		}
		
		if(key == 75){
			if(gameInPlay){
				killInterval();
			}
		}
	
	
	}
	
	

	
	
	
	
	
	
	
	
	
	
	//Define main character class
	function MainC(){
		this.x = 250;
		this.y = 250;
		this.speed = 1;
		this.radius = 20;
		this.dx = 1;
		this.dy = 2;
		
		
		this.move = function(){
			this.x+=this.dx;
			this.y+=this.dy;
			if((this.x > 480) || (this.x < 20)){
				this.dx*=-1;
			}
			if((this.y > 480) || (this.y < 20)){
				this.dy*=-1;
			}
		}
		
		this.collideWithLine = function(line){
			this.speed = Math.sqrt(Math.pow(this.dx,2) + Math.pow(this.dy,2));
			//Calculate the visual angle of the hero
			var heroAngle = Math.atan2(-this.dy,this.dx);
			heroAngle = heroAngle * (180/Math.PI);
			if(heroAngle > 360){
				heroAngle -= 360;
			}else if(heroAngle < 0){
				heroAngle += 360;
			}
			
			//Calculate the visual angle of the line
			var lineAngle = Math.atan2(-line.dy,line.dx);
			lineAngle = lineAngle * (180/Math.PI);
			if(lineAngle > 360){
				lineAngle -= 360;
			}else if(lineAngle < 0){
				lineAngle += 360;
			}
			
			
			//Calculate the visual normal angle
			var normalAngle = lineAngle + 90;
			if(normalAngle > 360){
				normalAngle -= 360;
			}else if(normalAngle < 0){
				normalAngle += 360;
			}
			
			
			var newHeroAngle = 2*normalAngle - heroAngle - 180;
			if(newHeroAngle > 360){
				newHeroAngle -= 360;
			}else if(newHeroAngle < 0){
				newHeroAngle +=360;
			}
			
			//Convert to dx and dy. dy needs to be flipped and both need to be in radians, not degrees.
			this.dx = this.speed * Math.cos((newHeroAngle*Math.PI/180));
			this.dy = -1*this.speed*Math.sin(newHeroAngle*Math.PI/180);
			
		}
	
		this.getColor = function(){
			return "#013ADF";
		}
		
		this.getX = function(){
			return this.x;
		}
		
		this.getY = function(){
			return this.y;
		}
	}
	
	//Define enemy class
	function Enemy(){
		this.x = Math.round((400*Math.random()+50));
		this.y = Math.round((400*Math.random()+50));
		this.radius = 20;
		this.dx = Math.round(Math.random() + 1);
		this.dy = (this.dx == 2 ? 1:2);
		console.log("Enemy stats: " + this.dx + " / " + this.dy);
		this.colorCounter = 0;
		this.color = "#000000";
		
		this.move = function(){
			this.colorCounter++;
			if(this.colorCounter == 50){
				this.changeColor();
				this.colorCounter = 0;
			}
			this.x+=this.dx;
			this.y+=this.dy;
			if((this.x > 480) || (this.x < 20)){
				this.dx*=-1;
			}
			if((this.y > 480) || (this.y < 20)){
				this.dy*=-1;
			}
		}
		
	
	
		this.getColor = function(){
			return this.color;
		}
		
		this.getX = function(){
			return this.x;
		}
		
		this.getY = function(){
			return this.y;
		}
		this.changeColor = function(){
			if(this.color == "#000000"){
				this.color = "#FF0000";
			}else{
				this.color = "#000000";
			}
			
		}
	}
	
	//Define the line class
	function Line(){
		this.p1x = 0;
		this.p1y = 0;
		this.p2x = 0;
		this.p2y = 0;
		this.finished = false;
		this.color = "#FF0000";
		this.finishedColor = "#66FF00";
		this.xPoints = [];
		this.yPoints = [];
		this.dx = 0;
		this.dy = 0;
		
		this.createPoints = function(){
			var dx = (this.p2x - this.p1x)/numPointsOnLine;
			var dy = (this.p2y - this.p1y)/numPointsOnLine;
			this.dx = dx;
			this.dy = dy;
			var slope = dy/dx;
			for(var i = 0;i<numPointsOnLine;i++){
				this.xPoints.push((i*dx)+this.p1x);
				this.yPoints.push((i*dy)+this.p1y);
			}

		}
		
		this.getDistance = function(){
			var dx = this.p2x - this.p1x;
			var dy = this.p2y - this.p1y;
			return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
		}
		
		//Set the first point
		this.setP1 = function(newP1){
			this.p1 = newP1;
		}
		//Set the second point
		this.setP2 = function(newP2){
			this.p2 = newP2;
		}
		//Get the first x point
		this.getP1x = function(){
			return this.p1x;
		}
		//Get the second x point
		this.getP2x = function(){
			return this.p2x;
		}
		//Get the first y point
		this.getP1y = function(){
			return this.p1y;
		}
		//Get the second y point
		this.getP2y = function(){
			return this.p2y;
		}
		//Get the color
		this.getColor = function(){
			if(this.finished){
				return this.finishedColor;
			}else{
				return this.color;
			}
		}
		//Clear the line
		this.clear = function(){
			this.xPoints = [];
			this.yPoints = [];
			this.p1x = 0;
			this.p1y = 0;
			this.p2x = 0;
			this.p2y = 0;
			this.finished = false;
			this.dx = 0;
			this.dy = 0;
		}
	
	}
	return;
});