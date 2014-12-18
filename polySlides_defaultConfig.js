/*
 * @author Garzon Ou
 */

window.polySlides.defaultNodeType="p";

window.polySlides.defaultConfig={ 
	"background": "#FFFFFF", 
	"template": "default", 
	"js": "", 
	"next":"+1",
	"autoplay": "0"
};

window.polySlides.tagMap={
	"iframe": "div",
	"latex": "div",
	"b": "p"
};  // defines the real type of HTML tag of some custom TAG_NAME like "latex"

window.polySlides.handlers={
	"setLink": function(node, inner){ 
		node.href=inner; 
		node.innerHTML=inner;
	},
	"setBold": function(node, inner){ 
		var b=document.createElement("b");
		b.innerHTML=inner;
		node.appendChild(b);
	},
	"setSrc": function(node, inner){ node.src=inner; },
	"setMyIframe": function(node, inner){ $(node).load(inner); },
	"addLaTeX": function(node, inner){ 
		var img=document.createElement("img");
		img.src="http://latex.codecogs.com/png.latex?"+inner;
		node.appendChild(img);
	}
};  // defines the handler which is called to set the attribute of the created html tag(node)

window.polySlides.innerHandlerName={
	"a": "setLink",
	"b": "setBold",
	"img": "setSrc",
	"iframe": "setMyIframe",
	"latex": "addLaTeX"
};  // defines the handler which is needed to be called to set the node
