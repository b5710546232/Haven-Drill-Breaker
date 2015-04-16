var Player = cc.Sprite.extend({
  ctor:function(){
    this._super();
    this.initWithFile('res/images/player/Player.png');
    this.vy = 0;
    this.canJump = false;
    this.grounded = false;
    this.isStart =  false;
    this.drillType='N';
    this.hp = 10;
    this.isRunning = false;
    this.isJummping = true;
    this.isDie = false;
    this.runningAction = this.runAnim();
    this.jumpAction = this.jumpAnim();
    this.runAction(this.jumpAction);
    this.drillDist = 0;
    this.drillDown = false;
  },
  update: function( dt ) {
    var pos = this.getPosition();
    this.setPosition(new cc.Point( pos.x, pos.y+this.vy));
      if(this.isStart){
        this.vy += Player.G;
      }
    this.checkStatus();
    this.manangeAnim();
    this.drillDistMovement();
  },

  drillDistMovement:function(){
     if(!this.drillDown){
      this.drillDist+=0.4;
        if(this.drillDist>4){
          this.drillDown = true;
        }
    }

    if(this.drillDown){
      this.drillDist-=0.4;
        if(this.drillDist<0){
          this.drillDown = false;
        }
    }

},
manangeAnim:function(){
  if(this.isRunning==false&&this.grounded){
    this.stopAction(this.jumpAction);
    this.runAction(this.runningAction);
    this.isRunning = true;
    this.isJummping = false
  }
  else if(this.canJump&&!this.grounded){ 
   this.isRunning=false;
   if(this.isJummping == false){
    this.stopAction(this.runningAction);
    this.runAction(this.jumpAction);
    this.isJummping = true; 
  }
}
},
jumpAnim:function(){
  var animation  = new cc.Animation.create();
  animation.addSpriteFrameWithFile( 'res/images/player/run_anim/run0001.png' );
  animation.setDelayPerUnit( 0.01 );
  return cc.RepeatForever.create( cc.Animate.create( animation ) );
},
runAnim:function(){
  var animationRun = new cc.Animation.create();
  animationRun.addSpriteFrameWithFile( 'res/images/player/run_anim/run0001.png' );
  animationRun.addSpriteFrameWithFile( 'res/images/player/run_anim/run0002.png' );
  animationRun.addSpriteFrameWithFile( 'res/images/player/run_anim/run0003.png' );
  animationRun.addSpriteFrameWithFile( 'res/images/player/run_anim/run0004.png' );
  animationRun.addSpriteFrameWithFile( 'res/images/player/run_anim/run0005.png' );
  animationRun.addSpriteFrameWithFile( 'res/images/player/run_anim/run0006.png' );
  animationRun.addSpriteFrameWithFile( 'res/images/player/run_anim/run0007.png' );
  animationRun.addSpriteFrameWithFile( 'res/images/player/run_anim/run0008.png' );
  animationRun.addSpriteFrameWithFile( 'res/images/player/run_anim/run0009.png' );
  animationRun.addSpriteFrameWithFile( 'res/images/player/run_anim/run0010.png' );
  animationRun.setDelayPerUnit( 0.05 );
    // return cc.Animate.create( animationRun );
    return cc.RepeatForever.create( cc.Animate.create( animationRun ) );

  } ,   
  checkStatus:function(){
    if(this.hp<=0){
      this.death();
    }
  },
  switchDrillType:function(){
    if(GameLayer.KEYS[cc.KEY.left]){//left
      this.drillType = "L";
    }
    else if(GameLayer.KEYS[cc.KEY.right]){//right
      this.drillType = "R";
    }
    else if(GameLayer.KEYS[cc.KEY.up]){//up
      this.drillType = "U";
    }
    else if(GameLayer.KEYS[cc.KEY.down]){//down
      this.drillType = "D";
    }
    else if( this.drillType != 'X')this.drillType = 'N';
  },
  startToPlay: function() {
    this.vy += Player.G;
    return !this.isStart
  },
  jump: function() {
    if(this.grounded){
     this.canJump = true;
     this.vy = Player.JUMP;
     this.grounded = false;
   }
   else if(!this.grounded&&this.canJump){
     this.vy = Player.JUMP*0.8;
     this.canJump = false;
   }

 },
 getPlayerRect:function(){
   var spriteRect = this.getBoundingBoxToWorld();
   var spritePos = this.getPosition();
   var dX = this.x - spritePos.x;
   var dY = this.y - spritePos.y;
   return cc.rect( spriteRect.x + dX,
    spriteRect.y + dY,
    spriteRect.width,
    spriteRect.height );
 },
 getPlayerBodyRect:function(){
  var spriteRect = this.getBoundingBoxToWorld();
  var bodyHeight = 30;
  var bodyWidth = 3;
  return cc.rect(spriteRect.x, spriteRect.y,bodyWidth,bodyHeight);
},

getPlayerRectFoot:function(){
  var spriteRect = this.getBoundingBoxToWorld();
  var footHeight = 10;
  var footWidth = 20;
  return cc.rect(spriteRect.x+this.getBoundingBox().width/2, spriteRect.y,footWidth,footHeight);
},
getPlayerRectSideR:function(){
  var spriteRect = this.getBoundingBoxToWorld();
  var spritePos = this.getPosition();
  var Height = 32;
  var Width = 10;
  var RectPosX= this.x+(this.x-spriteRect.x)-Width;
  return cc.rect(RectPosX,this.y,Width,Height)
},
isOnGround: function(){
 this.vy=0;
 this.grounded = true;

},
isOnAir: function(){
 this.vy+=Player.G;
 this.grounded = false;
 this.canJump = false;
 // this.unschedule(this.stopAction(this.movingAction));
},
isFall:function(){
  if(this.y<0){
    return true;
  }
  return false;

},
death: function(){
  if(!this.isDie){
    this.vy = Player.JUMP*0.8;
  }
  this.isDie = true;
  this.grounded = false;
  this.canJump = false;
  return true;
}
});
Player.JUMP = 15;
Player.G = -1;
Player.STARTING_VELOCITY=1;