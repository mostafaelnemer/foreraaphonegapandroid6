/*
var keyName = window.sessionStorage.key(0); //Get key name
window.sessionStorage.setItem("key", "value"); //Set item
var value = window.sessionStorage.getItem("key");// Get item
window.sessionStorage.removeItem("key"); //Remove Item
window.sessionStorage.clear();//Clear storage
*/
//  window.sessionStorage.clear();\
/*start lang js file*/
var selectedLang=(localStorage.getItem("lang")=='ar'||localStorage.getItem("lang")=='en')?localStorage.getItem("lang"):'en';
if(selectedLang=='ar'){
    $('head').append('<link rel="stylesheet" href="css/rtl.css" type="text/css" />');
}
window.strings = (localStorage.getItem("strings"))?JSON.parse(localStorage.getItem("strings")):null;
var strings = (localStorage.getItem("strings"))?JSON.parse(localStorage.getItem("strings")):null;
$.getJSON('lang/'+selectedLang+'.json')
    .done(function (data) {
        window.strings = data;
        var strings = data;
        //console.log(data);
        localStorage.setItem('strings',JSON.stringify(strings));
        includeHTML();
        translate();

    });
/*console.log(localStorage.getItem("lang"));
var imported = document.createElement('script');
if(localStorage.getItem("lang")=="ar"){
    // alert(localStorage.getItem("lang"));
    console.log("middle ar");
    imported.src = 'lang/ar.js';
    document.head.appendChild(imported);

}
else if(localStorage.getItem("lang")=="en"){
    // alert(localStorage.getItem("lang"));
    //var imported = document.createElement('script');
    console.log("middle en");
    imported.src = 'lang/en.js';
    document.head.appendChild(imported);

}else{
    console.log("default en");
    imported.src = 'lang/en.js';
    document.head.appendChild(imported);

}
console.log("end ",localStorage.getItem("lang"));*/

/*end lang js file*/
$("#lang").on('change', function () {
    alert($('#lang option:selected').val());
    localStorage.setItem("lang", $('#lang option:selected').val());
    //alert("feeeettt  " + localStorage.getItem("lang"));
    location.reload();

});

$(document).on('click','#lang', function () {


    var lang= localStorage.getItem('lang');
    //alert(lang);
    if (lang=='ar'){lang='en';}else{lang='ar';}
    //alert(lang);
    localStorage.setItem("lang", lang);
    //alert("feeeettt  " + localStorage.getItem("lang"));
    location.reload();

});
function translate(){
$("[trans-lang-html]").each(function () {
    //console.log($(this).attr('trans-lang-html'));
    //console.log(strings[$(this).attr('trans-lang-html')]);
    $(this).html(strings[$(this).attr('trans-lang-html')]);
    $(this).removeAttr('trans-lang-html')
})
$("[trans-lang-placeholder]").each(function () {
    //console.log(strings[$(this).attr('trans-lang-placeholder')]);
    $(this).attr('placeholder', strings[$(this).attr('trans-lang-placeholder')]);
    $(this).removeAttr('trans-lang-placeholder')
});
}

        
var userData = window.sessionStorage.getItem("userData");
//console.log(userData);
if(userData){
    userData=JSON.parse(userData);
    user_id=userData.id
    $("#user_id,.user_id").val(user_id);
}
var $element = $(".innerpage-section-padding div");
var lastHeight = $(".innerpage-section-padding div").css('height');
function checkForChanges()
{
    if ($element.css('height') != lastHeight)
    {
        windowHeight=$(window).height();
        elementHeight=$element.height();
        minHeight=(windowHeight>elementHeight)?windowHeight:elementHeight;
        $(".innerpage-section-padding").css({"min-height":minHeight+50})
        lastHeight = $element.css('height');
    }

    setTimeout(checkForChanges, 500);
}
checkForChanges();
$(".innerpage-section-padding").css({"min-height":$(window).height()+50})
//console.log(userData);
url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            translate();
//            elmnt.find($("[trans-lang-html]").each(function () {
//                console.log(strings[$(this).attr('trans-lang-html')]);
//                $(this).html(strings[$(this).attr('trans-lang-html')]);
//        }));
//        $("[trans-lang-html]").each(function () {
//                console.log(strings[$(this).attr('trans-lang-html')]);
//                $(this).html(strings[$(this).attr('trans-lang-html')]);
//        })
//elmnt.find("[trans-lang-html]").each(function () {
//                console.log(strings[$(this).attr('trans-lang-html')]);
//                $(this).html(strings[$(this).attr('trans-lang-html')]);
//        });
            
            /*exit the function:*/
            return;
        }
    }
};

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
function formatTime(date) {
    var hr = date.getHours();
    var min = date.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var ampm = "am";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }if(hr==12&&min>0){
        ampm="pm"
    }
    return hr + ":" + min + ampm
}
function statusIcon(statues) {
    switch (statues){
        case 'new':
            return 'fa-times-circle'
            break;
        case 'inprogress':
            return 'fa-spinner';
            break;
        case 'has_invoice':
            return 'fa-bars';
            break;
        case 'confirm_invoice':
            return 'fa-check-circle';
            break;
        case 'canceled':
            return 'fa-times-circle'
            break;
        case 'closed':
            return 'fa-check'
            break;
    }
}
//the url of api requests
var SITEURL="http://4reara.almoasherbiz.com/";
var APIURL="http://4reara.almoasherbiz.com/ForeraaAPI/";
//var APIURL="http://localhost/foreraa/public/ForeraaAPI/";

//create route request url
function makeURL(route){
    return APIURL+route;
}

function getMessages(response,element){
    html='<div class="alert '+((response.success)?'alert-success':'alert-danger')+'">';
    message=response.message;
    if(message.length==1){
        html+=((typeof strings[message[0]]=='undefined')?message[0]:strings[message[0]])+'</div>';
        $(element).html(html);
        return'';
    }
    html+='<ul>';
    if(Array.isArray(message)){
       message.forEach(function(item){
          html+='<li>'+((typeof strings[item]=='undefined')?item:strings[item])+'</li>'
       })
    }
    html+='</ul></div>';
    $(element).html(html);
}
// Device Event Listener
$(document).ready(function(){
    document.addEventListener("deviceready",onDeviceReady,false);
});

function updateStatusCallback(response) {
    if(response.status==='connected'){
        //console.log('you are connected');
    }else if(response.status==='not_authorized'){
        //console.log('you are not authorized');
    }else{
        //console.log('you are not authorized and not login');
    }
}
// Transaction error callback
//
function errorDB(tx, err) {
    console.log("Error processing SQL: "+err);
}

// Transaction success callback
//
function successDB() {
    console.log("success!");
}
function onDeviceReady() {
    $( ".page-cover" ).after( ' <div style="height:100px;" class="text-center"><img src="img/loading.gif" alt="" style="height: 50px;width:  50px;margin-top:  20px;"></div>' );
    //console.log(window.location.href);
    console.log(window.pageYOffset)
    window.scrollBy(0, 100);
    var db = window.openDatabase("foreraa_app.db", "1.0", "Foreraa App", 200000);
    console.log('db');
    db.transaction(function(tx){
        query='CREATE TABLE IF NOT EXISTS foreraa_app_user (id unique, username,password)';
        tx.executeSql(query);
        query='SELECT * FROM foreraa_app_user WHERE id=?';
        tx.executeSql(query,[1],function(tx, res){
            if(res.rows.length){
                userDataDB=res.rows[0]
                console.log(userDataDB);
                if(!userData){
                    $.ajax({
                        type: "POST",
                        url: makeURL('foreraa_users/login'),
                        data: {"phone":userDataDB.username,"password":userDataDB.password},
                        success: function (msg) {
                            $(".loader").hide();
                            if(msg.success){
                                window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                                window.location.href="map.html";
                            }
                        }

                    });
                }


            }

        });
        //console.log(query);
    },errorDB,successDB);
    /*function populateDB(tx) {
        /!*query='DROP TABLE IF EXISTS DEMO';
        tx.executeSql(query);
        console.log(query);
        query='CREATE TABLE IF NOT EXISTS DEMO (id unique, data)';
        tx.executeSql(query);
        console.log(query);
        query='INSERT INTO DEMO (id, data) VALUES (1, "First row")';
        tx.executeSql(query);
        console.log(query);
        query='INSERT INTO DEMO (id, data) VALUES (2, "Second row")';
        tx.executeSql(query);
        console.log(query);*!/
        query='SELECT * FROM DEMO WHERE id=?';
        tx.executeSql(query,[1],function(tx, res){
            console.log(tx);
            console.log(res);
            for(var iii = 0; iii < res.rows.length; iii++)
            {
                console.log(res.rows.item(iii).id);
                console.log(res.rows.item(iii).data);
            }
        });
        console.log(query);
    }


    db.transaction(populateDB, errorCB, successCB);*/
    /*if ("Notification" in window) {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === 'granted') {
                /!*cordova.plugins.notification.local.schedule({
                    title: 'My first notification',
                    text: 'Thats pretty easy...',
                    foreground: true
                });*!/
                /!*var notification = new Notification("My title", {
                    tag: 'message1',
                    body: "My body"
                });*!/
                /!*notification.onshow  = function() { console.log('show'); };
                notification.onclose = function() { console.log('close'); };
                notification.onclick = function() { console.log('click'); };*!/
            }
        });
    }*/
    if ("FirebasePlugin" in window) {
        /*cordova.plugins.notification.local.schedule({
            title: 'title',
            text: 'body',
            action: 'my-orders.html',
            foreground: true
        });*/
        cordova.plugins.notification.local.on("click", function (notification, state) {
            console.log('notification');
            console.log(notification);
            console.log('state');
            console.log(state);
            console.log(notification.id + " was clicked");
            console.log(notification.action);
            if(notification.action){
                window.location.href=notification.action;
            }
        }, this)
        window.FirebasePlugin.getToken(function(token) {
            // save this server-side and use it to push notifications to this device
            console.log('getToken');
            console.log(token);
            if(userData){
                $.ajax({
                    type: "POST",
                    url: makeURL('foreraa_users/'+userData.id+'/saveToken'),
                    data: {"firebaseToken":token},
                    success: function (msg) {

                    }
                });
            }
        }, function(error) {
            console.log('getToken');
            console.error(error);
        });
        window.FirebasePlugin.onTokenRefresh(function(token) {
            // save this server-side and use it to push notifications to this device
            console.log('onTokenRefresh');
            console.log(token);
            if(userData){
                $.ajax({
                    type: "POST",
                    url: makeURL('foreraa_users/'+userData.id+'/saveToken'),
                    data: {"firebaseToken":token},
                    success: function (msg) {

                    }
                });
            }
        }, function(error) {
            console.log('onTokenRefresh');
            console.error(error);
        });
        window.FirebasePlugin.onNotificationOpen(function(notificationData) {
            console.log('notification');
            console.log(notificationData);
            /*var notification = new Notification("My title", {
                tag: 'message1',
                body: notificationData.body
            });*/
            cordova.plugins.notification.local.schedule({
                title: (notificationData.title)?notificationData.title:'custom title',
                text: (notificationData.body)?notificationData.body:'custom body',
                action: (notificationData.action)?notificationData.action:null,
                foreground: true
            });
           // notification.onclick = function() { console.log('click'); };
        }, function(error) {
            console.log('notification');
            console.error(error);
        });
        window.FirebasePlugin.hasPermission(function(data){
            console.log('hasPermission');
            console.log(data.isEnabled);
        });
    }


    if(userData){
        changeData=setInterval(function(){
            if($("#userImage").length){
                $("#logoutMenu").removeClass('hidden');
                $("#userImage").attr('src',userData.image);
                userNameHtml=(userData.type=='delegate')?'<i id="delegateStatues" class="fa fa-circle '+userData.delegateData.status+'"></i>'+userData.name:+userData.name;
                $("#userName").html(userNameHtml);
                if(userData.type=='customer'){
                    $("#delegateRatings").removeClass('hidden')
                }else{
                    if(userData.delegateData.status=='online'){
                        $("#makeOffline").removeClass('hidden');
                    }else{
                        $("#makeOnline").removeClass('hidden');
                    }
                }
                clearInterval(changeData);
            }
        },300)
        if(userData.type=='customer'){
            $("#getAllServices").removeClass('hidden');
        }else{
            $("#getAllOrders").removeClass('hidden');
            $("#serviceMenu").addClass('hidden');
        }

    }else{
        changeData=setInterval(function() {
            if($("#userImage").length) {
                $("#serviceMenu,#complaintsMenu,#myOrdersMenu,#myAccountMenu").addClass('hidden');
            }
        },300);
    }
    //console.log('Device Is Ready');

   // console.log("start get location ");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
   /*cordova.plugins.locationAccuracy.canRequest(function(canRequest){
       if(canRequest){
           cordova.plugins.locationAccuracy.request(function (success){
               //console.log("Successfully requested accuracy: "+success.message);

           }, function (error){
               //console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
               if(error.code !==facebookLogin cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                   if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                       cordova.plugins.diagnostic.switchToLocationSettings();
                   }
               }
           }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
       }
   });
*/
    $(document).on('click',"#fb_login",facebookLogin);
    var registerValidator = $("#register-form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            /*$( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );*/
            //$(element).parent().parent().addClass('has-error');

        },
        highlight: function(element) {

            $(element).closest('.form-group').addClass('has-error');

        },
        unhighlight: function(element) {

            $(element).closest('.form-group').removeClass('has-error');

        },
        errorElement: "span",
        rules : {

            name : {
                required:true,
                minlength : 5
            },
            email : {
                required:true,
                minlength : 5
            },
            phone : {
                required:true,
                minlength : 5
            },
            password : {
                required:true,
                minlength : 5
            },
            confirm_password : {
                required:true,
                minlength : 5,
                equalTo:"#password"
            },
            term_condition : {
                required:true,
            }
        },
        messages: {
        },
        submitHandler: function() {
            //alert('start');
            //$("#charge-btn").attr("disabled", true);
            $(".loader").show();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_users'),
                data: $("#register-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    if(msg.success){
                        $("#register-form #social").val('no');
                        $("#register-form")[0].reset();
                        window.location.href="confirm_phone.html";
                    }
                    $(".loader").hide();
                }
            });
        }
    });
    $(".cancel").click(function() {
        registerValidator.resetForm();
    });
    var registerValidator = $("#forget-password-form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            /*$( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );*/
            //$(element).parent().parent().addClass('has-error');

        },
        highlight: function(element) {

            $(element).closest('.form-group').addClass('has-error');

        },
        unhighlight: function(element) {

            $(element).closest('.form-group').removeClass('has-error');

        },
        errorElement: "span",
        rules : {

            phone : {
                required:true,
                minlength : 5
            }
        },
        messages: {
        },
        submitHandler: function() {
            //alert('start');
            //$("#charge-btn").attr("disabled", true);
            $(".loader").show();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_users/forgetPassword'),
                data: $("#forget-password-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    if(msg.success){

                    }
                    $(".loader").hide();
                }
            });
        }
    });
    $(".cancel").click(function() {
        registerValidator.resetForm();
    });
    var registerValidator = $("#confirm-code-form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            /*$( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );*/
            //$(element).parent().parent().addClass('has-error');

        },
        highlight: function(element) {

            $(element).closest('.form-group').addClass('has-error');

        },
        unhighlight: function(element) {

            $(element).closest('.form-group').removeClass('has-error');

        },
        errorElement: "span",
        rules : {

            confirm_code : {
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
            code=$("#confirm_code").val();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_users/ActiveByCode/'+code),
                data: $("#confirm-code-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    if(msg.success){
                        setTimeout(function(){
                            window.location.href="index.html";
                        },3000)
                    }
                    $(".loader").hide();
                }
            });
        }
    });
    $(".cancel").click(function() {
        registerValidator.resetForm();
    });
    var registerValidator = $("#resend-code-form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            /*$( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );*/
            //$(element).parent().parent().addClass('has-error');

        },
        highlight: function(element) {

            $(element).closest('.form-group').addClass('has-error');

        },
        unhighlight: function(element) {

            $(element).closest('.form-group').removeClass('has-error');

        },
        errorElement: "span",
        rules : {

            phone : {
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
            code=$("#confirm_code").val();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_users/resendCode'),
                data: $("#resend-code-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    if(msg.success){
                        setTimeout(function(){
                            window.location.href="confirm_phone.html";
                        },3000)
                    }
                    $(".loader").hide();
                }
            });
        }
    });
    $(".cancel").click(function() {
        registerValidator.resetForm();
    });
    /*complaint*/
    var addComplaint = $("#add-complaint-form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            $( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );
            //$(element).parent().parent().addClass('has-error');

        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: "span",
        rules : {
            complaint : {
                required:true,
                minlength : 50
            },
        },
        messages: {
        },
        submitHandler: function() {
            //alert('start');
            //$("#charge-btn").attr("disabled", true);
            $(".loader").show();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_complaints'),
                data: $("#add-complaint-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    if(msg.success){
                        $("#add-complaint-form")[0].reset();
                    }
                    $(".loader").hide();
                }
            });
        }
    });
    /*complaint*/
    /*$(document).on('submit',"#register-form",function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users'),
            data: $("#register-form").serialize(),
            success: function (msg) {
                getMessages(msg,"#response")
                if(msg.success){
                    $("#register-form #social").val('no');
                    $("#register-form")[0].reset();
                }
            }
        });
    });*/
    var registerValidator = $("#register-form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            /*$( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );*/
            //$(element).parent().parent().addClass('has-error');

        },
        highlight: function(element) {

            $(element).closest('.form-group').addClass('has-error');

        },
        unhighlight: function(element) {

            $(element).closest('.form-group').removeClass('has-error');

        },
        errorElement: "span",
        rules : {

            name : {
                required:true,
                minlength : 5
            },
            email : {
                required:true,
                minlength : 5
            },
            phone : {
                required:true,
                minlength : 5
            },
            password : {
                required:true,
                minlength : 5
            },
            confirm_password : {
                required:true,
                minlength : 5,
                equalTo:"#password"
            }
        },
        messages: {
        },
        submitHandler: function() {
            //alert('start');
            //$("#charge-btn").attr("disabled", true);
            $(".loader").show();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_users'),
                data: $("#register-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response");
                    if(msg.success){
                        $("#register-form #social").val('no');
                        $("#register-form")[0].reset();
                    }
                    $(".loader").hide();
                }
            });
        }
    });
    $(".cancel").click(function() {
        registerValidator.resetForm();
    });
    var loginValidator = $("#login-form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            /*$( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );*/
            //$(element).parent().parent().addClass('has-error');
        },
        highlight: function(element) {

            $(element).closest('.form-group').addClass('has-error');

        },
        unhighlight: function(element) {

            $(element).closest('.form-group').removeClass('has-error');

        },
        errorElement: "span",
        rules : {

            phone : {
                required:true,
                minlength : 5
            },
            password : {
                required:true,
                minlength : 5
            }
        },
        messages: {
        },
        submitHandler: function() {

            //alert('start');
            //$("#charge-btn").attr("disabled", true);
            $(".loader").show();
            phone=$("#login-form input[name='phone']").val();
            password=$("#login-form input[name='password']").val();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_users/login'),
                data: $("#login-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    $(".loader").hide();
                    if(msg.success){
                        db.transaction(function(tx){
                            console.log('msg.success');
                            console.log(msg);
                            tx.executeSql('INSERT INTO foreraa_app_user (id, username,password) VALUES (1, ?,?)',[phone,password]);
                            window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                            window.location.href="map.html";
                        }, errorDB, successDB);

                    }
                }

            });
        }
    });
    function successHandler(result){
        console.log("SUCCESS: \r\n"+result );
    }
    function errorHandler(result){
        console.log("ERORR: \r\n"+result );
    }
    $(".cancel").click(function() {
        loginValidator.resetForm();
    });

    /*$(document).on('submit',"#login-form",function(e){
       //alert("asda");
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users/login'),
            data: $("#login-form").serialize(),
            success: function (msg) {
                getMessages(msg,"#response")
                if(msg.success){
                    window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                }
            }

        });
    })*/
    //logout
    $(document).on('click','#logoutMenu',function(e){
        e.preventDefault();
        db.transaction(function(tx){
            query='DELETE FROM foreraa_app_user WHERE id=?';
            tx.executeSql(query,[1]);
            window.sessionStorage.removeItem("userData");
            window.location.href="index.html";
        });

    });
}

$(document).on('click','#getMyLocation',function(){
    //console.log("start get location");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});
$(document).on('click','#getAllOrders',function(e){
    e.preventDefault();
    window.location.href="delegate-orders.html";
})
$(document).on('click','#getAllServices,#serviceMenu',function(e){
    e.preventDefault();
    $(".loader").show();
    longitude=$("#longitude").val();
    latitude=$("#latitude").val();
    address=$("#address").val();
    if(longitude&&latitude){
        window.sessionStorage.setItem("userDataLongitude", longitude);
        window.sessionStorage.setItem("userDataLatitude", latitude);
        window.sessionStorage.setItem("userDataAddress", address);
    }
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_services'),
        success: function (msg) {
            //getMessages(msg,"#response")
            $(".loader").hide();
            if(msg.success){
                window.sessionStorage.setItem("servicesData", JSON.stringify(msg.result));
                window.location.href="services.html"
            }
        }

    });
});
/*single service start code*/
$(document).on('click','.single-service',function(){
    id=$(this).data('id');
    //window.location.href='service.html?id='+id
    jsonData=$(this).data('json');
     serviceData=JSON.stringify($(this).data('json'));
     //console.log(serviceData);
    window.sessionStorage.setItem("serviceData",serviceData);
     //console.log(serviceData);
     //window.location.href=jsonData.type+'.html?id='+id
     //console.log(jsonData.type+'.html?id='+id);
     window.location.href=jsonData.type+'.html?id='+id
});
/*single service end code*/
$(document).on('click','#place_of_delivery',function(){
    window.location.href="parcel_place_of_delivery.html"
});
$(document).on('click','#delivery_place',function(){
    window.location.href="parcel_delivery_place.html"
});
/*single parcel start code*/
function saveLocationSession(lastLongitude,lastLatitude){
    window.sessionStorage.setItem("lastLongitude", lastLongitude);
    window.sessionStorage.setItem("lastLatitude", lastLatitude);
}
function sendlatlong(lastLongitude,lastLatitude) {
    if(userData){
        saveLocationSession(lastLongitude,lastLatitude);
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users/' + userData.id + '/saveLocation'),
            data: {"lastLongitude": lastLongitude, "lastLatitude": lastLatitude},
            success: function (msg) {
                if (msg.success) {
                }
            }
        });
    }
}
/*single parcel end code*/
 function onSuccess(position){
     var longitude = position.coords.longitude;
     var latitude = position.coords.latitude;
     sendlatlong(longitude,latitude);
     setInterval(function(){
         console.log('send location')
         sendlatlong(longitude,latitude)
     }, 100000);
     if($("#map").length>0){
         //console.log("succsess get location");

         var latLong = new google.maps.LatLng(latitude, longitude);
         var mapOptions = {
             center: latLong,
             zoom: 15,
             mapTypeId: google.maps.MapTypeId.ROADMAP,
             gestureHandling: 'greedy'
         };

         var map = new google.maps.Map(document.getElementById("map"), mapOptions);

         var marker = new google.maps.Marker({
             position: latLong,
             map: map,
             title: 'my location',
             draggable: true,
         });
         var geocoder = new google.maps.Geocoder();
         var latlng = {lat: latitude, lng: longitude};
         geocoder.geocode({'location': latlng}, function(results, status) {
             if (status === google.maps.GeocoderStatus.OK) {
                 address=results[0].formatted_address;
                 $("#address").val(address);
                 $("#latitude,#latitude_d").val(latitude);
                 $("#longitude,#longitude_d").val(longitude);
                 if(filename=='map.html'){
                     window.sessionStorage.setItem("userDataLongitude", longitude)
                     window.sessionStorage.setItem("userDataLatitude", latitude)
                     window.sessionStorage.setItem("userDataAddress", address)
                 }
             } else {
                 alert('Geocode was not successful for the following reason: ' + status);
             }
         });
         marker.addListener('drag',function(event) {
             //console.log(event.latLng.lat());
             //console.log(event.latLng.lng());
         });
         map.addListener('click',function(event){
             //console.log(event.latLng.lat());
             //console.log(event.latLng.lng());
             var latlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
             marker.setPosition(latlng);
             latitude=event.latLng.lat();
             longitude=event.latLng.lng();

             geocoder.geocode({'location': latlng}, function(results, status) {
                 if (status === google.maps.GeocoderStatus.OK) {
                     address=results[0].formatted_address;
                     $("#address,#ar_address").val(address);
                     $("#latitude,#latitude_d").val(latitude);
                     $("#longitude,#longitude_d").val(longitude);
                     if(filename=='map.html'){
                         window.sessionStorage.setItem("userDataLongitude", longitude)
                         window.sessionStorage.setItem("userDataLatitude", latitude)
                         window.sessionStorage.setItem("userDataAddress", address)
                     }
                 } else {
                     alert('Geocode was not successful for the following reason: ' + status);
                 }
             });
         });
         marker.addListener('dragend',function(event) {
             var latitude = event.latLng.lat();
             var longitude = event.latLng.lng();
             var latlng = {lat: latitude, lng: longitude};
             geocoder.geocode({'location': latlng}, function(results, status) {
                 if (status === google.maps.GeocoderStatus.OK) {
                     address=results[0].formatted_address;
                     $("#address").val(address);
                     $("#latitude").val(latitude);
                     $("#longitude").val(longitude);
                     if(filename=='map.html'){
                         window.sessionStorage.setItem("userDataLongitude", longitude)
                         window.sessionStorage.setItem("userDataLatitude", latitude)
                         window.sessionStorage.setItem("userDataAddress", address)
                     }
                 } else {
                     alert('Geocode was not successful for the following reason: ' + status);
                 }
             });
         });
         marker.addListener('dragstart',function(event) {
             //console.log(event);
             //console.log("stat"+event.latLng.lat());
             //console.log("stat"+event.latLng.lng());
         });
         if(document.getElementById('address')&&$("#address").attr('type')!='hidden'){
             var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'));
             autocomplete.bindTo('bounds', map);
             autocomplete.addListener('place_changed', function() {
                 var place = autocomplete.getPlace();
                 if(place.geometry){
                     if (place.geometry.viewport) {
                         map.fitBounds(place.geometry.viewport);
                         latitude=place.geometry.location.lat();
                         longitude=place.geometry.location.lng();
                         $("#latitude").val(latitude);
                         $("#longitude").val(longitude);
                     } else {
                         latitude=place.geometry.location.lat();
                         longitude=place.geometry.location.lng();
                         $("#latitude").val(latitude);
                         $("#longitude").val(longitude);
                         map.setCenter(place.geometry.location);
                         map.setZoom(17);  // Why 17? Because it looks good.
                     }
                 }
             })
         }

     }


}

 function onError (error){
    alert("the code is " + error.code + ". \n" + "message: " + error.message);
}

function facebookLogin(){
    FB.login(function(response){
        if(response.status=='connected'){
            //console.log("facebookLogin",response);
            getFacebookData();
        }
    },{scope:'email,public_profile,user_location'});
}
function getFacebookData() {
    FB.api('/me?fields=id,name,email',function(response){
        //console.log("getFacebookData",response);
        $("#register-form #social").val('facebook');
        $("#register-form #name").val(response.name);
        $("#register-form #email").val(response.email);
    });
}

function searchOnGoogleMap(serviceData) {
    serviceData=serviceData;
    if(serviceData.type=='parcel'){
        //console.log(serviceData)
        $(".loader").show();
        /*$.ajax({
            type: "GET",
            url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?location=29.975843,31.281395&radius=20000 &type=restaurant&query=&key=AIzaSyAkCdsKtwMjpKWDKLUoTb2YegHKVtEG7o0&language=en',
            success: function (msg) {
                //getMessages(msg,"#response")
                $(".loader").hide();
                console.log(msg)
            }

        });*/
        lang='ar';
        userData=window.sessionStorage.getItem('userData');
        if(userData){
            userData=JSON.parse(userData);
        }
        user_id=userData.id
        $("#user_id").val(user_id);
        var userDataLongitude=Number(window.sessionStorage.getItem("userDataLongitude")),
            userDataLatitude=Number(window.sessionStorage.getItem("userDataLatitude")),
            deliveryPlaceLatitude=Number(window.sessionStorage.getItem("deliveryPlaceLatitude")),
            deliveryPlaceLongitude=Number(window.sessionStorage.getItem("deliveryPlaceLongitude")),
            deliveryPlaceAddress=window.sessionStorage.getItem("deliveryPlaceAddress"),
            placeOfDeliveryLatitude=Number(window.sessionStorage.getItem("placeOfDeliveryLatitude")),
            placeOfDeliveryLongitude=Number(window.sessionStorage.getItem("placeOfDeliveryLongitude")),
            placeOfDeliveryAddress=window.sessionStorage.getItem("placeOfDeliveryAddress");
        // console.log("user location");
        // console.log(userDataLongitude);
        // console.log(userDataLatitude);
        // console.log(deliveryPlaceAddress);
        // console.log(deliveryPlaceLatitude);
        // console.log(deliveryPlaceLongitude);
        //$("#place_of_delivery").val().data('value',parcelData.place_of_delivery);
        if(deliveryPlaceAddress){
            $("#delivery_place").html(deliveryPlaceAddress+' <span class="pull-right"><i class="fa fa-map-marker"></i></span>').attr('data-value',deliveryPlaceAddress);
            $("#delivery_place_address").val(deliveryPlaceAddress);
            $("#delivery_place_latitude").val(deliveryPlaceLatitude);
            $("#delivery_place_longitude").val(deliveryPlaceLongitude);
        }

        if(placeOfDeliveryAddress){
            $("#place_of_delivery").html(placeOfDeliveryAddress+' <span class="pull-right"><i class="fa fa-map-marker"></i></span>').attr('data-value',placeOfDeliveryAddress);
            $("#place_of_delivery_address").val(placeOfDeliveryAddress);
            $("#place_of_delivery_latitude").val(placeOfDeliveryLatitude);
            $("#place_of_delivery_longitude").val(placeOfDeliveryLongitude);
        }
        //$("#order_details").val().data('value',parcelData.order_details);
        //console.log(deliveryPlaceAddress);
        if(deliveryPlaceLatitude&&deliveryPlaceLongitude&&placeOfDeliveryLatitude&&placeOfDeliveryLongitude){
            destinationA=new google.maps.LatLng(placeOfDeliveryLatitude,placeOfDeliveryLongitude);
            destinationB=new google.maps.LatLng(deliveryPlaceLatitude,deliveryPlaceLongitude);
            var MatrixService = new google.maps.DistanceMatrixService();
            MatrixService.getDistanceMatrix({
                origins: [destinationA],
                destinations: [destinationB],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, function(matrixResponse,matrixRequest){
                // console.log("getDistanceMatrix");
                // console.log(matrixResponse);
                // console.log(matrixRequest);
                distance=matrixResponse.rows[0].elements[0].distance.text;
                duration=matrixResponse.rows[0].elements[0].duration.text;
                window.sessionStorage.setItem("parcelDistance",distance)
                window.sessionStorage.setItem("parcelDuration",duration)
                $("#distance").html(distance);
                $("#distanceInput").val(distance);
                $("#duration").html(duration);
                $("#durationInput").val(duration);
                cost=0;
                if(parseFloat(distance)<=3){
                    cost=3;
                }else{
                    cost=((parseFloat(distance)-3)*1)+3;
                }
                $("#costInput").val(cost);
                $("#cost").html(cost+" $")
            });
        }

    }else{
        //window.location.href="services.html";
    }
}
$(document).on('click','#saveDeliveryPlace',function(){
    var latitude =$("#latitude").val();
    var longitude = $("#longitude").val();
    var address = $("#address").val();
    window.sessionStorage.setItem("deliveryPlaceLatitude", latitude);
    window.sessionStorage.setItem("deliveryPlaceLongitude", longitude);
    window.sessionStorage.setItem("deliveryPlaceAddress", address);
    //console.log(latitude);
        //console.log(longitude);
    //console.log(window.sessionStorage.getItem("deliveryPlaceAddress"));
    window.location.href="parcel.html";
});
 $(document).on('click','#savePlaceOfDelivery',function(){
    var latitude =$("#latitude").val();
    var longitude = $("#longitude").val();
    var address = $("#address").val();
    window.sessionStorage.setItem("placeOfDeliveryLatitude", latitude);
    window.sessionStorage.setItem("placeOfDeliveryLongitude", longitude);
    window.sessionStorage.setItem("placeOfDeliveryAddress", address);
    //console.log(latitude);
    //console.log(longitude);
    //console.log(address);
    window.location.href="parcel.html";
});
var orderValidator = $("#order-form").validate({
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
        if($(element).attr("id")=='order_details'){
            $(element).closest('.form-group').addClass('has-error');
        }else{
            console.log($($(element).data("element")).parent().addClass('has-error'));
            $($(element).data("element")).closest('.form-group').addClass('has-error');
        }


    },
    unhighlight: function(element) {
        //console.log("unhighlight:");
        //console.log(element);
        if($(element).attr("id")=='order_details'){
            $(element).closest('.form-group').removeClass('has-error');
        }else{
            $(element).closest('.form-group').removeClass('has-error');
        }
    },
    errorElement: "span",
    rules : {

        place_of_delivery_address : {
            required:true,
            minlength : 5
        },
        delivery_place_address : {
            required:true,
            minlength : 5
        },
        details : {
            required:true,
            minlength : 5
        },
        duration : {
            required:true,
            minlength : 5
        },
        distance : {
            required:true,
            minlength : 5,
        }
    },
    messages: {
    },
    submitHandler: function() {
        //alert('start');
        //$("#charge-btn").attr("disabled", true);
        $(".loader").show();
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_orders'),
            data:$("#order-form").serialize(),
            success: function (msg) {
                getMessages(msg,"#response")
                if(msg.success){

                }
                $(".loader").hide();
            }

        });
    }
});

$(document).on('click','.single-location',function(){
   latitude=$(this).data('latitude');
   longitude=$(this).data('longitude');
   address=$(this).data('address');
   window.sessionStorage.setItem("serviceLocationLatitude",latitude)
   window.sessionStorage.setItem("serviceLocationLongitude",longitude)
   window.sessionStorage.setItem("serviceLocationAddress",address)
   window.location.href="service_location.html";

});
var serviceOrderValidator = $("#service-order-form").validate({
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
        if($(element).attr("id")=='order_details'){
            $(element).closest('.form-group').addClass('has-error');
        }else{
            //console.log($($(element).data("element")).parent().addClass('has-error'));
            $($(element).data("element")).closest('.form-group').addClass('has-error');
        }


    },
    unhighlight: function(element) {
        //console.log("unhighlight:");
        //console.log(element);
        if($(element).attr("id")=='order_details'){
            $(element).closest('.form-group').removeClass('has-error');
        }else{
            $(element).closest('.form-group').removeClass('has-error');
        }
    },
    errorElement: "span",
    rules : {

        place_of_delivery_address : {
            required:true,
            minlength : 5
        },
        delivery_place_address : {
            required:true,
            minlength : 5
        },
        details : {
            required:true,
            minlength : 5
        },
        duration : {
            required:true,
            minlength : 5
        },
        distance : {
            required:true,
            minlength : 5,
        }
    },
    messages: {
    },
    submitHandler: function() {
        //alert('start');
        //$("#charge-btn").attr("disabled", true);
        $(".loader").show();
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_orders'),
            data:$("#service-order-form").serialize(),
            success: function (msg) {
                getMessages(msg,"#response")
                if(msg.success){
                    $("#service-order-form").hide();
                    setTimeout(function(){
                        window.location.href="service.html";
                    },4000)
                }
                $(".loader").hide();
            }

        });
    }
});


var editProfileValidator = $("#edit-profile").validate({
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
        $($(element).data("element")).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        //console.log("unhighlight:");
        //console.log(element);
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: "span",
    rules : {

        name : {
            required:true,
            minlength : 5
        },
        email : {
            required:true,
            minlength : 5
        },
        phone : {
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
        $.ajax({
            type: "PUT",
            url: makeURL('foreraa_users/'+userData.id),
            data:$("#edit-profile").serialize(),
            success: function (msg) {
                getMessages(msg,"#response")
                if(msg.success){

                }
                $(".loader").hide();
            }

        });
    }
});

//single complaint
$(document).on('click','.single-complaint',function(e){
    e.preventDefault();
    complaint_id=$(this).data('id');
    user_id=userData.id;
    if(user_id){
        $(".loader").show();
        $.ajax({
            type: "GET",
            url: makeURL('foreraa_complaints/'+complaint_id+'?user_id='+user_id),
            data:$("#service-order-form").serialize(),
            success: function (msg) {
                if(msg.success){
                    window.sessionStorage.setItem("complaintData",JSON.stringify(msg.result));
                    window.location.href='single-complaint.html';
                }

            }
        });
    }
});
//single order
$(document).on('click','.single-order',function(e){
    e.preventDefault();
    order_id=$(this).data('id');
    //var userData = window.sessionStorage.getItem("userData");
    //userData=JSON.parse(userData);
    user_id=userData.id;
    if(userData.type=='customer'){
        if(user_id){
            $(".loader").show();
            $.ajax({
                type: "GET",
                url: makeURL('foreraa_orders/'+order_id+'?user_id='+user_id),
                data:$("#service-order-form").serialize(),
                success: function (msg) {
                    if(msg.success){
                        window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                        window.location.href='single-order.html';
                    }

                }
            });
        }
    }else{
        $(".loader").show();
        $.ajax({
            type: "GET",
            url: makeURL('foreraa_orders/'+order_id+'?delegate_id='+user_id),
            data:$("#service-order-form").serialize(),
            success: function (msg) {
                if(msg.success){
                    window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                    window.location.href='single-order.html';
                }

            }
        });
    }

});
//single delegate order
$(document).on('click','.single-delegate-order',function(e){
    e.preventDefault();
    order_id=$(this).data('id');
    //var userData = window.sessionStorage.getItem("userData");
    //userData=JSON.parse(userData);
    statues=$(this).data('statues')
    $(".loader").show();
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_orders/'+order_id+'?statues=new&delegate_id=null'),
        data:$("#service-order-form").serialize(),
        success: function (msg) {
            if(msg.success){
                window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                window.location.href='single-order.html';
            }

        }
    });
});
$(document).on('click','.confirmOrder',function(e){
    e.preventDefault();
    console.log('confirmOrder');
    el=$(this);
    order_id=$(this).data('id');
    user_id=userData.id;
    if(user_id){
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users/'+user_id+'/confirmOrder'),
            data:{"order_id":order_id},
            success: function (msg) {
                if(msg.success){
                   el.remove();
                }else{
                    getMessages(msg,"#response")
                }

            }
        });
    }
});
/*$(document).on('click','.cancelOrder',function(e){
    e.preventDefault();
    console.log('cancelOrder');
    el=$(this);
    order_id=$(this).data('id');
    user_id=userData.id;
    console.log(userData)
    if(user_id){
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users/'+user_id+'/cancelOrder'),
            data:{"order_id":order_id},
            success: function (msg) {
                if(msg.success){
                    el.remove();
                }

            }
        });
    }
});*/
$(document).on('submit','#cancelOrderForm',function(e){
    e.preventDefault();
    if($("#cancelOrderForm #cancel_comment").length){
        $(".loader").show();
        user_id=userData.id;
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users/'+user_id+'/cancelOrder'),
            data:$("#cancelOrderForm").serialize(),
            success: function (msg) {
                if(msg.success){
                    $("#showCancelForm").parent().remove();
                    $("#uploadInvoice").parent().remove();
                }
                $(".loader").hide();
            }
        });
    }
});

$(document).on('click','.single-delegate',function(e){
    e.preventDefault();
    delegate_id=$(this).data('id');
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_users/'+delegate_id+'?type=delegate'),
        data:$("#service-order-form").serialize(),
        success: function (msg) {
            if(msg.success){
                window.sessionStorage.setItem("delegateData",JSON.stringify(msg.result));
                window.location.href='single-delegate.html';
            }

        }
    });
});
$(document).on('click','.chat-now',function(e){
    e.preventDefault();
    order_id=$(this).attr('data-order-id');
    orderData=window.sessionStorage.getItem("orderData")
    if(orderData){
        orderData=JSON.parse(orderData);
        if(orderData.order_id==order_id){
            window.location.href="single-order-chats.html";
        }
    }
});
function getChatData(orderData,userData){
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_orders/'+orderData.order_id+'/chats'),
        success: function (msg) {
            console.log(msg);
            if(msg.success){
                html='';
                if(userData.type=='customer'){
                    html+='<li class="right clearfix "> <span class="chat-img1 pull-left"> <img src="img/logoo.png" alt="forera" class="img-circle"> </span> <div class="chat-body1 clearfix"><p>'+strings['customer_chat']+'</p>  </div> </li>';
                }
                if(userData.type=='delegate'){
                    html+='<li class="right clearfix "> <span class="chat-img1 pull-left"> <img src="img/logoo.png" alt="forera" class="img-circle"> </span> <div class="chat-body1 clearfix"><p>'+strings['delegate_chat']+'</p>  </div> </li>';
                }
                if(msg.result.length){
                    msg.result.forEach(function (item) {
                        html+='<li class="left clearfix '+((userData.id==item.user_id)?'admin_chat':'')+'"> <span class="chat-img1 '+((userData.id==item.user_id)?'pull-right':'pull-left')+'"> <img src="'+item.image+'" alt="'+item.user_name+'" class="img-circle"> </span> <div class="chat-body1 clearfix"><p><!--<span class="username label '+((userData.id==item.user_id)?'label-info':'label-success')+'">'+item.user_name+'</span>--> '+item.message+'</p> <div class="chat_time '+((userData.id==item.user_id)?'pull-left':'pull-right')+'">'+formatDate(new Date(item.add_date))+' '+formatTime(new Date(item.add_date))+'</div> </div> </li>';
                    });
                }else{
                    //html='<div id="noData" class="text-center">No Messages</div>';
                    html+='<li id="noMessageDiv" class="left clearfix"><div class="chat-body1 clearfix" style="margin: 0;"><p class="text-center">No Message</p></div></li>';
                }
                console.log(html);
                $(".chat_area ul.list-unstyled").html(html);
            }
        }
    });
}
$(document).on('click','#sendChatMessage',function(e){
    e.preventDefault();
    var userData = window.sessionStorage.getItem("userData");
    userData=JSON.parse(userData);
    order_id=$("#chatOrderID").val();
    user_id=userData.id;
    message=$("#chatMessage").val();

    if(message.length){
        $(".message_write").removeClass('has-error');
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_orders/'+order_id+'/addChat'),
            data:{"user_id":user_id,"order_id":order_id,"message":message},
            success: function (msg) {
                if(msg.success){
                  $("#noMessageDiv").remove();
                  $("#chatMessage").val('')
                  $(".chat_area ul.list-unstyled").append('<li class="left clearfix admin_chat"> <span class="chat-img1 pull-right"> <img src="'+userData.image+'" alt="'+userData.name+'" class="img-circle"> </span> <div class="chat-body1 clearfix"> <p>'+message+'</p> <div class="chat_time pull-left">'+formatDate(new Date())+' '+formatTime(new Date())+'</div> </div> </li>');
                }
            }
        });
    }else{
        $(".message_write").addClass('has-error');
    }
});
//
$(document).on('click','#takePhoto',function(e){
    e.preventDefault();
    navigator.camera.getPicture(onSuccessPhoto, onFailPhoto, { quality: 20,
        destinationType: Camera.DestinationType.FILE_URL
    });
});
$(document).on('click','#selectPhoto',function(e){
    e.preventDefault();
    navigator.camera.getPicture(onSuccessPhoto, onFailPhoto, { quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
    });
});

function onSuccessPhoto(imageURI) {
    $(".loader").show();
    var options = new FileUploadOptions();
    options.fileKey = "image";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = {};
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(imageURI, APIURL+"foreraa_orders/uploadOrderImage", function(result){
        console.log('successfully uploaded ' + result.response);
        responseData=JSON.parse(result.response);
        console.log(responseData.success);
        if(responseData.success){
            $("#imagesIDS").append('<input type="hidden" name="imageIDS[]" value="'+responseData.image_id+'">');
            imagesNumbers=$("#imagesIDS [name='imageIDS[]']").length;
            $("#imagesSelected").html(imagesNumbers+strings['images_selected'])
            $(".loader").hide();
        }
    }, function(error){
        console.log('error : ' + JSON.stringify(error));
    }, options);
}
function onFailPhoto(message) {
    alert('Failed because: ' + message);
}
$(document).on('click','#uploadInvoice',function(e){
    e.preventDefault();
    el=$(this);
    order_id=el.data('id');
    delegate_id=el.attr('data-delegate-id');
    navigator.camera.getPicture(function(imageURI){
        $(".loader").show();
        var options = new FileUploadOptions();
        options.fileKey = "image";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        var params = {};
        params.order_id = order_id;
        params.delegate_id = delegate_id;
        options.params = params;
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, APIURL+"foreraa_orders/uploadInvoice", function(result){
            console.log('successfully uploaded ' + result.response);
            responseData=JSON.parse(result.response);
            console.log(responseData.success);
            if(responseData.success){
                el.remove();
                $(".loader").hide();
            }
        }, function(error){
            console.log('error : ' + JSON.stringify(error));
        }, options);
    }, onFailPhoto, { quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
    });
});
$(document).on('click','#profileImageInput',function(e){
    e.preventDefault();
    navigator.camera.getPicture(function(imageURI){
        $(".loader").show();
        var options = new FileUploadOptions();
        options.fileKey = "image";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        var params = {};
        params.user_id = userData.id;
        options.params = params;
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, APIURL+"foreraa_users/"+userData.id+"/changeProfileImage", function(result){
            console.log('successfully uploaded ' + result.response);
            responseData=JSON.parse(result.response);
            console.log(responseData.success);
            if(responseData.success){
                $(".loader").hide();
                $("#userImageData").attr('src',responseData.result.image);
                window.sessionStorage.setItem("userData", JSON.stringify(responseData.result));
            }
        }, function(error){
            console.log('error : ' + JSON.stringify(error));
        }, options);
    }, onFailPhoto, { quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
    });
});
$(document).on('click','#makeOffline',function(e){
    e.preventDefault();
    $(this).addClass('hidden')
    $.ajax({
        type: "POST",
        url: makeURL('foreraa_users/'+userData.id+'/changeStatues'),
        data:{"status":'offline'},
        success: function (msg) {
            if(msg.success){
                $("#makeOnline").removeClass('hidden');
                $("#delegateStatues").removeClass('online offline').addClass('offline')
                userData.delegateData.status='offline';
                window.sessionStorage.setItem("userData", JSON.stringify(userData));
            }
        }
    });
});
$(document).on('click','#makeOnline',function(e){
    e.preventDefault();
    $(this).addClass('hidden')
    $.ajax({
        type: "POST",
        url: makeURL('foreraa_users/'+userData.id+'/changeStatues'),
        data:{"status":'online'},
        success: function (msg) {
            if(msg.success){
                $("#makeOffline").removeClass('hidden');
                $("#delegateStatues").removeClass('online offline').addClass('online')
                userData.delegateData.status='online';
                window.sessionStorage.setItem("userData", JSON.stringify(userData));
            }
        }
    });
});

$(document).on('click','#showInvoiceButton',function(e){
    e.preventDefault();
    $(this).html((($(this).html()==strings['show_invoice'])?strings['hide_invoice']:strings['show_invoice']))
    $('#invoiceImage').toggle();
});
$(document).on('click','#showCancelForm',function(e){
    e.preventDefault();
    $(this).html((($(this).html()==strings['show_cancel_form'])?strings['hide_cancel_form']:strings['show_cancel_form']))
    $('#cancelOrderDiv').toggle();
});
$(document).on('click','#confirmInvoice',function(e){
    e.preventDefault();
    el=$(this);
    order_id=el.data('id');
    customer_id=el.attr('data-customer-id');
    $.ajax({
        type: "POST",
        url: makeURL('foreraa_orders/confirmInvoice'),
        data:{"order_id":order_id,"customer_id":customer_id},
        success: function (msg) {
            if(msg.success){
               el.remove();
            }
        }
    });
});
$(document).on('click','#makeClosed',function(e){
    e.preventDefault();
    el=$(this);
    order_id=el.data('id');
    delegate_id=el.attr('data-delegate-id');
    $.ajax({
        type: "POST",
        url: makeURL('foreraa_orders/makeClosed'),
        data:{"order_id":order_id,"delegate_id":delegate_id},
        success: function (msg) {
            if(msg.success){
                el.remove();
            }
        }
    });
});