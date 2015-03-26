var GameLayer = cc.LayerColor.extend({
	init: function() {
		this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.createPlayer();
        this.addKeyboardHandlers();
        this.isStart = false;
        this.initFloorSets();
        this.scheduleUpdate();
        this.checkFloor1 = false;
        this.floorSpeed = 0;
        this.isGameOver = false;
        return true;
    },
    initFloorSets:function(){
        this.floorSets = [];
        this.floorSets = this.createFloors(0);
        this.floorSets2 = [];
        this.floorSets2 = this.createFloors(1);

    },
    update: function() {
    this.floorManage();
        //this.loopFloor();
        //this.loopFloorSet(this.floorSets);
        this.gameStart();
        this.onKeyDown();
        this.playerOutScreen();
        this.playerRightSideHitGround(this.floorSets);
        this.playerRightSideHitGround(this.floorSets2);
    },
    floorManage:function(){
        var ran = 1+Math.floor(Math.random()*1);
        //console.log(ran);
        // run
        if(this.floorSets[this.floorSets.length-1].outOfScreen()){
         this.floorSetsRun(this.floorSets2,this.floorSpeed);
     }
        //create
        if(this.floorSets[this.floorSets.length-1].outOfScreen()&&this.checkFloor1==false){
            this.checkFloor1=true;
            this.floorSets = null;
            console.log('ran  ' +ran);
            this.floorSets = this.createFloors(ran);
        }
        // run
        if(this.floorSets2[this.floorSets2.length-1].outOfScreen()){
            if(this.checkFloor1){
                this.checkFloor1=false;
                this.floorSetsRun(this.floorSets,this.floorSpeed);
            }
        //create
        if(this.floorSets2[this.floorSets2.length-1].outOfScreen()){
            this.floorSets2=null;
            console.log('ran  ' +ran);
            this.floorSets2 = this.createFloors(ran)
        }
    }
},
createPlayer:function(){
    this.player = new Player();
    this.player.setPosition(new cc.Point(200,300))
    this.addChild(this.player,2)
    this.player.scheduleUpdate();
},
createFloors: function(num){
    var floorSet = [];
    if (num==0)var map = [1,1,1,1,1,1,1,1,1,1];
   // if (num==1)var map = [0,1,0,0,1,1,1,1,1,0];
     //if (num==2)var map = [0,1,1,1,1,1,1,1,1,1];
    //if (num==3)var map = [0,1,0,1,1,0,1,0,1,0];
    // if (num==4)var map = [0,1,1,1,1,1,1,1,1,0];
    // if (num==5)var map = [0,1,1,1,1,1,1,1,1,0];
    // if (num==6)var map = [0,1,1,1,1,1,1,1,1,1];
    // if (num==7)var map = [0,1,1,1,1,1,1,1,1,1];
    if (num==1)var map = [0,1,1,0,0,1,0,0,1,0];
    var index = 0;
    for(var i = 0 ;i<map.length;i++){
        if(map[i]==1){
            var floor = new Floor(this);
            if(num==0){
                floor.setPosition(50+100*i,10) ;    
            }
            else{
                floor.setPosition(50+screenWidth+(100*i),10);
            var m = new Monster1(floor);
            m.scheduleUpdate();
            this.addChild(m);
            }
            floor.scheduleUpdate();
            this.addChild(floor);
            floorSet.push(floor);
        }
    }
    this.FloorSetPosX = floorSet[floorSet.length-1].getBoundingBox().x+50;
    return floorSet;
},
gameStart:function(){
    if(this.isStart){
        this.player.startToPlay();
        this.floorSpeed = 5;
        this.floorSetsRun(this.floorSets,this.floorSpeed);
        this.floorSetsRun(this.floorSets2,this.floorSpeed);
    }
},
floorSetsRun:function(floorSets){
  for(var i = 0 ;i<floorSets.length;i++){
    floorSets[i].run(this.floorSpeed);
}

},
stopFloor:function(floorSets){
 for(var i = 0;i<floorSets.length;i++){
    floorSets[i].stopMove();
}
},
gameOver:function(){
    this.player.isDead();
    this.isGameOver = true;
    this.stopFloor(this.floorSets);
    this.stopFloor(this.floorSets2);
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
onKeyDown: function( e ) {
    this.player.switchDrillType(e);
    if ( e == cc.KEY.space ) {
        this.player.jump();
        this.isStart = true;
    }
    if(e==69){
        this.isStart = true;
    }
        if(e==81){ // q
        window.location.reload();
        }
        if (e==82){ //r refesh
            this.player.setPosition(200,300);
            this.player.vy = Player.STARTING_VELOCITY;
            Player.G = -1;
            this.player.canJump = false;
            this.player.grounded = false;
            this.stop=false;
            this.floorSetsRun(this.floorSets,this.floorSpeed);
            this.floorSetsRun(this.floorSets2,this.floorSpeed);

        }
        if ( e == 68) { //right
            this.player.setPosition(new cc.Point(this.player.getPosition().x+10
                ,this.player.getPosition().y));
        }
        if ( e == 65) {//right
            this.player.setPosition(new cc.Point(this.player.getPosition().x-10
                ,this.player.getPosition().y));
        }
        if ( e == 84) { //t stop
            this.stopFloor(this.floorSets);
            this.stopFloor(this.floorSets2);
            this.isStart = false;
            Player.G = 0;
            this.player.vy=0;
        }
        if( e==87){//up
           this.player.setPosition(new cc.Point(this.player.getPosition().x
            ,this.player.getPosition().y+10));
       }
        if(e==83){ //down
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