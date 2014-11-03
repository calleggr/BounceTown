$(document).ready(function(){
	
	console.log("Loaded!");
	var gameBeingPlayed = true;
	var enemies = [];
	var hero = new MainC();
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,500,500);
	var count = 0;
	var numEnemies = 3;
	var timePassed = setInterval(function() {
		//Clear the canvas
		ctx.clearRect(0,0,500,500);
		
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
		
		
		//Check Collisions
		for(var i = 0;i<enemies.length;i++){
			var x1 = enemies[i].getX();
			var y1 = enemies[i].getY();
			var dx = x1 - hero.getX();
			var dy = y1 - hero.getY();
			var dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
			if(dist < (20)){
				//console.log("Collided!");
				//console.log(x1 + " , " + hero.getX());
				//console.log(y1 + " , " + hero.getY());
			}
		}
		//Basic kill function for now.
		count+=1;
		if((count%100 == 0) && (enemies.length < numEnemies)){
			enemies.push(new Enemy());
		}
		if(count == 100000){
			killInterval();
		}
	
	
	
	
	
	},10);
	
	console.log("Done with loop");
	
	
	
	function killInterval(){
		console.log("Kill got called");
		clearInterval(timePassed);
	
	}
	
	

	
	
	
	
	
	
	
	
	
	
	//Define main character class
	function MainC(){
		this.x = 250;
		this.y = 250;
		this.speed = 1;
		this.radius = 20;
		this.dx = 1;
		this.dy = 5;
		
		
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
		this.x = 100;
		this.y = 100;
		this.radius = 20;
		this.dx = 2;
		this.dy = 3;
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
	
	return;
});