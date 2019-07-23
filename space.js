function Space(canvasCtx){
    // Singleton
    if(Space.instance_){
        return Space.instance_;
    }

    this.canvasCtx = canvasCtx
    this.lastSpawnTime = 0;

    this.meteors = [];

    this.instance_ = this;
    this.init()
}

Space.prototype = {
    init: function(){
        this.time = 0;
        this.update()
    },
    update: function(runningTime){
        if(runningTime - this.lastSpawnTime > 750) {
            this.spawnMeteor()
            this.lastSpawnTime = runningTime;
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