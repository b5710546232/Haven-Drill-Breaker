var PackBackGround = cc.Node.extend({
    ctor: function(layer) {
	this._super();
	this.bg1 = new BackGround(layer);
    this.bg2 = new BackGround(layer);
    this.bg1.setPosition(screenWidth/2,screenHeight/2);
    this.bg2.setPosition(screenWidth*1.5,screenHeight/2);
    this.addChild(this.bg1,0);
    this.addChild(this.bg2,0);
    this.scheduleUpdate();
    console.log('create bh');
    this.layer = layer;
	},
	update:function(){
		this.speed = -this.layer.floorSpeed;
		this.move();
		this.loop();
	},
	loop:function(){
		if(-this.x>screenWidth){
			this.setPositionX(0);
		}
	},

	move:function(){
		this.x+= this.speed; 
	},
});
var BackGround = cc.Sprite.extend({
	ctor:function(layer){
		this._super();
		this.initWithFile('res/images/SceneComponent/bg.png');
		this.layer = layer
	},
});