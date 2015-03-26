var Player = cc.Sprite.extend({
ctor:function(){
		this._super();
		this.initWithFile('res/images/Player.png');
		this.vy = 0;
		this.canJump = false;
		this.grounded = false;
        this.isStart =  false;
        this.drillType='R';
        this.hp = 5;
        console.log('hp = '+this.hp);
    },
update: function( dt ) {
        var pos = this.getPosition();
        this.setPosition(new cc.Point( pos.x, pos.y+this.vy));
        if(this.isStart){
            this.vy += Player.G;
        }
    },
switchDrillType:function(keycode){
    if(keycode==37){//left
        this.drillType = "L";
    }
    if(keycode==39){//right
        this.drillType = "R";
    }
    if(keycode==38){//up
        this.drillType = "U";
    }
    if(keycode==40){//down
        this.drillType = "D";
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
    var bodyHeight = 40;
    var bodyWidth = 30;
    return cc.rect(this.x , spriteRect.y,this.x,bodyHeight);
},

getPlayerRectFoot:function(){
    var spriteRect = this.getBoundingBoxToWorld();
    var footHeight = 10;
    var footWidth = 10;
    return cc.rect(this.x, spriteRect.y,footWidth,footHeight);
},
getPlayerRectSideR:function(){
    var spriteRect = this.getBoundingBoxToWorld();
    var spritePos = this.getPosition();
    var Height = 32;
    var Width = 10;
    var RectPosX= this.x+(this.x-spriteRect.x)-Width;
    var dY = spritePos.y-(spriteRect.y+Height/2);
    return cc.rect(RectPosX,spriteRect.y + dY,Width,Height)
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
isDead: function(){
    this.grounded = false;
    this.canJump = false;
    this.vy+=Player.G;
    return true;
}
});
Player.JUMP = 15;
Player.G = -1;
Player.STARTING_VELOCITY=1;