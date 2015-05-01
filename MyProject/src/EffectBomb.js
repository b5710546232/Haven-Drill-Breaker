var EffectBomb = cc.Sprite.extend({
    ctor: function(monster) {
        this._super();
        this.initWithFile(res.effect01_png);
        this.mon = monster;
        this.setPosition(this.mon.getPosition().x, this.mon.getPosition().y);
        this.count = 0;
        this.runAction(this.bombAnim());

    },
    update: function(dt) {
        this.count += dt;
        if (this.count > 0.3) {
            this.removeFromParent();
        }
    },
    bombAnim: function() {
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile(res.effect01_png);
        animation.addSpriteFrameWithFile(res.effect02_png);
        animation.addSpriteFrameWithFile(res.effect03_png);
        animation.addSpriteFrameWithFile(res.effect04_png);
        animation.addSpriteFrameWithFile(res.effect05_png);

        animation.setDelayPerUnit(0.05);
        return cc.Animate.create(animation);

    },

});