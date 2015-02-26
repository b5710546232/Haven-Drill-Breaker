var Floor = cc.Sprite.extend({
	ctor:function(){
		this._super();
		this.initWithFile('res/images/floor.png');
	},
	 update: function( dt ) {
	 	var pos = this.getPosition();
        this.setPositionX( this.getPositionX() - 5 );
    	if(pos.x<-200){
    		console.log('should remove');
    		this.setPositionX(screenWidth+200);
    	}
    }
});