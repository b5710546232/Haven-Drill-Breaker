var MenuLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.bg = new MenuBackGround();
        this.createPlayButton();
        this.addChild(this.bg);
        this.scheduleUpdate();
        this.initComponent();
        return true;
    },

    initComponent:function(){
    this.createPlayButton();
    this.createHowToButton();
    },

    createPlayButton:function(){
      this.playButItem = new cc.MenuItemImage(
        'res/images/SceneComponent/playBut.png',
        'res/images/SceneComponent/playBut2.png',
        function () {
            cc.director.runScene(new GamePlayScene() );
        }, this);
      this.playButton = new cc.Menu(this.playButItem);
      this.addChild(this.playButton);
    },
    createHowToButton:function(){
      this.howToButItem = new cc.MenuItemImage(
        'res/images/SceneComponent/howtoPlay_But.png',
        'res/images/SceneComponent/howtoPlay_But2.png',
        function () {
            cc.director.runScene(new GamePlayScene() );
        }, this);
      this.howToButton = new cc.Menu(this.howToButItem);
      this.addChild(this.howToButton);
      var deltaDistance = -80;
      this.howToButton.setPosition(screenWidth/2,(screenHeight/2)+deltaDistance);
    },



    update: function(dt) {

    },
});

var MenuBackGround = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile('res/images/SceneComponent/mainMenuBG.png');
        this.setPosition(screenWidth/2,screenHeight/2);
    },
});



var GamePlayScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    },
});


var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild( layer );
    },
});
