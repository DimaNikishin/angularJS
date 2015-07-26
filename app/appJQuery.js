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

    });

    $(".home-redirected-nav-link").click(function(){
        var currentActiveLink = $(".active");
        currentActiveLink.removeClass("active")
        $(".home-link").parent().addClass("active")

    });
});