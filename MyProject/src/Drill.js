var Drill = cc.Sprite.extend({
	ctor:function(player){
		this._super();
		this.initWithFile(res.dirll5_png);
		this.player = player
		this.count = 0;
		this.up = true;
	
	},
	update:function(dt){
		this.setPosition(this.player.getPosition().x+this.width-6.5,this.player.getPosition().y-this.getBoundingBox().height/2+this.player.drillDist);
		this.switchDrill(this.player.drillType);
	},
	switchDrill:function(type){
		if(type == 'R')this.initWithFile( res.dirll2_png );
		if(type == 'L')this.initWithFile( res.dirll3_png );
		if(type == 'U')this.initWithFile( res.dirll4_png );
		if(type == 'D')this.initWithFile( res.dirll_png  );
		if(type == 'N')this.initWithFile( res.dirll5_png );
		if(type == 'X'){}
	}

});