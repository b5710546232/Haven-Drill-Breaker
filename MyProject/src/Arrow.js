var Arrow = cc.Sprite.extend({
    ctor: function(monster) {
        this._super();
        this.initWithFile(res.arrow_png);
        this.mon = monster;
        this.initPosition();
    },
    initPosition:function(){
        var top = this.mon.getPosition().y + 55;
        this.setPosition(this.mon.getPosition().x, top);
        this.setArrow(this.mon.monType);
        this.setAnchorPoint(new cc.Point(0.5, 0.5));

    },
    update: function(dt) {
        this.setPositionX(this.getPositionX() - this.mon.speed);
        if (this.mon.monDie) {
            this.removeFromParent();
        }
    },
    setArrow: function(type) {
        if (type == 'R') this.setRotation(-270);
        if (type == 'L') this.setRotation(-90);
        if (type == 'U') this.setRotation(0);
        if (type == 'D') this.setRotation(-180);
    }

});