var Floor = cc.Sprite.extend({
	ctor:function(){
		this._super();
	 // this.setAnchorPoint( cc.p( 0.5, 0 ) ); 
		this.initWithFile('res/images/ground.png');
		this.speed = 0;
		this.loopXPOS+=Floor.XPOS;
        Floor.NUM++;
	},
	 update: function( dt ) {
      this.setPositionX( this.getPositionX() - this.speed);   
      
    },
    setFloorPosition:function(){
        this.setPosition(new cc.Point(Floor.XPOS,10))
        Floor.XPOS+=100;
    },
    loop: function(){
    		this.setPositionX(900);
    },
    outOfScreen: function(){
    return this.getPosition().x<-this.getBoundingBox().width;
    },
    stop: function(){
    	this.speed = 0;
    },
       run: function(){
        this.speed = 5;
    },
      getTopY: function() {
        return cc.rectGetMaxY( this.getBoundingBoxToWorld() );
    },
    getFloorRect: function() {
        var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y + dY,
                        spriteRect.width,
                        spriteRect.height );
    },
    checkCollision :function( playerRect) {
        return cc.rectOverlapsRect(this.getFloorRect(),playerRect);
          
    },



});
Floor.XPOS = 50;
Floor.NUM = 0;