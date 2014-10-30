$(document).ready(function(){
	
	console.log("Loaded!");
	var gameBeingPlayed = true;
	var hero = new MainC();
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,500,500);
	var count = 0;
	var go = true;
	var timePassed = setInterval(function() {
		//console.log("draw");
		ctx.clearRect(0,0,500,500);
		ctx.fillStyle=hero.getColor();
		ctx.beginPath();
		ctx.arc(hero.getX(),hero.getY(),hero.diameter,0,2*Math.PI,true);
		ctx.fill();
		hero.move();
		//setTimeout(draw(),1000);
		//End draw hero
		count+=1;
		//console.log(count);
		if(count == 100000){
			killInterval();
		}
	
	
	
	
	
	},10);
	
	go = false;
	console.log("Done with loop");
	
	
	
	function killInterval(){
		console.log("Kill got called");
		clearInterval(timePassed);
	
	}
	
	
	
	
	
	
	
	//Draw things
	function draw(){
		
		
		
	}
	
	
	
	
	
	
	
	
	
	
	//Define main character class
	function MainC(){
		this.x = 250;
		this.y = 250;
		this.speed = 1;
		this.diameter = 20;
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
	
	return;
});