var Avatar = cc.Sprite.extend({
	ctor:function () {
		this._super();
		this.initWithFile('res/images/player/player_avatar.png');
		this.setPosition(50,410)
		console.log('ava');
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
		this.maxScale = this.player.hp;
		this.scheduleUpdate();
	},
	update:function(){
		this.setScaleX(this.player.hp/this.maxScale)
	}
});