define(["dojo/_base/declare",
    "dojo/cookie",
    "dojo/json",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_OnDijitClickMixin",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/query",
    "esri/dijit/Bookmarks",
    "esri/dijit/BookmarkItem",
    "require",
    "dojo/dom-construct",
    "dojo/_base/window",
    "dojo/_base/config"
],function(declare,cookie,JSON,lang, _WidgetBase, _OnDijitClickMixin, _TemplatedMixin, _WidgetsInTemplateMixin,
           query, Bookmarks, BookmarkItem, require, domConstruct, window, config){
    var storageName = 'onemap_bookmarks',cssAdded = false;
    function get_local_storage(){
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch( e ){
            return false;
        }
    };
    var  useLocalStorage = get_local_storage();
    return declare([_WidgetBase, _OnDijitClickMixin, _TemplatedMixin,_WidgetsInTemplateMixin],{
        templateString : '<div><div data-dojo-attach-point="bookMarkDiv"></div></div>',
        cssPath : require.toUrl("./Bookmark.css"),
        map:null,
        bookmarks:null,
        baseClass:"bookmark",
        postCreate : function(){
            if(!cssAdded){
                domConstruct.create("link", {
                    rel : "stylesheet",
                    type : "text/css",
                    href : this.cssPath
                },window.doc.head||window.doc.getElementsByTagName("head")[0]);
                cssAdded = true;
            }
            var bookmarks = this.bookmarks=new Bookmarks({
                map:this.map,
                bookmarks: [],
                editable : true
            },this.bookMarkDiv);
            var bmJSON;
            if (useLocalStorage) {
                bmJSON = window.localStorage.getItem(storageName);
            } else {
                bmJSON = cookie(storageName);
            }

            if ( bmJSON && bmJSON != 'null' && bmJSON.length > 4) {
                var bmarks = JSON.parse(bmJSON);
                dojo.forEach(bmarks, function(b) {
                    this.bookmarks.addBookmark(b);
                },this);
            } else {
                console.log('no stored bookmarks...');
            }
            bookmarks.on('edit',lang.hitch(this,"refreshBookmarks"));
            bookmarks.on('remove',lang.hitch(this,"refreshBookmarks"));
            /*  var self=this;
             this.btnAddBookMarkItem.on("click", function(){
             var bookmarkItem = new BookmarkItem({
             "extent": self.map.extent,
             "name": "无标题"
             });
             self.bookmarks.addBookmark(bookmarkItem);
             });*/
        },
        refreshBookmarks : function() {
            if (useLocalStorage) {
                window.localStorage.setItem(storageName, JSON.stringify(this.bookmarks.toJson()));
            } else {
                var exp = 7;
                cookie(storageName,JSON.stringify(this.bookmarks.toJson()), {expires: exp});
            }
        },
        destroy:function() {
            this.bookmarks.destroy();
            this.inherited(arguments);
        }
    });
});