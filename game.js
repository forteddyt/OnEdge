var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");

function Game(canvasCtx){
    if(Game.instance_){
        return Game.instance_;
    }
    this.instance_ = this;

    this.canvasCtx = canvasCtx;
    this.document = document;

    this.updatePending = false;
    this.rafId = 0;
    this.time = 0;
    this.runningTime = 0;

    this.frames = 0;

    this.Space = null;
    this.Platform = null;
    this.Player = null;
    this.Score = null;
    this.gameOver = false;
    this.keyUp = true;

    this.init()
}

Game.prototype = {
    init : function() {
        this.Space = new Space(this.instance_)
        this.Platform = new Platform(this.instance_)
        this.Player = new Player(this.instance_)
        this.Score = new Score(this.instance_)

        // setInterval(() => {console.log(this.frames)}, 1000)
        this.update();        
    },
    update: function(){
        this.updatePending = false;
        
        if(!this.gameOver){
            this.clearCanvas()
            var now = getTimeStamp();
            var deltaTime = now - (this.time || now);

            this.time = now;
            this.runningTime += deltaTime

            this.frames += 1;
            this.Score.updateHighScore();

            this.Space.update(this.frames)
            this.Platform.update(this.frames)
            this.Player.update()
            this.Score.update(this.frames)
        }
        else {
            this.endGameGUI();
        }
        this.scheduleNextUpdate()
    },
    scheduleNextUpdate: function(){
        if(!this.updatePending){
            this.updatePending = true;
            this.rafId = requestAnimationFrame(this.update.bind(this));
        }
    },
    clearCanvas: function() {
        this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
    },
    restartGame: function() {
        //todo     
    },
    //Game Controllers

    endGameGUI: function() {
        var canvas = this.canvasCtx.canvas
        var midWidth = canvas.width/2;
        var midHeight = canvas.height/2;
        var buttonWidth = canvas.width*2/5;
        var buttonHeight = canvas.width/9;

        //rect
        this.canvasCtx.beginPath();

        this.canvasCtx.rect(midWidth - buttonWidth/2, midHeight * 5 / 4 - buttonHeight*2/3, buttonWidth, buttonHeight);
        this.canvasCtx.fillStyle = "#e0e0e0";
        this.canvasCtx.fill();
        this.canvasCtx.strokeStyle =  "#b5b3b3";
        this.canvasCtx.stroke();

        // this.canvasCtx.rect(midWidth - gameOverWidth/2, midHeight - gameOverHeight*2/3, gameOverWidth, gameOverHeight);
        // this.canvasCtx.fillStyle = "#eee";
        // this.canvasCtx.fill();

        this.canvasCtx.closePath();

        //text
        this.canvasCtx.fillStyle = "#5A5A5A";
        this.canvasCtx.font = "bold 50px Monospace";
        this.canvasCtx.textAlign = "center";
        this.canvasCtx.fillText("GAME OVER", midWidth, midHeight * 3 / 4);

        this.canvasCtx.font = "bold 30px Monospace";
        this.canvasCtx.fillText("PLAY AGAIN", midWidth, 5 * midHeight / 4);

        //character
        this.Player.drawDeadChar(); 
        // this.Score.update(this.frames)        
        
    },
    restart: function() {
        this.frames = 0
        this.gameOver = false;
     
        this.Space.reset()
        this.Player.reset()
        this.Score.reset()
    }
}

function getTimeStamp(){
    return new Date().getTime()
}