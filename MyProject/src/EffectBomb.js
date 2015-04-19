var EffectBomb = cc.Sprite.extend({
	ctor:function(monster){
		this._super();
		this.initWithFile( 'res/images/effect/bomb_anim0001.png');
		this.mon = monster;
		console.log('effect');
		this.setPosition(this.mon.getPosition().x,this.mon.getPosition().y);
		this.count = 0;
		this.runAction(this.bombAnim());

	},
	update:function(dt){
		this.count+=dt;
		if(this.count>0.3){
			this.removeFromParent();
		}
	},
	bombAnim:function(){
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'res/images/effect/bomb_anim0001.png' );
		animation.addSpriteFrameWithFile( 'res/images/effect/bomb_anim0002.png' );
		animation.addSpriteFrameWithFile( 'res/images/effect/bomb_anim0003.png' );
		animation.addSpriteFrameWithFile( 'res/images/effect/bomb_anim0004.png' );
		animation.addSpriteFrameWithFile( 'res/images/effect/bomb_anim0005.png' );

		animation.setDelayPerUnit( 0.05 );
		return cc.Animate.create( animation ) ;

	} ,   

});