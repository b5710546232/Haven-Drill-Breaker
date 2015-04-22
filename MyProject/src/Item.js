var Item = cc.Sprite.extend({
	ctor:function(layer){
		this._super();
    this.layer  = layer
    this.player = layer.player;
    var top = 320;
    this.setPosition(screenWidth+this.getBoundingBox().width,top);
    this.init();
    this.speedY = 1;
  },

  update: function( dt ) {
    this.move();
    this.destroy(this.player);
    this.effectToPlayer();
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
    return this.getPosition().x<-this.getBoundingBox().width+this.layer.floorSpeed;
  },

  move:function(){
   this.setPositionX( this.getPositionX() - this.layer.floorSpeed); //speed);  
  },

});

var RainbowDrill = Item.extend({
  init :function(){
    this.initWithFile('res/images/item/rainBowDrill.png');
  },

  effectToPlayer:function(){
    if(this.isHit(this.player.getPlayerRect())){
      this.player.drillType = 'X';
      this.layer.xModeTime += 5;
      this.removeFromParent();
    }
  },



});

var SpeedUp = Item.extend({
  init :function(){
    this.initWithFile('res/images/item/speedUpItem.png');
  },

  effectToPlayer:function(){
    if(this.isHit(this.player.getPlayerRect())){
      this.layer.speedDt+=3;
      this.layer.speedDtTime += 3;
      this.removeFromParent();
    }
  },
});

var SpeedDown = Item.extend({
  init :function(){
    this.initWithFile('res/images/item/speedDownItem.png');
  },


  effectToPlayer:function(){
    if(this.isHit(this.player.getPlayerRect())){
      this.layer.speedDt--;
      this.layer.speedDtTime += 3;
      this.removeFromParent();
    }
  },

});
var HpUpItem = Item.extend({
  init :function(){
    this.initWithFile('res/images/item/heartItem.png');
  },


  effectToPlayer:function(){
    if(this.isHit(this.player.getPlayerRect())){
      if(this.player.hp<Player.HP_MAX){
        this.player.hp++;
      }
      this.removeFromParent();
    }
  },

});