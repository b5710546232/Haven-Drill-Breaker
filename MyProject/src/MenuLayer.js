var MenuLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.bg = new MenuBackGround();
        this.initComponent();
        this.addChild(this.bg);
        this.scheduleUpdate();

        this.startItem = new cc.MenuItemImage(
            'res/images/SceneComponent/playBut.png',
            'res/images/SceneComponent/playBut.png',
            function () {
            cc.log('Click');
            cc.director.runScene(new GamePlayScene() );
         }, this);
        this.playButton = new cc.Menu(this.startItem);
        this.addChild(this.playButton);

        return true;
    },

    initComponent:function(){
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
