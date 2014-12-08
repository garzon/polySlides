
// Particle START -----------------------------------

var c1=0.28,c2=0.13;
var phi=c1+c2;
var wm=0.8;

function peak(x, center){
	return -Math.exp(-sub(x, center).abs()*0.32);
}

function cost(p){
	var sum=0;
	for(i in Fcenters){
		sum+=peak(p, Fcenters[i]);
	}
	return sum*(6+Math.sin(p.x));
}

function drawCost(ctx){

	imgPixels = ctx.createImageData(w, h);
	//imgPixels = context.getImageData(0, 0, w, h);
	var pix = imgPixels.data;
	var fmin=99999999,fmax=-99999999, global_min;
	for(y=0;y<h;y++){
		for(x=0;x<w;x++){
			var nx=map(x,0,w,bound_x[0],bound_x[1]);
			var ny=map(y,0,h,bound_y[0],bound_y[1]);
			var val=cost(new Vector(nx,ny));
			if(val>fmax) fmax=val;
			if(val<fmin){
				fmin=val;
				global_min=new Vector(x,y);
			}
		}
	}
	var i=0;
	for(y=0;y<h;y++){
		for(x=0;x<w;x++){
			var nx=map(x,0,w,bound_x[0],bound_x[1]);
			var ny=map(y,0,h,bound_y[0],bound_y[1]);
			var val=cost(new Vector(nx,ny));
			val=Math.round(map(val,fmin,fmax,0,255));
			if(val%30!=0){
				pix[i  ] = val;
				pix[++i] = 255-val;
				pix[++i] = 0;
				pix[++i] = 255;
				pix[++i] = 255;
			}else{
				pix[i  ] = 0;
				pix[++i] = 0;
				pix[++i] = 0;
				pix[++i] = 255;
				pix[++i] = 255;
			}
		}
	}
	ctx.putImageData(imgPixels, 0, 0);
	return global_min;
}

function mapVector(v){
	var newX=map(v.x,bound_x[0],bound_x[1],0,w);
	var newY=map(v.y,bound_y[0],bound_y[1],0,h);
	return new Vector(newX, newY);
}

function Particle(ctx){
	this.ctx=ctx;
	this.pos=new Vector(map(Math.random(),0,1,bound_x[0],bound_x[1]), map(Math.random(),0,1,bound_y[0],bound_y[1]));
	this.cost=cost(this.pos);
	this.hist=this.pos.clone();
	this.histCos=cost(this.pos);
	this.v=new Vector(0,0);
}

Particle.prototype.update=function(global_pos){
	var pos=this.pos;
	this.pos=add(this.pos,this.v);
	if(this.pos.x>bound_x[1]) this.pos.x=bound_x[1];
	if(this.pos.x<bound_x[0]) this.pos.x=bound_x[0];
	if(this.pos.y>bound_y[1]) this.pos.y=bound_y[1];
	if(this.pos.y<bound_y[0]) this.pos.y=bound_y[0];
	var t1=cmul(c1*Math.random(),sub(global_pos,pos));
	var t2=cmul(c2*Math.random(),sub(this.hist,pos));
	this.v=cmul(wm,add(this.v,add(t1,t2)));
	this.cost=cost(this.pos);
	if(this.cost<this.histCos){
		this.hist=this.pos.clone();
		this.histCos=this.cost;
	}
}

Particle.prototype.draw=function(){
	drawPoint(this.ctx, mapVector(this.pos), "#000000");
	drawArrow(this.ctx, mapVector(this.pos), mapVector(add(this.pos,this.v)));
}

// Particle END ------------------------------------