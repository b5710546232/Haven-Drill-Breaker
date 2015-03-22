var Floor = cc.Sprite.extend({
	ctor:function(){
		this._super();
		 this.setAnchorPoint( cc.p( 0.5, 0 ) ); 
		this.initWithFile('res/images/ground.png');
		this.speed = 0;
		this.loopXPOS+=Floor.XPOS;
        Floor.NUM++;
        console.log('no.' +Floor.NUM+ '   '+this.getBoundingBoxToWorld().x+' '+Floor.XPOS);
	},
	 update: function( dt ) {
      this.setPositionX( this.getPositionX() - this.speed );   
      this.loop();
      // console.log('no.' +Floor.NUM+ '   '+this.getBoundingBoxToWorld().x);
      
    },
    setFloorPosition:function(){
        this.setPosition(new cc.Point(Floor.XPOS,10))
        Floor.XPOS+=100;
    },
    loop: function(){
    	if(this.getPosition().x<=-100){
    		this.setPositionX(900);
    	}
    },
    stop: function(){
    	this.speed = 0;
    },
       run: function(){
        this.speed = 8;
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
        if(cc.rectOverlapsRect(this.getFloorRect(),playerRect)){
          return true;
       console.log('checkCollision');
       }    
       return false;
    },



});
Floor.XPOS =    0;
Floor.NUM = 0;