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

    this.Space = null;
    this.Platform = null;
    this.Player = null;

    this.init()
}

Game.prototype = {
    init: function(){
        this.Space = new Space(this.instance_)
        this.Platform = new Platform(this.instance_)
        this.Player = new Player(this.instance_)

        this.update();
    },
    update: function(){
        this.updatePending = false;

        this.clearCanvas()
        var now = getTimeStamp();
        var deltaTime = now - (this.time || now);

        this.time = now;
        this.runningTime += deltaTime

        this.Space.update(this.runningTime)
        this.Platform.update()
        this.Player.update()

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
    }
}

function getTimeStamp(){
    return new Date().getTime()
}