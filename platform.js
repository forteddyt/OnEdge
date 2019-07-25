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

	this.platformHeight = 18
    this.platformWidth = 300
    this.platformX = 0
    this.platformY = 0
    
    this.init()
}

Platform.prototype = {
    init: function(){
        this.canvasCtx = this.Game.canvasCtx
        this.canvas = this.canvasCtx.canvas

        this.platformX =  (this.canvas.width / 5)  /*left bound of the platform  */
        this.platformY = this.canvas.height - this.platformHeight
        },
    draw: function(){
        this.canvasCtx.drawImage(PlatformImg, this.platformX, this.platformY, this.platformWidth, this.platformHeight);
    },
    update: function(){
        this.draw()
    }
}