//var orderData = window.sessionStorage.getItem("orderData");/
//var userData = window.sessionStorage.getItem("userData");
var orderData = window.sessionStorage.getItem("orderData");
var userData = window.sessionStorage.getItem("userData");
userData=JSON.parse(userData);

if(userData.type=='delegate'&&!orderData){
    order_id=get('id');
    if(order_id){
        $(".loader").show();
        $.ajax({
            type: "GET",
            url: makeURL('foreraa_orders/'+order_id+'?delegate_id=null'),
            data:$("#service-order-form").serialize(),
            success: function (msg) {
                if(msg.success){
                    window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                    window.location.href='single-order.html';
                }else{
                    window.location.href="my-orders.html"
                }

            }
        });
    }

}else{
    $(document).ready(function(){
        if(orderData){

            orderData=JSON.parse(orderData);

            function orderDataHTML(orderData,userData){
                $("#order-title").html('Order Number #'+orderData.order_id);
                $("#order_place_of_delivery").removeAttr('trans-lang-html').html('<span class="pull-right"><i class="fa fa-map-marker"></i></span> '+orderData.place_of_delivery_address);
                $("#order_delivery_place").removeAttr('trans-lang-html').html('<span class="pull-right"><i class="fa fa-map-marker"></i></span> '+orderData.delivery_place_address);
                $("#order_details").val(orderData.details)
                $("#distance").html(orderData.distance)
                $("#duration").html(orderData.duration)
                $("#cost").html(orderData.cost);

                delegateHtml='';
                delegateHtml+='<div class="clearfix"></div>';
                delegateHtml+='<div class="clearfix"></div>';
                console.log(orderData.statues);
                console.log(userData);
                if(userData.type=='customer'){
                    if(orderData.delegate_id){
                        delegateHtml+='<div class="hr-border"></div><div class="clearfix"></div><div class="delegate-section"><div class="col-xs-3"><a href="#" class="single-delegate" data-id="'+orderData.delegate_id+'"><img style="width: 100%" src="'+((orderData.delegate_img_dir&&orderData.delegate_img)?SITEURL+orderData.delegate_img_dir+orderData.delegate_img:SITEURL+'img/Users/default_image.png')+'" class="img-circle" alt=""></a></div> <div class="col-xs-9"><a href="#" data-order-id="'+orderData.order_id+'" class="pull-right chat-now"><i class="fa fa-commenting"></i></a><a class="pull-right call-now" href="tel:'+orderData.delegate_phone+'"><i class="fa fa-phone"></i></a> <a href="#" class="single-delegate" data-id="'+orderData.delegate_id+'"><h4>'+orderData.delegate_name+'</h4></a> <ul class="list-unstyled list-inline star-rating"> ';
                        for(x=1;x<=orderData.delegate_rating;x++){
                            delegateHtml+='<li><span><i class="fa fa-star"></i></span></li>';
                        }
                        for(y=x;y<=5;y++){
                            delegateHtml+='<li><span><i class="fa fa-star-o"></i></span></li>';
                        }
                        delegateHtml+='</ul> <a href="#" class="single-delegate" data-id="'+orderData.delegate_id+'">'+strings['view']+'</a> </div><div class="clearfix"></div></div>';
                    }else{
                        delegateHtml='<div class="clearfix"></div><div class="alert alert-info"><i class="fa fa-times-circle"></i> No Delegate</div>';
                    }
                    if(orderData.has_delegate_rating==0&&orderData.statues=='closed'){
                        delegateHtml+='<div class="clearfix"></div><div class="clearfix" style="height: 10px;"></div><div class="col-md-12"><form id="ratingDelegateForm" action="" method="post"><div id="ratingDelegateForm-response"></div> <input type="hidden" name="user_id" value="'+orderData.user_id+'"> <input type="hidden" name="delegate_id" value="'+orderData.delegate_id+'"> <input type="hidden" id="order_id" name="order_id" value="'+orderData.order_id+'"> <input id="ratings-hidden" name="rating" type="hidden"> <div class="form-group"><textarea class="form-control animated" cols="50" id="new-review" name="comment" placeholder="'+strings['enter_your_review_her']+'" rows="5"></textarea></div>  <div class="text-right"> <div class="stars starrr" data-rating="0"></div> <button class="btn btn-success btn-lg" type="submit">'+strings['save']+'</button></div></form></div>';
                    }
                    /*if((userData.id==orderData.user_id||(orderData.delegate_id&&orderData.delegate_id==userData.id))&&$.inArray(orderData.statues,['cancel'])!=-1){
                        delegateHtml+='<div class="col-lg-12"><button class="cancelOrder btn btn-info btn-block" data-id="'+orderData.order_id+'">'+strings['cancel']+'</button></div>'
                    }*/
                    if(orderData.statues=='has_invoice'){
                        delegateHtml+='<div class="col-lg-12"><button id="confirmInvoice" class=" btn btn-info btn-block" data-customer-id="'+userData.id+'" data-id="'+orderData.order_id+'">'+strings['confirm_invoice']+'</button></div>'
                    }

                }else{

                    delegateHtml+='<div class="hr-border"></div><div class="clearfix"></div><div class="customer-section"><div class="col-xs-3"><img style="width: 100%" src="'+((orderData.user_img_dir&&orderData.user_img)?SITEURL+orderData.user_img_dir+orderData.user_img:SITEURL+'img/Users/default_image.png')+'" class="img-circle" alt=""></div>';
                    delegateHtml+='<div class="col-xs-9"><a href="#" data-order-id="'+orderData.order_id+'" class="pull-right chat-now"><i class="fa fa-commenting"></i></a><a class="pull-right call-now" href="tel:'+orderData.user_phone+'"><i class="fa fa-phone"></i></a> <h4>'+orderData.user_name+'</h4></div><div class="clearfix"></div></div>';
                    if(orderData.statues=='new'){
                        delegateHtml+='<div class="col-lg-12"><button class="confirmOrder btn btn-info btn-block" data-id="'+orderData.order_id+'">'+strings['confirm']+'</button></div>'
                    }
                    if(orderData.statues=='inprogress'){
                        delegateHtml+='<div class="col-lg-12"><button id="uploadInvoice" class=" btn btn-info btn-block" data-delegate-id="'+userData.id+'" data-id="'+orderData.order_id+'" title="'+strings['create_invoice']+'"><i class="fa fa-window-maximize"></i></button></div>'
                    }
                    if(orderData.statues=='confirm_invoice'){
                        delegateHtml+='<div class="col-lg-12"><button id="makeClosed" class=" btn btn-info btn-block" data-delegate-id="'+userData.id+'" data-id="'+orderData.order_id+'" title="'+strings['closed']+'"><i class="fa fa-check-circle"></i></button></div>'
                    }
                    if(orderData.has_customer_rating==0&&orderData.statues=='closed'){
                        delegateHtml+='<div class="clearfix"></div><div class="clearfix" style="height: 10px;"></div><div class="col-md-12"><form id="ratingCustomerForm" action="" method="post"><div id="ratingCustomerForm-response"></div> <input type="hidden" name="user_id" value="'+orderData.user_id+'"> <input type="hidden" name="delegate_id" value="'+orderData.delegate_id+'"> <input type="hidden" id="order_id" name="order_id" value="'+orderData.order_id+'"> <input id="ratings-hidden" name="rating" type="hidden"> <div class="form-group"><textarea class="form-control animated" cols="50" id="new-review" name="comment" placeholder="'+strings['enter_your_review_her']+'" rows="5"></textarea></div>  <div class="text-right"> <div class="stars starrr" data-rating="0"></div> <button class="btn btn-success btn-lg" type="submit">'+strings['save']+'</button></div></form></div>';
                    }


                }

                delegateHtml+='<div class="clearfix" style="height: 20px;"></div>';
                if(orderData.statues=='has_invoice'||orderData.statues=='confirm_invoice'||orderData.statues=='closed'){
                    delegateHtml+='<div class="col-lg-12"><button id="showInvoiceButton" class=" btn btn-info btn-block">'+strings['show_invoice']+'</button><div class="clearfix"></div><div id="invoiceImage" style="display: none;"><img style="width:100%;" src="'+SITEURL+orderData.invoice_img_dir+orderData.invoice_img+'"></div></div>';
                }
                delegateHtml+='<div class="clearfix" style="height: 20px;"></div>';
                /*if($.inArray( orderData.statues, ['confirm_invoice','closed','has_invoice'] )==-1){
                    delegateHtml+='<div class="col-lg-12"><button id="cancel" class=" btn btn-info btn-block">'+strings['cancel']+'</button></div>';
                }*/
                if($.inArray(orderData.statues,['canceled','closed','confirm_invoice','has_invoice'])==-1&&(userData.id==orderData.delegate_id||userData.id==orderData.user_id)){
                    delegateHtml+='<div class="col-lg-12"><button id="showCancelForm" class="btn btn-info btn-block" data-id="'+orderData.order_id+'">'+strings['show_cancel_form']+'</button><div class="clearfix"></div><div id="cancelOrderDiv" style="display: none;">  <form id="cancelOrderForm" action="" method="post"><input type="hidden" name="current_user_id" value="'+userData.id+'"><input type="hidden" name="order_id" value="'+orderData.order_id+'"><div class="form-group"><textarea class="form-control animated" cols="50" id="cancel_comment" name="cancel_comment" placeholder="'+strings['your_comment']+'" rows="5"></textarea></div> <button class="btn btn-success btn-lg" type="submit">'+strings['cancel']+'</button></form></div></div>'
                }


                delegateHtml+='<div class="clearfix"></div>';
                delegateHtml+='<div class="clearfix"></div>';
                $("#delegate-content").html(delegateHtml);
                if(orderData.has_delegate_rating==0&&orderData.statues=='closed'){
                    var ratingDelegateForm = $("#ratingDelegateForm").validate({
                        errorPlacement: function(error, element) {
                            // Append error within linked label
                            /*$( element )
                                .closest( "form" )
                                .find( "label[for='" + element.attr( "id" ) + "']" )
                                .append( error );*/
                            //$(element).parent().parent().addClass('has-error');

                        },
                        highlight: function(element) {
                            //console.log("highlight:");
                            //console.log(element);
                            $(element).closest('.form-group').addClass('has-error');


                        },
                        unhighlight: function(element) {
                            //console.log("unhighlight:");
                            //console.log(element);
                            $(element).closest('.form-group').removeClass('has-error');
                        },
                        errorElement: "span",
                        rules : {

                            comment : {
                                required:true,
                                minlength : 5
                            },
                        },
                        messages: {
                        },
                        submitHandler: function() {
                            //alert('start');
                            //$("#charge-btn").attr("disabled", true);
                            $(".loader").show();
                            $("#ratingDelegateForm-response").html('');
                            if($("#ratings-hidden").val()){
                                $.ajax({
                                    type: "POST",
                                    url: makeURL('foreraa_users/'+orderData.delegate_id+'/ratingDelegate'),
                                    data:$("#ratingDelegateForm").serialize(),
                                    success: function (msg) {
                                        getMessages(msg,"#ratingDelegateForm-response")
                                        if(msg.success){
                                            $("#ratingDelegateForm")[0].reset();
                                            $("#ratingDelegateForm input").remove();
                                            $("#ratingDelegateForm textarea").remove();
                                            $("#ratingCustomerForm .stars.starrr").remove();
                                            $("#ratingCustomerForm .btn.btn-success.btn-lg").remove();
                                        }
                                    }
                                });
                            }else{
                                $("#ratingDelegateForm-response").html('<div class="alert alert-danger">Please Select Rating At Less One Star</div>')
                            }
                            $(".loader").hide();

                        }
                    });
                }
                if(orderData.has_customer_rating==0&&orderData.statues=='closed'){
                    var ratingCustomerForm = $("#ratingCustomerForm").validate({
                        errorPlacement: function(error, element) {
                            // Append error within linked label
                            /*$( element )
                                .closest( "form" )
                                .find( "label[for='" + element.attr( "id" ) + "']" )
                                .append( error );*/
                            //$(element).parent().parent().addClass('has-error');

                        },
                        highlight: function(element) {
                            //console.log("highlight:");
                            //console.log(element);
                            $(element).closest('.form-group').addClass('has-error');


                        },
                        unhighlight: function(element) {
                            //console.log("unhighlight:");
                            //console.log(element);
                            $(element).closest('.form-group').removeClass('has-error');
                        },
                        errorElement: "span",
                        rules : {

                            comment : {
                                required:true,
                                minlength : 5
                            },
                        },
                        messages: {
                        },
                        submitHandler: function() {
                            //alert('start');
                            //$("#charge-btn").attr("disabled", true);
                            $(".loader").show();
                            $("#ratingCustomerForm-response").html('');
                            if($("#ratings-hidden").val()){
                                $.ajax({
                                    type: "POST",
                                    url: makeURL('foreraa_users/'+orderData.user_id+'/ratingCustomer'),
                                    data:$("#ratingCustomerForm").serialize(),
                                    success: function (msg) {
                                        getMessages(msg,"#ratingCustomerForm-response")
                                        if(msg.success){
                                            $("#ratingCustomerForm")[0].reset();
                                            $("#ratingCustomerForm input").remove();
                                            $("#ratingCustomerForm textarea").remove();
                                            $("#ratingCustomerForm .stars.starrr").remove();
                                            $("#ratingCustomerForm .btn.btn-success.btn-lg").remove();
                                        }
                                    }
                                });
                            }else{
                                $("#ratingCustomerForm-response").html('<div class="alert alert-danger">'+strings['please_select_rating']+'</div>')
                            }
                            $(".loader").hide();

                        }
                    });
                }
            }
            orderDataHTML(orderData,userData);


            function initMap() {
                var markers=[];
                var directionsService = new google.maps.DirectionsService;
                // var places = new google.maps.places.PlacesService(map);
                var infowindow = new google.maps.InfoWindow();

                var map = new google.maps.Map(document.getElementById('order-map'), {
                    zoom: 20,
                    center: new google.maps.LatLng(orderData.place_of_delivery_latitude, orderData.place_of_delivery_longitude),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    gestureHandling: 'greedy'
                });
                var myCoords = {
                    route: [
                        new google.maps.LatLng(orderData.place_of_delivery_latitude,orderData.place_of_delivery_longitude),
                        new google.maps.LatLng(orderData.delegate_lastLatitude,orderData.delegate_lastLongitude),
                        new google.maps.LatLng(orderData.delivery_place_latitude, orderData.delivery_place_longitude)

                    ],
                };

                var routesOptions = {
                    route: {
                        color: '#70cc23'
                    }
                };

                var renderer = new google.maps.DirectionsRenderer({
                    suppressPolylines: true,
                    suppressMarkers: true,
                    infoWindow: infowindow,
                    polylineOptions: {
                        strokeColor: '#C83939',
                        strokeOpacity: 0,
                        strokeWeight: 1,
                        icons: [{
                            icon: {
                                path: google.maps.SymbolPath.CIRCLE,
                                fillColor: '#C83939',
                                scale: 3,
                                strokeOpacity: 1
                            },
                            offset: '0',
                            repeat: '15px'
                        }]
                    }

                });

                function renderDirections(result, color, course) {
                    renderer.setDirections(result);
                    renderer.setMap(map);
                    renderDirectionsPolylines(result, color, course);
                    console.log(renderer.getDirections());
                }
                var polylineOptions = {
                    strokeColor: '#C83939',
                    strokeOpacity: 1,
                    strokeWeight: 4
                };

                function renderDirectionsPolylines(response, color, course) {
                    var polylines = [];
                    polylineOptions.strokeColor = color;
                    for (var i = 0; i < polylines.length; i++) {
                        polylines[i].setMap(null);
                    }
                    var legs = response.routes[0].legs;
                    for (i = 0; i < legs.length; i++) {
                        var steps = legs[i].steps;
                        for (j = 0; j < steps.length; j++) {
                            var nextSegment = steps[j].path;
                            var stepPolyline = new google.maps.Polyline(polylineOptions);
                            for (k = 0; k < nextSegment.length; k++) {
                                stepPolyline.getPath().push(nextSegment[k]);
                            }
                            stepPolyline.setMap(map);
                            polylines.push(stepPolyline);
                            google.maps.event.addListener(stepPolyline, 'click', function(evt) {
                                infowindow.setContent("you clicked on " + course + "<br>" + evt.latLng.toUrlValue(6));
                                infowindow.setPosition(evt.latLng);
                                infowindow.open(map);
                            })
                        }
                    }
                }

                function drawMarkers(position, color, course) {
                    if(myCoords.route[0].lat()===position.lat()&&myCoords.route[0].lng()===position.lng()){
                        console.log('first');
                        title=strings['place_of_delivery'];
                        markerPath='img/marker-shop.png';
                        /* markerPath={
                             path: google.maps.SymbolPath.CIRCLE,
                             scale: 5,
                             fillColor: color,
                             fillOpacity: 1,
                             strokeWeight: 0,
                             image: ''
                         };*/
                    }else if(myCoords.route[myCoords.route.length-1].lat()===position.lat()&&myCoords.route[myCoords.route.length-1].lng()===position.lng()){
                        console.log('last');
                        title=strings['delivery_place'];
                        markerPath='img/marker-home.png';
                    }else if(myCoords.route.length>=2&&myCoords.route[1].lat()===position.lat()&&myCoords.route[1].lng()===position.lng()){
                        console.log('delegate');
                        title=strings['delegate_position'];
                        markerPath='img/marker-delegate.png';
                    }
                    var marker = new google.maps.Marker({
                        position: position,
                        clickable: true,
                        title: title,
                        label: {
                            text: course,
                            fontSize: "0px"
                        },
                        icon: markerPath,
                        map: map
                    });
                    markers.push(marker);
                    redirectTo(marker, marker.label.text);
                }

                function buildPath(origin, destination, wayPoints, color, route) {
                    directionsService.route({
                            origin: origin,
                            destination: destination,
                            waypoints: wayPoints,
                            travelMode: google.maps.DirectionsTravelMode.DRIVING
                        },
                        function(result, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                renderDirections(result, color, route);
                            }
                        });
                    var labelPosition = setLabelPosition(route);
                    console.log(labelPosition, 'labelPosition');
                }

                function redirectTo(element, identifier) {
                    google.maps.event.addListener(element, 'click', function(evt) {
                        console.log(evt.latLng.lat(),evt.latLng.lng())
                        console.log(myCoords.route[0].lat(),myCoords.route[0].lng())
                        if(myCoords.route[0].lat()===evt.latLng.lat()&&myCoords.route[0].lng()===evt.latLng.lng()){
                            console.log('first');
                            if(userData.type=='delegate'){
                                navigator.geolocation.getCurrentPosition(function(currentPosition){
                                    var longitude = currentPosition.coords.longitude;
                                    var latitude = currentPosition.coords.latitude;

                                    var geocoder = new google.maps.Geocoder();
                                    var latlng = {lat: latitude, lng: longitude};
                                    geocoder.geocode({'location': latlng}, function(results, status) {
                                        if (status === google.maps.GeocoderStatus.OK) {
                                            address=results[0].formatted_address;
                                            launchnavigator.navigate(orderData.place_of_delivery_address, {
                                                start: address,
                                                enableDebug: true,
                                                successCallback: function(){},
                                                errorCallback: function(){}
                                            });
                                            return false;
                                        } else {
                                            alert('Geocode was not successful for the following reason: ' + status);
                                        }
                                    });

                                }, onError)
                            }

                        }else if(myCoords.route[myCoords.route.length-1].lat()===evt.latLng.lat()&&myCoords.route[myCoords.route.length-1].lng()===evt.latLng.lng()){
                            console.log('last');
                            if(userData.type=='delegate'){
                                navigator.geolocation.getCurrentPosition(function(currentPosition){
                                    var longitude = currentPosition.coords.longitude;
                                    var latitude = currentPosition.coords.latitude;
                                    var geocoder = new google.maps.Geocoder();
                                    var latlng = {lat: latitude, lng: longitude};
                                    geocoder.geocode({'location': latlng}, function(results, status) {
                                        if (status === google.maps.GeocoderStatus.OK) {
                                            address=results[0].formatted_address;
                                            launchnavigator.navigate(orderData.delivery_place_latitude, {
                                                start: start,
                                                enableDebug: true,
                                                successCallback: function(){},
                                                errorCallback: function(){}
                                            });
                                            return false;
                                        } else {
                                            alert('Geocode was not successful for the following reason: ' + status);
                                        }
                                    });

                                }, onError)
                            }

                        }else if(myCoords.route.length>=2&&myCoords.route[1].lat()===evt.latLng.lat()&&myCoords.route[1].lng()===evt.latLng.lng()){
                            console.log('delegate');
                        }
                    })
                };

                function setLabelPosition(course) {
                    switch (course) {
                        case 'route':
                            return 'labelAnchor: new google.maps.Point(90,20))';
                            break;
                    }
                }

                Object.keys(myCoords).forEach(function(key) {
                    var curentOrigin = myCoords[key][0],
                        curentDestination = myCoords[key][myCoords[key].length - 1],
                        wayPoints = [],
                        color = routesOptions[key].color;
                    for (var j = 1; j < myCoords[key].length - 1; j++) {
                        wayPoints.push({
                            location: myCoords[key][j],
                            stopover: true
                        });
                        if (j === myCoords[key].length - 2) {
                            console.log(curentOrigin)
                            buildPath(curentOrigin, curentDestination, wayPoints, color, key);
                        }
                    }
                    for (var j = 0; j < myCoords[key].length; j++) {
                        drawMarkers(myCoords[key][j], color, key);
                    }
                });
                setInterval(function(){

                    $.ajax({
                        type: "GET",
                        url: makeURL('foreraa_orders/'+orderData.order_id),
                        success: function (msg) {
                            if(msg.success){
                                orderData=msg.result;
                                markers[1].setPosition( new google.maps.LatLng(orderData.delegate_lastLatitude,orderData.delegate_lastLongitude));
                                window.sessionStorage.setItem("orderData",JSON.stringify(orderData));
                            }
                        }

                    });
                },5000)

            }
            initMap();
            window.document.addEventListener("scroll", function(){
                if(window.pageYOffset == 0){
                    window.scrollBy(0, 60);
                    user_id=userData.id;
                    order_id=orderData.id;
                    if(userData.type=='customer'){
                        if(user_id){
                            $.ajax({
                                type: "GET",
                                url: makeURL('foreraa_orders/'+order_id+'?user_id='+user_id),
                                success: function (msg) {
                                    if(msg.success){
                                        window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                                        orderData=msg.result;
                                        orderDataHTML(orderData,userData);
                                        initMap();
                                        window.scrollBy(0, 60);
                                    }

                                }
                            });
                        }
                    }else{
                        $.ajax({
                            type: "GET",
                            url: makeURL('foreraa_orders/'+order_id+'?delegate_id='+user_id),
                            success: function (msg) {
                                if(msg.success){
                                    window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                                    orderData=msg.result;
                                    orderDataHTML(orderData,userData);
                                    initMap();
                                    window.scrollBy(0, 60);
                                }

                            }
                        });
                    }

                }
            },false)
        }else{
            window.location.href="my-orders.html"
        }
    });

}
