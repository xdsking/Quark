define(["dojo/_base/declare","require","dojo/dom-construct","dijit/registry","./floatingPane/FloatingPane"
        ], function(declare,require,domConstruct,registry,FloatingPane) {
	var instance;
	var FloatingManager = declare(null,{
		constructor:function() {
			if (!instance) {
				instance = this;
			}
		},
		show:function(params){
			var containerPane = registry.byId(params.id);
			if(containerPane){
				if(containerPane.dockable&&containerPane._isDocked)//浮动面板停靠时，直接调用show()方法
					containerPane.show();
			}else{
				containerPane=new FloatingPane(params,domConstruct.create("div",{id:params.id},document.body));
				var componentType=params.component.componentType;
				var componentParams=params.component.componentParams;
				if(componentType!=""&&componentType!=null){
					require([componentType],function(WidgetClass){
						var widgetClass=new WidgetClass(componentParams);
						containerPane.addChild(widgetClass);//widget填充的组件实例
						containerPane.startup();
					});
					
				}
			}
		}
	});
	FloatingManager.getInstance = function() {
		if (!instance) {
			instance = new FloatingManager();
		}
		return instance;
	};
	return FloatingManager;
});