define([ "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/window",
		"require", "dojo/dom","dojo/_base/array", "dojo/dom-construct" ], function(declare, lang,
		window, require, dom,array, domConstruct) {
	var alertInfoWindowIndex=0;
	return declare(null, {
		content:"",
		closable:true,
		type:"info",
		timeout:3000,
		infoWindowPane:null,
		containerNode:null,
		alertInfoWindowId:null,
		style:{position:"absolute",right:0,bottom:0,width:"400px",display: "none","margin-bottom":"0px","font-weight":700},
		typeEnums:["success","info","warning","danger"],
		constructor : function(params) {
			declare.safeMixin(this, params);
		},
		_init:function(){
			var closable=this.closable,content=this.content,style=this.style,containerNode=this.containerNode,containerDomNode=containerNode?containerNode.domNode:null,type=this.type;
			this.alertInfoWindowId="alertInfoWindow_"+alertInfoWindowIndex;
			this.infoWindowPane=domConstruct.create("div",
					{
						id:this.alertInfoWindowId,
						"class":"alert alert-"+type+" alert-dismissible alertInfoWindow",
						style:style,
						role:"alert"
					},
					containerDomNode||document.body);
			alertInfoWindowIndex+=1;
			var childrenStr = '';
			if(closable){
				childrenStr	+='<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
			}
			if(content!=""){
				childrenStr +=content;
			}
			var instanceDom = domConstruct.toDom(childrenStr);
			this.infoWindowPane.appendChild(instanceDom);
			$(".alertInfoWindow").slideDown("slow");
		},
		_typeEffective:function(){
			var typeEnums=this.typeEnums,type=this.type,flag=false;
			array.forEach(typeEnums,function(typeEnum){
				if(typeEnum==type){
					flag=true;
				}
			});
			return flag;
		},
		show:function(){
			var isEffective= this._typeEffective();
			if(!isEffective){
				console.log("警告框类型无效!");
				return;
			}
			this._init();
			var node=$("#"+this.alertInfoWindowId);
			setTimeout(lang.hitch(this,function(){
				node.slideUp(1000);
				setTimeout(function(){
					node.alert('close');
				},1000);
				//this.infoWindowPane.alert('close');
			}), this.timeout);
		}
	});
});