var userData=window.sessionStorage.getItem('userData');
if(userData){
    userData=JSON.parse(userData);
    user_id=userData.id;
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_complaints?user_id='+user_id),
        success: function (msg) {
            //getMessages(msg,"#response")
            $(".loader").hide();
            if(msg.success){
                html="";
                if(msg.result.length){
                    msg.result.forEach(function(item){
                        //html+='<li class="list-group-item"><a href="javascript:void(0)" data-id="'+item.order_id+'" class="single-order"> <div class="col-xs-3 col-sm-3"> <img src="img/order-icon.png" alt="Order Number #'+item.id+'" class="img-responsive img-circle" /> </div> <div class="col-xs-9 col-sm-9"> <span class="name">Order Number #'+item.id+'</span> <div class="clearfix"></div> <span class="visible-xs"> <span class="text-muted">'+item.place_of_delivery_address+'</span></span> <div class="clearfix"></div><span class="visible-xs"> <span class="text-muted">'+item.distance+' - '+item.duration+'</span></span>  </div> <div class="clearfix"></div> </a></li>';
                        add_date=new Date(item.add_date);
                        html+='<a href="javascript:void(0)" data-id="'+item.id+'" class="single-complaint"><div class="panel panel-default order-panel"> <div class="panel-heading"> <div class="order-title"> <div class="order-name pull-left"> <h3 class="panel-title"><span >'+strings.complaint_id+'</span> #'+item.id+'</h3> <ul class="list-inline"> <li><i class="fa fa-calendar-alt"></i>'+formatDate(add_date)+'</li> <li><i class="fa fa-clock"></i>'+formatTime(add_date)+'</li> </ul> </div> <span class="order-status success pull-right"><i class="fa '+statusIcon(item.statues)+'"></i><span class="status-text"> '+strings[item.statues]+'</span></span> </div> </div><!-- end panel-heading --> </div></a>'
                    });
                }else{
                    html+='<div class="panel panel-default order-panel"> <div class="panel-heading"> <div class="order-title"> <div class="order-name"> <h3 class="panel-title text-center"><span>'+strings.no_complaint+'</h3>  </div>  </div> </div><!-- end panel-heading --> </div>'
                }

                $("#my_orders").html(html)
            }
        }

    });

}



