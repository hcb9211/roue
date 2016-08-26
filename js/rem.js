var fontsize=100;
var width=640;
function rem(){
    var winW=document.documentElement.clientWidth;
    var bili=winW/width<1?winW/width:1;
    var newFontSize=bili*fontsize;
    document.documentElement.style.fontSize=newFontSize+"px";
}
rem();
window.onresize=rem;