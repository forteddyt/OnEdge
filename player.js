


function Player(canvas, document) {

	this.canvas = canvas;
	this.charX = canvas.width / 2; //left bound of the character
	this.rightPressed = false; //true iff right keyboard was pressed
	this.leftPressed = false; //true iff left keyboard was pressed

	this.document = document;
	Player.c = 0;
	this.init();
}

Player.prototype = {
	init: function(){
		this.document.addEventListener("keydown", this.keyDownHandler, false);
		this.document.addEventListener("keyup", this.keyUpHandler, false);
	},

	//Input Handling
	keyDownHandler : function(e) {
	    if (e.key == "Right" || e.key == "ArrowRight") {
	    	console.log("REEEE");
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

	moveCharacter : function() {
		console.log(this.rightPressed + " " + this.leftPressed + Player.c);
		if (this.rightPressed && this.charX < this.canvas.width-Consts.charWidth) {
	        this.charX += Consts.charSpeed;
	    } else if (this.leftPressed && this.charX > 0) {
	        this.charX -= Consts.charSpeed;
	    }
	},

	checkCollisions : function(meteors) {
		for (i = 0; i < meteors.length; i++) {
			if (this.charX < meteors[i].x &&
				meteors[i].x < this.charX + Consts.charWidth &&
				meteors[i].y >= canvas.height - (Consts.charHeight + Consts.platformHeight) && 
				meteors[i].y < canvas.height - Consts.platformHeight) {
				return true;
			}
		}
		return false;
	},

	drawChar : function(ctx) {
    	ctx.beginPath();
    	ctx.rect(this.charX, this.canvas.height-Consts.charHeight-Consts.platformHeight, Consts.charWidth, Consts.charHeight);
    	ctx.fillStyle = "#0095DD";
    	ctx.fill();
    	ctx.closePath();
	}
};