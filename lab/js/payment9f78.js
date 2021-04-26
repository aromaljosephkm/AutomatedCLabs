"use strict";

class coursePayment{


applyOfferCode(courseName){

    let requestData = {};
    requestData["type"] = "offerCode";
    requestData["courseName"] = courseName;
    requestData["offerCode"] = $("#referralCode").val();

    if(!requestData["offerCode"]){
        $("#referralCode").addClass("is-invalid");
    }else{
        authorize.ajax(requestData, "discount_check", function (responseData) {
            responseData = JSON.parse(responseData);

            if (responseData.offer_status == "expired") {
                $(".error-message").remove();
                $(".success-message").remove();
                $("#referralCode").after("<span class='text-danger error-message'>Invalid or Expired coupon</span>");
                $(".discount_price").html("");
                $(".discount_price").removeClass("price");
                $(".paymentPrice").removeClass("strikeout");
            } else {
                let res1 = "";
                
                if(responseData.country_code !== "IN"){
                    res1 += '<i class="fa fa-usd">$' + responseData.remaining_amount + ' (USD)<i>';
                    $("#referralCode").after('<p class="text-success success-message">Congratulations! You have been given $' + responseData.offer_price + ' (USD) Off</p>');
                }else{
                    res1 += '<i class="fa fa-inr">' + responseData.remaining_amount + '<i>';
                    $("#referralCode").after('<p class="text-success success-message">Congratulations! You have been given <i class="fa fa-inr price" style="color:#28a745">' + responseData.offer_price + '</i> Off</p>');
                    $(".discount_price").addClass("price");
                }
                $(".error-message").remove();
                $(".success-message").remove();
                $(".discount_price").html(res1);
                
               
                $(".paymentPrice").addClass("strikeout");



            }
        });
    }
}
 


paymentTypeCheck(courseName){

	 var method = $('input[name=paymentMode]:checked').val();


     console.log(method);

	 if(method === "collegeCode"){
	 	this.paymentTypeCode(courseName,method);
	 }else if(method === "points"){
	 	this.paymentTypePoints(courseName);
	 }
     else if(method == "razorPay"){
        this.paymentTypeRazorPay(courseName);
     }
     else if(method === "payumoney"){
	 	this.paymentTypePayumoney(courseName);
	 }

}


paymentTypeCode(coursename,method){


    let courseName = authorize.get_queryStringVal("course");

	let couponCode 	= $("#collegeLicense").val();
    let department     = $("#department option:selected").val();
    let passedoutyear 	= $("#poy option:selected").val();

    if(!couponCode){
        $("#collegeLicense").addClass("is-invalid");
    }

    if(!department){
        $("#department").addClass("is-invalid");
        department = "";
    }

    if(!passedoutyear || passedoutyear == "-select-"){
        $("#poy").addClass("is-invalid");
        passedoutyear = "";
    }
	if((couponCode) && (department) && (passedoutyear)){	
        // console.log(couponCode)
        // console.log(department)
        // console.log(passedoutyear)
        let page = "click";
        let requestData = {};
        requestData['courseName'] = courseName;
        requestData['couponCode'] = couponCode;
        requestData['department'] = department;
        requestData['passedoutyear'] = passedoutyear;
        requestData["userType"] = $("input[type=radio][name=userType]:checked").val();
        requestData["companyName"] = $("#companyName").val();
        requestData["designation"] = $("#designation").val();
        authorize.ajax(requestData, "coupon-check", function (response) {
            response = JSON.parse(response);
            let access = response["access"];
            let message = response["message"];
            $(".paymentMessage").removeClass("alert alert-success alert-danger");
        
            if(access){
                $(".modal-header").remove();
                $("#paySettings").remove();
                if(response["coupon"] != ""){
                    //ga start
                    // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    //     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    //     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    //     })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                    //     ga('create', 'UA-53114947-1', 'auto');  
                    //ga end
                    // !function(f,b,e,v,n,t,s)
                    //   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    //   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    //   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    //   n.queue=[];t=b.createElement(e);t.async=!0;
                    //   t.src=v;s=b.getElementsByTagName(e)[0];
                    //   s.parentNode.insertBefore(t,s)}(window, document,'script',
                    //   'https://connect.facebook.net/en_US/fbevents.js');
                    //   fbq('init', '2421896964801907'); 
                      //fb end
                      fbq('track', response["coupon"]+"Subscribe");
                      ga('send', 'event', 'CourseBuy', 'Coupon', response["coupon"]);
                    //   if((response["coupon"]=="COVID19")||(response["coupon"]=="COVID19WFH")){
                    //     fbq('track', "CovidSubscribe"); 
                    //     ga('send', 'event', 'CourseBuy', 'Coupon', 'COVID');
                    //   }
                }
                let res ="";
                res +="<div align=center class=''>";
                res +="<strong class='text-success'>"+message+"</strong></br>";
                res +="<strong><a class='btn btn-primary' href=courses-video.html?course="+coursename+"> Goto Course</a><strong>";
                res +="</div>";

                $("#paymenGroup").html(res);


            }else{
                if(message == "APP ONLY OFFER"){
                    $(".paymentMessage").html("<strong>This offer is only applicable on GUVI Android App<strong>");
                }else{
                    $(".paymentMessage").html("<strong>"+message+"<strong>");
                } 
                $(".paymentMessage").addClass("text-danger");
            }
        });
	}	
}


paymentTypePoints(coursename){
 
    let pointsData = {};

    pointsData.courseName= coursename;

      

    authorize.ajax(pointsData, "courseActivatebyPoints", function (response) {
        let res = JSON.parse(response);
        let status = res["status"];
        let message = res["message"];
        $(".paymentMessage").removeClass("alert alert-success alert-danger");
        
        if(status){
            $(".modal-header").remove();
            $("#paySettings").remove();

            res ="";
            res +="<div align=center class=''>";
            res +="<strong class='text-success'>"+message+"</strong></br>";
            res +="<strong><a class='btn btn-primary' href=courses-video.html?course="+coursename+"> Goto Course</a><strong>";
            res +="</div>";

            $("#paymenGroup").html(res);


        }else{
            $(".paymentMessage").html("<strong>"+message+"<strong>");
            $(".paymentMessage").addClass("text-danger");
        }
        

    });		
}

renderNotificationModal(title, message, nextStep){
    let notificationDetails = '<div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body"><p id="content"><h4 id="title" class="modal-title">'+ title +'</h4>'+ message +'</p><div class="d-flex justify-content-end"><a class="btn btn-primary" data-dismiss="modal" href ="#">'+ nextStep +'</a></div></div></div></div>';
    $('#notificationModal').html(notificationDetails);
    $("#notificationModal").modal('show');
}

paymentTypeRazorPay(coursename,state="default",userType,authToken,hash,additionalParams = {}){
    let courseName= coursename;
    let paymentData = {};
    var paymentQueries = {};
    $.each(window.location.search.substr(1).split('&'),function(c,q){
		var i = q.split('=');
		paymentQueries[i[0].toString()] = decodeURI(i[1]);
	});
    paymentData.url = window.location.href;
    paymentData.source = (paymentQueries.utm_source != undefined) ? paymentQueries.utm_source : "Not Set";
	paymentData.medium = (paymentQueries.utm_medium != undefined) ? paymentQueries.utm_medium : "Not Set";
	paymentData.campaign = (paymentQueries.utm_campaign != undefined) ? paymentQueries.utm_campaign : "Not Set";	
    paymentData.courseName = courseName;
    paymentData.state = state;
    paymentData.paymentPortal = "razorPay";
    paymentData.additionalParams = additionalParams;
    if(state == "courseBundle"){
        if(authToken != ""){
            paymentData.auth = authToken;
        }
        paymentData.hash = hash;
        paymentData.userType = userType;
    }
    let classObj = this;
    authorize.ajax(paymentData, "fetchCoursePrice", function (response) {
        response = JSON.parse(response);
        try{
            Moengage.add_unique_user_id(response.mail);
            Moengage.add_email(response.mail);
            Moengage.add_mobile(response.phone);
            Moengage.add_user_name(response.fullName);
            Moengage.track_event("payNowLead", {
                "product_name":paymentData.courseName,
                "price": response.offerPrice,
                "currency": "INR"
              });
        }catch(e){
            console.log(e);
        }
        // let paymentForm = '<script src="https://checkout.razorpay.com/v1/checkout.js" data-key="'+ response.razorKeyId +'" data-amount="'+ response.offerPrice +'" data-currency="INR" data-order_id="'+ response.orderId +'" data-buttontext="Pay Now" data-name="Deep Learning" data-description="Learn Deep Learning from IIT Madras Professors who are subject matter experts in the field." data-prefill.name="'+ response.uniqueUrl +'" data-prefill.contact="'+ response.phone +'" data-prefill.email="'+ response.mail +'"><input type="hidden" custom="Hidden Element" name="hidden"></script>';
        // $("#razorPayForm").html(paymentForm);
        if(response.status == "success"){
            let options = {
                "key": response.razorKeyId,
                "amount": response.offerPrice,
                "currency": "INR",
                "name": response.uniqueUrl,
                "description": "Learn, SkillUp, GetHired",
                "order_id": response.orderId,
                "prefill": {
                    "name": response.uniqueUrl,
                    "email": response.mail,
                    "contact": response.phone
                },
                "handler": function(paymentResponse){
                    tap('conversion', response.orderId, response.offerPrice);
                    let currentLocation = window.location.href;
                    let actionLocation = "https://www.guvi.in/razorPayOrder.php";
                    if(!currentLocation.includes("guvi.in")){
                        actionLocation = currentLocation.slice(0, currentLocation.lastIndexOf("/")) + "/razorPayOrder.php";
                    }
                    let paymentForm = '<form id="razorPayForm" action="'+ actionLocation +'" method="POST" hidden><input type="hidden" name="razorpay_order_id" value="'+ paymentResponse.razorpay_order_id +'" /><input type="hidden" name="razorpay_payment_id" value="'+ paymentResponse.razorpay_payment_id +'" /><input type="hidden" name="razorpay_signature" value="'+ paymentResponse.razorpay_signature +'" /><input type="hidden" name="authToken" value="'+ authorize.getSession("authToken") +'" /><input style="font-size:0px;" id="razorPaySubmit" type="submit" value="Submit" /></form>';
                    $("#razorPayFormWrap").html(paymentForm);
                    $("#razorPaySubmit").trigger("click");
                },
                "modal" : {
                    "ondismiss" : function(){
                        authorize.invisibleAjax({type : "notifyPayment", email : response.mail, paymentUrl : window.location.href, name : response.fullName, courseFullName : response.courseTitle, courseId : response.cname}, "buyBundle", function(response){
                            response = JSON.parse(response);
                        });
                    }
                }
            }
            let razorPayObj = new Razorpay(options);
            razorPayObj.open();
        }
        else if(response.status == "intermediate"){
            let modal = `<div class="modal fade" id="activatedModal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false"><div class="modal-dialog modal-dialog-centered modal-lg" role="document"><div class="modal-content"><div class="modal-body"><div class="d-flex justify-content-around align-items-center flex-column"> <img src="images/clapping.svg" class="mt-4" alt="congratulations"><h1 class="text-center">Congratulations</h1><p class="text-center">You have successfully enrolled for the ${response.courseDisplayName}</p> <span class="text-green text-center mb-4">Start your learning Odyssey!</span></div></div><div class="modal-footer d-flex justify-content-center align-items-center bg-light-grey"> <a href="sign-in.html?location=courses" class="btn btn-primary my-2 py-2 px-4" >Start learning</a></div></div></div></div>`;
            $("body").append(modal);
            $("#activatedModal").modal("show");
        }
        else if(response.status == "error"){
            classObj.renderNotificationModal("Oops..!", response.message, "Try again");
        }
    });
}

paymentTypePayumoney(coursename,state="default",userType,authToken,hash){

	let courseName= coursename;
	let paymentData = {};
	paymentData.courseName = courseName;
    paymentData.state = state;
    paymentData.paymentPortal = "payumoney";

    if(state == "courseBundle"){
        if(authToken != ""){
            paymentData.auth = authToken;
        }
        paymentData.hash = hash;
        paymentData.userType = userType;
    }
    
    

    

	authorize.ajax(paymentData, "fetchCoursePrice", function (response) {
        
        let userData = JSON.parse(response);

        // console.log(userData);
        // return false;

        let email = userData.mail;
        let phone = userData.phone;
       
        let paymentSalt = userData.paymentHash;
        let PaymentKey = userData.PaymentTxn;

        let courseTitle = userData.courseTitle;
        let paymentActive = userData.paymentActive;
        let offerPrice = userData.offerPrice;
        let uniqueUrl = userData.uniqueUrl;
        var payform = '';
        payform += '<input type="hidden" name="key" value="" />';
        payform += '<input type="hidden" name="hash" value=""/>';
        payform += '<input type="hidden" name="amount" value="" />';
        payform += '<input type="hidden" name="txnid" value="" />';
        payform += '<input type="hidden" name="firstname" id="firstname" value="" />';
        payform += '<input type="hidden" name="email" id="email" value="" />';
        payform += '<input type="hidden" name="phone" value="" />';
        payform += '<input type="hidden" name="udf1" value="" />';
        payform += '<input type="hidden" name="udf2" value="" />';
        payform += '<textarea style="display:none;" name="productinfo"></textarea>';
        payform += '<input type="hidden" name="surl" value="" size="64" />';
        payform += '<input type="hidden" name="furl" value="" size="64" />';
        payform += '<input type="hidden" name="service_provider" value="payu_paisa" size="64" />';
        payform += '<input style="font-size:0px;" id="pay-submit" type="submit" value="Submit" />';

        $('#payuform').append(payform);


        let random = Math.floor((Math.random() * 9999999999) + 10);
        let pay_date = new Date();
        let ms = pay_date.getMilliseconds();
        let dynamicsec = ms + random;
        let txnHash = dynamicsec.toString();
        let createTxnID = new jsSHA(txnHash, "ASCII");
        let full_txn_id = createTxnID.getHash("SHA-512", "HEX");
        let TxnId = full_txn_id.substring(0, 20);
        let serviceProvider = "payu_paisa";
        let udf1 = "false";
        let userAuth = authorize.getSession("authToken");
        let udf2 = "";
        if(userAuth){
            udf1 = "true";
            udf2 = userAuth;
        }
        


        let WebUrl = window.location.href;
        var urlCheck = WebUrl.search("guvi.in");
        var base_url = '';
        if (urlCheck !== -1) {
            var successUrl = "https://www.guvi.in/" + "success.php";
            var failureUrl = "https://www.guvi.in/" + "failure.php";
        }else {
            if(WebUrl.includes("guvi2.0")){
                var successUrl = "http://192.168.1.4/guvi2.0/" + "success.php";
                var failureUrl = "http://192.168.1.4/guvi2.0/" + "failure.php";
            }
            else if(url.includes("dev1.o")){
                var successUrl = "http://192.168.1.4/dev1.o/" + "success.php";
                var failureUrl = "http://192.168.1.4/dev1.o/" + "failure.php";
            }
        }
     	var hashSequence = PaymentKey + "|" + TxnId + "|" + offerPrice + "|" + courseTitle + "|" + uniqueUrl + "|" + email + "|" + udf1 + "|" + udf2 + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + paymentSalt;
        // console.log(hashSequence);
        // return false;
        let payHash = hashSequence.toString();
        let shaObj = new jsSHA(payHash, "ASCII");
        let payuHashVal = shaObj.getHash("SHA-512", "HEX");

        $('[name="amount"]').val(offerPrice);
        $('[name="firstname"]').val(uniqueUrl);
        $('[name="email"]').val(email);
        $('[name="phone"]').val(phone);
        $('[name="udf1"]').val(udf1);
        $('[name="udf2"]').val(udf2);
        $('[name="productinfo"]').append(courseTitle);
        $('[name="surl"]').val(successUrl);
        $('[name="furl"]').val(failureUrl);
        $('[name="key"]').val(PaymentKey);
        $('[name="hash"]').val(payuHashVal);
        $('[name="txnid"]').val(TxnId);
        $("#pay-submit").trigger("click");
    });
}
};


// $(document).on('click', '#bundlePayment',function(){
//     let payObject = new coursePayment();
//     payObject.paymentTypePayumoney("deepLearning");
// });



$(document).on('click', '.paynow',function(event){
    try{
        let loginCheck = authorize.getSession("authToken");
    if(!loginCheck){
        authorize.login_modal();
        return false;
    }else{

    let courseName = authorize.get_queryStringVal("course");
    let userGeekoins = parseInt(authorize.getSession("userpoints"));
    
    let offerPrice = parseInt($("#offerPrice").text());
    let courseGeekCoings = parseInt(authorize.getSession(courseName+"_pricePoints"));
    let pricedisplay = $("#course-details h2").text();

    $("#modalTitle").html(pricedisplay);
    $(".paymentPrice").html(offerPrice);


        var pfjson = $("#paymentbtn").data("profileData");
        var departPass = $("#paymentbtn").data("departPass");

        let poy = pfjson.passedoutyear;
        let department = pfjson.department;

        let dbDepart = departPass.department;
        let dbpoy = departPass.passedoutyear;

        dbDepart.shift();
        dbpoy.shift();
         
        var passedyear="";
        if(poy){
            passedyear += "<option>"+poy+"</option>"; 
        }       
        $.each( dbpoy, function( key, value ) {
            passedyear +="<option>"+value+"</option>";
        });
        $("#poy").html(passedyear);



        var dbpartselect="";
        if(department){
            dbpartselect += "<option>"+department+"</option>"; 
        }       
        $.each( dbDepart, function( key, value ) {
            dbpartselect +="<option>"+value+"</option>";
        });
        $("#department").html(dbpartselect);
      

    


    if(courseGeekCoings <= userGeekoins){
        $("#paymentGK").addClass("text-success");
    }
    $("#earnedGK").html(userGeekoins);
    $("#spendGK").html(courseGeekCoings);

    var method = $('input[name=paymentMode]:checked').val();

    $("#addInfo").hide();
    if(method === "collegeCode"){
        $("#addInfo").show();
    }

    $("#productBuyModal").modal("show");

    }
    }
    catch(error){

    }
  
 });   


$(document).on('change', "input[name='paymentMode']", function() {
    let type = $(this).val();
    $("#addInfo").hide();
    if(type === "collegeCode"){
        $("#addInfo").show();
    }
    if(type == "razorPay"){
        $(".optionalCode").attr("hidden", false);
    }
    else{
        $(".optionalCode").attr("hidden", true);
    }
});

$(document).on('change', "input[name='userType']", function() {
    let type = $(this).val();
    if(type === "student"){
        $("#professionalFields").attr("hidden", true);
        $("#studentFields").attr("hidden", false);
    }
    else if(type === "professional"){
        $("#studentFields").attr("hidden", true);
        $("#professionalFields").attr("hidden", false);
    }
});


$(document).on('click', '#buyProductNow',function(event){
	event.preventDefault();
	let courseName = authorize.get_queryStringVal("course");
	let paymentObj = new coursePayment();
	paymentObj.paymentTypeCheck(courseName);
});

$(document).on('click', '#applyOfferCode',function(event){
    event.preventDefault();
    let courseName = authorize.get_queryStringVal("course");
    let paymentObj = new coursePayment();
    paymentObj.applyOfferCode(courseName);
});

$(document).on('change', '#collegeLicense',function(event){
    event.preventDefault();
    $(this).removeClass("is-invalid");
});

$(document).on('change', '#department',function(event){
    event.preventDefault();
    $(this).removeClass("is-invalid");
});

$(document).on('change', '#poy',function(event){
    event.preventDefault();
    $(this).removeClass("is-invalid");
});



$(document).ready(function(){

    let loginChecks = authorize.getSession("authToken");
    if(loginChecks){
        $(".paynow").data("target","productBuyModal");
    }

});
