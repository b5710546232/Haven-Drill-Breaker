var HowToScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new HowToLayer();
        layer.init();
        this.addChild( layer );
    },
});

var HowToLayer = cc.LayerColor.extend({
    init: function() {
        this.howToPage = new HowToPage()
        this.addChild(this.howToPage);
        this.createBackButton();

    },
    createBackButton:function(){
    	this.backButItem = new cc.MenuItemImage(
    		'res/images/SceneComponent/backtoMenu.png',
    		'res/images/SceneComponent/backtoMenu2.png',
    		function () {
    			cc.director.runScene(new StartScene() );
    		}, this);
    	this.backButton = new cc.Menu(this.backButItem);
    	this.addChild(this.backButton);
    	var deltaDistance = -80*2;
      	this.backButton.setPosition(200,(screenHeight/2)+deltaDistance);
    },

});
var HowToPage = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile('res/images/SceneComponent/howToPlay.png');
        this.setPosition(screenWidth/2,screenHeight/2);
    },
});