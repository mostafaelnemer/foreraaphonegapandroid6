

var userData = window.sessionStorage.getItem("userData")
if(userData){
    window.location.href='map.html'

}else{
    window.document.addEventListener("scroll", function(){
        if(window.pageYOffset == 0){
            window.scrollBy(0, 60);
        }
    },false)
}