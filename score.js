function Score(game){
    this.Game = game

    this.canvasCtx = null
    this.canvas = null

    this.scoreFlashDuration = 0;
    this.scoreFlashValue = 0;
    
    this.SCORE_FLASH_FRAMES = 240;
    this.SCORE_FLASH_SPEED = 30;

    this.score = 0;
    this.highScore = 0;
    this.bonus = 0;
    this.init()
}

Score.prototype = {
    init: function(){
        this.canvasCtx = this.Game.canvasCtx
        this.canvas = this.canvasCtx.canvas
        
        this.score = 0;
        this.bonus = 0;
    },
    draw: function(frameCount){
        this.score = this.bonus + Math.floor(frameCount/10);
        this.canvasCtx.font = "20px Monospace";
        this.canvasCtx.textAlign = "left";
        if (this.score == 100 || this.score == 250 || this.score == 500 || this.score == 750 || this.score == 1000 || this.score == 1500 || (this.score % 1000 == 0 && this.score > 0)) {
            this.scoreFlashDuration = this.SCORE_FLASH_FRAMES;
            this.scoreFlashValue = this.score;
        }
    
        if (this.scoreFlashDuration > 0) {
            this.scoreFlashDuration--;
            if (Math.floor(this.scoreFlashDuration / this.SCORE_FLASH_SPEED) % 2 == 1) {
                this.canvasCtx.fillText(this.scoreFlashValue, 10, 20);
            }
        } else {
            this.canvasCtx.fillText(this.score, 10, 20);
        }
        this.canvasCtx.textAlign = "right";
        this.canvasCtx.fillText("HI " + this.highScore, canvas.width - 10, 20)
    },
    update: function(frameCount){
        this.draw(frameCount)
    },
    reset: function(){
        this.init()
    },
    updateHighScore: function() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
    }
}