/*
 * @author Garzon Ou
 */

 window.polySlides.loadData=function(data){

  window.polySlides.ele=[];
  window.polySlides.nextSlideId=[];
  window.polySlides.autoplay=[];
  window.polySlides.counter=-1;
  window.polySlides.max=0;
  window.polySlides.is_show_valid=true;
  window.polySlides.autoplay_flag=false;

  data=eval(data);
  window.polySlides.max=-1;

  var global_config=window.polySlides.getConfig(window.polySlides.defaultConfig,data[0]);

  for(var i=1;i<data.length;i++){ // foreach slide

    window.polySlides.max+=1;

    var local_config=window.polySlides.getConfig(global_config, data[i][0]);
    var element=window.polySlides.createSlide(local_config);
    var slideData=data[i][1];
    var title=window.polySlides.loadNodes(element, slideData);
    window.polySlides.pushSlideMenu(window.polySlides.max,title);

  }

  // render the first slide
  window.polySlides.jump(0);

};

window.polySlides.slideSpecialEffects=function(ele, delta, time, callback){
  if(typeof ele=='undefined'){
    callback();
    return;
  }
  var newValue=ele.style.opacity-(-delta);
  if((newValue>1)||(newValue<0)){
    if(newValue>1){
      newValue=1;
    }else{
      newValue=0;
    }
    ele.style.opacity=newValue;
    callback();
    return;
  }
  ele.style.opacity=newValue;
  window.setTimeout(
    function(){
      window.polySlides.slideSpecialEffects(ele, delta, time, callback);
    },
    time
  );
};

window.polySlides.show=function(id){
  if(!window.polySlides.is_show_valid) return;
  window.polySlides.autoplay_flag=false;
  window.polySlides.is_show_valid=false;
  window.polySlides.counter=id;
  var body=document.getElementById("container");
  var slide=body.childNodes[0];

  window.polySlides.slideSpecialEffects(slide, -0.1, 20, function(){ 
    body.innerHTML="";
    body.appendChild(window.polySlides.ele[id]); 
    window.polySlides.slideSpecialEffects(window.polySlides.ele[id], 0.1, 20, function(){ 
      document.getElementById("menu").selected=id; 
      body.setAttribute("onclick","window.polySlides.jump('"+window.polySlides.nextSlideId[id]+"')");
      if(window.polySlides.autoplay[id]!=0){
        window.polySlides.autoplay_flag=true;
        window.setTimeout(
          function(id){ 
            return function(){
              if(window.polySlides.autoplay_flag){
                window.polySlides.jump(window.polySlides.nextSlideId[id]);
              }
            };
          }(id) , 
          Number(window.polySlides.autoplay[id])
        );
      }
      window.polySlides.is_show_valid=true;
    }); 
  });

};

window.polySlides.jump=function(id_re){
  var tmp=window.polySlides.counter;
  if(typeof id_re=="string"){
    if(id_re[0]=="=") return;
    if((id_re[0]=="+") || (id_re[0]=="-")){
      tmp+=Number(id_re);
    }else{
      tmp=Number(id_re);
    }
  }else{
    tmp=id_re;
  }
  if(tmp<0) return;
  if(tmp>window.polySlides.max) return;
  if(tmp==window.polySlides.counter) return;
  window.polySlides.show(tmp);
};

window.polySlides.next=function(){
  window.polySlides.jump("+1");
};

window.polySlides.prev=function(){
  window.polySlides.jump("-1");
};

window.polySlides.getConfig=function(default_config, custom_config){
  var res={};
  for(var i in default_config) res[i]=default_config[i];
  for(var i in custom_config) res[i]=custom_config[i];
  return res;
};

window.polySlides.createSlide=function(local_config){

  var element=document.createElement("polyslides-"+local_config.template);
  window.polySlides.ele.push(element); 

  element.style.opacity=0; // for special effects

  // set the attributes in the local_config
  element.style.background=local_config.background;
  window.polySlides.autoplay.push(local_config.autoplay);
  window.polySlides.nextSlideId.push(local_config.next);
  if(local_config.js!=""){
    var node=document.createElement("link");
    node.rel="import";
    node.href=local_config.js;
    element.appendChild(node);
  }

  return element;
};

window.polySlides.loadNode=function(element, nodeType, inner){
  var node;
  if(typeof window.polySlides.tagMap[nodeType] != "undefined"){
    // nodeType may be a custom TAG_NAME like "latex",
    // just call handler defined in polySlides_defaultConfig.js to handle
    node=window.polySlides.tagMap[nodeType];
  }else{
    // nodeType is the same as the HTML tag name
    node=nodeType;
  }

  node=document.createElement(node);
  element.appendChild(node); // element is a slide or "subnodes"

  if(typeof window.polySlides.innerHandlerName[nodeType] != "undefined"){
    // INNER may be other attribute of node, like .src, rather than .innerHTML, 
    // so call handler defined in polySlides_defaultConfig.js to handle
    window.polySlides.handlers[window.polySlides.innerHandlerName[nodeType]](node, inner);
  }else{
    if(typeof inner=="string"){
      // INNER is .innerHTML attribute
      node.innerHTML=inner;
    }else{
      // INNER is "subnodes"
      window.polySlides.loadNodes(node, inner);
      // recursive function calls
    }
  }
};

window.polySlides.loadNodes=function(element, slideData){
  var title="";
  for(var j in slideData){ // foreach node in a slide/"subnodes"
    var nodeType=window.polySlides.defaultNodeType;  
    // the default node type is defined in polySlides_defaultConfig.js, default is "p"
    var inner;
    if(slideData[j].length!==1){
      nodeType=slideData[j][0];
      inner=slideData[j][1];
    }else{
      inner=slideData[j][0];
    }
    if(nodeType==="h1"){
      title=inner; // set the slide title
    }
    window.polySlides.loadNode(element, nodeType, inner);
  }
  return title; // return title to loadData() to set the menu
};

window.polySlides.pushSlideMenu=function(id,title){
  var slideItem=document.createElement("core-item");
  var menu=document.getElementById("menu");
  menu.appendChild(slideItem);
  if(title.length>13) {
    title=title.substr(0,12)+"..";
  }
  slideItem.setAttribute("label",title);
  slideItem.setAttribute("onclick","window.polySlides.show("+id+")");
};

$(document).ready(function(){

  $.get("slides/slides.json",function(data){
    window.polySlides.loadData(data);
  }); // load data

  window.setInterval(function(){
    var date=new Date();
    var trim=function(t){
      if(t<10) t="0"+t;
      return t;
    }
    document.getElementById("show_time").innerHTML=trim(date.getHours())+":"+trim(date.getMinutes())+":"+trim(date.getSeconds());
  },1000); // show the time

});
