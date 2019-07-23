MeteorImg = new Image();
MeteorImg.src = 'images/asteroid-png-8-bit.png'
meteors = new Array()

function Meteor(canvasCtx, space){
    this.canvasCtx = canvasCtx
    this.xPos = 0;
    this.yPos = 0;
    this.dX = 0;
    this.dY = 0;
    this.imgSprite = null;
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
        
        this.draw();
        meteors.push(this)
    },
    
    draw: function() {
        if(inCtxBounds(this.imgSprite, this.xPos, this.yPos, this.canvasCtx)){
            ctx.drawImage(this.imgSprite, this.xPos, this.yPos);
        }
    },

    update: function() {
        if(inCtxBounds(this.imgSprite, this.xPos, this.yPos, this.canvasCtx)){
            this.xPos += this.dX
            this.yPos += this.dY
        } else {
          this.space.removeMeteor(this);
        }
    }
}

function inCtxBounds(img, x, y, ctx){
    return x > 0 - img.width && x < ctx.canvas.width + img.width
        && y < ctx.canvas.height + img.height;
}