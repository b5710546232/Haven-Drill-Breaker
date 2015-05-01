var HowToScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new HowToLayer();
        layer.init();
        this.addChild(layer);
    },
});

var HowToLayer = cc.LayerColor.extend({
    init: function() {
        this.howToPage = new HowToPage()
        this.addChild(this.howToPage);
        this.createBackButton();
        return true;
    },
    createBackButton: function() {
        this.backButItem = new cc.MenuItemImage(
            res.backToMenu_But_png,
            res.backToMenu2_But_png,
            function() {
                cc.audioEngine.playEffect(res.press_mp3);
                cc.director.runScene(new StartScene());
            }, this);
        this.backButton = new cc.Menu(this.backButItem);
        this.addChild(this.backButton);
        var deltaDistance = -80 * 2;
        this.backButton.setPosition(200, (screenHeight / 2) + deltaDistance);
    },

});
var HowToPage = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.howToPlay_png);
        this.setPosition(screenWidth / 2, screenHeight / 2);
    },
});