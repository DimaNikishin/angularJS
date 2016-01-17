/**
 * Created by dimanikishin on 17.01.16.
 */
'use strict';
// first directive with hover functionality for main content
// try to don't use mouseenter animation via angular, do it with JQuery
//TODO rewrite comments
angular
  .module('myApp.view1')
  .directive('contentHoverFunc',contentHoverFunc);

contentHoverFunc.$inject = [];

function contentHoverFunc(){
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
};
