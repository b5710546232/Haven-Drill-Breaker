var Player = cc.Sprite.extend({
ctor:function(){
		this._super();
		this.initWithFile('res/images/PlayerTest2.png');
		this.vy = 0;
		this.canJump = false;
		this.grounded = false;
    this.isStart =  false;
    this.drillType='D';
    this.hp = 1;
    console.log('hp = '+this.hp);
    this.isDie = false;
    },
update: function( dt ) {
        var pos = this.getPosition();
        this.setPosition(new cc.Point( pos.x, pos.y+this.vy));
        if(this.isStart){
            this.vy += Player.G;
        }
        this.checkStatus();
    },
checkStatus:function(){
    if(this.hp<=0){
        this.isDie = true;
        this.death();
    }
},
switchDrillType:function(keycode){
    if(keycode==37){//left
        this.drillType = "L";
        //this.initWithFile('res/images/boxTest3.png');
    }
    if(keycode==39){//right
        this.drillType = "R";
        //this.initWithFile('res/images/boxTest.png');
    }
    if(keycode==38){//up
        this.drillType = "U";
        //this.initWithFile('res/images/boxTest4.png');
    }
    if(keycode==40){//down
        this.drillType = "D";
        //this.initWithFile('res/images/boxTest2.png');
    }
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
    var footWidth = 36;
    return cc.rect(spriteRect.x+footWidth/2, spriteRect.y,footWidth,footHeight);
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
},
isFall:function(){
    if(this.y<0){
        return true;
    }
    return false;

},
death: function(){
  this.jump();
    this.isDie = true;
    this.grounded = false;
    this.canJump = false;
    this.vy+=Player.G;
    return true;
}
});
Player.JUMP = 15;
Player.G = -1;
Player.G_OFDEAD = -0.8;
Player.STARTING_VELOCITY=1;