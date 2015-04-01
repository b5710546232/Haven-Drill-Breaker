var Monster = cc.Sprite.extend({
	ctor:function(floor,monType){
		this._super();
    this.monType = monType;
    this.initSpriteMonster(this.monType);
    this.speed = floor.speed;
    this.floor = floor;
    this.layer = floor.layer;
    this.player = floor.layer.player;
    var height = 64;
    var top =cc.rectGetMaxY(floor.getBoundingBoxToWorld())+height/2;
    this.setPosition(floor.getPosition().x,top);
  },
  initSpriteMonster :function(monType){
    if(monType=='R')this.initWithFile('res/images/boxTest.png');
    if(monType=='D')this.initWithFile('res/images/boxTest2.png');
    if(monType=='L')this.initWithFile('res/images/boxTest3.png');
    if(monType=='U')this.initWithFile('res/images/boxTest4.png');
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
  if(this.isHit(this.player.getPlayerRect())){
    if(this.player.drillType != this.monType&&this.player.drillType!='X'){
      this.player.hp-=1;
      this.removeFromParent();
      console.log('now hp  = :'+this.player.hp);
    }
    else{
      this.removeFromParent();
    }

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