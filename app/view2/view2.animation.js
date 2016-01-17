/**
 * Created by dimanikishin on 17.01.16.
 */
'use strict';
//TODO: write comments

angular
  .module('myApp.view2')
  .animation('.toggle',toggle);

toggle.$inject = [];
//toggle animation via TweenMax
function toggle(){
  return {
    leave: function(element, done){
      TweenMax.fromTo(element,1, {opacity: 1}, {opacity:0, onComplete:done})
    },
    enter: function(element, done){
      TweenMax.fromTo(element,1, {opacity: 0}, {opacity:1, onComplete:done})
    }
  }
}