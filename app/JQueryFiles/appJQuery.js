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
        currentActiveLink.removeClass("active");
        switch(window.location.hash) {
          case '#/Home':
            $(".nav-link:contains('Home')").parent().addClass("active");
            break;
          case '#/Gallery':
            $(".nav-link:contains('Gallery')").parent().addClass("active");
            break;
          case '#/PlanSelection':
            $(".nav-link:contains('FrontEnd Business Logic')").parent().addClass("active");
            break;
          case '#/CodeSandbox':
            $(".nav-link:contains('Code sandbox')").parent().addClass("active");
            break;
          case '#/Authentication':
            $(".nav-link:contains('Login')").parent().addClass("active");
            break;
        }
        //$(this).parent().addClass("active");
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
            $(".product-menu").addClass("fixed")
        }
        else {
          $(".navbar").removeClass("navbar-fixed-top")
          $(".product-menu").removeClass("fixed")
        }
    });
});