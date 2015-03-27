var Item = cc.Sprite.extend({
	ctor:function(layer){
		this._super();
		this.initWithFile('res/images/itemTest1.png');
    this.layer  = layer
    this.player = layer.player;
    var top = 300;
    console.log('create');
    this.setPosition(screenWidth+this.getBoundingBox().width,top);
  },
  update: function( dt ) {
   this.setPositionX( this.getPositionX() - 5);  
   this.xModeToPlayer();
   this.destroy(this.player);
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
    this.layer.xModeTime += 3;
    this.removeFromParent();
    console.log('X mode');
  }
},
outOfScreen:function(){
  return this.getPosition().x<-this.getBoundingBox().width+this.speed;
}
});
Item.speed = -2; // move to left.