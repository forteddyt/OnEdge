MeteorImg = new Image();
MeteorImg.src = 'images/meteor.png'
meteors = new Array()

function Meteor(canvasCtx, space){
    this.canvasCtx = canvasCtx
    this.xPos = 0;
    this.yPos = 0;
    this.dX = 0;
    this.dY = 0;

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
        this.xPos = Math.floor(Math.random() * (this.canvasCtx.canvas.width - 10) + 5);
        this.yPos = -this.imgSprite.height - 10; // Meteor should start off of the screen
        this.dX = Math.random() * 1.5 - .75;
        this.dY = Math.random() * 3;
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