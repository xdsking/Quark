/**
 * Created by xuds on 2016/1/12.
 */

requirejs.config({
    baseUrl: 'js/app',
    paths: {
        lib: "../../../../CDN/lib",
        jquery:"../../../../CDN/lib/jQuery/jQuery-1.11.1"
    }
});
requirejs(["jquery", "util", "tools"], function ($, util, tools) {

    tools.push(1);
    console.log(tools.getArray());
    tools.push(2);
    console.log(tools.getArray());
    tools.push(3);
    console.log(tools.getArray());
    tools.pop();
    console.log(tools.getArray());
    tools.pop();
    console.log(tools.getArray());
});
requirejs(["jquery", "util", "tools"], function ($, util, tools) {
    tools.push(1);
    console.log(tools.getArray());
    tools.push(2);
    console.log(tools.getArray());
    tools.push(3);
    console.log(tools.getArray());
    tools.pop();
    console.log(tools.getArray());
    tools.pop();
    console.log(tools.getArray());
});