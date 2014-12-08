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
	"latex": "div"
};

window.polySlides.handlers={
	"setHref": function(node, inner){ node.href=inner; },
	"setSrc": function(node, inner){ node.src=inner; },
	"setMyIframe": function(node, inner){ $(node).load(inner); },
	"addLaTeX": function(node, inner){ 
		var img=document.createElement("img");
		img.src="http://latex.codecogs.com/png.latex?"+inner;
		node.appendChild(img);
	}
};

window.polySlides.innerHandlerName={
	"a": "setHref",
	"img": "setSrc",
	"iframe": "setMyIframe",
	"latex": "addLaTeX"
};
