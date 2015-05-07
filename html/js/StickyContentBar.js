/**
 * Created by cdimitzas on 7/5/2015.
 */
$(document).ready(function(){

    var navOffset =$("#contentsMenu").offset().top;

    $("#contentsMenu").wrap('<div class="contentsMenu-placeholder"></div>');
    $(".contentsMenu-placeholder").height($("#contentsMenu").outerHeight());

    $("#contentsMenu").wrapInner('<div class="contentsMenu-inner"></div>');

    $(window).scroll(function(){
        var scrollPos = $(window).scrollTop();

        if(scrollPos >=navOffset){
            $("#contentsMenu").addClass("fixed");
        }else{
            $("#contentsMenu").removeClass("fixed");
        }
    });


});