var Floor = cc.Sprite.extend({
	ctor:function(){
		this._super();
		// this.setAnchorPoint( cc.p( 0, 0 ) ); 
		this.initWithFile('res/images/ground.png');
		Floor.XPOS+=100;
		this.speed = 10;
		this.loopXPOS+=Floor.XPOS;
	},
	 update: function( dt ) {
      this.setPositionX( this.getPositionX() - this.speed );   
      this.loop();
      //console.log(this.loopXPOS);
    },

    hit: function( player ) {
	var myPos = this.getPosition();
	var playerPos = player.getPosition();
	var pPosYend = player.getContentSize().heigth;
  	return ( Math.abs(playerPos.x-myPos.x  )<=82 )&&
		( playerPos.y - myPos.y  < 132&&playerPos.y - myPos.y  >=100 );
    },
    hitSide:function(player){
    var myPos = this.getPosition();
	var playerPos = player.getPosition();
  	return ( Math.abs(playerPos.x-myPos.x  )<=70 )&&
		( playerPos.y - myPos.y  < 110&&playerPos.y - myPos.y  >=0 );
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
    }
});
Floor.XPOS = 0;