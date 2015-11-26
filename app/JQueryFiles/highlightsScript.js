function doSearch(text) {
  var highlightSpan = document.getElementsByTagName("span");
  for(var i = 0; i < highlightSpan.length; i++){
    //remove highlight, but it doesn't cross-browser realisation, and my work incorrect in another browsers (wasn't working on cross-browser realisation
    if(highlightSpan[i].style.background){
      if(highlightSpan[i].style.background == "yellow"){
        highlightSpan[i].style.background = null;
      }
    }
    else{
      if(highlightSpan[i].style.cssText == "background-color: yellow;"){
        highlightSpan[i].style.background = null;
      }
    }
  }
  if (window.find && window.getSelection) {
    document.designMode = "on";
    var sel = window.getSelection();
    sel.collapse(document.body, 0);

    while (window.find(text)) {
      document.execCommand("HiliteColor", false, "yellow");
      sel.collapseToEnd();
    }
    document.designMode = "off";
  } else if (document.body.createTextRange) {
    var textRange = document.body.createTextRange();
    while (textRange.findText(text)) {
      textRange.execCommand("BackColor", false, "yellow");
      textRange.collapse(false);
    }
  }
}
