var Monster1 = cc.Sprite.extend({
	ctor:function(floor){
		this._super();
		this.initWithFile('res/images/objectTest1.png');
		this.speed = floor.speed;
		this.ref = floor;
		this.setPosition(floor.getPosition().x,floor.getPosition().y+96+34);
	},
	 update: function( dt ) {
     this.setPositionX( this.getPositionX() - this.ref.speed);   
    },
    getRect: function(){
    	var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y + dY,
                        spriteRect.width,
                        spriteRect.height );
    },
    isHit: function( playerRect){
    	if(cc.rectOverlapsRect(this.getRect(),playerRect)){
          return true;
       }    
       return false;
   },
});