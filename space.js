PlanetImg = new Image();
PlanetImg.src = 'images/planet.png'
StarImg1 = new Image();
StarImg1.src = 'images/star1.png'
StarImg2 = new Image();
StarImg2.src = 'images/star2.png'

function Space(game){
    // Singleton
    if(Space.instance_){
        return Space.instance_;
    }
    this.Game = game;
    this.canvasCtx = null;
    this.meteors = [];
    this.stars = [];
    this.previousMeteorX = 0;
    this.framesPlayed = 0;

    this.planetSize = 180;
    this.star1Size = 24;
    this.star2Size = 35;
    this.instance_ = this;
    this.init()
}

Space.prototype = {
    init: function(){
        this.canvasCtx = this.Game.canvasCtx
        this.time = 0;
        this.meteors = [];
        this.stars = [];
        this.previousMeteorX = 0;
        this.framesPlayed = 0;
        this.update();

    },
    update : function(frameCount){

        if (!this.Game.gameOver) {
            this.framesPlayed = frameCount;
        }
        if (this.framesPlayed > 500) {
            this.canvasCtx.drawImage(StarImg1, 0, 0, this.star1Size, this.star1Size, 30, 40, this.star1Size * 0.8, this.star1Size * 0.8)
        }
        if (this.framesPlayed > 1000) {
            this.canvasCtx.drawImage(StarImg1, 0, 0, this.star1Size, this.star1Size, 150, 20, this.star1Size * 0.8, this.star1Size * 0.8)
        }
        if (this.framesPlayed > 1500) {
            this.canvasCtx.drawImage(StarImg1, 0, 0, this.star1Size, this.star1Size, 220, 70, this.star1Size * 0.8, this.star1Size * 0.8)
        }
        if (this.framesPlayed > 2000) {
            this.canvasCtx.drawImage(StarImg1, 0, 0, this.star1Size, this.star1Size, 40, 200, this.star1Size * 0.8, this.star1Size * 0.8)
        }
        if (this.framesPlayed > 2500) {
            this.canvasCtx.drawImage(StarImg1, 0, 0, this.star1Size, this.star1Size, 170, 180, this.star1Size * 0.8, this.star1Size * 0.8)
        }
        if (this.framesPlayed > 3000) {
            this.canvasCtx.drawImage(StarImg2, 0, 0, this.star2Size, this.star2Size, 420, 40, this.star2Size * 0.75, this.star2Size * 0.75)
        }
        if (this.framesPlayed > 3500) {
            this.canvasCtx.drawImage(StarImg2, 0, 0, this.star2Size, this.star2Size, 80, 100, this.star2Size * 0.75, this.star2Size * 0.75)
        }
        if (this.framesPlayed > 4000) {
            this.canvasCtx.drawImage(StarImg2, 0, 0, this.star2Size, this.star2Size, 300, 200, this.star2Size * 0.75, this.star2Size * 0.75)
        }
        if (this.framesPlayedt > 4500) {
            this.canvasCtx.drawImage(StarImg1, 0, 0, this.star1Size, this.star1Size, 400, 240, this.star1Size * 0.8, this.star1Size * 0.8)
        }
        if (this.framesPlayed > 5000) {
            this.canvasCtx.drawImage(PlanetImg, 0, 0, this.planetSize, this.planetSize, 270, 40, this.planetSize, this.planetSize);
        }

        if(!this.Game.gameOver && this.shouldSpawnMeteor(frameCount)) {
            this.spawnMeteor(frameCount);
        }

        if(!this.Game.gameOver && this.shouldSpawnStar(frameCount)) {
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
        var invFreq = Math.ceil(10 + 35/((frameCount + 1200)/1200));
        return (frameCount % invFreq == 0);
    },

    shouldSpawnStar: function(frameCount){
        //spawn rate of meteors increases asymptotically with time
        return (frameCount % 1000 == 0 && frameCount != 0);
    },

    spawnMeteor : function(frameCount){
        var rand = Math.random();
        if (frameCount < 1000) {
            if (rand < 0.25) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, -2, this.previousMeteorX));
            } else {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 0, this.previousMeteorX));
            }
        } else if (frameCount < 2500) {
            if (rand < 0.15) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, -2, this.previousMeteorX));
            } else if (rand < 0.35) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, -1, this.previousMeteorX));
            } else if (rand < 0.6) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 0, this.previousMeteorX));
            } else {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 1, this.previousMeteorX));
            }
        } else if (frameCount < 4500) {
            if (rand < 0.12) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, -2, this.previousMeteorX));
            } else if (rand < 0.20) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, -1, this.previousMeteorX));
            } else if (rand < 0.5) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 0, this.previousMeteorX));
            } else if (rand < 0.8) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 1, this.previousMeteorX));
            } else {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 2, this.previousMeteorX));
            }
        } else if (frameCount < 6000) {
            if (rand < 0.07) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, -2, this.previousMeteorX));
            } else if (rand < 0.25) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 0, this.previousMeteorX));
            } else if (rand < 0.5) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 1, this.previousMeteorX));
            } else if (rand < 0.75) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 2, this.previousMeteorX));
            } else {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 3, this.previousMeteorX));
            }
        } else if (frameCount < 6000) {
            if (rand < 0.07) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, -2, this.previousMeteorX));
            } else if (rand < 0.25) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 0, this.previousMeteorX));
            } else if (rand < 0.4) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 1, this.previousMeteorX));
            } else if (rand < 0.60) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 2, this.previousMeteorX));
            } else if (rand < 0.80) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 3, this.previousMeteorX));
            } else {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 4, this.previousMeteorX));
            }
        } else if (frameCount < 9000) {
            if (rand < 0.05) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, -2, this.previousMeteorX));
            } else if (rand < 0.20) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 0, this.previousMeteorX));
            } else if (rand < 0.35) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 1, this.previousMeteorX));
            } else if (rand < 0.55) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 2, this.previousMeteorX));
            } else if (rand < 0.75) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 3, this.previousMeteorX));
            } else if (rand < 0.85) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 4, this.previousMeteorX));
            } else {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 5, this.previousMeteorX));
            }
        } else if (frameCount < 12000) {
            if (rand < 0.10) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, -2, this.previousMeteorX));
            } else if (rand < 0.15) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 0, this.previousMeteorX));
            } else if (rand < 0.25) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 1, this.previousMeteorX));
            } else if (rand < 0.40) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 2, this.previousMeteorX));
            } else if (rand < 0.60) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 3, this.previousMeteorX));
            } else if (rand < 0.80) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 4, this.previousMeteorX));
            } else {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 5, this.previousMeteorX));
            }
        } else {
            if (rand < 0.5) {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 4, this.previousMeteorX));
            } else {
                this.meteors.push(new Meteor(this.canvasCtx, this.instance_, 3, this.previousMeteorX));
            }
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

    removeMeteors: function(){
        this.meteors = [];
    },

    removeStars: function(){
        this.stars = [];
    },

    removeMeteor: function(targetMeteor){
        for (var i = 0; i < this.meteors.length; i++) {
            if (this.meteors[i] === targetMeteor) {
                this.meteors.splice(i, 1);
            }
        } 
    },

    removeStar: function(targetStar){
        for (var i = 0; i < this.stars.length; i++) {
            if (this.stars[i] === targetStar) {
                this.stars.splice(i, 1);
            }
        }
    },

    reset: function(){
        this.init()
    }
}