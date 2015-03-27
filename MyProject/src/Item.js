var Item = cc.Sprite.extend({
	ctor:function(layer){
		this._super();
		this.initWithFile('res/images/Item01.png');
    this.layer  = layer
    this.player = layer.player;
    var top = 150;
    this.setPosition(screenWidth+this.getBoundingBox().width,top);
  },
  update: function( dt ) {
   this.setPositionX( this.getPositionX() - this.layer.floorSpeed-Item.speed);  
   this.xModeToPlayer();
   this.destroy(this.player);
   this.isAttacted();
 },
 getRect: function(){
   var spriteRect = this.getBoundingBoxToWorld();
   var spritePos  = this.getPosition();

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
destroy:function(player){
  if(this.outOfScreen())
    this.removeFromParent();
},
xModeToPlayer:function(){
  if(this.isHit(this.player.getPlayerRect())){
    this.player.drillType = 'X';
    this.removeFromParent();
    console.log('X mode');
  }
}
outOfScreen:function(){
  return this.getPosition().x<-this.getBoundingBox().width+this.speed;
}
});
Item.speed = -2; // move to left.