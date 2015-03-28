var Drill = cc.Sprite.extend({
	ctor:function(player){
		this._super();
		this.initWithFile('res/images/Drill.png');
		this.player = player

	},
	update:function(){
		this.setPosition(this.player.getPosition().x+this.width,this.player.getPosition().y);
		this.switchDrill(this.player.drillType);

	},
	switchDrill:function(type){
		if(type == 'R')this.initWithFile('res/images/Drill2.png');
		if(type == 'L')this.initWithFile('res/images/Drill3.png');
		if(type == 'U')this.initWithFile('res/images/Drill4.png');
		if(type == 'D')this.initWithFile('res/images/Drill.png');
		if(type == 'X'){}
	}

});