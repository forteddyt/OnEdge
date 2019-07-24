AstronautImgRight = new Image(); 
AstronautImgRight.src = 'images/astronautright.png'
AstronautImgLeft = new Image(); 
AstronautImgLeft.src = 'images/astronautleft.png'
AstronautImgDead = new Image(); 
AstronautImgDead.src = 'images/astronautdead.png'

function Player(game) {
	// Singleton
    if(Player.instance_){
        return Player.instance_
	}
	this.instance_ = this
	this.Game = game;
	this.Space = null;
	this.Platform = null;

	this.canvasCtx = null;
	this.canvas = null;
	
	this.charX = 0; //left bound of the character
	this.charY = 0;
	this.rightPressed = false; //true iff right keyboard was pressed
	this.leftPressed = false; //true iff left keyboard was pressed
	this.document = document;
	this.offEdge = false;
	this.nImage = 0;
	this.frameCount = 0;
	this.frameLoopCycle = 0;
	this.facingRight = false; 
	this.charWidth = 0
	this.charHeight = 0
	this.charSpeed = 0 /*default movement speed of the player per frame */

	this.init();
}

Player.prototype = {
	init: function(){
		this.space = this.Game.Space
		this.Platform = this.Game.Platform

		this.offEdge = false
		this.nImage = 0;
		this.frameCount = 0;
		this.frameLoopCycle = 5;
		this.facingRight = false; 
		this.charWidth = 32
		this.charHeight = 58
		this.charSpeed = 3 /*default movement speed of the player per frame */

		this.canvasCtx = this.Game.canvasCtx
		this.canvas = this.canvasCtx.canvas;
		this.charX = this.canvas.width / 2; //left bound of the character
		this.charY = this.canvas.height-this.charHeight-this.Platform.platformHeight;

		this.document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
		this.document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
		
		this.rightPressed = false; //true iff right keyboard was pressed
		this.leftPressed = false; //true iff left keyboard was pressed
	},

	//Input Handling
	keyDownHandler : function(e) {
		if (!this.Game.gameOver) {
			if (e.key == "Right" || e.key == "ArrowRight") {
				this.rightPressed = true;
				Player.c += 1;
			} else if (e.key == "Left" || e.key == "ArrowLeft") {
				this.leftPressed = true;
			}
		}
	},

	keyUpHandler : function(e) {
	    if(e.key == "Right" || e.key == "ArrowRight") {
	        this.rightPressed = false;
	    } else if (e.key == "Left" || e.key == "ArrowLeft") {
	        this.leftPressed = false;
	    }
	},

	update : function() {
		if (!this.Game.gameOver && this.rightPressed && this.charX < this.canvas.width-this.charWidth) {
	        this.charX += this.charSpeed;
	    } else if (!this.Game.gameOver && this.leftPressed && this.charX > 0) {
	        this.charX -= this.charSpeed;
		}

		if(this.checkStarCollisions(this.space.stars)){
			this.space.removeMeteors();
			this.space.removeStars();
			this.Game.Score.bonus += 100;
			this.Game.Score.addBonus = true;
			console.log("extra points");
		}

		if (!this.Game.gameOver){
			this.Game.gameOver = this.checkGameOverCollisions(this.space.meteors);
		}

		if (!this.Game.gameOver) {
			this.drawChar();
		}
	
	},

	getTouch : function(obj1,obj2){
		Obj1Center=[obj1.x+obj1.r, obj1.y+obj1.r];
		Obj2Center=[obj2.x+obj2.r,obj2.y+obj2.r];
	
		var distance=Math.sqrt(Math.pow(Obj2Center[0]-Obj1Center[0], 2) + Math.pow( Obj2Center[1]-Obj1Center[1], 2) );
		if(distance < (obj1.r+obj2.r)){
			return true;
			//console.log("circle touch");
		}
		else{
			return false;
		}
	},

	collide : function(x1, y1, w1, h1, r1, i1, i2, x2, y2, r2) {
		var circle1={x:x1+i1+r1, y:y1+i1+r1, r:r1};
		var circle2={x:x2+r2, y:y2+r2, r:r2};
		var rect={x:x1+i2, y:y1+0.8*i2, w:7*w1/16, h:h1-0.9*i2};

		var distX = Math.abs(circle2.x - rect.x-rect.w/2);
		var distY = Math.abs(circle2.y - rect.y-rect.h/2);

		// this.canvasCtx.beginPath();
		// this.canvasCtx.arc(circle2.x, circle2.y, circle2.r, 0, 2*Math.PI);
		// this.canvasCtx.strokeStyle =  "red";
        // this.canvasCtx.stroke();
		// this.canvasCtx.closePath();

		// this.canvasCtx.beginPath();
		// this.canvasCtx.arc(circle1.x, circle1.y, circle1.r, 0, 2*Math.PI);
		// this.canvasCtx.strokeStyle =  "blue";
        // this.canvasCtx.stroke();
		// this.canvasCtx.closePath();

		// this.canvasCtx.beginPath();
		// this.canvasCtx.rect(rect.x, rect.y, rect.w, rect.h);
		// this.canvasCtx.stroke();
		// this.canvasCtx.closePath();
		
		if(this.getTouch(circle1, circle2)){
			return true;
		}
		var dx=distX-rect.w/2;
		var dy=distY-rect.h/2;
		return (dx*dx+dy*dy<=(circle2.r*circle2.r));
	},

	checkGameOverCollisions : function(meteors, ismeteor) {
		for (i = 0; i < meteors.length; i++) {
			var radius = (meteors[i].imgWidth/4);
			var ycircle = meteors[i].yPos + meteors[i].imgHeight - (3*radius);
			var xcircle = meteors[i].xPos + radius;

			var indent = 3*this.charWidth/32;
			var astroRadius = 13*this.charWidth/32;
			var rectIndent = 9*this.charWidth/32;

			if(this.collide(this.charX, this.charY, this.charWidth, this.charHeight, astroRadius, indent, rectIndent, xcircle, ycircle, radius)){
				console.log("collide" + i);
				return true;
			} 
		}
		if (this.charX + (this.charWidth * 0.8) < this.Platform.platformX || this.charX + (this.charWidth * 0.2) > this.Platform.platformX + this.Platform.platformWidth) {
			//TODO add animation here for player falling off edge
			this.offEdge = true; 
			return true;
		}
		return false;
	},

	checkStarCollisions: function (stars) {
		for (i = 0; i < stars.length; i++) {
			var radius = 0.9*(stars[i].imgWidth/2);
			var ycircle = stars[i].yPos;
			var xcircle = stars[i].xPos;

			var indent = 3*this.charWidth/32;
			var astroRadius = 13*this.charWidth/32;
			var rectIndent = 9*this.charWidth/32;

			if(this.collide(this.charX, this.charY, this.charWidth, this.charHeight, astroRadius, indent, rectIndent, xcircle, ycircle, radius)){
				console.log("collide" + i);
				return true;
			}
		}
	},

	drawDeadChar : function(){
		if (this.offEdge){
			this.charY += .5
		}
		this.canvasCtx.drawImage(AstronautImgDead, 0, 0, this.charWidth, this.charHeight, this.charX, this.charY, this.charWidth, this.charHeight);
	},

	drawChar : function() {
    	// this.canvasCtx.beginPath();
    	// this.canvasCtx.rect(this.charX, this.charY, this.charWidth, this.charHeight);
    	// this.canvasCtx.fillStyle = "#0095DD";
    	// this.canvasCtx.fill();
		// this.canvasCtx.closePath();
		
		if (this.rightPressed){
			this.canvasCtx.drawImage(AstronautImgRight, this.nImage * this.charWidth, 0, this.charWidth, this.charHeight, this.charX, this.charY, this.charWidth, this.charHeight);
			this.facingRight = true; 
		}
		else if (this.leftPressed){
			this.canvasCtx.drawImage(AstronautImgLeft, this.nImage * this.charWidth, 0, this.charWidth, this.charHeight, this.charX, this.charY, this.charWidth, this.charHeight);
			this.facingRight = false; 
		}
		else if (this.facingRight){
			this.canvasCtx.drawImage(AstronautImgRight, this.charWidth, 0, this.charWidth, this.charHeight, this.charX, this.charY, this.charWidth, this.charHeight);
		}
		else if (!this.facingRight){
			this.canvasCtx.drawImage(AstronautImgLeft, this.charWidth, 0, this.charWidth, this.charHeight, this.charX, this.charY, this.charWidth, this.charHeight);
		}

		if (this.frameCount % this.frameLoopCycle == 0) {
            this.nImage++;
        }
        if (this.nImage > 3) {
            this.nImage = 0;
		}
		this.frameCount++; 
	},
	reset: function(){
		this.init()
	}
};