var Drill = cc.Sprite.extend({
	ctor:function(player){
		this._super();
		this.initWithFile('res/images/Drill.png');
		this.player = player
		this.count = 0;
		this.up = true;
	
	},
	update:function(dt){
		this.setPosition(this.player.getPosition().x+this.width-6,this.player.getPosition().y-this.getBoundingBox().height/2);
		this.switchDrill(this.player.drillType);
	},
	switchDrill:function(type){
		if(type == 'R')this.initWithFile('res/images/Drill2.png');
		if(type == 'L')this.initWithFile('res/images/Drill3.png');
		if(type == 'U')this.initWithFile('res/images/Drill4.png');
		if(type == 'D')this.initWithFile('res/images/Drill.png');
		if(type == 'N')this.initWithFile('res/images/Drill5.png');
		if(type == 'X'){}
	}

});