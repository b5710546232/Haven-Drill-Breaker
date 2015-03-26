var Monster1 = cc.Sprite.extend({
	ctor:function(floor){
		this._super();
		this.initWithFile('res/images/boxTest.png');
		this.speed = floor.speed;
		this.floor = floor;
    this.layer = floor.layer;
    this.player = floor.layer.player;
    var top =cc.rectGetMaxY(floor.getBoundingBoxToWorld())+this.getRect().height/2;
		this.setPosition(floor.getPosition().x,top);
    this.monType = 'D';
	},
	 update: function( dt ) {
     this.setPositionX( this.getPositionX() - this.floor.speed);  
     this.destroy(this.player);
     this.isAttacted();
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
    	return cc.rectOverlapsRect(this.getRect(),playerRect);
   },
   isAttacted:function(){
      if(this.isHit(this.player.getPlayerRectSideR())){
          if(this.player.drillType != this.monType){
            this.player.hp-=1;
            this.removeFromParent();
            console.log('now hp  = :'+this.player.hp);
          }
          else{
            this.removeFromParent();
          }

      }
      else if(this.isHit(this.player.getPlayerBodyRect())){
            this.player.hp-=1;
            this.removeFromParent();
            console.log('hit body now hp  = :'+this.player.hp);
      }
   },
   destroy:function(player){
      if(this.isHit(player.getPlayerRectSideR())||this.outOfScreen())
        this.removeFromParent();
    },
    outOfScreen:function(){
      return this.getPosition().x<-this.getBoundingBox().width+this.speed;
    }
});