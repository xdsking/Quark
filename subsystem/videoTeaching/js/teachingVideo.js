require(["teamLib/menuBar/MenuBar","dijit/layout/BorderContainer","dijit/layout/ContentPane","dojo/parser"
],function(MenuBar,BorderContainer,ContentPane,parser){
    new MenuBar().placeAt("menuBarPane");
    //parser.parse();
});