MeteorImg = new Image();
MeteorImg.src = 'images/meteor.png'
meteors = new Array()

function Meteor(canvasCtx, space, type, prevX){
    this.canvasCtx = canvasCtx
    this.xPos = 0;
    this.yPos = 0;
    this.dX = 0;
    this.dY = 0;
    this.type = type;
    this.prevX = prevX;

    this.nImage = 0;
    this.imgWidth = 40;
    this.imgHeight = 60;

    this.frameCount = 0;
    this.frameLoopCycle = 15;
    this.space = space;
    this.init()
}

Meteor.prototype = {
    init: function() {
        this.imgSprite = MeteorImg;

        //prevent 2 meteors from spawning together and make spawn distribution pseudo triangular with mean at center
        while (Math.abs(this.xPos - this.prevX) < 25 || this.xPos == 0) {
            this.xPos = Math.floor(Math.random() * (this.canvasCtx.canvas.width - 10) + 5);
            var xBias = Math.random() * (this.canvasCtx.canvas.width/4);
            this.xPos += this.xPos > this.canvasCtx.canvas.width/2 ? -xBias : xBias;
            //console.log(" " + this.xPos + " " + xBias);
        }   
        //console.log("final: " + this.xPos);

        this.yPos = -this.imgSprite.height - 10; // Meteor should start off of the screen
        if (this.type == 0) {
            this.dX = 0;
            this.dY = 2;
        } else if (this.type == 1) {
            this.dX = 0;
            this.dY = 4;
        } else if (this.type == 2) {
            this.dX = 0;
            this.dY = 5.5;
        } else if (this.type == 3) {
            this.dX = -1.5;
            this.dY = 2;
        }
        //this.dX = Math.random() * 1.5 - .75;
        //this.dY = Math.random() * 3;
        this.radius = this.imgWidth/4;
        this.draw();
        meteors.push(this)
    },
    
    draw: function() {
        // this.canvasCtx.beginPath();
        // this.canvasCtx.arc(this.xPos, this.yPos+this.imgHeight-(0.8*this.imgWidth), 0.8*(this.imgWidth/2), 0, 2 * Math.PI);
        // this.canvasCtxfillStyle = "#0095DD";
        // this.canvasCtx.fill();
        // this.canvasCtx.closePath();
        this.canvasCtx.drawImage(MeteorImg, this.nImage * this.imgWidth, 0, this.imgWidth, this.imgHeight, this.xPos, this.yPos, this.imgWidth, this.imgHeight);

        if (this.frameCount % this.frameLoopCycle == 0) {
            this.nImage++;
        }
        if (this.nImage > 3) {
            this.nImage = 0;
        }
    },

    update: function(frameCount) {
        this.frameCount = frameCount
        if(inCtxBounds(this.imgSprite, this.xPos, this.yPos, this.canvasCtx)){
            this.xPos += this.dX
            this.yPos += this.dY
            this.draw()
        } else {
            this.space.removeMeteor(this);
        }
    }
}

function inCtxBounds(img, x, y, ctx){
    return x > 0 - img.width && x < ctx.canvas.width + img.width
        && y < ctx.canvas.height + img.height;
}