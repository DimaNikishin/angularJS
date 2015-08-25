'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Home', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
// first directive with hover functionality for main content
.directive('contentHoverFunc', [function(){
  return function(scope,element){
      element.bind('mouseenter', function(){
        var blockIndex = element.index();
        TweenMax.to($('.main-menu').children().eq(blockIndex),0.5, { className: "+=blackContent" });
        TweenMax.to($('.content-block').children().eq(blockIndex),0.5, { className: "+=blackContent" });
        element.addClass("blackContentСrutch"); //added empty class to verify that event triggered in karma test
      });
      element.bind('mouseleave', function(){
        var blockIndex = element.index();
        TweenMax.to($('.main-menu').children().eq(blockIndex),1, { className: "-=blackContent" });
        TweenMax.to($('.content-block').children().eq(blockIndex),1, { className: "-=blackContent" });
        element.removeClass("blackContentСrutch"); //removed empty class to verify that event triggered in karma test
      })
    }
}])

.controller('View1Ctrl', ['$scope',function($scope) {
  $scope.documentContent = [
    {
      menu:"Javascript",
      title:"Javascript",
      content:"also known as ECMAScript (the untrademarked name used for the standard), is a dynamic programming language.[5] It is most commonly used as part of web browsers, whose implementations allow client-side scripts to interact with the user, control the browser, communicate asynchronously, and alter the document content that is displayed.[5] JavaScript (at least the strict subset asm.js) is also considered an \"assembly language of the web\"[6] – a compile target of source-to-source compilers – for making client side web applications, using other programming languages, supported by all the major browsers without plug-ins. It is also used in server-side network programming with runtime environments such as Node.js, game development and the creation of desktop and mobile applications. JavaScript is a prototype-based scripting language with dynamic typing and first-class functions. This mix of features makes it a multi-paradigm language, supporting object-oriented,[7] imperative, and functional[1][8] programming styles.Despite some naming, syntactic, and standard library similarities, JavaScript and Java are otherwise unrelated and have very different semantics. The syntax of JavaScript is actually derived from C, while the semantics and design are influenced by the Self and Scheme programming languages.[9]JavaScript is also used in environments that aren't web-based, such as PDF documents, site-specific browsers, and desktop widgets. Newer and faster JavaScript virtual machines (VMs) and platforms built upon them have also increased the popularity of JavaScript for server-side web applications. On the client side, JavaScript has been traditionally implemented as an interpreted language, but more recent browsers perform just-in-time compilation.JavaScript has been standardized in the ECMAScript language specification."
    },
    {
      menu:"JQuery",
      title:"JQuery",
      content:"is a cross-platform JavaScript library designed to simplify the client-side scripting of HTML.[2] jQuery is the most popular JavaScript library in use today, with installation on 65% of the top 10 million highest-trafficked sites on the Web.[3][4][5] jQuery is free, open-source software licensed under the MIT License.[1]jQuery's syntax is designed to make it easier to navigate a document, select DOM elements, create animations, handle events, and develop Ajax applications. jQuery also provides capabilities for developers to create plug-ins on top of the JavaScript library. This enables developers to create abstractions for low-level interaction and animation, advanced effects and high-level, theme-able widgets. The modular approach to the jQuery library allows the creation of powerful dynamic web pages and web applications.The set of jQuery core features—DOM element selections, traversal and manipulation—enabled by its selector engine (named \"Sizzle\" from v1.3), created a new \"programming style\", fusing algorithms and DOM data structures. This style influenced the architecture of other JavaScript frameworks like YUI v3 and Dojo, later stimulating the creation of the standard Selectors API.[6]Microsoft and Nokia bundle jQuery on their platforms.[7] Microsoft includes it with Visual Studio[8] for use within Microsoft's ASP.NET AJAX framework and ASP.NET MVC Framework while Nokia has integrated it into the Web Run-Time widget development platform.[9] jQuery has also been used in MediaWiki since version 1.16.[10]"

    },
    {
      menu:"HTML5/CSS3",
      title:"HTML5",
      content:"s a core technology markup language of the Internet used for structuring and presenting content for the World Wide Web. As of October 2014 this is the final and complete[2] fifth revision of the HTML standard of the World Wide Web Consortium (W3C).[3] The previous version, HTML 4, was standardized in 1997.Its core aims have been to improve the language with support for the latest multimedia while keeping it easily readable by humans and consistently understood by computers and devices (web browsers, parsers, etc.). HTML5 is intended to subsume not only HTML 4, but also XHTML 1 and DOM Level 2 HTML.[4]Following its immediate predecessors HTML 4.01 and XHTML 1.1, HTML5 is a response to the fact that the HTML and XHTML in common use on the World Wide Web are a mixture of features introduced by various specifications, along with those introduced by software products such as web browsers, those established by common practice.[5] It is also an attempt to define a single markup language that can be written in either HTML or XHTML. It includes detailed processing models to encourage more interoperable implementations; it extends, improves and rationalizes the markup available for documents, and introduces markup and application programming interfaces (APIs) for complex web applications.[6] For the same reasons, HTML5 is also a potential candidate for cross-platform mobile applications. Many features of HTML5 have been built with the consideration of being able to run on low-powered devices such as smartphones and tablets. In December 2011, research firm Strategy Analytics forecast sales of HTML5 compatible phones would top 1 billion in 2013.[7]",
      secondTitle:"CSS3",
      secondContent:"s a style sheet language used for describing the look and formatting of a document written in a markup language. Although most often used to change the style of web pages and user interfaces written in HTML and XHTML, the language can be applied to any kind of XML document, including plain XML, SVG and XUL. Along with HTML and JavaScript, CSS is a cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web applications, and user interfaces for many mobile applications.[1]CSS is designed primarily to enable the separation of document content from document presentation, including elements such as the layout, colors, and fonts.[2] This separation can improve content accessibility, provide more flexibility and control in the specification of presentation characteristics, enable multiple HTML pages to share formatting by specifying the relevant CSS in a separate .css file, and reduce complexity and repetition in the structural content, such as semantically insignificant tables that were widely used to format pages before consistent CSS rendering was available in all major browsers. CSS makes it possible to separate presentation instructions from the HTML content in a separate file or style section of the HTML file. For each matching HTML element, it provides a list of formatting instructions. For example, a CSS rule might specify that \"all heading 1 elements should be bold\", leaving pure semantic HTML markup that asserts \"this text is a level 1 heading\" without formatting code such as a bold tag indicating how such text should be displayed."
    }
  ];
  $scope.documentTitle = {
    menu: "Main menu",
    title: "AngularJS App"
  };
}]);