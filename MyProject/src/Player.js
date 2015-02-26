var Player = cc.Sprite.extend({
	ctor:function(){
		this._super();
		this.initWithFile('res/images/Player.png');
		this.setPosition(new cc.Point(screenWidth/2,screenHeight/2));
		this.vy = Player.STARTING_VELOCITY;
	},
	 start: function() {
    },
	update: function( dt ) {
		var pos = this.getPosition();
		this.setPosition(new cc.Point( pos.x , pos.y+this.vy ));
		this.vy += Player.G;
	},
	   jump: function() {
    }
});
Player.G = -1;
Player.STARTING_VELOCITY=1;