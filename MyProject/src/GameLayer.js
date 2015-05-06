var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super(new cc.Color(127, 127, 127, 255));
        this.setPosition(new cc.Point(0, 0));
        this.addKeyboardHandlers();
        this.initComponent();
        this.isTouchDevice();
        this.scheduleUpdate();
        this.isStart = true;
        return true;
    },

    update: function(dt) {
        this.counterTime(dt);
        this.floorManage();
        this.gameStart();
        this.playerHitSideFloorSet();
        this.playerOutScreen();
        this.updateScore(this.score);
        this.setPosition(0, 0);
    },

    isTouchDevice:function(){
        if (is_touch_device()){
            // console.log("I am touch device")
            this.createUIButton();
        } else {
            // console.log("I am computer")
        }

    },

    createJumpButton:function(){
        this.jumpButton = new ccui.Button();
        this.jumpButton.loadTextures(res.jump_B_png,res.jump_B_S_png);
        this.jumpButton.setPosition(100,80);
        this.jumpButton.addTouchEventListener(this.touchJumpButton,this);
        this.addChild(this.jumpButton,5);
    },

    touchJumpButton:function(sender,type){
        switch(type)
        {
            case ccui.Widget.TOUCH_BEGAN:
            this.player.jump();
            break;
        }

    },

    createUIButton:function(){
        this.createDrillRButton();
        this.createDrillLButton();
        this.createDrillUButton();
        this.createDrillDButton();
        this.createJumpButton();
    },


    createDrillRButton:function(){
        this.drillRButton = new ccui.Button();
        this.drillRButton.loadTextures(res.drillRB_png,res.drillRB_S_png);
        this.drillRButton.setPosition(710,100);
        this.drillRButton.addTouchEventListener(this.touchDrillRButton,this);
        this.addChild(this.drillRButton,5);
    },
    touchDrillRButton:function(sender,type){
        switch(type)
        {
            case ccui.Widget.TOUCH_BEGAN:
             if (this.player.drillType != 'X')
            GameLayer.KEYS[cc.KEY.right]  = true;
            cc.audioEngine.playEffect(res.drill_wav);
            this.player.switchDrillType();
            break;
              case ccui.Widget.TOUCH_ENDED:
            GameLayer.KEYS[cc.KEY.right] = false;
            this.player.drillType = 'N';
            break;
        }


    },

    createDrillLButton:function(){
        this.drillLButton = new ccui.Button();
        this.drillLButton.loadTextures(res.drillLB_png,res.drillLB_S_png);
        this.drillLButton.setPosition(590,100);
        this.drillLButton.addTouchEventListener(this.touchDrillLButton,this);
        this.addChild(this.drillLButton,5);
    },
    touchDrillLButton:function(sender,type){
        switch(type)
        {
            case ccui.Widget.TOUCH_BEGAN:
             if (this.player.drillType != 'X')
            GameLayer.KEYS[cc.KEY.left]  = true;
            cc.audioEngine.playEffect(res.drill_wav);
            this.player.switchDrillType();
            break;
              case ccui.Widget.TOUCH_ENDED:
            GameLayer.KEYS[cc.KEY.left] = false;
            this.player.drillType = 'N';
            break;
        }


    },
    createDrillUButton:function(){
        this.drillUButton = new ccui.Button();
        this.drillUButton.loadTextures(res.drillUB_png,res.drillUB_S_png);
        this.drillUButton.setPosition(652,160);
        this.drillUButton.addTouchEventListener(this.touchDrillUButton,this);
        this.addChild(this.drillUButton,5);
    },
    touchDrillUButton:function(sender,type){
        switch(type)
        {
            case ccui.Widget.TOUCH_BEGAN:
             if (this.player.drillType != 'X')
            GameLayer.KEYS[cc.KEY.up]  = true;
            cc.audioEngine.playEffect(res.drill_wav);
            this.player.switchDrillType();
            break;
              case ccui.Widget.TOUCH_ENDED:
            GameLayer.KEYS[cc.KEY.up] = false;
            this.player.drillType = 'N';
            break;
        }


    },
     createDrillDButton:function(){
        this.drillDButton = new ccui.Button();
        this.drillDButton.loadTextures(res.drillDB_png,res.drillDB_S_png);
        this.drillDButton.setPosition(652,40);
        this.drillDButton.addTouchEventListener(this.touchDrillDButton,this);
        this.addChild(this.drillDButton,5);
    },
    touchDrillDButton:function(sender,type){
        switch(type)
        {
            case ccui.Widget.TOUCH_BEGAN:
             if (this.player.drillType != 'X')
            GameLayer.KEYS[cc.KEY.down]  = true;
            cc.audioEngine.playEffect(res.drill_wav);
            this.player.switchDrillType();
            break;
              case ccui.Widget.TOUCH_ENDED: 
            GameLayer.KEYS[cc.KEY.down] = false;
            this.player.drillType = 'N';
            break;
             // console.log('Touch down');
            break;
              case ccui.Widget.TOUCH_MOVED:
              // console.log('Touch move');
            break;
              case ccui.Widget.TOUCH_ENDED:
              // console.log('Touch end');
            break;
              case ccui.Widget.TOUCH_CANCELLED:
              // console.log('Touch cancelled');
            break;
        }


    },

    createPauseButton:function(){
        this.pauseButton = new ccui.Button();
        this.pauseButton.loadTextures(res. pause_B_png,res. pause_B_S_png);
        this.pauseButton.setPosition(580,418);
        this.pauseButton.addTouchEventListener(this.touchPauseButton,this);
        this.addChild(this.pauseButton);
        
    },

    touchPauseButton:function(sender,type){
        switch(type)
        {
            case ccui.Widget.TOUCH_BEGAN:
             this.pauseLabel.setString("Pause");
            if(!this.isPause){
                this.pauseButton.loadTextures(res.play_B_png,res.play_B_S_png);
                this.isPause = true;
                cc.director.pause();
            }
            else{
                this.pauseButton.loadTextures(res. pause_B_png,res. pause_B_S_png);
                this.isPause = false;
                cc.director.resume();
                this.pauseLabel.setString("");
            }
            // console.log('Touch down');
            break;
              case ccui.Widget.TOUCH_MOVED:
              // console.log('Touch move');
            break;
              case ccui.Widget.TOUCH_ENDED:
              // console.log('Touch end');
            break;
              case ccui.Widget.TOUCH_CANCELLED:
              // console.log('Touch cancelled');
            break;
        }

    },

    createPauseText:function(){
        this.pauseLabel = cc.LabelTTF.create('0', 'Arial', 55);
        this.pauseLabel.setPosition(screenWidth/2,screenHeight/2);
        this.addChild(this.pauseLabel,5);
        this.pauseLabel.setString("");
        this.pauseOpacityDt = 0;
        this.pauseIsMotionOn = false;
    },

    initComponent: function() {
        this.createPlayer();
        this.createDrill();
        this.createStatusBar();
        this.initCondition();
        this.initFloorSets();
        this.initTimer();
        this.createBG();
        this.createScoreLabel();
        this.createComboText();
        this.initSound();
        this.createPauseText();
        this.createPauseButton();

    },
    createComboText: function() {
        this.combo = new ComboText(this)
        this.addChild(this.combo, 10);

    },

    createStatusBar: function() {
        this.avatar = new Avatar();
        this.addChild(this.avatar, 6);
        this.hpBarRed = new HpBarRed();
        this.addChild(this.hpBarRed, 4);
        this.hpBarGreen = new HpBarGreen(this.player);
        this.addChild(this.hpBarGreen, 5);
        this.signLevelUp = new SignLevelUp(this);
        this.addChild(this.signLevelUp, 5);
    },

    shakeScreen: function() {
        var shakeForce = 8;
        this.setPosition(0, shakeForce);
    },

    speedLevelUp: function() {
        if (!this.isGameOver) {
            if (this.floorSpeed < GameLayer.MAX_SPEED) {
                this.floorSpeed++;
                this.signLevelUp.call = true;
            }
            if(this.floorSpeed==GameLayer.MAX_SPEED){
                console.log('speed max');
            }
            this.floorSetsRun(this.floorSets, this.floorSpeed);
            this.floorSetsRun(this.floorSets2, this.floorSpeed);
        }
    },

    createItem: function() {
        var ran = 1 + Math.floor(Math.random() * 4);
        if (ran == 1) {
            var spdU = new SpeedUp(this);
            spdU.scheduleUpdate();
            this.addChild(spdU);
        }
        if (ran == 2) {
            var spdD = new SpeedDown(this);
            spdD.scheduleUpdate();
            this.addChild(spdD);
        }
        if (ran == 3) {
            var rbD = new RainbowDrill(this);
            rbD.scheduleUpdate();
            this.addChild(rbD);
        }
        if (ran == 4) {
            var hpUp = new HpUpItem(this);
            hpUp.scheduleUpdate();
            this.addChild(hpUp);
        }

    },

    initSound: function() {
        cc.audioEngine.playMusic(res.sound_bg_mp3, true);
    },


    updateScore: function(score) {
        this.scoreLabel.setString("Score : " + score);
        this.scoreLabel.setScale(1 + this.scoreScaleDt, 1 + this.scoreScaleDt);
        this.motionScoreLabel();

    },

    motionScoreLabel: function() {
        if (this.scoreLabelIsOn) {
            this.scoreScaleDt += 0.025;
            if (this.scoreScaleDt >= 0.25) {
                this.scoreLabelIsOn = false;
            }
        } else {
            this.scoreScaleDt -= 0.025;
            if (this.scoreScaleDt <= 0) {
                this.scoreScaleDt = 0;
            }
        }
    },

    initCondition: function() {
        this.scoreMax = ScoreRecord
        this.isStart = false;
        this.checkFloorCreate = false;
        this.isGameOver = false;
        this.score = 0;
        this.drillSFX = false;
        this.ItemCreatedTimer = 0;
        this.speedDt = 0;
        this.firstRun = false;
        this.isPause = false;
    },


    createDrill: function() {
        this.drill = new Drill(this.player);
        this.drill.scheduleUpdate();
        this.addChild(this.drill, 3);

    },

    createScoreLabel: function() {
        this.scoreLabel = cc.LabelTTF.create('0', 'Arial', 25);
        this.scoreLabel.setPosition(new cc.Point(680, 400));
        this.addChild(this.scoreLabel);
        this.scoreScaleDt = 0;
        this.scoreLabelIsOn = false;

        this.scoreMaxLabel = cc.LabelTTF.create('0', 'Arial', 15);
        this.scoreMaxLabel.setPosition(new cc.Point(680, 420));
        this.addChild(this.scoreMaxLabel);
        this.scoreMaxLabel.setString("High Score : " + this.scoreMax);
    },

    createBG: function() {
        this.bg = new PackBackGround(this);
        this.addChild(this.bg, 0);
    },

    initTimer: function() {
        this.totalDeltaTime = 0;
        this.counterSec = 0;
        this.delayRainbowDrill = 0;
        this.xModeTime = 0;
        this.speedDtTime = 0;
        this.timeLimitLevelUp = 20;
    },

    counterTime: function(dt) {
        if (this.isStart) {
            this.totalDeltaTime += dt;
        }
        if (this.totalDeltaTime > 1) {
            this.counterSec++;
            this.delayRainbowDrill++;
            this.totalDeltaTime = 0;
            this.ItemCreatedTimer++
                this.XModeDelay();
            this.speedDtDelay();
        }

        if (this.counterSec > this.timeLimitLevelUp && this.isStart) {
            this.speedLevelUp();
            this.counterSec = 0; // reset to count again.
        }

        if (this.ItemCreatedTimer > 15 && !this.isGameOver) {
            this.createItem();
            var ran = 1 + Math.floor(Math.random() * 2)
            if (ran == 1) {
                this.ItemCreatedTimer = -0;
            }
            if (ran == 2) {
                this.ItemCreatedTimer = -5;
            }
        }

    },

    XModeDelay: function() {

        if (this.xModeTime > 0) {
            this.xModeTime--;
        }
        if (this.xModeTime <= 0 && this.player.drillType == 'X') {
            this.xModeTime = 0;
            this.player.drillType = 'N';
        }

    },

    speedDtDelay: function() {

        if (this.speedDtTime > 0) {
            this.speedDtTime--;
        }
        if (this.speedDtTime <= 0 && this.speedDt != 0) {
            this.speedDtTime = 0;
            this.speedDt = 0;
        }

    },

    playerHitSideFloorSet: function() {
        this.playerRightSideHitGround(this.floorSets);
        this.playerRightSideHitGround(this.floorSets2);
    },

    initFloorSets: function() {
        this.floorSpeed = 0;
        this.floorSets2 = [];
        this.floorSets = this.createFloors(0);
        this.floorSets2 = [];
        this.floorSets2 = this.createFloors(1);
    },

    floorManage: function() {
        var ran = 1 + Math.floor(Math.random() * this.numOfMap);
        // run
        if (this.floorSets[this.floorSets.length - 1].outOfScreen()) {
            this.floorSetsRun(this.floorSets2, this.floorSpeed);
        }
        //create
        if (this.floorSets[this.floorSets.length - 1].outOfScreen() && this.checkFloorCreate == false) {
            this.checkFloorCreate = true;
            this.floorSets = null;
            this.floorSets = this.createFloors(ran);

        }
        // run
        if (this.floorSets2[this.floorSets2.length - 1].outOfScreen()) {
            if (this.checkFloorCreate) {
                this.checkFloorCreate = false;
                this.floorSetsRun(this.floorSets, this.floorSpeed);
            }
            //create
            if (this.floorSets2[this.floorSets2.length - 1].outOfScreen()) {
                this.floorSets2 = null;
                this.floorSets2 = this.createFloors(ran)
            }
        }
    },
    createPlayer: function() {
        this.player = new Player();
        this.player.setPosition(new cc.Point(200, 300))
        this.addChild(this.player, 2)
        this.player.scheduleUpdate();
    },
    createRandomFloorsPatterns: function(num) {
        var map = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 0, 0, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 0, 1, 1, 0, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 0, 1, 0, 1, 1, 1],
            [0, 1, 0, 1, 0, 0, 1, 1],
        ];
        this.numOfMap = map.length - 1;
        return map[num];
    },
    createFloors: function(num) {
        var floorSet = [];
        var index = 0;
        var map = this.createRandomFloorsPatterns(num);
        for (var i = 0; i < map.length; i++) {
            if (map[i] == 1) {
                var floor = new Floor(this);
                if (num == 0) {
                    floor.setPosition(50 + 100 * i, 10);
                } else {
                    var floorWidth = 100;
                    floor.setPosition(floorWidth / 2 + screenWidth + (100 * i), 10);
                    var chanceCreateMon = 1 + Math.floor(Math.random() * 2)
                    if (chanceCreateMon != 1) {
                        var ranMonType = Math.floor(Math.random() * 4)
                        var monType = ['R', 'L', 'D', 'U']
                        var m = new Monster(floor, monType[ranMonType]);
                        var arrow = new Arrow(m);
                        arrow.scheduleUpdate();
                        this.addChild(arrow, 1);
                        m.scheduleUpdate();
                        this.addChild(m, 1);
                    }
                }
                floor.scheduleUpdate();
                this.addChild(floor, 1);
                floorSet.push(floor);
            }
        }
        this.FloorSetPosX = floorSet[floorSet.length - 1].getBoundingBox().x + 50;
        return floorSet;
    },

    gameStart: function() {
        if (this.isStart) {
            if (!this.firstRun) {
                this.floorSpeed = 3.5;
                this.firstRun = true;
            }
            this.player.startToPlay();
            this.floorSetsRun(this.floorSets, this.floorSpeed);
            this.floorSetsRun(this.floorSets2, this.floorSpeed);
        }
    },

    floorSetsRun: function(floorSets, speed) {
        for (var i = 0; i < floorSets.length; i++) {
            floorSets[i].run(speed + this.speedDt);
        }
    },

    gameOver: function() {
        this.player.death();
        if (COMBO_COUNT > 1) {
            this.scoreLabelIsOn = true;
            this.score += COMBO_COUNT;
        }
        COMBO_COUNT = 0;
        this.combo.isCombo = false;
        this.isGameOver = true;
        if (this.isGameOver) {
            this.shakeScreen();
        }
        this.floorSpeed = 0;
        this.speedDt = 0;
        this.floorSetsRun(this.floorSets, this.floorSpeed);
        this.floorSetsRun(this.floorSets2, this.floorSpeed);
        if (this.player.getPosition().y < -screenHeight / 2) {
            SCORE = this.score;
            if (this.score > ScoreRecord) {
                ScoreRecord = this.score;
            }
            cc.audioEngine.stopMusic(res.sound_bg_mp3);
            cc.director.runScene(new cc.TransitionFade(0.5,new GameOverScene()));
        }
    },

    setFloorsSpeed: function(floorSets, newSpeed) {
        for (var i = 0; i < floorSets.length; i++) {

            floorSets[i].speed = speed;
        }
    },

    playerOutScreen: function() {
        if (this.player.isFall()) {
            this.player.playSoundHit();
            this.gameOver();
        }
    },
    playerRightSideHitGround: function(floorSets) {
        for (var i = 0; i < floorSets.length; i++) {
            if (floorSets[i].checkCollision(this.player.getPlayerRectSideR())) {
                this.gameOver();

            }
        }
    },

    onKeyDownForCheck: function(e) {
        if (e == cc.KEY.up ||
            e == cc.KEY.down ||
            e == cc.KEY.right ||
            e == cc.KEY.left) {
            if (!this.drillSFX && !this.isGameOver) {
                cc.audioEngine.playEffect(res.drill_wav);
                this.drillSFX = true;
            }
        }
        //test ***********
            //  if(e==49){
            //     this.speedLevelUp();
            // }
            //     if ( e == 68) { //right
            //         this.player.setPosition(new cc.Point(this.player.getPosition().x+10
            //             ,this.player.getPosition().y));
            //     }
            //     if ( e == 65) {//right
            //         this.player.setPosition(new cc.Point(this.player.getPosition().x-10
            //             ,this.player.getPosition().y));
            //     }
            //     if ( e == 84) { //t stop
            //         this.isStart = false;
            //         Player.G = 0;
            //         this.player.vy=0;
            //         this.floorSetsRun(this.floorSets,0)
            //         this.floorSetsRun(this.floorSets2,0)
            //     }
            //     if( e==87){//up
            //      this.player.setPosition(new cc.Point(this.player.getPosition().x
            //         ,this.player.getPosition().y+10));
            //  }
            //     if(e==83){ //down
            //      this.player.setPosition(new cc.Point(this.player.getPosition().x
            //         ,this.player.getPosition().y-10));

            //  }
             //test ***********
        if(e==80){
            this.pauseLabel.setString("Pause");
             this.pauseButton.loadTextures(res.play_B_png,res.play_B_S_png);
            if(!this.isPause){
                this.isPause = true;
                cc.director.pause();
            }
            else{
                this.pauseButton.loadTextures(res. pause_B_png,res. pause_B_S_png);
                this.isPause = false;
                cc.director.resume();
                this.pauseLabel.setString("");
            }
        }
    },

    onKeyDown: function(e) {
        if (GameLayer.KEYS[cc.KEY.space]) {
            this.player.jump();
        }
        if (this.player.drillType != 'X') {
            if ((e == cc.KEY.up ||
                    e == cc.KEY.down ||
                    e == cc.KEY.right ||
                    e == cc.KEY.left)) {
                this.player.switchDrillType();
            }
        }
    },

    onKeyUp: function(e) {
        if (e != cc.KEY.up ||
            e != cc.KEY.down ||
            e != cc.KEY.right ||
            e != cc.KEY.left) {
            this.drillSFX = false;
            this.player.switchDrillType();
        } else if (e == cc.KEY.up ||
            e == cc.KEY.down ||
            e == cc.KEY.right ||
            e == cc.KEY.left) {
            this.player.drillType = 'N';
        }
    },

    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                GameLayer.KEYS[keyCode] = true;
                self.onKeyDown(keyCode);
                self.onKeyDownForCheck(keyCode);
            },
            onKeyReleased: function(keyCode, event) {
                GameLayer.KEYS[keyCode] = false;
                self.onKeyUp(keyCode);
            }
        }, this);
    },
});
GameLayer.KEYS = [];
var SCORE = 0;
GameLayer.MAX_SPEED = 11.5;
var ScoreRecord = 0;
var COMBO_COUNT = 0;