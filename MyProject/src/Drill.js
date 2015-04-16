var Drill = cc.Sprite.extend({
	ctor:function(player){
		this._super();
		this.initWithFile('res/images/drill/Drill.png');
		this.player = player
		this.count = 0;
		this.up = true;
	
	},
	update:function(dt){
		this.setPosition(this.player.getPosition().x+this.width-6.5,this.player.getPosition().y-this.getBoundingBox().height/2+this.player.drillDist);
		this.switchDrill(this.player.drillType);
	},
	switchDrill:function(type){
		if(type == 'R')this.initWithFile('res/images/drill/Drill2.png');
		if(type == 'L')this.initWithFile('res/images/drill/Drill3.png');
		if(type == 'U')this.initWithFile('res/images/drill/Drill4.png');
		if(type == 'D')this.initWithFile('res/images/drill/Drill.png');
		if(type == 'N')this.initWithFile('res/images/drill/Drill5.png');
		if(type == 'X'){}
	}

});