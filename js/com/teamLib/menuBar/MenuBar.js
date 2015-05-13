define(["dojo/_base/declare","dojo/_base/array","dojo/_base/window","require","dojo/dom","dojo/query","dojo/_base/lang",
        "dojo/dom-attr","dojo/fx","dojo/on","dojo/fx/easing","dojo/dom-style","dojo/dom-construct","dijit/_WidgetBase",
        "dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dojo/text!./MenuBar.html","dijit/form/Button",
        "../FloatingManager"
        ],
		function(declare,array,window,require,dom,query,lang,domAttr,fx,on,easing,domStyle,domConstruct,_WidgetBase,
				_TemplatedMixin,_WidgetsInTemplateMixin,template,Button,FloatingManager){
	return declare([_WidgetBase, _TemplatedMixin,_WidgetsInTemplateMixin],{
		templateString : template,
		baseClass:"MenuBar",
		cssPath : require.toUrl("./css/MenuBar.css"),
		imagesPath:require.toUrl("./images/"),
		constructor:function(){
			domConstruct.create("link", {
				rel : "stylesheet",
				type : "text/css",
				href : this.cssPath
			}, window.doc.head);
		},
		postCreate:function(){
			this.initMenuItem();
			this.initShowORHiddenEvent(); 
		},
		initMenuItem:function(){
            /*获取显示隐藏/显示按钮的图片文件*/
            this.showORHidden.src=this.imagesPath+"hidden_1.png";
			var self=this;
			var buttonArray=[
			                 	{
			                	    "id": "yuancheng",
			                	    "title": "远程监控",
			                	    "style": {
			                	      "height": "400px",
			                	      "width": "500px",
			                	      "left": "0",
			                	      "top": "0"
			                	    },
			                	    "component": {
			                	      "componentType": "./sharePDF/SharePDF",
			                	      "componentParams": {}
			                	    }
			                	  },
			                	  {
			                	    "id": "xiezhu",
			                	    "title": "协助",
			                	    "style": {
			                	      "height": "200px",
			                	      "width": "500px",
			                	      "left": "200px",
			                	      "top": "200px"
			                	    },
			                	    "component": {
			                	      "componentType": "./sharePDF/SharePDF",
			                	      "componentParams": {}
			                	    }
			                	  },
			                	  {
			                	    "id": "hudong",
			                	    "title": "互动",
			                	    "style": {
			                	      "height": "600px",
			                	      "width": "200px",
			                	      "left": "50px",
			                	      "top": "10px"
			                	    },
			                	    "component": {
			                	      "componentType": "./sharePDF/SharePDF",
			                	      "componentParams": {}
			                	    }
			                	  },
			                	  {
			                	    "id": "shipin",
			                	    "title": "视频",
			                	    "style": {
			                	      "height": "400px",
			                	      "width": "500px",
			                	      "left": "120px",
			                	      "top": "210px"
			                	    },
			                	    "component": {
			                	      "componentType": "./sharePDF/SharePDF",
			                	      "componentParams": {}
			                	    }
			                	  },
			                	  {
			                	    "id": "yuyin",
			                	    "title": "语音",
			                	    "style": {
			                	      "height": "400px",
			                	      "width": "200px",
			                	      "left": "300px",
			                	      "top": "100px"
			                	    },
			                	    "component": {
			                	      "componentType": "./sharePDF/SharePDF",
			                	      "componentParams": {}
			                	    }
			                	  },
			                	  {
			                	    "id": "shoucang",
			                	    "title": "收藏",
			                	    "style": {
			                	      "height": "400px",
			                	      "width": "800px",
			                	      "left": "500px",
			                	      "top": "200px"
			                	    },
			                	    "component": {
			                	      "componentType": "./sharePDF/SharePDF",
			                	      "componentParams": {}
			                	    }
			                	  },
			                	  {
			                	    "id": "sixin",
			                	    "title": "私信",
			                	    "style": {
			                	      "height": "400px",
			                	      "width": "600px",
			                	      "left": "500px",
			                	      "top": "60px"
			                	    },
			                	    "component": {
			                	      "componentType": "./sharePDF/SharePDF",
			                	      "componentParams": {}
			                	    }
			                	  }
			                	];
			array.forEach(buttonArray,function(item){
				var btn=new Button({
					id:item.id,
					class:"MenuBarClassicStyle",
					iconClass:"MenuBar_"+item.id,
					title:item.title,
					showLabel:false
				});
				on(btn,"click",function(){
					self.onMenuItemClickEvent(item);
				});
				self.buttonPane.appendChild(btn.domNode);
			});
		},
		//初始化显示/隐藏按钮事件
		initShowORHiddenEvent:function(){
			var self=this,flag=true;
			var node=this.showORHidden;
			on(node,"click",function(){
				if(flag==false){
					fx.wipeIn({
						node:self.buttonPane,
						duration:500,
						easing: easing.expoOut
					}).play();
					this.src=this.src.substring(0,this.src.length-10)+"hidden_1.png";
					flag=true;
				}else{
					fx.wipeOut({
						node:self.buttonPane,
						duration:200,
						easing: easing.expoIn
					}).play();
					this.src=this.src.substring(0,this.src.length-12)+"show_1.png";
					flag=false;
				};
			});
			on(node,"mouseover",function(){
				this.src=this.src.substring(0,this.src.length-5)+"2.png";
			});
			on(node,"mouseout",function(){
				this.src=this.src.substring(0,this.src.length-5)+"1.png";
			});
		},
		onMenuItemClickEvent:function(item){
			/*var floatingPane =new FloatingPane({
				title:item.title
			});*/

			var params=lang.mixin({},item,{id:"parentContainer_"+item.id});
			FloatingManager.getInstance().show(params);
		}
	});
});