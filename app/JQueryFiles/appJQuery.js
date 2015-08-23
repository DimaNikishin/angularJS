$(document).ready(function(){
    // disabling hover func
    $("#navbar-brand").mouseenter(function(){
        $(this).css(
            {
                color:'#9d9d9d'
            }
        );
    });
    // adding active class to nav links
    $(".nav-link").click(function(){
        var currentActiveLink = $(".active");
        currentActiveLink.removeClass("active")
        $(this).parent().addClass("active")
        $('body,html').scrollTop(0);
    });
    // adding active class to not implemented nav links
    $(".home-redirected-nav-link").click(function(){
        var currentActiveLink = $(".active");
        currentActiveLink.removeClass("active")
        $(".home-link").parent().addClass("active")
        $('body,html').scrollTop(0);
    });
    // adding fixed-top class to navigation bar
    $(this).scroll(function(){
        if($(document).scrollTop() > $(".page-header").innerHeight()) {
            $(".navbar").addClass("navbar-fixed-top")
        }
        else { $(".navbar").removeClass("navbar-fixed-top") }
    });
});