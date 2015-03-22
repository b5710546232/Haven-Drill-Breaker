var GameLayer = cc.LayerColor.extend({
	init: function() {
		this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.player = new Player();
        this.player.setPosition(new cc.Point(200,300))
        this.addChild(this.player,2)
        this.player.scheduleUpdate();
        this.createFloor();
        this.scheduleUpdate();
        this.addKeyboardHandlers();
        return true;

    },
    createFloor: function(){
        this.floorSet = [];
        this.floorSet.length = 8;
        for(var i = 0 ;i<this.floorSet.length;i++){
            var floor = new Floor();
            floor.setPosition(new cc.Point(Floor.XPOS,10))
            floor.scheduleUpdate();
            this.floorSet[i] = floor;
            this.addChild(floor);
        }


    },
    update: function() {
        this.onKeyDown();
        this.playerOnGround();
        this.playerRightSideHitGround();
        this.playerOutScreen();
    },
    stopFloor:function(){
         for(var i = 0;i<this.floorSet.length;i++){
            this.floorSet[i].stop();
         }
    },
    gameOver:function(){
        this.stopFloor();
        this.player.isDead();
    },
    playerOutScreen:function(){
        if(this.player.isFall()) this.gameOver();
    },
    playerRightSideHitGround:function(){
        for(var i = 0;i<this.floorSet.length;i++){
          if(this.floorSet[i].checkCollision  (this.player.getPlayerRectSideR())){
            console.log('side R hitted');
            this.gameOver();

            }
        }
    },
    playerOnGround: function(){
        var posPlayer = this.player.getPosition();
        for(var i = 0;i<this.floorSet.length;i++){
            var playerRect = this.player.getBoundingBoxToWorld();
            var top =  cc.rectGetMaxY( this.floorSet[i].getBoundingBoxToWorld())+playerRect.height/2;
            if(this.floorSet[i].checkCollision  (this.player.getPlayerRectFoot())){
                this.player.isOnGround();
                this.player.setPosition(this.player.getPosition().x,top);

            }
        }
    },
    onKeyDown: function( e ) {

        if ( e == cc.KEY.space ) {
            this.player.jump();
        }
        if (e==82){ //r
            this.player.setPosition(200,300);
            this.player.vy = Player.STARTING_VELOCITY;
            Player.G = -1;
            this.player.canJump = false;
            this.player.grounded = false;
            for(var j=0;j<8;j++){
                this.floorSet[j].start();
            }
            this.removeChild(this.floorSet[4]);
            this.removeChild(this.floorSet[5]);

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
        if ( e == 84) { //t
            this.stopFloor();
            Player.G = 0;
            this.player.vy=0;
        }
        if( e==38){//up
   this.player.setPosition(new cc.Point(this.player.getPosition().x
                ,this.player.getPosition().y+10));
        }
        if(e==40){ //down
               this.player.setPosition(new cc.Point(this.player.getPosition().x
                ,this.player.getPosition().y-5));

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