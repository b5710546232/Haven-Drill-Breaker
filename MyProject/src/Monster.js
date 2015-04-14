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
    console.log(this.monType);
    this.initAnimation(this.monType);
    this.runAction(this.movingAction);
  },

  update: function( dt ) {
   this.setPositionX( this.getPositionX() - this.floor.speed);  
   this.destroy(this.player);
   this.isAttacted();
   if(this.layer.isPlayerGetBomb){
    console.log('bomb');
    this.layer.isPlayerGetBomb =false
    this.removeFromParent();
  }
},


initSpriteMonster :function(monType){
  if(monType=='R')this.initWithFile('res/images/monster/boxTest.png');
  if(monType=='D')this.initWithFile('res/images/monster/boxTest2.png');
  if(monType=='L')this.initWithFile('res/images/monster/boxTest3.png');
  if(monType=='U')this.initWithFile('res/images/monster/boxTest4.png');
},


initAnimation:function(monType){
  if(monType=='R')this.movingAction = this.monTypeRAnimation();
  if(monType=='D')this.movingAction = this.monTypeDAnimation();
  if(monType=='L')this.movingAction = this.monTypeLAnimation();
  if(monType=='U')this.movingAction = this.monTypeUAnimation();
},


monTypeRAnimation:function(){
  var animation = new cc.Animation.create();
  animation.addSpriteFrameWithFile( 'res/images/mon1_anim/mon1anim0001.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon1_anim/mon1anim0002.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon1_anim/mon1anim0003.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon1_anim/mon1anim0004.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon1_anim/mon1anim0005.png' );
  animation.setDelayPerUnit( 0.05 );
  return cc.RepeatForever.create( cc.Animate.create( animation ) );
},

monTypeDAnimation:function(){
  var animation = new cc.Animation.create();
  animation.addSpriteFrameWithFile( 'res/images/mon2_anim/mon2anim0001.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon2_anim/mon2anim0002.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon2_anim/mon2anim0003.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon2_anim/mon2anim0004.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon2_anim/mon2anim0005.png' );
  animation.setDelayPerUnit( 0.05 );
  return cc.RepeatForever.create( cc.Animate.create( animation ) );
},


monTypeLAnimation:function(){
  var animation = new cc.Animation.create();
  animation.addSpriteFrameWithFile( 'res/images/mon3_anim/mon3anim0001.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon3_anim/mon3anim0002.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon3_anim/mon3anim0003.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon3_anim/mon3anim0004.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon3_anim/mon3anim0005.png' );
  animation.setDelayPerUnit( 0.05 );
  return cc.RepeatForever.create( cc.Animate.create( animation ) );
},

monTypeUAnimation:function(){
  var animation = new cc.Animation.create();
  animation.addSpriteFrameWithFile( 'res/images/mon4_anim/mon4anim0001.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon4_anim/mon4anim0002.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon4_anim/mon4anim0003.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon4_anim/mon4anim0004.png' );
  animation.addSpriteFrameWithFile( 'res/images/mon4_anim/mon4anim0005.png' );
  animation.setDelayPerUnit( 0.05 );
  return cc.RepeatForever.create( cc.Animate.create( animation ) );
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
      this.layer.shakeScreen();
      this.removeFromParent();
      console.log('now hp  = :'+this.player.hp);
    }
    else{
      this.layer.score++;
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
},
});