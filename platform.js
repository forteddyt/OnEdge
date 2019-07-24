PlatformImg = new Image();
PlatformImg.src = 'images/platform.png'

function Platform(game){
    // Singleton
    if(Platform.instance_){
        return Platform.instance_
    }
    this.instance_ = this
    this.Game = game

    this.canvasCtx = null
    this.canvas = null

	this.platformHeight = 0
    this.platformWidth = 0
    this.platformX = 0
    this.platformY = 0
    
    this.init()
}

Platform.prototype = {
    init: function(){
        this.canvasCtx = this.Game.canvasCtx
        this.canvas = this.canvasCtx.canvas

        this.platformHeight = 16       
        this.platformWidth = this.canvas.width * 1 / 2

        this.platformX =  (this.canvas.width - this.canvas.width * 1 / 2) / 2 /*left bound of the platform  */
        this.platformY = this.canvas.height - this.platformHeight
        },
    draw: function(){
        // this.canvasCtx.beginPath();
        // this.canvasCtx.rect(this.platformX, this.canvas.height - this.platformHeight, this.platformWidth, this.platformHeight);
        // this.canvasCtxfillStyle = "#0095DD";
        // this.canvasCtx.fill();
        // this.canvasCtx.closePath();
        this.canvasCtx.drawImage(PlatformImg, this.platformX, this.platformY, this.platformWidth, this.platformHeight);
    },
    update: function(){
        this.draw()
    }
}