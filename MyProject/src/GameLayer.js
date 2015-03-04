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
        //this.floorSet = [];
		return true;

	},
       createFloor: function(){
        this.floorSet =  [];
        for(var i = 0 ;i<8;i++){
        var floor = new Floor();
        floor.setPosition(new cc.Point(Floor.XPOS,25))
        floor.scheduleUpdate();
        this.floorSet.push(floor);
        this.addChild(floor);
        }


    },
     update: function() {
        this.onKeyDown();
        this.playerOnGround();
    },
    playerOnGround: function(){
        for(var i = 0;i<8;i++){
            if(this.floorSet[i].hit(this.player)){
           // console.log("hited");
            this.player.isOnGround();
            this.player.setPosition(new cc.Point(this.player.getPosition().x,157));
            this.player.vy = 0;
                if(this.player.getPosition().y<=157){
                    this.player.setPosition(new cc.Point(this.player.getPosition().x,157));

            }
        }
        else {
            this.player.isOnAir();
            this.player.vy += Player.G;

        }
    }
    },
    onKeyDown: function( e ) {

            if ( e == cc.KEY.space ) {
                this.player.jump();
            }
            if ( e == 39) {
                console.log('right');
                this.player.setPosition(new cc.Point(this.player.getPosition().x+10
                    ,this.player.getPosition().y));
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