function rem(){
    var fontsize=100;
    var width=320;
    var winW=document.documentElement.clientWidth;
    // var bili=winW/width<1?winW/width:1;
    var bili=winW/width;
    var newFontSize=bili*fontsize;
    document.documentElement.style.fontSize=newFontSize+"px";
}
rem();
window.onresize=rem;