$(document).ready(function(){
    $("#navbar-brand").mouseenter(function(){
        $(this).css(
            {
                color:'#9d9d9d'
            }
        );
    });
    $(".nav-link").click(function(){
        var currentActiveLink = $(".active");
        currentActiveLink.removeClass("active")
        $(this).parent().addClass("active")
        $('body,html').scrollTop(0);
    });

    $(".home-redirected-nav-link").click(function(){
        var currentActiveLink = $(".active");
        currentActiveLink.removeClass("active")
        $(".home-link").parent().addClass("active")
        $('body,html').scrollTop(0);
    });

    $(this).scroll(function(){
        if($(document).scrollTop() > $(".page-header").innerHeight()) {
            $(".navbar").addClass("navbar-fixed-top")
        }
        else { $(".navbar").removeClass("navbar-fixed-top") }
    });
});