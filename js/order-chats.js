var orderData = window.sessionStorage.getItem("orderData");
var userData = window.sessionStorage.getItem("userData");
if(orderData){
    orderData=JSON.parse(orderData);
    userData=JSON.parse(userData);
    $("#order-title").html('Order Number #'+orderData.order_id);
    $("#chatOrderID").val(orderData.order_id);
    $("#chatUserID").val(userData.id);
    getChatData(orderData,userData);
    setInterval(function(){getChatData(orderData,userData)},10000);
    window.document.addEventListener("scroll", function(){
        if(window.pageYOffset == 0){
            window.scrollBy(0, 60);

        }
    },false)
}