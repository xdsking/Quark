$(function(){

  $(document).on('click','.aww-submenu-indicator',function(e){
    $('.aww-menu-open').removeClass('aww-menu-open');
    $(this).addClass('aww-menu-open');
  });

  $(document).on('click','.aww-menu-open',function(e){
    $(this).removeClass('aww-menu-open');
  });

});