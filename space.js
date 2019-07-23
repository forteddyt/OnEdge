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
    },

    draw : function(){
        this.meteors.forEach(function(meteor){
            meteor.draw();
        })
    },

    spawnMeteor : function(){
        this.meteors.push(new Meteor(this.canvasCtx, this.instance_))
    },

    removeMeteor: function(targetMeteor){
        for (var i = 0; i < meteors.length; i++) {
            if (meteors[i] === targetMeteor) {
                meteors.splice(i,1);
            }
        }
    }
}