var Item = cc.Sprite.extend({
	ctor:function(layer){
		this._super();
    this.layer  = layer
    this.player = layer.player;
    var top = 300;
    console.log('create');
    this.setPosition(screenWidth+this.getBoundingBox().width,top);
    this.init();
  },

  update: function( dt ) {
    this.move();
    this.speed = this.layer.floorSpeed; //speed
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

outOfScreen:function(){
  return this.getPosition().x<-this.getBoundingBox().width+this.speed;
},

move:function(){
 this.setPositionX( this.getPositionX() - this.speed);  
},
});

Item.speed = -2; // move to left.


var RainbowDrill = Item.extend({
  init :function(){
    console.log('init');
    console.log(this.speed);
    console.log('rainbow drill this created');
  },

  effectToPlayer:function(){
    if(this._super.isHit(this.player.getPlayerRect())){
      this.player.drillType = 'X';
      this.layer.xModeTime += 3;
      this.removeFromParent();
    }
  },
});

var SpeedUp = Item.extend({
  init :function(){
    console.log('item speed up');
  },

  effectToPlayer:function(){
    if(this._super.isHit(this.player.getPlayerRect())){
      this.floorSpeed++;
      //this.layer.xModeTime += 3;
      this.removeFromParent();
    }
  },
});

var SpeedDown = Item.extend({
  init :function(){
    console.log(this.speed);
  },


  effectToPlayer:function(){
    if(this._super.isHit(this.player.getPlayerRect())){
      this.floorSpeed--;
      //this.layer.xModeTime += 3;
      this.removeFromParent();
    }
  },

});