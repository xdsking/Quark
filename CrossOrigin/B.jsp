<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title> iframe window </title>

  <script type="text/javascript">
  // iframe js function 
  function fIframe(){
	alert('iframe function execute success');
  }

  // exec main function
  function exec_main(){
	if(typeof(exec_obj)=='undefined'){
		exec_obj = document.createElement('iframe');
		exec_obj.name = 'tmp_frame';
		exec_obj.src = 'http://xspc:9876/web-app/Quark/CrossOrigin/execA.html';
		exec_obj.style.display = 'none';
		document.body.appendChild(exec_obj);
	}else{
		exec_obj.src = 'http://xspc:9876/web-app/Quark/CrossOrigin/execA.html?' + Math.random();
	}
  }
  </script>

 </head>

 <body>
  <p>B.html iframe</p>
  <p><input type="button" value="exec main function" onclick="exec_main()"></p>
 </body>
</html>