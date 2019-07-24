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

	this.nImage = 0;
	this.frameCount = 0;
	this.frameLoopCycle = 5;
	this.facingRight = false; 
	this.charWidth = 32
	this.charHeight = 58
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
		var circle={x:x2+3*(r1/4), y:y2+3*(r1/4), r:r1};
		var rect={x:x1, y:y1, w:w1, h:h1};

		this.canvasCtx.beginPath();
        this.canvasCtx.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI);
        this.canvasCtx.stroke();
		this.canvasCtx.closePath();
		
		this.canvasCtx.beginPath();
        this.canvasCtx.rect(rect.x, rect.y, rect.w, rect.h);
        this.canvasCtx.stroke();
		this.canvasCtx.closePath();

		var distX = Math.abs(circle.x - rect.x-rect.w/2);
    	var distY = Math.abs(circle.y - rect.y-rect.h/2);

    	if (distX > (rect.w/2 + circle.r)) { return false; }
    	if (distY > (rect.h/2 + circle.r)) { return false; }

		if (distX <= (rect.w/2)) { 
			return true; 
		} 
		if (distY <= (rect.h/2)) { 
			return true; 
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
			var ycircle = meteors[i].yPos + meteors[i].imgHeight - (3*radius);
			if(this.collide(this.charX, this.charY, this.charWidth, this.charHeight, xcircle, ycircle, radius)){
				return true;
			}
		}
		if (this.charX + (this.charWidth * 0.8) < this.Platform.platformX || this.charX + (this.charWidth * 0.2) > this.Platform.platformX + this.Platform.platformWidth) {
			//TODO add animation here for player falling off edge
			return true;
		}
		return false;
	},

	drawDeadChar : function(){
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
		else{
			this.canvasCtx.drawImage(AstronautImgLeft, this.charWidth, 0, this.charWidth, this.charHeight, this.charX, this.charY, this.charWidth, this.charHeight);
		}

		if (this.frameCount % this.frameLoopCycle == 0) {
            this.nImage++;
        }
        if (this.nImage > 3) {
            this.nImage = 0;
		}
		this.frameCount++; 
	}
};