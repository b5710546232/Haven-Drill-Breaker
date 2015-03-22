var Floor = cc.Sprite.extend({
	ctor:function(){
		this._super();
		// this.setAnchorPoint( cc.p( 0.5, 0 ) ); 
		this.initWithFile('res/images/ground.png');
		Floor.XPOS+=100;
		this.speed = 10;
		this.loopXPOS+=Floor.XPOS;
	},
	 update: function( dt ) {
      this.setPositionX( this.getPositionX() - this.speed );   
      this.loop();
      
    },
    loop: function(){
    	if(this.getPosition().x<=-100){
    		this.setPositionX(850);
    	}
    },
    stop: function(){
    	this.speed = 0;
    },
       start: function(){
    	this.speed = 10;
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
    onTop: function( rect ) {
        var brect = this.getBoundingBoxToWorld();
        var bminx = cc.rectGetMinX( brect );
        var bmaxx = cc.rectGetMaxX( brect );
        var minx = cc.rectGetMinX( rect );
        var maxx = cc.rectGetMaxX( rect );
        return ( minx < bmaxx ) && ( bminx <= maxx );
    },
    onSide: function( rect ) {
        var brect = this.getBoundingBoxToWorld();
        var bminy = cc.rectGetMinY( brect );
        var bmaxy = cc.rectGetMaxY( brect );
        var miny = cc.rectGetMinY( rect );
        var maxy = cc.rectGetMaxY( rect );
        return ( miny <= bmaxy ) && ( bminy <= maxy );
    },


});
Floor.XPOS = 0;