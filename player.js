


function Player(canvasCtx, document, space) {
	this.canvasCtx = canvasCtx;
	this.canvas = null;
	this.space = space;
	this.charX = 0; //left bound of the character
	this.rightPressed = false; //true iff right keyboard was pressed
	this.leftPressed = false; //true iff left keyboard was pressed
	this.document = document;

	this.charWidth = 20
	this.charHeight = 30
	this.charSpeed = 3, /*default movement speed of the player per frame */
	this.platformHeight = 10

	this.init();
}

Player.prototype = {
	init: function(){
		this.canvas = this.canvasCtx.canvas;
		this.charX = this.canvas.width / 2; //left bound of the character

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
		this.checkCollisions(this.space.meteors)

		this.drawChar();
	},

	checkCollisions : function(meteors) {
		for (i = 0; i < meteors.length; i++) {
			if (this.charX < meteors[i].xPos &&
				meteors[i].xPos < this.charX + this.charWidth &&
				meteors[i].yPos >= canvas.height - (this.charHeight + this.platformHeight) && 
				meteors[i].yPos < canvas.height - this.platformHeight) {
				return true;
			}
		}
		if (this.charX + this.charWidth < this.platformX || this.charX > this.platformX + this.platformWidth) {
			return true;
		}
		return false;
	},

	drawChar : function() {
    	this.canvasCtx.beginPath();
    	this.canvasCtx.rect(this.charX, this.canvas.height-this.charHeight-this.platformHeight, this.charWidth, this.charHeight);
    	this.canvasCtx.fillStyle = "#0095DD";
    	this.canvasCtx.fill();
    	this.canvasCtx.closePath();
	}
};