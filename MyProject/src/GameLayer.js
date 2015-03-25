var GameLayer = cc.LayerColor.extend({
	init: function() {
		this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.createPlayer();
        this.addKeyboardHandlers();
        this.isStart = false;
        this.floorSets = [];
        this.floorSets = this.createFloors(0);
        this.floorSets2 = [];
        this.scheduleUpdate();
        this.checkFloor1 = false;
        return true;
    },
    createPlayer:function(){
 this.player = new Player();
        this.player.setPosition(new cc.Point(200,300))
        this.addChild(this.player,2)
        this.player.scheduleUpdate();
    },

    createFloors: function(num){
        var floorSet = [];
        if (num==0)var map = [1,1,1,1,1,1,1];
        var index = 0;
        for(var i = 0 ;i<map.length;i++){
                if(map[i]==1){
                    var floor = new Floor();
                    if(num==0){
                    floor.setPosition(50+(100*i),10) ;    
                    }
                    else{
                   // floor.setPosition(screenWidth+(100*i),10);
                    }
                    floor.scheduleUpdate();
                    this.addChild(floor);
                    floorSet.push(floor);
                    index++;
                }
        }
        this.FloorSetPosX = floorSet[floorSet.length-1].getBoundingBox().x+50;
        floorSet.length =index;
        return floorSet;
    },
    deleteFloor:function(floorSets){
          for(var i = 0 ;i<floorSets.length;i++){
                floorSets[i].removeFromParent();
                }          
    },
    loopFloorSet:function(floorSets){
         var lastFloor = floorSets[floorSets.length-1];
          for(var i = 0 ;i<this.floorSets.length;i++){
                if(this.floorSets[i].outOfScreen()){
                 this.floorSets[i].setPosition(this.FloorSetPosX,10);
         }
         this.scheduleUpdate();
     }

    },
    gameStart:function(){
        if(this.isStart){
            this.player.startToPlay();
            this.floorSetsRun(this.floorSets);
        }
    },
    floorSetsRun:function(floorSets){
          for(var i = 0 ;i<floorSets.length;i++){
                floorSets[i].run();
            }

    },
    // loopFloor:function(){ 
    //     if(this.floorSets[this.floorSets.length-8].outOfScreen()){
    //      this.floorSetsRun(this.floorSets2);
    //     }
    //     if(this.floorSets[this.floorSets.length-1].outOfScreen()&&this.checkFloor1==false){
    //     this.deleteFloor(this.floorSets);
    //     this.checkFloor1=true;
    //     this.floorSets = null;
    //     this.floorSets = this.createFloors(3);
    //     }
    //       if(this.floorSets2[this.floorSets2.length-8].outOfScreen()){
    //       if(this.checkFloor1){
    //         this.checkFloor1=false;
    //         this.floorSetsRun(this.floorSets);
    //     }
    //     if(this.floorSets2[this.floorSets2.length-1].outOfScreen()){
    //         this.deleteFloor(this.floorSets2);
    //         this.floorSets2=null;
    //        this.floorSets2 = this.createFloors(1)
    //         }
    //     }
    // },
    update: function() {

        //this.loopFloor();
        this.loopFloorSet(this.floorSets);
        this.gameStart();
        this.onKeyDown();
        this.playerOnGround(this.floorSets);
        this.playerRightSideHitGround(this.floorSets);
        this.playerOutScreen();
        },
    stopFloor:function(floorSets){
         for(var i = 0;i<floorSets.length;i++){
            floorSets[i].stop();
         }
    },
    gameOver:function(){
        this.stopFloor(this.floorSets);
        this.player.isDead();
    },
    setFloorsSpeed:function(floorSets,newSpeed){
     for(var i = 0;i<floorSets.length;i++){
        
        floorSets[i].speed = speed;
      }
    },
    playerOutScreen:function(){
        if(this.player.isFall()) this.gameOver();
    },
    playerRightSideHitGround:function(floorSets){
        for(var i = 0;i<floorSets.length;i++){
          if(floorSets[i].checkCollision  (this.player.getPlayerRectSideR())){
            this.gameOver();

            }
        }
    },
    playerOnGround: function(floorSets){
        var posPlayer = this.player.getPosition();
        for(var i = 0;i<floorSets.length;i++){
            var playerRect = this.player.getBoundingBoxToWorld();
            var top =  cc.rectGetMaxY(floorSets[i].getBoundingBoxToWorld())+playerRect.height/2;
            if(floorSets[i].checkCollision  (this.player.getPlayerRectFoot())){
                this.player.isOnGround();
                this.player.setPosition(this.player.getPosition().x,top);

            }
        }
    },
    onKeyDown: function( e ) {
        if ( e == cc.KEY.space ) {
            this.player.jump();
            this.isStart = true;
        }
        if(e==83){
            this.isStart = true;
        }
        if(e==81){ // q
        }
        if (e==82){ //r refesh
            this.player.setPosition(200,300);
            this.player.vy = Player.STARTING_VELOCITY;
            Player.G = -1;
            this.player.canJump = false;
            this.player.grounded = false;
            this.stop=false;
            this.floorSetsRun(this.floorSets)

        }
        if ( e == 39) { //right
            this.player.setPosition(new cc.Point(this.player.getPosition().x+10
                ,this.player.getPosition().y));
        }
        if ( e == 68) { // d
            this.player.setPosition(new cc.Point(500,500));
            this.player.vy = 0;
            Player.G = 0;
        }
        if ( e == 37) {//right
            this.player.setPosition(new cc.Point(this.player.getPosition().x-10
                ,this.player.getPosition().y));
        }
        if ( e == 84) { //t stop
            this.stopFloor(this.floorSets);
            this.isStart = false;
            Player.G = 0;
            this.player.vy=0;
        }
        if( e==38){//up
   this.player.setPosition(new cc.Point(this.player.getPosition().x
                ,this.player.getPosition().y+10));
        }
        if(e==40){ //down
               this.player.setPosition(new cc.Point(this.player.getPosition().x
                ,this.player.getPosition().y-10));

        }
    },
    onKeyPressed: function(e){

    },
    onKeyUp: function( e ) {
        console.log( 'Up: ' + e );
    },
    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( e ) {
                self.onKeyDown( e );
            },
            onKeyReleased: function( e ) {
                self.onKeyUp( e );
            }
        }, this);
    },
});
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    },
});