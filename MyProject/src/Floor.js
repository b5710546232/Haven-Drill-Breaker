var Floor = cc.Sprite.extend({
	ctor:function(){
		this._super();
		// this.setAnchorPoint( cc.p( 0, 0 ) ); 
		this.initWithFile('res/images/ground.png');
		Floor.XPOS+=100;
		
	},
	 update: function( dt ) {
      this.setPositionX( this.getPositionX() - 5 );   
      this.loop();

    },

    hit: function( player ) {
	var myPos = this.getPosition();
	var playerPos = player.getPosition();
//	console.log(" ans = "+Math.abs( myPos.y - oPos.y ));
  	return ( Math.abs(playerPos.x-myPos.x  )< 82 )&&
		( playerPos.y - myPos.y  <= 132&&playerPos.y - myPos.y  >=90 );
    },
    loop: function(){
    	if(this.getPosition().x<-100){
    		this.setPositionX(1000);
    	}
    }
});
Floor.XPOS = 0;