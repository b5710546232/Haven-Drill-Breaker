var GameLayer = cc.LayerColor.extend({
	init: function() {
		this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.player = new Player();
        this.addChild(this.player,2)
        this.player.scheduleUpdate();
        this.floor = null;
        this.createFloor();
     this.scheduleUpdate();
		return true;

	},
       createFloor: function(){
        this.floor = new Floor();
        this.floor.setPosition( new cc.Point( 900, -150 ) );
        this.addChild(this.floor,1);
        this.floor.scheduleUpdate();
    },
     update: function() {
        if(this.floor.getPosition().x<0){
            this.removeChild(this.floor);
        }
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