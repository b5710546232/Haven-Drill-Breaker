var Floor = cc.Sprite.extend({
	ctor:function(layer){
		this._super();
		this.initWithFile(res.floor_png);
		this.speed = 0;
        this.player = layer.player;
        this.layer = layer;
    },
    update: function( dt ) {
        this.sideHitPlayer(this.layer);
        this.setPositionX( this.getPositionX() - this.speed);   
        this.playerIsOnTop(this.player);
        this.destroy();
        this.gameOver(this.layer,this.player);

 },
    create: function(layer){
    if(layer.FloorSets.length>0){
        layer.createFloor();
    }
},
    playerIsOnTop:function(player){
    var playerRect = player.getBoundingBoxToWorld();
    var top =  cc.rectGetMaxY(this.getBoundingBoxToWorld())+playerRect.height/2;
    if(this.checkCollision  (player.getPlayerRectFoot())&&!player.isDie){
        player.isOnGround();
        player.setPosition(this.player.getPosition().x,top);

    }
},
    sideHitPlayer:function(layer){
        if(this.checkCollision (layer.player.getPlayerRectSideR())){
             console.log('side');
             layer.player.playSoundHit();
             layer.gameOver();
        }
    },
    gameOver:function(layer){
        if(layer.isGameOver){
            this.stopMove();
        }
    },
    destroy:function(){
        if(this.outOfScreen()){
            this.removeFromParent();
        }
    },
    loop: function(){
      this.setPositionX(900);
  },
  outOfScreen: function(){
    return this.getPosition().x<-this.getBoundingBox().width+this.speed;
},
    stopMove: function(){
 this.speed = 0;
},
    run: function(speed){
    this.speed = speed;
},
    getTopY: function() {
    return cc.rectGetMaxY( this.getBoundingBoxToWorld() );
},
    getFloorRect: function() {
    var spriteRect = this.getBoundingBoxToWorld();
    var spritePos = this.getPosition();

    var dX = this.x - spritePos.x;
    var dY = this.y - spritePos.y;
    return cc.rect( spriteRect.x + dX,
            spriteRect.y + dY,
            spriteRect.width,
            spriteRect.height );
},
    checkCollision :function( playerRect) {
    return cc.rectOverlapsRect(this.getFloorRect(),playerRect);

},

});