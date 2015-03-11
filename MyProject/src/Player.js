var Player = cc.Sprite.extend({
	ctor:function(){
		this._super();
		this.initWithFile('res/images/Player.png');
		this.vy = Player.STARTING_VELOCITY;
		this.canJump = false;
		this.grounded = false;
	},
	 start: function() {
    },
	update: function( dt ) {
		var pos = this.getPosition();
		this.setPosition(new cc.Point( pos.x, pos.y+this.vy));
		this.vy += Player.G;
	},
	jump: function() {
		if(this.grounded){
			this.canJump = true;
			this.vy = Player.JUMP;
			this.grounded = false;
		}
		else if(!this.grounded&&this.canJump){
			this.vy = Player.JUMP*0.8;
			this.canJump = false;
		}

    },
    getPlayerRect:function(){
    	var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y + dY,
                        spriteRect.width,
                        spriteRect.height );
    },
    isOnGround: function(){
    	this.vy=0;
    	this.grounded = true;
    	
    },
    isOnAir: function(){
    	this.vy+=Player.G;
    	this.grounded = false;
    	this.canJump = false;
    },
    isDead: function(){
    	this.vy+=Player.G;
    }
});
Player.JUMP = 15;
Player.G = -1;
Player.STARTING_VELOCITY=1;