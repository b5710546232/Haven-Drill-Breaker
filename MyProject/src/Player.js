var Player = cc.Sprite.extend({
	ctor:function(){
		this._super();
		this.initWithFile('res/images/Player.png');
		this.setPosition(new cc.Point(250,screenHeight/2));
		this.vy = Player.STARTING_VELOCITY;
		this.canJump = false;
		this.grounded = false;
	},
	 start: function() {
    },
	update: function( dt ) {
		var pos = this.getPosition();
		this.setPosition(new cc.Point( pos.x, pos.y+this.vy ));
		this.vy += Player.G;
	},
	jump: function() {
		if(this.grounded){
			this.canJump = true;
			this.vy = Player.JUMP;
			this.grounded = false;
		}
		else if(!this.grounded&&this.canJump){
			this.vy = Player.JUMP;
			this.canJump = false;
		}

    },
    isOnGround: function(){
    	this.grounded = true;
    	console.log('on g');
    },
    isOnAir: function(){
    	this.grounded = false;
    }
});
Player.JUMP = 15;
Player.G = -0.1;
Player.STARTING_VELOCITY=1;