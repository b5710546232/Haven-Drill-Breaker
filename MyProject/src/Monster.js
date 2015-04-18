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
  if(monType=='R')this.initWithFile( res.mon1_anim_01_png );
  if(monType=='D')this.initWithFile( res.mon2_anim_01_png );
  if(monType=='L')this.initWithFile( res.mon3_anim_01_png );
  if(monType=='U')this.initWithFile( res.mon4_anim_01_png );
},


initAnimation:function(monType){
  if(monType=='R')this.movingAction = this.monTypeRAnimation();
  if(monType=='D')this.movingAction = this.monTypeDAnimation();
  if(monType=='L')this.movingAction = this.monTypeLAnimation();
  if(monType=='U')this.movingAction = this.monTypeUAnimation();
},


monTypeRAnimation:function(){
  var animation = new cc.Animation.create();
  animation.addSpriteFrameWithFile( res.mon1_anim_01_png );
  animation.addSpriteFrameWithFile( res.mon1_anim_02_png );
  animation.addSpriteFrameWithFile( res.mon1_anim_03_png );
  animation.addSpriteFrameWithFile( res.mon1_anim_04_png );
  animation.addSpriteFrameWithFile( res.mon1_anim_05_png );
  animation.setDelayPerUnit( 0.05 );
  return cc.RepeatForever.create( cc.Animate.create( animation ) );
},

monTypeDAnimation:function(){
  var animation = new cc.Animation.create();
  animation.addSpriteFrameWithFile( res.mon2_anim_01_png );
  animation.addSpriteFrameWithFile( res.mon2_anim_02_png );
  animation.addSpriteFrameWithFile( res.mon2_anim_03_png );
  animation.addSpriteFrameWithFile( res.mon2_anim_04_png );
  animation.addSpriteFrameWithFile( res.mon2_anim_05_png );

  animation.setDelayPerUnit( 0.05 );
  return cc.RepeatForever.create( cc.Animate.create( animation ) );
},


monTypeLAnimation:function(){
  var animation = new cc.Animation.create();
  animation.addSpriteFrameWithFile( res.mon3_anim_01_png );
  animation.addSpriteFrameWithFile( res.mon3_anim_02_png );
  animation.addSpriteFrameWithFile( res.mon3_anim_03_png );
  animation.addSpriteFrameWithFile( res.mon3_anim_04_png );
  animation.addSpriteFrameWithFile( res.mon3_anim_05_png );

  animation.setDelayPerUnit( 0.05 );
  return cc.RepeatForever.create( cc.Animate.create( animation ) );
},

monTypeUAnimation:function(){
  var animation = new cc.Animation.create();
  animation.addSpriteFrameWithFile( res.mon4_anim_01_png );
  animation.addSpriteFrameWithFile( res.mon4_anim_02_png );
  animation.addSpriteFrameWithFile( res.mon4_anim_03_png );
  animation.addSpriteFrameWithFile( res.mon4_anim_04_png );
  animation.addSpriteFrameWithFile( res.mon4_anim_05_png );

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
      cc.audioEngine.playEffect( res.impact_mp3 );
    if(this.player.drillType != this.monType&&this.player.drillType!='X'){
      cc.audioEngine.playEffect( res.oops_wav );
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