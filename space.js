function Space(game){
    // Singleton
    if(Space.instance_){
        return Space.instance_;
    }
    this.Game = game
    this.canvasCtx = null
    this.meteors = [];

    this.instance_ = this;
    this.init()
}

Space.prototype = {
    init: function(){
        this.canvasCtx = this.Game.canvasCtx
        this.time = 0;
        this.update()
    },
    update: function(frameCount){
        if(frameCount % 20 == 0) {
            this.spawnMeteor();
        }

        this.meteors.forEach(function(meteor){
            meteor.update();
        })
    },
    spawnMeteor: function(){
        this.meteors.push(new Meteor(this.canvasCtx, this.instance_))
    },
    removeMeteor: function(targetMeteor){
      this.meteors = this.meteors.filter(currentMeteor => {
        return currentMeteor !== targetMeteor;
      });
    }
}