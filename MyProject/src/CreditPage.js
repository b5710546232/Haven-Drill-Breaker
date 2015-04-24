var CreditScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new CreditLayer();
        layer.init();
        this.addChild( layer );
    },
});

var CreditLayer = cc.LayerColor.extend({
    init: function() {
        this.creditsPage = new CreditsPage()
        this.addChild(this.creditsPage);
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
      	this.backButton.setPosition(screenWidth/2,(screenHeight/2)+deltaDistance);
    },

});
var CreditsPage = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile('res/images/SceneComponent/credits.png');
        this.setPosition(screenWidth/2,screenHeight/2);
    },
});