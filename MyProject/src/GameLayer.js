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
        this.floorSet;
        //this.floorSet = [];
        return true;

    },
    createFloor: function(){
        this.floorSet =  [];
        for(var i = 0 ;i<8;i++){
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
    },
    playerOnGround: function(){
        var posY = this.player.getPosition().y;
        for(var i = 0;i<8;i++){
                if(this.floorSet[i].hitSide(this.player)){
                console.log('side die '+this.player.getPosition().y);
                this.player.isOnAir();
                    for(var j=0;j<8;j++){
                        this.floorSet[j].stop();
                    }
                }
                else if(this.floorSet[i].hit(this.player)){
                this.player.isOnGround();
                this.player.setPosition(new cc.Point(this.player.getPosition().x,142));
                

                if(this.player.getPosition().y<=142){
                    this.player.vy = 0;
                    this.player.setPosition(new cc.Point(this.player.getPosition().x,142));

                }

                else {
                    this.player.vy += Player.G;

                }
            }
        }
    },
    onKeyDown: function( e ) {

        if ( e == cc.KEY.space ) {
            this.player.jump();
        }
        if (e==82){
            this.player.setPosition(200,300);
            this.player.vy = Player.STARTING_VELOCITY;
            this.player.canJump = false;
            this.player.grounded = false;
              for(var j=0;j<8;j++){
                        this.floorSet[j].start();
                    }

        }
        if ( e == 39) {
            console.log('right');
            this.player.setPosition(new cc.Point(this.player.getPosition().x+10
                ,this.player.getPosition().y));
        }
        if ( e == 68) {
            this.player.setPosition(new cc.Point(500,500));
            this.player.vy = 0;
            Player.G = 0;
        }
        if ( e == 37) {
            console.log('right');
            this.player.setPosition(new cc.Point(this.player.getPosition().x-10
                ,this.player.getPosition().y));
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