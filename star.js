StarImg = new Image();
StarImg.src = 'images/star.png'
stars = new Array()

function Star(canvasCtx, space, type, prevX){
    this.canvasCtx = canvasCtx
    this.xPos = 0;
    this.yPos = 0;
    this.dX = 0;
    this.dY = 0;
    this.type = type;
    this.prevX = prevX;

    this.nImage = 0;
    this.imgWidth = 38;
    this.imgHeight = 38;
    this.imgScale = 1; 

    this.frameCount = 0;
    this.frameLoopCycle = 10;
    this.space = space;
    this.init()
}

Star.prototype = {
    init: function() {
        this.imgSprite = StarImg;

        this.xPos = Math.floor(Math.random() * (this.canvasCtx.canvas.width*3/5) + this.canvasCtx.canvas.width/5);

        this.yPos = -this.imgSprite.height - 10; // star should start off of the screen
        this.dY = this.type == 0 ? 1 : 2;
        this.radius = this.imgWidth/4;

        this.draw();
        stars.push(this)
    },
    
    draw: function() {
        // this.canvasCtx.beginPath();
        // this.canvasCtx.arc(this.xPos, this.yPos+this.imgHeight-(0.8*this.imgWidth), 0.8*(this.imgWidth/2), 0, 2 * Math.PI);
        // this.canvasCtxfillStyle = "#0095DD";
        // this.canvasCtx.fill();
        // this.canvasCtx.closePath();
        this.canvasCtx.drawImage(StarImg, this.nImage * this.imgWidth, 0, this.imgWidth, this.imgHeight, this.xPos, this.yPos, this.imgScale * this.imgWidth, this.imgScale * this.imgHeight);

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
            this.space.removeStar(this);
        }
    }
}

function inCtxBounds(img, x, y, ctx){
    return x > 0 - img.width && x < ctx.canvas.width + img.width
        && y < ctx.canvas.height + img.height;
}