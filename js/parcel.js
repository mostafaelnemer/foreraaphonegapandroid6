var serviceData = window.sessionStorage.getItem("serviceData");
console.log(serviceData);
//console.log(serviceData);
if(serviceData){
    console.log('session');

    serviceData=JSON.parse(serviceData);
    console.log(serviceData.type);
    if(serviceData.type=='parcel'){
        console.log('asasdasd');
        searchOnGoogleMap(serviceData);
        window.document.addEventListener("scroll", function(){
            if(window.pageYOffset == 0){
                searchOnGoogleMap(serviceData);
                window.scrollBy(0, 100);

            }
        },false)
    }else{
        //window.location.href="services.html";
    }
}else{
    console.log('notsession');
    id=get('id');
    if(id){
        $.ajax({
            type: "GET",
            url: makeURL('foreraa_services/'+id),
            success: function (msg) {
                //getMessages(msg,"#response")
                $(".loader").hide();
                if(msg.success){
                    if(msg.result.type=='parcel'){
                        window.sessionStorage.setItem("serviceData", JSON.stringify(msg.result));
                        searchOnGoogleMap(JSON.stringify(msg.result));
                    }else{
                        //window.location.href="services.html";
                    }
                }
            }

        });
        window.document.addEventListener("scroll", function(){
            if(window.pageYOffset == 0){
                $.ajax({
                    type: "GET",
                    url: makeURL('foreraa_services/'+id),
                    success: function (msg) {
                        //getMessages(msg,"#response")
                        $(".loader").hide();
                        if(msg.success){
                            if(msg.result.type=='parcel'){
                                window.sessionStorage.setItem("serviceData", JSON.stringify(msg.result));
                                searchOnGoogleMap(JSON.stringify(msg.result));
                                window.scrollBy(0, 100);
                            }else{
                                //window.location.href="services.html";
                            }
                        }
                    }

                });
            }
        },false)
    }

}
