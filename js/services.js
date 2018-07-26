var servicesData = window.sessionStorage.getItem("servicesData");
console.log(servicesData);
if(servicesData){
    //$(".loader").show();
    servicesData=JSON.parse(servicesData);
    html="";
    servicesData.forEach(function(item){
        html+='<li><a href="javascript:void(0)" data-id="'+item.id+'" data-json=\''+JSON.stringify(item)+'\' class="single-service"><span><i class="fullscr-nav-icon fas '+item.icon+'"></i></span>'+item.name+'</a><span class="border-shape"></span></li>';
    });
    $(".fullscr-navigation.position-initial ul.list-unstyled").html(html);
}
window.document.addEventListener("scroll", function(){
    if(window.pageYOffset == 0){
        $.ajax({
            type: "GET",
            url: makeURL('foreraa_services'),
            success: function (msg) {
                //getMessages(msg,"#response")
                $(".loader").hide();
                if(msg.success){
                    window.sessionStorage.setItem("servicesData", JSON.stringify(msg.result));
                    servicesData=msg.result;
                    html="";
                    servicesData.forEach(function(item){
                        html+='<li><a href="javascript:void(0)" data-id="'+item.id+'" data-json=\''+JSON.stringify(item)+'\' class="single-service"><span><i class="fullscr-nav-icon fas '+item.icon+'"></i></span>'+item.name+'</a><span class="border-shape"></span></li>';
                    });
                    $(".fullscr-navigation.position-initial ul.list-unstyled").html(html);
                    window.scrollBy(0, 60);
                }
            }

        });


    }
},false)