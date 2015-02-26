var Floor = cc.Sprite.extend({
	ctor:function(){
		this._super();
		this.initWithFile('res/images/floor.png');
		this.setPosition( new cc.Point( screenWidth/2,-150 ) );
	}
});