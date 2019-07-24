function Space(game){
    // Singleton
    if(Space.instance_){
        return Space.instance_;
    }
    this.Game = game
    this.canvasCtx = null
    this.meteors = [];
    this.stars = [];
    this.previousMeteorX = 0;

    this.instance_ = this;
    this.init()
}

Space.prototype = {
    init: function(){
        this.canvasCtx = this.Game.canvasCtx
        this.time = 0;
        this.update()
    },
    update : function(frameCount){
        if(this.shouldSpawnMeteor(frameCount)) {
            this.spawnMeteor(frameCount);
        }

        if(this.shouldSpawnStar(frameCount)) {
            this.spawnStar(frameCount);
        }

        this.meteors.forEach(function(meteor){
            meteor.update(frameCount);
        })

        this.stars.forEach(function(star){
            star.update(frameCount);
        })
    },

    draw : function(){
        this.meteors.forEach(function(meteor){
            meteor.draw();
        })
    },

    shouldSpawnMeteor: function(frameCount){
        //spawn rate of meteors increases asymptotically with time
        var invFreq = Math.ceil(10 + 50/((frameCount + 1500)/1500));
        if (frameCount % invFreq == 0) {
            return true;
        } else {
            return false;
        }
    },

    shouldSpawnStar: function(frameCount){
        //spawn rate of meteors increases asymptotically with time
        if (frameCount % 500 == 0) {
            return true;
        } else {
            return false;
        }
    },

    spawnMeteor : function(frameCount){
        var rand = Math.random();
        if (frameCount < 1000) {
            this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 0, this.previousMeteorX));
        } else if (frameCount < 3000) {
            if (rand < 0.5) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 0, this.previousMeteorX));
            } else {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 1, this.previousMeteorX));
            }
        } else if (frameCount < 5000) {
            if (rand < 0.4) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 0, this.previousMeteorX));
            } else if (rand < 0.8) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 1, this.previousMeteorX));
            } else {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 2, this.previousMeteorX));
            }
        } else if (frameCount < 7000) {
            if (rand < 0.25) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 0, this.previousMeteorX));
            } else if (rand < 0.5) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 1, this.previousMeteorX));
            } else if (rand < 0.75) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 2, this.previousMeteorX));
            } else {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 3, this.previousMeteorX));
            }
        } else {
            this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 0));
        }
        this.previousMeteorX = this.meteors[this.meteors.length-1].xPos;
    },

    spawnStar : function(frameCount){
        var rand = Math.random();
        if (frameCount < 1000) {
            this.stars.push(new Star(this.canvasCtx, this.instance_, 0));
        } else if (frameCount < 3000) {
            if (rand < 0.5) {
                this.stars.push(new Star(this.canvasCtx, this.instance_, 0));
            } else {
                this.stars.push(new Star(this.canvasCtx, this.instance_, 1));
            }
        } else {
            if (rand < 0.3) {
                this.stars.push(new Star(this.canvasCtx, this.instance_, 0));
            } else {
                this.stars.push(new Star(this.canvasCtx, this.instance_, 1));
            }
        }
    },

    removeMeteor: function(targetMeteor){
        for (var i = 0; i < meteors.length; i++) {
            if (meteors[i] === targetMeteor) {
                meteors.splice(i, 1);
            }
        } 
    },

    removeStar: function(targetStar){
        for (var i = 0; i < stars.length; i++) {
            if (stars[i] === targetStar) {
                stars.splice(i, 1);
            }
        }
    }
}