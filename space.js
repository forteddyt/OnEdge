//TODO: import {MeteorImg} from 'meteor.js'

function Space(canvasCtx){
    // Singleton
    if(Space.instance_){
        return Space.instance_;
    }
    this.canvasCtx = canvasCtx
    this.meteors = [];

    this.instance_ = this;
    this.init()
}

Space.prototype = {
    init : function(){
        this.time = 0;
        this.update()
    },
    update : function(frameCount){
        if(frameCount % 20 == 0) {
            this.spawnMeteor();
        }

        this.meteors.forEach(function(meteor){
            meteor.update();
        })

        this.destroyMeteors();
    },

    draw : function(){
        this.meteors.forEach(function(meteor){
            meteor.draw();
        })
    },

    spawnMeteor : function(){
        this.meteors.push(new Meteor(this.canvasCtx))
    },

    destroyMeteors : function() {
        var i = 0;
        while (true) {
            if (this.meteors.length > i && this.meteors[i].yPos > canvas.height + 80) {//TODO FIGURE OUT IMAGE HEIGHT
                this.meteors.splice(i,1);
            } else if (i >= this.meteors.length) {
                break;
            } else {
                i += 1;
            }
        }
    }
}