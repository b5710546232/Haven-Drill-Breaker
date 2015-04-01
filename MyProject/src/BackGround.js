var BackGround = cc.Sprite.extend({
	ctor:function(layer){
		this._super();
		this.initWithFile('res/images/bg.png');
		this.layer = layer
		this.speed = layer.floorSpeed;
		this.scheduleUpdate();
	},

	update:function(){
		this.speed = -this.layer.floorSpeed;
		this.move();
		this.loop();
		// console.log(this.getPosition().x);
	},

	move:function(){
		this.x+= this.speed; 
	},

	loop:function(){
		if(this.outOfScreen()){
			// console.log('out');
			this.setPositionX(screenWidth+this.width/2);
		}
	},
	outOfScreen: function(){
    return this.getBoundingBox().x+this.speed<-screenWidth;
},
});