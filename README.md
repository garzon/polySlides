polySlides V1.0 Beta
==========

polySlides - 一个只需要写一个json文件就能帮你制作HTML5演示文档的工具框架
polySlides - A tool helps you to make HTML slides - just need to write a JSON file   

### Demo

<a href="http://garzon.github.io/polySlides/">http://garzon.github.io/polySlides</a>

### Features - 特色

- 基于HTML5，polymer框架，方便内嵌HTML+JS
- 只需要写一个简单的json，无需机械重复排版，快速创建幻灯片，可使制作人更关注于内容
- 可随时灵活地自定义自己需要的幻灯片模板(基于polymer)
- 支持autoplay，自定义幻灯片跳转顺序等

### Start

只需要在目录下开启一个简单的http服务器后，用浏览器打开即可放映    
Start a HTTP server in the directory, example:

```$ python -m SimpleHTTPServer```

and open ```localhost:8000``` in the browser.   

Or you can put it on github.io    
或者放在github.io上在线放映

## Tutorial

You just need to modify */slides/slides.json*, all attachments can be placed at */slides/*   
你只需要修改*/slides/slides.json*这个文件，相关附件（图片等）可放在*/slides/*文件夹下

### JSON Format

*/slides/slides.json*的结构定义如下，可参考下面链接的Example文件修改：   
The structure of */slides/slides.json* is (<a href="https://github.com/garzon/polySlides/blob/gh-pages/slides/slides.json">Example1</a> and <a href="https://github.com/garzon/polySlides/blob/master/slides/slides.json">Example2</a>):

```
[  
   global_config,
   slide,  
   slide,  
   ...  
]
```

然后上面的*slide*结构定义如下：  
where the structure of a *slide* is
```
[  
   local_config,  
   [
      node, 
      node, 
      node,
      ...
   ]  
]
```

然后上面的*node*结构定义如下：  
And the structure of a *node* is
``` 
[ 
   TAG_NAME, 
   INNER_HTML or subnodes
] 
```

where   

- ```TAG_NAME``` (可选, 默认为"p"): 与HTML基本相同. 如果是"h1", INNER_HTML将被认为是此slide的标题并置于左侧菜单中. 此项通常为"p"(文本),"b"(粗体字),"h1"(slide标题) or "img"(图片)，当然也可用其他HTML标签.其实有些`TAG_NAME`会被特殊处理. 如`iframe`并不是真的HTML的iframe标签.可看看*polySlides_defaultConfig.js*, 里面有对这些特别的`TAG_NAME`的映射关系(`window.polySlides.tagMap`).  
- ```INNER_HTML```:  通常是这个节点HTML标签的`.innerHTML`属性. *但是*如果`TAG_NAME`是`img`或`iframe`或`a` or ...(这些特例都定义在*polySlides_defaultConfig.js*文件里),这个项将设为该HTML的`.src`属性,来指定要引入的附件文件.同上，你可以看看*polySlides_defaultConfig.js*,里面有对这些特别的`TAG_NAME`时`INNER_HTML`的处理函数的定义(`window.polySlides.handlers`和`window.polySlides.innerHandlerName`).   

- ```TAG_NAME``` (optional, "p" is default): almost the same as HTML. If it's "h1", INNER_HTML will also be the title of the slide and it will be put into the menu. It is usually "p"(for text),"b"(for bold),"h1"(for title) or "img"(for image). In fact, some `TAG_NAME` is different from the HTML one. Like a `iframe` is *NOT* even a real HTML iframe element. You can have a look at *polySlides_defaultConfig.js* where defines the map of these special `TAG_NAME` (`window.polySlides.tagMap`).    
- ```INNER_HTML```:  is usually the `.innerHTML` attribute of the HTML tag. *But* if `TAG_NAME` is some special `TAG_NAME` like `img` or `iframe` or `a` or ...(which is also defined in *polySlides_defaultConfig.js*), it would be the `.src` attribute of the tag, indicating the file to be included. You can have a look at *polySlides_defaultConfig.js* where defines the handlers of these special `TAG_NAME` (`window.polySlides.handlers` and `window.polySlides.innerHandlerName`).    

然后上面的*subnodes*结构定义如下：   
And the structure of a *subnodes* is   
``` 
[ 
   node,
   node,
   ...
] 
```

*node* is defined above.   
*node*同上述所定义的*node*.   

config的结构定义如下：   
And the structure of config (`global_config` and `local_config`) is    

```
{
	"template": TEMPLATE_NAME,
	"background": BACKGROUND,
   "js": JS_PATH, 
   "next": NEXT_SLIDE,
   "autoplay": DELAY_TIME
}
```

- ```TEMPLATE_NAME```: 决定该幻灯片用哪个模板, 模板文件路径为/components/polyslides/ployslides-`TEMPLATE_NAME`.html . 你也可以制作自己的模板（也许需要Polymer的知识）。   
- ```BACKGROUND```: 幻灯片的css的background属性值   
- ```JS_PATH```: 幻灯片要引入的js脚本文件，通常为空，用于内嵌HTML(iframe)时使用   

- ```TEMPLATE_NAME```: decides which template is to used to render the slide, the template html files are located at /components/polyslides/ployslides-`TEMPLATE_NAME`.html . You can make your own template html file, too.   
- ```BACKGROUND```: the css background attribute of the slide(s)   
- ```JS_PATH```: the path of a .js file which is needed to be included in a slide.   

- ```NEXT_SLIDE```: decides the slide which is to be showed when you click on the slide: 决定点击后跳转到哪张幻灯片:
- -> ```+X```: jump to the X-th slide next to the current one. 跳转到现在后面的第X张幻灯片
- -> ```-X```: jump to the X-th slide previous to the current one. 跳转到现在前面的第X张幻灯片
- -> ```=```: nothing happened when you click. It is useful when you want to put a button on the slide and when you click the button, it will not jump to the next slide. 点击时不跳转.通常用于在幻灯片上放置button时，点击将不会跳转
- -> ```X```: jump to the X-th slide (index start from 0). 跳转到第X张幻灯片，幻灯片的编号X从0开始编号

- ```DELAY_TIME```: After `DELAY_TIME`(milliseconds), automatically jump to the `NEXT_SLIDE`. To disable, just set to "0".
- ```DELAY_TIME```: 经过`DELAY_TIME`(毫秒)后, 自动跳转到`NEXT_SLIDE`指定的幻灯片。此项设为0则关闭自动跳转功能。适宜用来做相册功能。

默认选项在文件*polySlides_defaultConfig.js*里定义为：   
The default config is defined in *polySlides_defaultConfig.js* as   
```
window.polySlides.defaultConfig={ 
   "background": "#FFFFFF", 
   "template": "default", 
   "js": "", 
   "next":"+1",
   "autoplay":"0"
};
```

You can just leave a "{}" at global_config or local_config if you want to set local/global_config to defaultConfig.   
留空即可使用上一级的设置，也就是设置会被继承。

### Log

- V1.0 Beta: +autoplay