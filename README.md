polySlides
==========

A tool helps you to make HTML slides - just need to write a JSON file

### Demo

<a href="http://garzon.github.io/polySlides/">http://garzon.github.io/polySlides/</a>

## Tutorial

You just need to modify /slides/slides.json, all attachments can be placed at /slides/

### Format

/slides/slides.json (<a href="https://github.com/garzon/polySlides/blob/gh-pages/slides/slides.json">Example</a>):
```
[  
   global_config,
   slide1,  
   slide2,  
   ...  
]
```

where the structure of slide1, slide2... is
```
[  
   local_config,  
   [node1, node2, node3...]  
]
```

And the structure of the node1, node2... is
``` 
[ 
   TAG_NAME, 
   INNER_HTML 
] 
```

- ```TAG_NAME``` (optional, "p" is default): same as HTML. If it's "h1", INNER_HTML will also be the title of the slide.

- ```INNER_HTML```: the ```.innerHTML``` attribute of the HTML tag, BUT if ```TAG_NAME``` is ```img``` or ```iframe``` or ```a```, it would be the ```.src``` attribute of the tag, indicating the file to be included.

And the structure of config (global_config and local_config) is

```
{
	template: TEMPLATE_NAME,
	background: BACKGROUND
}
```

The default config is { background: "#FFFFFF", template: "default", music: "" },
this will be overwritten by global_config,
and the global_config will be overwritten by local_config, too.

- ```TEMPLATE_NAME```: decides which template is to used to render the slide, the template html files are located at /components/polyslides/ployslides-```TEMPLATE_NAME```.html

- ```BACKGROUND```: the background attribute of the css of the slide