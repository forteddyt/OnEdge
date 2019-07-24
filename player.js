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

	this.charWidth = 20
	this.charHeight = 30
	this.charSpeed = 3, /*default movement speed of the player per frame */

	this.init();
}

Player.prototype = {
	init: function(){
		this.space = this.Game.Space
		this.Platform = this.Game.Platform

		this.canvasCtx = this.Game.canvasCtx
		this.canvas = this.canvasCtx.canvas;
		this.charX = this.canvas.width / 2; //left bound of the character
		this.charY = this.canvas.height-this.charHeight-this.Platform.platformHeight;

		this.document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
		this.document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
	},

	//Input Handling
	keyDownHandler : function(e) {
	    if (e.key == "Right" || e.key == "ArrowRight") {
	        this.rightPressed = true;
	        Player.c += 1;
	    } else if (e.key == "Left" || e.key == "ArrowLeft") {
	        this.leftPressed = true;
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
		if (this.rightPressed && this.charX < this.canvas.width-this.charWidth) {
	        this.charX += this.charSpeed;
	    } else if (this.leftPressed && this.charX > 0) {
	        this.charX -= this.charSpeed;
		}
		this.Game.gameOver = this.checkCollisions(this.space.meteors);

		this.drawChar();
	},

	collide : function(x1, y1, w1, h1, x2, y2, r1) {
		var circle={x:x2, y:y2, r:r1};
		var rect={x:x1, y:y1, w:w1, h:h1};

		var distX = Math.abs(circle.x - rect.x-rect.w/2);
    	var distY = Math.abs(circle.y - rect.y-rect.h/2);

    	if (distX > (rect.w/2 + circle.r)) { return false; }
    	if (distY > (rect.h/2 + circle.r)) { return false; }

		if (distX <= (rect.w/2)) { 
			return true; 
			console.log("collision");
		} 
		if (distY <= (rect.h/2)) { 
			return true; 
			console.log("collision");
		}
		var dx=distX-rect.w/2;
		var dy=distY-rect.h/2;
		return (dx*dx+dy*dy<=(circle.r*circle.r));

		//TODO figure out the bounding box issues with the meteors
	},

	checkCollisions : function(meteors) {
		for (i = 0; i < meteors.length; i++) {
			//console.log("x= "+ meteors[i].xPos + " y=" + meteors[i].yPos);
			var radius = (meteors[i].imgWidth/4);
			var xcircle = meteors[i].xPos + radius;
			var ycircle = meteors[i].yPos + meteors[i].imgHeight - meteors[i].imgWidth;
			if(this.collide(this.charX, this.charY, this.charWidth, this.charHeight, xcircle, ycircle, radius)){
				console.log("collide" + i);
				return true;
			}
		}
		if (this.charX + (this.charWidth * 0.8) < this.Platform.platformX || this.charX + (this.charWidth * 0.2) > this.Platform.platformX + this.Platform.platformWidth) {
			console.log("off the edge");
			//TODO add animation here for player falling off edge
			return true;
		}
		return false;
	},

	drawChar : function() {
    	this.canvasCtx.beginPath();
    	this.canvasCtx.rect(this.charX, this.charY, this.charWidth, this.charHeight);
    	this.canvasCtx.fillStyle = "#0095DD";
    	this.canvasCtx.fill();
    	this.canvasCtx.closePath();
	}
};