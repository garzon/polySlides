// Vector START -----------------------------------

function Vector(x,y){
	this.x=x; this.y=y;
}

function vmul(u,v){
	return u.x*v.x+u.y*v.y;
}

Vector.prototype.abs=function(){
	return Math.sqrt(vmul(this,this));
}

Vector.prototype.clone=function(){
	return new Vector(this.x,this.y);
}

function add(a,b){
	return new Vector(a.x+b.x,a.y+b.y);
}

function sub(a,b){
	return new Vector(a.x-b.x,a.y-b.y);
}

function cmul(c,v){
	return new Vector(c*v.x,c*v.y);
}

// Vector END ------------------------------------