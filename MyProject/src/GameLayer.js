var GameLayer = cc.LayerColor.extend({
	init: function() {
		this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.floor = new Floor();
        this.addChild(this.floor);
        this.player = new Player();
        this.addChild(this.player)
        this.player.scheduleUpdate();
		return true;

	},	
});
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});