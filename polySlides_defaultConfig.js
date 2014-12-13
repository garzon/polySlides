/*
 * @author Garzon Ou
 */

window.polySlides.defaultConfig={ 
	"background": "#FFFFFF", 
	"template": "default", 
	"js": "", 
	"next":"+1",
};

window.polySlides.tagMap={
	"iframe": "div",
	"latex": "div",
	"b": "p"
};

window.polySlides.handlers={
	"setLink": function(node, inner){ 
		node.href=inner; 
		node.innerHTML=inner;
	},
	"setBold": function(node, inner){ 
		var b=document.createElement("b");
		b.innerHTML=inner;
		var p=document.createElement("p");
		p.appendChild(b);
		node.appendChild(p);
	},
	"setSrc": function(node, inner){ node.src=inner; },
	"setMyIframe": function(node, inner){ $(node).load(inner); },
	"addLaTeX": function(node, inner){ 
		var img=document.createElement("img");
		img.src="http://latex.codecogs.com/png.latex?"+inner;
		node.appendChild(img);
	}
};

window.polySlides.innerHandlerName={
	"a": "setLink",
	"b": "setBold",
	"img": "setSrc",
	"iframe": "setMyIframe",
	"latex": "addLaTeX"
};
