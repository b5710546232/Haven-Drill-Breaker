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
        return true;

    },
    createBackButton:function(){
    	this.backButItem = new cc.MenuItemImage(
    		res.backToMenu_But_png,
    		res.backToMenu2_But_png,
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
        this.initWithFile(res.credit_png);
        this.setPosition(screenWidth/2,screenHeight/2);
    },
});