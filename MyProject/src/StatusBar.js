var Avatar = cc.Sprite.extend({
	ctor:function () {
		this._super();
		this.initWithFile('res/images/player/player_avatar.png');
		this.setPosition(50,410)
	},
});
var HpBarRed = cc.Sprite.extend({
	ctor:function () {
		this._super();
		this.initWithFile('res/images/player/hpBar_red.png');
		this.setPosition(65,388)
		this.setAnchorPoint( new cc.Point( 0, 0) );
	},
});
var HpBarGreen = cc.Sprite.extend({
	ctor:function (player) {
		this._super();
		this.initWithFile('res/images/player/hpBar_green.png');
		this.setAnchorPoint( new cc.Point( 0, 0) );
		this.setPosition(65,388)
		this.player = player;
		this.maxScale = Player.HP_MAX;
		this.scheduleUpdate();
	},
	update:function(){
		this.setScaleX(this.player.hp/this.maxScale)
	}
});
var SignLevelUp = cc.Sprite.extend({
	ctor:function (layer) {
		this._super();
		this.initWithFile('res/images/SceneComponent/speedUpSign.png');
		this.setAnchorPoint( new cc.Point( 0, 0) );
		var size = 320;
		this.setPosition(screenWidth,screenHeight/2)
		this.layer = layer;
		this.call = false;
		this.dtDist = 0;
		this.dist = size;
		console.log(this.dist);
		this.count = 0;
		this.scheduleUpdate();
	},
	update:function(dt){
		if(this.call){
			if(this.dtDist<this.dist){
				this.dtDist+=10;
				this.x-=10;
			}
			else if(this.dtDist>=this.dist){
				this.count+=dt;
				if(this.count>1){
					this.count = 0;
					this.call = false;
				}
			}
		}
		else{
			if(!this.call&&this.dtDist>=0){
				this.dtDist-=10;
				this.x+=10;
			}
		}
	}
});