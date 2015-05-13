define(
		[ "dojo/_base/declare","dojo/_base/lang", "dojo/_base/window", "require", "dojo/dom",
				"dojo/dom-construct", "customWidget/alertInfoWindow/AlertInfoWindow"],
		function(declare, lang, window, require, dom, domConstruct,AlertInfoWindow) {
			var loadingIndex=0;
			return declare(
					null,
					{
						id : null,
						timeout:10000,
						cssPath : require.toUrl("./loading.css"),
						loadingImagePath : require.toUrl("./loading.gif"),
						constructor : function(params) {
							declare.safeMixin(this, params);
							domConstruct
									.create(
											"link",
											{
												rel : "stylesheet",
												type : "text/css",
												href : this.cssPath
											},
											window.doc.head
													|| window.doc
															.getElementsByTagName("head")[0]);
						},
						_initLoadingPanel : function() {
							var id="loadingIdentifier_"+loadingIndex;
							loadingIndex+=1;
							var loadingStr = '<div id="'
									+ id
									+ '" class="modal fade bs-example-modal-sm" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm ex-modal-dialog"><div class="modal-content ex-modal-content"><img src="'+this.loadingImagePath+'"><span style="margin-left:8px;">加载中...</span></div></div></div>';
							var loadingPanelDom = domConstruct
									.toDom(loadingStr);
							document.body.appendChild(loadingPanelDom);
							return id;
						},
						show : function() {
							var id=this.id=this._initLoadingPanel();
							$('#'+id).modal("show");
							setTimeout(lang.hitch(this,function(){
								$('#'+id).modal("hide");
								var loadingNode=$('#'+id);
								if(loadingNode.length>0&&loadingNode[0].style.display!="none"){
									new AlertInfoWindow({type:"danger",content:"操作超时，数据可能未正确获取！"}).show();
								};
							}), this.timeout);
						},
						hide : function() {
							var node = dom.byId(this.id);
							if (node) {
								$('#'+this.id).modal("hide");
								$('#'+this.id).remove();
							}
						}
					});
		});