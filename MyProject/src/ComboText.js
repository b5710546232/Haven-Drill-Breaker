var ComboText = cc.Node.extend({
    ctor: function(layer) {
        this._super();
        this.layer = layer;
        this.opacity = 0;
        this.isCombo = false;
        this.isOn = false;
        this.scaleDt = 0;
        this.createComboText();
        this.scheduleUpdate();
    },
    createComboText:function(){
        this.textLabel = cc.LabelTTF.create('0', 'Arial', 30);
        this.textLabel.setString("Combo X " + COMBO_COUNT);
        this.setPosition(screenWidth / 2, screenHeight * (9.0 / 10));
        this.addChild(this.textLabel);
        this.textLabel.setOpacity(0);

    },
    update: function() {
        this.setPosition(screenWidth / 2, screenHeight * (9.0 / 10));
        this.textLabel.setString("Combo X " + COMBO_COUNT);
        this.textLabel.setOpacity(this.opacity);
        this.setScale(1 + this.scaleDt, 1 + this.scaleDt);
        this.motionOpcacity();

    },
    motionOpcacity:function(){
        if (this.isCombo) {
            if (this.opacity >= 250) {
                this.opacity = 255;
            } else {
                this.opacity += 25;
            }
            this.motionCombotext();
        } else {
            this.opacity = 0;
        }

    },
    motionCombotext: function() {
        if (this.isOn) {
            this.scaleDt += 0.01;
            if (this.scaleDt >= 0.1) {
                this.isOn = false;
            }
        } else {
            this.scaleDt -= 0.02;
            if (this.scaleDt <= 0) {
                this.scaleDt = 0;
            }
        }

    }
});