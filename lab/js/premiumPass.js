var queries = {};
var url;
var capchetoken;
grecaptcha.ready(function() {
    grecaptcha
        .execute("6LdADb4UAAAAAA1feb36sozffPYRKKOqD9WPbibp", {
            action: "register"
        })
        .then(function(token) {
            capchetoken = token;
        });
});
$(window).scroll(function() {
    if ($(this).scrollTop() < 11500) {
        $(".mobile-buy").show();
    } else {
        $(".mobile-buy").hide();
    }
});

class CourseBundle {
    renderPreview(data) {
        // this.renderVideo(data);
        // this.renderDetails(data);
        // this.renderLessonDetails(data);
    }

    renderVideo(data) {
        try {
            const source =
                "zHH1BKBjh28";
            let videoExtention = "mp4";
            player.source = {
                type: 'video',
                sources: [{
                    src: source,
                    provider: 'youtube',
                }],
            };
            $(".plyr--full-ui").addClass("embed-responsive-item");
            $(".plyr__video-wrapper").addClass("embed-responsive-item");
            $("video").addClass("embed-responsive-item");
            setTimeout(function() {player.play()},500);
        } catch (error) {
            console.log(error);
        }
    }

    renderCustomVideo(selector, source) {
        try {
            const source =
                "https://d11kzy43d5zaui.cloudfront.net/DeepLearningCourse/04_SimpleFFNetwork.mp4";
            let videoExtention = "mp4";
            customPlayer.source = {
                type: "video",
                title: "Deep Learning",
                sources: [{
                    src: source,
                    type: "video/" + videoExtention
                }]
            };
            customPlayer.play();
            $(".plyr--full-ui").addClass("embed-responsive-item");
            $(".plyr__video-wrapper").addClass("embed-responsive-item");
            $("video").addClass("embed-responsive-item");
        } catch (error) {
            console.log(error);
        }
    }

    renderDetails(data) {
        try {
            let courseDetails = JSON.parse(data[0].course_details);
            let courseName = courseDetails.course_name;
            let courseLength = data.length - 2;
            let rating = 0;
            let ratingBlock = "";
            let search = new URLSearchParams(document.location.search.substring(1));
            let courseId = search.get("course");
            authorize.setSession(
                courseId + "_pricePoints",
                courseDetails.pricePoints
            );
            if (courseDetails.rating && courseDetails.rating_count) {
                rating = courseDetails.rating.toFixed(1);
                let ratingCount = courseDetails.rating_count;
                ratingBlock =
                    '<li><div class="course-rating d-flex flex-row"><div class="star-ratings-css" data-rating="' +
                    rating +
                    '" data-max="5"><div class="star-ratings-css-top"><i class="five-stars"></i></div><div class="star-ratings-css-bottom"><i class="five-stars"></i></div></div><span class="rating-count">( ' +
                    ratingCount +
                    " )</span></div></li>";
            } else {
                let ratingCount = "New";
                ratingBlock =
                    '<li><div class="course-rating d-flex flex-row"><span class="rating_count">' +
                    ratingCount +
                    "</span></div></li>";
            }
            let ratingCount = courseDetails.rating_count;
            let price = courseDetails.price;
            let discountedPrice = this.calculateDiscount(
                courseDetails.price,
                courseDetails.discount
            );
            let detailsData =
                "<div><h2>" +
                courseName +
                " foundation course</h2><p>Learn " +
                courseName +
                ' like a Professional ! Start from the basics and go all the way to creating your ownapplications </p><ul class="list-unstyled course-hightlights"><li>' +
                courseLength +
                "+ Exclusive Lesson from top Industry Experts</li>" +
                ratingBlock +
                '<li>Online learning + Office Mentorship Support + Gamified Practice Platform</li><li>Job Support from top Product Company India & Aboard</li></ul></div><div><div class="d-flex justify-content-end"><a href="#" id="buynow2"  class="btn btn-primary paynow" data-toggle="modal">Enroll</a></div><div class="d-flex justify-content-between"><a href="#course-detail-structure" class="btn pl-0 more-details">Course details</a><p class="price-wrap"><span class="price slashed"><s>' +
                price +
                '</s></span><span id="offerPrice" class="price">' +
                discountedPrice +
                "</span></p></div></div>";
            $("#course-details").html(detailsData);
            this.setRating();
            let whyBlock =
                "<h2>WHY</h2><p>" +
                courseName +
                ' developer is one of the top most in demand job and fast-growing career paths.</p><ul class="list-unstyled course-outcomes"><li class="earnings"><strong>5-10</strong> Lakhs per year</li><li class="hike"><strong>35 %</strong> Average Salary Hike.</li><li class="new-jobs"><strong>23,000 new jobs</strong> being posted online every month</li></ul>';
            $(".why-course").html(whyBlock);
            // let exclusiveData = '<h2>EXCLUSIVE LESSON</h2><div class="exclusive-lesson"><span class="icon-exclusive-lesson"></span><div class="d-flex flex-column justify-content-between"><p>students give an average rating of '+ rating +' out of 5 stars.</p><p><strong>100% SATISFACTION GUARANTEED. 7-DAY MONEY BACK GUARANTEE.</strong></p></div></div>';
            // $(".exclusive-lesson-wrap").html(exclusiveData);
        } catch (error) {
            console.log(error);
        }
    }

    renderLessonDetails(data) {
        let beginnerLength = 0;
        let intermediateLength = 0;
        let advancedLength = 0;
        let expertLength = 0;
        let beginnerAssignmentLength = 0;
        let intermediateAssignmentLength = 0;
        let advancedAssignmentLength = 0;
        let expertAssignmentLength = 0;
        let sublessonData = "";
        let beginnerData =
            '<div id="courseTopic1" class="course-topic-details collapse show" data-parent="#course-detail-structure"><div class="row"><div class="col"><ul class="list-unstyled stepper">';
        let intermediateData =
            '<div id="courseTopic2" class="course-topic-details collapse" data-parent="#course-detail-structure"><div class="row"><div class="col"><ul class="list-unstyled stepper">';
        let advancedData =
            '<div id="courseTopic3" class="course-topic-details collapse" data-parent="#course-detail-structure"><div class="row"><div class="col"><ul class="list-unstyled stepper">';
        let expertData =
            '<div id="courseTopic4" class="course-topic-details collapse" data-parent="#course-detail-structure"><div class="row"><div class="col"><ul class="list-unstyled stepper">';
        for (let itr = 1; itr < data.length; itr++) {
            if (data[itr].level == "l1") {
                beginnerData += "<li><a>" + data[itr].topic + "</a></li>";
                beginnerLength++;
                if (data[itr].type == "assignment") {
                    beginnerAssignmentLength++;
                }
            } else if (data[itr].level == "l2") {
                intermediateData += "<li><a>" + data[itr].topic + "</a></li>";
                intermediateLength++;
                if (data[itr].type == "assignment") {
                    intermediateAssignmentLength++;
                }
            } else if (data[itr].level == "l3") {
                advancedData += "<li><a>" + data[itr].topic + "</a></li>";
                advancedLength++;
                if (data[itr].type == "assignment") {
                    advancedAssignmentLength++;
                }
            } else if (data[itr].level == "l4") {
                expertData += "<li><a>" + data[itr].topic + "</a></li>";
                expertLength++;
                if (data[itr].type == "assignment") {
                    expertAssignmentLength++;
                }
            }
        }
        let endDiv = "</ul></div></div></div></div>";
        sublessonData +=
            this.getLevelCard(beginnerLength, beginnerAssignmentLength, "l1") +
            beginnerData +
            endDiv +
            this.getLevelCard(
                intermediateLength,
                intermediateAssignmentLength,
                "l2"
            ) +
            intermediateData +
            endDiv +
            this.getLevelCard(advancedLength, advancedAssignmentLength, "l3") +
            advancedData +
            endDiv +
            this.getLevelCard(expertLength, expertAssignmentLength, "l4") +
            expertData +
            endDiv;
        $("#course-detail-structure").html(sublessonData);
    }

    getLevelCard(levelLength, assignmentLength, level) {
        let levelNumber = "";
        let levelName = "";
        let hours = levelLength * 1.5;
        let quizLength = levelLength - assignmentLength;
        if (level == "l1") {
            levelName = "Beginner Module";
            levelNumber = 1;
        } else if (level == "l2") {
            levelName = "Intermediate Module";
            levelNumber = 2;
        } else if (level == "l3") {
            levelName = "Advanced Module";
            levelNumber = 3;
        } else if (level == "l4") {
            levelName = "Expert Module";
            levelNumber = 4;
        }
        return (
            '<div class="course-topic"><div class="row"><div class="col-md-12 col-lg-4"><div class="course-info"><span>' +
            levelName +
            '</span></div></div><div class="col-md-12 col-lg-8"><ul class="list-unstyled related-facts"><li><strong>' +
            hours +
            "</strong> hours</li><li><strong>" +
            assignmentLength * 3 +
            "</strong> assignments</li><li><span><strong>" +
            quizLength +
            '</strong> quizzes</span><button class="btn accordion-trigger" data-toggle="collapse" data-target="#courseTopic' +
            levelNumber +
            '" aria-expanded="true" aria-controls="courseTopic' +
            levelNumber +
            '"></button></li></ul></div></div>'
        );
    }

    calculateDiscount(price, discountPercentage) {
        return Math.round(price - (price / 100) * discountPercentage);
    }

    setRating() {
        const stars = ".star-ratings-css";
        const starSetter = ".star-ratings-css-top";
        $(stars).each((idx, star) => {
            const rating = $(star).data("rating");
            const max = $(star).data("max");
            const width = `${(rating / max) * 100}%`;
            $(star)
                .find(starSetter)
                .css("width", width);
        });
    }

    decideUser(data) {
        var inputVal = $('#referralCode').val();
        try {
            if (data.status == "error") {
                throw data.message;
            }
            $(".result-message").html("");
            $("#discountedPrice").html("");
            $("#discountedPrice").removeClass("price");
            $("#paymentPrice").removeClass("strikeout");
            // $("#referralCode").val("");
            $("#applyOffer").removeClass("remove");
            $("#applyOffer").addClass("apply");
            if (data.userExists) {
                $("#password").prop("hidden", false);
                $("#userMessage").prop("hidden", false);
                $("#nonUserMessage").prop("hidden", true);
                $("#confirmPassword").prop("hidden", true);
                $("#userName").prop("hidden", true);
                $("#misMatch").prop("hidden", true);
                if (data.userInfo && data.userInfo["mobile"] && data.userInfo["mobile"] != "") {
                    // $("#userMobile").val(data.userInfo["mobile"]);
                }
              // validateCouponCodeClient(inputVal);
            } else {
                $("#password").prop("hidden", false);
                $("#userMessage").prop("hidden", true);
                $("#confirmPassword").prop("hidden", false);
                $("#nonUserMessage").prop("hidden", false);
                $("#userName").prop("hidden", false);
                $("#loginSuccessful").prop("hidden", true);
                $("#invalidPassword").prop("hidden", true);
               // 
            }
            $("#userEmail").data("registeredUser", data.userExists);
        } catch (error) {
            console.log(error);
        }
        validateCouponCodeClient(inputVal);
    }

    validateField(selector) {
        try {
            let value = $(selector).val();
            if (!value) {
                $(selector).addClass("is-invalid");
                $("#userEmail").data("allFieldValidated", false);
            } else if (selector == "#userMobile") {
                let valid = /^1[+]|[0-9]*$/.test(value);
                if (!valid || value.length > 15 || value.length < 8) {
                    $(selector).addClass("is-invalid");
                    $("#userEmail").data("allFieldValidated", false);
                } else {
                    $(selector).removeClass("is-invalid");
                }
            } else if (selector == "#userEmail") {
                let valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value
                );
                if (!valid) {
                    $(selector).addClass("is-invalid");
                    $("#userEmail").data("allFieldValidated", false);
                } else {
                    $(selector).removeClass("is-invalid");
                }
            } else {
                $(selector).removeClass("is-invalid");
            }
        } catch (error) {
            console.log(error);
        }
    }

    hideProp(selector) {
        $(selector).prop("hidden", true);
    }

    showProp(selector) {
        $(selector).prop("hidden", false);
    }

    removeRequired(selector) {
        $(selector).prop("required", false);
    }

    loggedInState() {
        $("#userEmail").data("loggedState", true);
        // $(".custom-radio").prop("hidden", false);
        // this.hideProp("#userEmail");
        this.hideProp("#password");
        this.hideProp("#userMessage");
        if (authorize.getSession("userAuth")) {
            $("#accountGroup").hide();
        }
    }

    // renderPassedOutYear(){
    //  let currentYear = new Date().getFullYear();
    //  let optionMarkup = "<option>" + currentYear + "</option>";
    //  for(let itr = 1; itr < 5; itr++){
    //    optionMarkup += "<option>" + (currentYear + itr) + "</option>";
    //  }
    //  $("#passedOutYear").append(optionMarkup);
    // }

    isScrolledIntoView(elem) {
        let docViewTop = $(window).scrollTop();
        let docViewBottom = docViewTop + $(window).height();

        let elemTop = $(elem).offset().top;
        let elemBottom = elemTop + $(elem).height();

        return elemBottom <= docViewBottom && elemTop >= docViewTop;
    }

    calculateOfferPeriod() {
		try{
			let currentTimeStamp = new Date().getTime();
			let currentDate = new Date(currentTimeStamp).getDate();
			let tomorrowTimeStamp = currentTimeStamp + (24 * 60 * 60 * 1000);
			let tomorrowDate = new Date(tomorrowTimeStamp).getDate();
			let tomorrowMonth = new Date(tomorrowTimeStamp).getMonth();
			let tomorrowYear = new Date(tomorrowTimeStamp).getFullYear();
			let tomorrowMorningTimeStamp = new Date(tomorrowYear, tomorrowMonth, tomorrowDate).getTime();
			let remainingSeconds;
			if(currentDate % 2 ==0 || currentDate == 31){
				remainingSeconds = (tomorrowMorningTimeStamp - currentTimeStamp) / 1000;
			}else{
				remainingSeconds = ((tomorrowMorningTimeStamp+ (24 * 60 * 60 * 1000) )- currentTimeStamp) / 1000;

			}
			let offerTime = this.secondsToHMS(remainingSeconds);
			return offerTime;
		}
		catch(error){
			console.log(error);
		}
    }

    renderOfferPeriod() {
        try {
            let offerPeroidMarkup = $("#offerPeriod");
            setInterval(function() {
                let today = new Date();
                let offerTime = ('0' + (24-today.getHours())).slice(-2) + "h " + ('0' + (60-today.getMinutes())).slice(-2) + "m " + ('0' + (60-today.getSeconds())).slice(-2) + "s";
                offerPeroidMarkup.html( offerTime);
            }, 1000);
            $("#offerCard").prop("hidden", false);
        } catch (error) {
            console.log(error);
        }
    }

    secondsToHMS(remainingTime) {
        remainingTime = parseInt(remainingTime);
        let days = Math.floor(remainingTime  / (3600 * 24));
        let hours = Math.floor(remainingTime % (3600 * 24) / 3600);
        let minutes = Math.floor(remainingTime % 3600 / 60);
        let seconds = Math.floor(remainingTime % 3600 % 60);
        days=days>0?days:0;
        hours=hours>0?hours:0;
        minutes=minutes>0?minutes:0;
        seconds=seconds>0?seconds:0;
        return (
            ('0' + days).slice(-2) +
            "d " +
            ("0" + hours).slice(-2) +
            "h " +
            ("0" + minutes).slice(-2) +
            "m " +
            ("0" + seconds).slice(-2) +
            "s"
        );
    }

    postSign(input) {
        try {
            let classObj = this;
            authorize.ajax(input, "userGcheck", function(data) {
                let trimmedData = data.substring(0, data.length - 0);
                trimmedData = JSON.parse(trimmedData);
                if (trimmedData.auth) {
                    classObj.setLoginSessions(trimmedData.auth);
                    classObj.loggedInState();
                    $(".formPage1").hide(300);
                    $(".formPage2").show(300);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    setLoginSessions(authToken) {
        try {
            let input = { auth: authToken };
            let classObj = this;
            authorize.ajax(input, "login", function(data) {
                data = data.substring(1, data.length - 1);
                data = JSON.parse(data);
                if (data.access != "access_denied") {
                    authorize.setSession("authToken", authToken);
                    //for zen class
                    if (data.isZenUser) {
                        authorize.setSession("isZenUser", true);
                    }
                    authorize.setSession('unique_url', data.unique_url);
                    if (data.profileimg == null) {
                        authorize.setSession('profileimg', 'img/userprofile/default.jpg');
                    }
                    if (data.profileimg !== null) {
                        var proimg = data.profileimg;
                        proimg = proimg.substring(4);
                        authorize.setSession('profileimg', proimg);
                    }
                    if (data.LoginStreak == 0) {
                        authorize.setSession('login_modal', 0);
                    }
                    if (data.firstlogin == 'yes') {
                        authorize.setSession('firstlogin', 'yes');
                    } else if (data.firstlogin == 'no') {
                        authorize.setSession('firstlogin', 'no');
                    }
                    authorize.setSession('admin', data.username);
                    authorize.setSession('userpoints', data.userpoints);
                    if (data.total_credits_points) {
                        authorize.setSession('user_wallet_points', data.total_credits_points);
                    } else {
                        authorize.setSession('user_wallet_points', "0");
                    }
                    authorize.setSession('rank', data.rank);
                    authorize.setSession('mail', data.email);
                    authorize.setSession('hash_val', data.hash);
                    authorize.setSession('session_start', data.session_start);
                    authorize.setSession('ipaddress', data.ipaddress);
                    authorize.setSession('AB', data.AB);
                    authorize.getSession('hash_val');
                    authorize.setSession('lang', data.lang);
                    authorize.setSession('skill', data.skills);
                    authorize.setSession('usertype', data.usertype);
                    authorize.setSession('after_admin_logout', '0');
                    if (data.pname !== 'empty' || data.pname != '') {
                        authorize.setSession('cusername', data.pname);

                    }
                    classObj.registerCheck();
                }
            });
        } catch (error) {
            console.log("error");
        }
    }

    registerCheck() {
        try {
            authorize.ajax({ requestType: "loggedIn" }, "registerCheck", function(response) {
                response = JSON.parse(response);
                $("#paymentbtn").data("profileData", response); //Dont Remove
                authorize.setSession("email", response["email"]);
                authorize.setSession("mobile", response["mobile"]);
                if (response["passedoutyear"] != "-select-" && response["passedoutyear"]) {
                    authorize.setSession("passedoutyear", response["passedoutyear"]);
                }
                if (response["department"] != "-select-" && response["department"]) {
                    authorize.setSession("department", response["department"]);
                }
                /*
                let email = JSON.parse(response)["email"];
                let name = JSON.parse(response)["name"];*/
                $("#userEmail").val(response["email"]);
                $("#userEmail").attr("disabled", "true");
                $("#userName").val(response["firstName"]);
                $("#userName").attr("disabled", "true");
                $("#userEmail").data("loggedState", true);
                $("#password").prop("hidden", true);
                $("#confirmPassword").prop("hidden", true);
                let mobileValidated = /^1[+]|[0-9]*$/.test(response["mobile"]);
                if (response["mobile"] && response["mobile"].length <= 15 && response["mobile"].length >= 8 && mobileValidated) {
                    $("#userMobile").val(response["mobile"]);
                    $("#userMobile").prop("hidden", true);
                }
                // $("#passedOutYear").val(response["passedoutyear"]);
                // $("#passedOutYear").attr("disabled","true");

            });
        } catch (error) {
            console.log(error);
        }
    }
}

const sidebar = (function sidebar() {
    const menuList = "#sidebar";
    const toggleicon = "#sidebarToggle .material-icons";
    const collapseClass = "sidebar-collapse";
    const activeClass = "active";
    const EventMenuOpened = "shown.bs.collapse";
    const EventMenuClosed = "hidden.bs.collapse";

    function handleMobileUI() {
        $(menuList).on(EventMenuClosed, () => $(toggleicon).html("menu"));

        $(menuList).on(EventMenuOpened, () => $(toggleicon).html("close"));
    }

    function toggleSidebar() {
        $(menuList).hover(() => $(menuList).toggleClass(collapseClass));
    }

    const init = () => {
        handleMobileUI();
        toggleSidebar();
    };

    return {
        init
    };
})();

const coursesProductPage = (function coursesProductPage() {
    const pageEl = "#courses-product-page";

    const isFunction = functionToCheck =>
        functionToCheck && {}.toString.call(functionToCheck) === "[object Function]";

    const finishLoading = (pageEl, cb) => {
        $(".spinner").hide();
        $(pageEl).removeClass("loading");
        return isFunction(cb) ? cb() : false;
    };

    const init = () => {
        const thisPage = $(pageEl).length !== 0;

        if (!thisPage) {
            return;
        }

        sidebar.init();
        //setStarRating();
        finishLoading(pageEl);
    };

    return {
        init
    };
})();

function onGsignInSuccess(googleUser) {
    try {
        gapi.auth2.getAuthInstance().disconnect();
        if ($("#userEmail").data("GsignInClicked")) {
            let obj = new CourseBundle();
            let email = googleUser.getBasicProfile().getEmail();
            let name = googleUser.getBasicProfile().getName();
            let token = googleUser.getBasicProfile().getId();
            let idToken = googleUser.getAuthResponse().id_token;
            email = $.trim(email);
            email = email.toLowerCase();
            let input = { name: name, emails: email, password: "", id: token, id_token: idToken, requestType: "googleLogin" };
            obj.postSign(input);
        }
    } catch (error) {
        console.log(error);
    }
}

function onGsignInFailure(errorHandler) {
    //handle errors
    try {
        console.log(errorHandler);
    } catch (error) {
        console.log(error);
    }

}

$(document).on("click", "#gSignIn", function() {
    $("#userEmail").data("GsignInClicked", true);
});

$(document).on("click", "#guviSignIn", function(){
  $(".formPage1").hide(300);
  $(".formPage2").show(300);
  $("#userEmail").data("currentFormPage", "formPage2");
});

$(document).on("click", ".flowSelector", function(){
  let currentFlow = $(this).data("currentflow");
  let currentPage = $("#userEmail").data("currentFormPage");
  if(currentFlow == "giftFlow"){
    $(".buyFlow").hide();
    $(".giftFlow").show();
    $("#bundlePayment").val("Next");
    $("#userEmail").data("isGift", true);
    if(currentPage == "formPage3"){
      $(".formPage3").show();
      $(".formPage2").hide();
    }
  }
  else{
    $(".buyFlow").show();
    $(".giftFlow").hide();
    $("#bundlePayment").val("Buy Now");
    $("#userEmail").data("isGift", false);
    if(currentPage == "formPage3"){
      $(".formPage3").hide();
      $(".formPage2").show();
    }
  }
});

function showCouponField(){
    if($("#applyCoupon").is(':checked')){
        $("#couponMarkup").prop("hidden", false);
    }
    else{
        $("#couponMarkup").prop("hidden", true);
    }
}
$('#referralCode').on('change',function(){
    var inputVal = $('#referralCode').val();
   // validateCouponCodeClient(inputVal);
});

function validateCouponCodeClient(coupon){
    if (coupon != "guvi-thanks") {
        $(".result-message").html("<span class='text-danger'>Invalid or Expired coupon</span>");
        $("#discountedPrice").html("");
        $("#discountedPrice").removeClass("price");
        $("#paymentPrice, .actualPrice").removeClass("strikeout");
        $("#applyOffer").removeClass("remove");
        $("#applyOffer").addClass("apply");

        //new
        $(".discountedPrice").html("");
        $(".discountedPrice").prop("hidden", true); 
    } else {
        let res1 = "";
        res1 += `<i class="fa fa-inr">3500<i>`;
        $(".result-message").html(`<span class="text-primary"><span>Congratulations! You have been given </span><span class='price text-primary' >3500 Off</span></span>`);
        $("#discountedPrice").html(res1);
        $("#discountedPrice").addClass("price");
        $("#paymentPrice, .actualPrice").addClass("strikeout");
        $("#applyOffer").removeClass("apply");
        $("#applyOffer").addClass("remove");

        //new
        $(".discountedPrice").html('4499');
        $(".discountedPrice").prop("hidden", false);
    }
}

$(document).on("input", "#applyCoupon", function(){
    showCouponField()
});

var applyCoupon = 0;

$(document).ready(function() {
    authorize.setSession("plyrLoadedPremium","false");
	authorize.setSession("jboxLoadedPremium","false");
    authorize.loginCheck();
    let couponQuery = $("main").hasClass("freedom");
    // console.log(couponQuery);
    if(couponQuery){
        let couponCode = authorize.get_queryStringVal("code");
        let coupon = authorize.get_queryStringVal("coupon");
            if(coupon){
                $('#applyCoupon').prop('checked', true);
                showCouponField();
                
                $('#referralCode').val(coupon);
                $( "#referralCode" ).prop( "disabled", true );
                $('.referralText').html('<span class="price-wrap"><span class="price slashed text-white"><s>15,999</s></span> <span class="lead font-weight-bold"><span class="price-wrap"><s><span class="price text-white">7,999</span></s></span></span><span class="lead font-weight-bold"><span class="price-wrap"> <span class="price text-white">4,499</span></span></span></span>')
                validateCouponCodeClient(coupon);
            }
        if(couponCode){
            if(couponCode == 25){
                $(".off").html(couponCode);
            }else{
                $(".off").html("10");
            }
        }else{
            $("#couponCode").attr("hidden",true);
        }

    }
    let obj = new CourseBundle();
    let emailDomId = $("#userEmail");
    emailDomId.data("GsignInClicked", false);
    emailDomId.data("currentFormPage", "formPage1");
    // gapi.signin2.render('gSignIn', {
    //     'scope': 'profile email',
    //     'width': 240,
    //     'height': 50,
    //     'longtitle': true,
    //     'theme': 'dark',
    //     'onsuccess': onGsignInSuccess,
    //     'onfailure': onGsignInFailure
    // });
    $(".giftFlow").hide();
    $(".formPage3").hide();
    emailDomId.data("isGift", false);
    emailDomId.data("validated", false);
    emailDomId.data("registeredUser", false);
    let requestData = {
        requestType: "onload",
        courseType: "anniversarySubscriptionYearly"
    };
    initialLoad();
    authorize.ajax(requestData, "ratingList", function(responseData) {
        let rating = JSON.parse(responseData);
        if (rating.countryCode != "IN") {
            $("#internationalOffer").html(
                "<h4><strong>&nbsp;Flat<small>&nbsp;</small>50%<small>&nbsp;Off</small></strong></h4>"
            );
            $(".internationalField").prop("hidden", false);
            // $("#bundlePayment").attr("id", "bundlePaymentInternational");
        }else{
            $(".localField").prop("hidden", false);
        }
        obj.renderOfferPeriod();
        $("#course-description").append(
            '<div class="course-rating d-flex flex-row"><div class="star-ratings-css" data-rating=' +
            rating["rating"] +
            ' data-max="5"><div class="star-ratings-css-top"><i class="five-stars"></i></div><div class="star-ratings-css-bottom"><i class="five-stars"></i></div></div><span class="rating-count">(' +
            rating["rating_count"] +
            ")</span></div>"
        );
        const stars = ".star-ratings-css";
        const starSetter = ".star-ratings-css-top";
        $(stars).each((idx, star) => {
            const rating = $(star).data("rating");
            const max = $(star).data("max");
            const width = `${(rating / max) * 100}%`;
            $(star)
                .find(starSetter)
                .css("width", width);
        });
        let authToken = authorize.getSession("authToken");
        if (authToken || authorize.getSession("userAuth")) {
            obj.loggedInState();
        } else {
            emailDomId.data("loggedState", false);
        }
    });
    $.each(window.location.search.substr(1).split("&"), function(c, q) {
        var i = q.split("=");
        queries[i[0].toString()] = i[1];
    });
    url = window.location.href;
    // obj.renderPassedOutYear();
    coursesProductPage.init();
    // const player = new Plyr("#course-video");
    // window.player = player;
    // obj.renderVideo();
    let search = new URLSearchParams(document.location.search.substring(1));
    let courseId = search.get("course");
    //let authToken = "murugaauth"; //need to be from the session
    if (courseId) {
        // let input = {type : "preview", courseId : courseId};
        // authorize.ajax(input, "courseContent", function(data){
        //  data = JSON.parse(data);
        //  console.log(data.defaultData)
        //  $("#paymentbtn").data("departPass",data.defaultData);
        //  if(!data){
        //    // window.location.href = "courses-video.html?course=" + courseId;
        //  }
        //  else if(data == "invalid" || data.status == "error"){
        //    // window.location.href = "courses.html"
        //  }
        //  else if(data){
        //    obj.renderPreview(data.previewData);
        //  }
        // });
    } else {
        // window.location.href = "courses.html";
    }
    var userType = 2;
    if (authorize.getSession("authToken") == null) {
        $(".formPage2").hide();
        $("#emailInput").on("focusout", function() {
            let email = validate("#emailInput", "mobile");
            if (email) {
                authorize.ajax({
                        requestType: "mail_check",
                        email: email
                    },
                    "registerCheck",
                    function(response) {
                        userType = JSON.parse(response)["user"];
                        $("#passField").css("display", "block");
                        if (!userType) {
                            $("#confirmPassField").css("display", "block");
                        }
                    }
                );
            }
        });
    } else {
        $(".formPage1").hide();
        obj.registerCheck();
    }
    $("#guviSignIn").trigger("click");
});

$(document).on("click", "#try-codekata", function(data) {
    window.location.href = "code-kata.html";
});

$(document).on("input change", "#emailInput", function(data) {
    $("#passField").css("display", "none");
    $("#confirmPassField").css("display", "none");
});

$(document).on("click", "#applyCoupon", function(data) {
    applyCoupon = $("#applyCoupon").hasClass("apply");
    if (applyCoupon) {
        $("#applyCoupon").removeClass("apply");
        $("#applyCoupon").addClass("remove");
    } else {
        $("#applyCoupon").removeClass("remove");
        $("#applyCoupon").addClass("apply");
    }
});

$(window).scroll(function() {
    let obj = new CourseBundle();
    // let state = obj.isScrolledIntoView("video");
    // if (!state) {
    //   player.pause();
    // }
    if (window.innerWidth > 900) {
        topOfFooter = $(".main-footer").position().top;
        scrollDistanceFromTopOfDoc = $(document).scrollTop() + 570;
        scrollDistanceFromTopOfFooter = scrollDistanceFromTopOfDoc - topOfFooter;
        if (scrollDistanceFromTopOfDoc > topOfFooter) {
            $(".fixed-card").css(
                "margin-top",
                0 - scrollDistanceFromTopOfFooter - 150
            );
        } else if (window.innerWidth > 900) {
            $(".fixed-card").css("margin-top", -32);
        }
    }
});

$(document).on("focusout", "#buy-bundle", function(data) {
    let bundleObj = new CourseBundle();
    let isValidated = $("#userEmail").data("validated");
    let loggedState = $("#userEmail").data("loggedState");
    let isRegistered = $("#userEmail").data("registeredUser");
    let emailId = $("#userEmail").val();
    var inputVal = $('#referralCode').val();
    let mobile = $("#userMobile").val();
    if (!isValidated && !loggedState) {
        let name = $("#userName").val();
        if (emailId) {
            // bundleObj.validateField("#userMobile");
            let input = {
                type: "validateUser",
                emailId: emailId,
                name: name,
                mobile: mobile
            };
            input["source"] = "Not Set";
            input["medium"] = "Not Set";
            input["campaign"] = "Not Set";
            if (queries.utm_source != undefined) {
                input["source"] = queries.utm_source;
            }
            if (queries.utm_medium != undefined) {
                input["medium"] = queries.utm_medium;
            }
            if (queries.utm_campaign != undefined) {
                input["campaign"] = queries.utm_campaign;
            }
            input["url"] = url;
            input["product"] = "anniversarySubscriptionYearly";
            $(".input-spinner").addClass("show");
            authorize.invisibleAjax(input, "buyBundle", function(data) {
                $(".input-spinner").removeClass("show");
                $("#userEmail").data("validated", true);
                data = JSON.parse(data);
                bundleObj.decideUser(data);
            });
        }
    }
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();
    if (!$("#userEmail").data("registeredUser") &&
        password != confirmPassword &&
        password &&
        confirmPassword
    ) {
        $("#misMatch").prop("hidden", false);
        $("#nonUserMessage").prop("hidden", true);
      
    } else {
        $("#misMatch").prop("hidden", true);

    }
});

$(document).on("click", "#bundlePayment, #giftCourse", function() {
    let payObject = new coursePayment();
    let bundleObj = new CourseBundle();
    let eventObj = this;
    let isRegistered = $("#userEmail").data("registeredUser");
    $("#userEmail").data("allFieldValidated", true);
    // bundleObj.validateField("#userName");
    bundleObj.validateField("#userMobile");
    let userMobile = $("#userMobile").val();
    let userName = $("#userName").val();
    if ($("#userEmail").data("loggedState")) {
        let input = {
            type: "logging",
            userMobile: userMobile,
            userName: userName
        };
        // if (!$("input[type=radio][name=userType]:checked").val()) {
        //     $("input[type=radio][name=userType]").addClass("is-invalid");
        //     $("#userEmail").data("allFieldValidated", false);
        // } else {
        //     $("input[type=radio][name=userType]").removeClass("is-invalid");
        //     if ($("input[type=radio][name=userType]:checked").val() == "student") {
        //         bundleObj.validateField("#registerNumber");
        //         bundleObj.validateField("#collegeName");
        //         bundleObj.validateField("#passedOutYear");
        //         input["registerNumber"] = $("#registerNumber").val();
        //         input["collegeName"] = $("#collegeName").val();
        //         input["passedOutYear"] = $("#passedOutYear").val();
        //     } else if (
        //         $("input[type=radio][name=userType]:checked").val() == "faculty"
        //     ) {
        //         bundleObj.validateField("#professorDepartment");
        //         bundleObj.validateField("#collegeName");
        //         input["professorDepartment"] = $("#professorDepartment").val();
        //         input["collegeName"] = $("#collegeName").val();
        //     }
        // }
        // input["userType"] = $("input[type=radio][name=userType]:checked").val();
        input["source"] = "Not Set";
        input["medium"] = "Not Set";
        input["campaign"] = "Not Set";
        if (queries.utm_source != undefined) {
            input["source"] = queries.utm_source;
        }
        if (queries.utm_medium != undefined) {
            input["medium"] = queries.utm_medium;
        }
        if (queries.utm_campaign != undefined) {
            input["campaign"] = queries.utm_campaign;
        }
        input["url"] = url;
        input["product"] = "anniversarySubscriptionYearly";


        //input["product"] = "Deep Learning";
        if($(this).val() === "Next" && $("#userEmail").data("allFieldValidated")){
          $(this).val("Buy Now");
          $(".formPage2").hide(300);
          $(".formPage3").show(300);
          $("#userEmail").data("currentFormPage", "formPage3");
          $("#userEmail").data("allFieldValidated", false);
        }
        else if($("#userEmail").data("isGift") && $(this).val() === "Gift Now"){
          bundleObj.validateField("#giftedMail");
          bundleObj.validateField("#giftedMessage");
          bundleObj.validateField("#giftedName");
          if($("#giftedMail").val() === $("#userEmail").val()){
            $("#userEmail").data("allFieldValidated", false);
            $("#sameMailError").prop("hidden", false);
          }
          else{
            $("#sameMailError").prop("hidden", true);
          }
        }
        if ($("#userEmail").data("allFieldValidated")) {
            authorize.ajax(input, "buyBundle", function(data) {
                //trigger payment

                let additionalParams = $("#userEmail").data("isGift") ? {giftedMail: $("#giftedMail").val(), giftedName: $("#giftedName").val(), giftedMessage: $("#giftedMessage").val()} : {};
                payObject.paymentTypeRazorPay(
                  "anniversarySubscriptionYearly",
                  "courseBundle",
                  input["userType"],
                  "",
                  "",
                  additionalParams
                );
            });
        }
    }

    bundleObj.validateField("#password");
    bundleObj.validateField("#userEmail");
    bundleObj.validateField("#userMobile");
    $('#applyOffer').removeClass('remove');
    $('#applyOffer').trigger('click');
    let password = $("#password").val();
    let emailId = $("#userEmail").val();
    let confirmPassword = $("#confirmPassword").val();
    if (!isRegistered && !$("#userEmail").data("loggedState")) {
        if (password != confirmPassword) {
            $("#userEmail").data("allFieldValidated", false);
        }
        let input = {
            type: "logging",
            email: emailId,
            password: password,
            fname: userName,
            lname: "",
            phone: userMobile
        };

        // if (!$("input[type=radio][name=userType]:checked").val()) {
        //     $("input[type=radio][name=userType]").addClass("is-invalid");
        //     $("#userEmail").data("allFieldValidated", false);
        // } else {
        //     $("input[type=radio][name=userType]").removeClass("is-invalid");
        //     if ($("input[type=radio][name=userType]:checked").val() == "student") {
        //         bundleObj.validateField("#registerNumber");
        //         bundleObj.validateField("#collegeName");
        //         bundleObj.validateField("#passedOutYear");
        //         input["registerNumber"] = $("#registerNumber").val();
        //         input["collegeName"] = $("#collegeName").val();
        //         input["passedOutYear"] = $("#passedOutYear").val();
        //     } else if (
        //         $("input[type=radio][name=userType]:checked").val() == "faculty"
        //     ) {
        //         bundleObj.validateField("#professorDepartment");
        //         bundleObj.validateField("#collegeName");
        //         input["professorDepartment"] = $("#professorDepartment").val();
        //         input["collegeName"] = $("#collegeName").val();
        //     }
        // }
        // input["userType"] = $("input[type=radio][name=userType]:checked").val();
        /* facebook pixel event code start*/
        // let event = "DLProfessionalLead";
        // if (input["userType"] == "faculty") {
        //     event = "DLProfessorLead";
        // } else if (input["userType"] == "student") {
        //     event = "DLStudentLead";
        // }!(function(f, b, e, v, n, t, s) {
        //     if (f.fbq) return;
        //     n = f.fbq = function() {
        //         n.callMethod ?
        //             n.callMethod.apply(n, arguments) :
        //             n.queue.push(arguments);
        //     };
        //     if (!f._fbq) f._fbq = n;
        //     n.push = n;
        //     n.loaded = !0;
        //     n.version = "2.0";
        //     n.queue = [];
        //     t = b.createElement(e);
        //     t.async = !0;
        //     t.src = v;
        //     s = b.getElementsByTagName(e)[0];
        //     s.parentNode.insertBefore(t, s);
        // })(
        //     window,
        //     document,
        //     "script",
        //     "https://connect.facebook.net/en_US/fbevents.js"
        // );
        // fbq("init", "2421896964801907");
        // fbq("track", event);
        /* facebook pixel event code end*/
        bundleObj.validateField("#userName");
        if($(this).val() === "Next" && $("#userEmail").data("allFieldValidated")){
          $(this).val("Buy Now");
          $(".formPage2").hide(300);
          $(".formPage3").show(300);
          $("#userEmail").data("currentFormPage", "formPage3");
          $("#userEmail").data("allFieldValidated", false);
        }
        else if($("#userEmail").data("isGift") && $(this).val() === "Gift Now"){
          bundleObj.validateField("#giftedMail");
          bundleObj.validateField("#giftedMessage");
          bundleObj.validateField("#giftedName");
          if($("#giftedMail").val() === $("#userEmail").val()){
            $("#userEmail").data("allFieldValidated", false);
            $("#sameMailError").prop("hidden", false);
          }
          else{
            $("#sameMailError").prop("hidden", true);
          }
        }
        if ($("#userEmail").data("allFieldValidated")) {
            input["source"] = "Not Set";
            input["medium"] = "Not Set";
            input["campaign"] = "Not Set";
            if (queries.utm_source != undefined) {
                input["source"] = queries.utm_source;
            }
            if (queries.utm_medium != undefined) {
                input["medium"] = queries.utm_medium;
            }
            if (queries.utm_campaign != undefined) {
                input["campaign"] = queries.utm_campaign;
            }
            input["url"] = url;
            input["product"] = "anniversarySubscriptionYearly";
            grecaptcha
                .execute("6LdADb4UAAAAAA1feb36sozffPYRKKOqD9WPbibp", {
                    action: "register"
                })
                .then(function(token) {
                    capchetoken = token;
                });
            input["capchetoken"] = capchetoken;
            authorize.ajax(input, "mregister", function(data) {
                //trigger payment
                data = data.substring(1, data.length - 1);
                data = JSON.parse(data);
                hash = data.hash;
                input["emails"] = emailId;
                input["userMobile"] = userMobile;
                input["userName"] = userName;
                //input["product"] = "Deep Learning";
                authorize.ajax(input, "buyBundle", function(data) {
                    //done logging

                    let additionalParams = $("#userEmail").data("isGift") ? {giftedMail: $("#giftedMail").val(), giftedName: $("#giftedName").val(), giftedMessage: $("#giftedMessage").val()} : {};
                    payObject.paymentTypeRazorPay(
                        "anniversarySubscriptionYearly",
                        "courseBundle",
                        input["userType"],
                        "",
                        hash,
                        additionalParams
                    );
                });
            });
        }
    }
    let input = {
        type: "login",
        emails: emailId,
        password: password,
        userName: userName,
        userMobile: userMobile
    };


    // if (!$("input[type=radio][name=userType]:checked").val()) {
    //     $("input[type=radio][name=userType]").addClass("is-invalid");
    //     $("#userEmail").data("allFieldValidated", false);
    // } else {
    //     $("input[type=radio][name=userType]").removeClass("is-invalid");
    //     if ($("input[type=radio][name=userType]:checked").val() == "student") {
    //         bundleObj.validateField("#registerNumber");
    //         bundleObj.validateField("#collegeName");
    //         bundleObj.validateField("#passedOutYear");
    //         input["registerNumber"] = $("#registerNumber").val();
    //         input["collegeName"] = $("#collegeName").val();
    //         input["passedOutYear"] = $("#passedOutYear").val();
    //     } else if (
    //         $("input[type=radio][name=userType]:checked").val() == "faculty"
    //     ) {
    //         bundleObj.validateField("#professorDepartment");
    //         bundleObj.validateField("#collegeName");
    //         input["professorDepartment"] = $("#professorDepartment").val();
    //         input["collegeName"] = $("#collegeName").val();
    //     }
    // }
    // input["userType"] = $("input[type=radio][name=userType]:checked").val();
    /* facebook pixel event code start*/
    // let event = "DLProfessionalLead";
    // if (input["userType"] == "faculty") {
    //     event = "DLProfessorLead";
    // } else if (input["userType"] == "student") {
    //     event = "DLStudentLead";
    // }!(function(f, b, e, v, n, t, s) {
    //     if (f.fbq) return;
    //     n = f.fbq = function() {
    //         n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    //     };
    //     if (!f._fbq) f._fbq = n;
    //     n.push = n;
    //     n.loaded = !0;
    //     n.version = "2.0";
    //     n.queue = [];
    //     t = b.createElement(e);
    //     t.async = !0;
    //     t.src = v;
    //     s = b.getElementsByTagName(e)[0];
    //     s.parentNode.insertBefore(t, s);
    // })(
    //     window,
    //     document,
    //     "script",
    //     "https://connect.facebook.net/en_US/fbevents.js"
    // );
    // fbq("init", "2421896964801907");
    // fbq("track", event);
    /* facebook pixel event code end*/
    if (
        isRegistered &&
        !$("#userEmail").data("loggedState") &&
        $("#userEmail").data("allFieldValidated")
    ) {
        input["source"] = "Not Set";
        input["medium"] = "Not Set";
        input["campaign"] = "Not Set";
        if (queries.utm_source != undefined) {
            input["source"] = queries.utm_source;
        }
        if (queries.utm_medium != undefined) {
            input["medium"] = queries.utm_medium;
        }
        if (queries.utm_campaign != undefined) {
            input["campaign"] = queries.utm_campaign;
        }
        input["url"] = url;
        input["product"] = "anniversarySubscriptionYearly";
        //input["product"] = "Deep Learning";
        authorize.ajax(input, "buyBundle", function(data) {
            data = JSON.parse(data);
            bundleObj.hideProp("#userMessage");
            if (data.access == "true") {
                if($(eventObj).val() === "Next" && $("#userEmail").data("allFieldValidated")){
                  $(".formPage2").hide(300);
                  $(".formPage3").show(300);
                  $("#userEmail").data("currentFormPage", "formPage3");
                  $("#userEmail").data("allFieldValidated", false);
                }
                else if($("#userEmail").data("isGift") && $(eventObj).val() === "Gift Now"){
                    bundleObj.validateField("#giftedMail");
                    bundleObj.validateField("#giftedMessage");
                    bundleObj.validateField("#giftedName");
                    if($("#giftedMail").val() === $("#userEmail").val()){
                      $("#userEmail").data("allFieldValidated", false);
                      $("#sameMailError").prop("hidden", false);
                    }
                    else{
                      $("#sameMailError").prop("hidden", true);
                    }
                }
                if (data.auth) {
                    authorize.setSession("signInAuth", data.auth);
                }
                // $("#userEmail").data("loggedState", true);
                if($("#userEmail").data("allFieldValidated")){
                  bundleObj.hideProp("#userMessage");
                  bundleObj.hideProp("#invalidPassword");
                  bundleObj.showProp("#loginSuccessful");
                  let payObject = new coursePayment();
                  let authToken = authorize.getSession("signInAuth");
                  let additionalParams = $("#userEmail").data("isGift") ? {giftedMail: $("#giftedMail").val(), giftedName: $("#giftedName").val(), giftedMessage: $("#giftedMessage").val()} : {};
                  payObject.paymentTypeRazorPay(
                    "anniversarySubscriptionYearly",
                    "courseBundle",
                    input["userType"],
                    authToken,
                    "",
                    additionalParams
                  );
                }
            } else if (data.access == "false") {
                bundleObj.hideProp("#loginSuccessful");
                bundleObj.showProp("#invalidPassword");
            }
        });
    }
});

$(document).on("click", "#bundlePaymentInternational", function() {
    let payObject = new coursePayment();
    let bundleObj = new CourseBundle();
    let isRegistered = $("#userEmail").data("registeredUser");
    $("#userEmail").data("allFieldValidated", true);
    bundleObj.validateField("#userName");
    // bundleObj.validateField("#userMobile");
    // let userMobile = $("#userMobile").val();
    let userName = $("#userName").val();
    if ($("#userEmail").data("loggedState")) {
        let input = {
            type: "logging",
            userName: userName
        };
        // if(!$("input[type=radio][name=userType]:checked").val()){
        //  $("input[type=radio][name=userType]").addClass("is-invalid");
        //  $("#userEmail").data("allFieldValidated", false);
        // }
        // else{
        //  $("input[type=radio][name=userType]").removeClass("is-invalid");
        //  if($("input[type=radio][name=userType]:checked").val() == "student"){
        //    bundleObj.validateField("#registerNumber");
        //    bundleObj.validateField("#collegeName");
        //    bundleObj.validateField("#passedOutYear");
        //    input["registerNumber"] = $("#registerNumber").val();
        //    input["collegeName"] = $("#collegeName").val();
        //    input["passedOutYear"] = $("#passedOutYear").val();
        //  }
        //  else if($("input[type=radio][name=userType]:checked").val() == "faculty"){
        //    bundleObj.validateField("#professorDepartment");
        //    bundleObj.validateField("#collegeName");
        //    input["professorDepartment"] = $("#professorDepartment").val();
        //    input["collegeName"] = $("#collegeName").val();
        //  }
        // }
        input["userType"] = "International";
        input["source"] = "Not Set";
        input["medium"] = "Not Set";
        input["campaign"] = "Not Set";
        if (queries.utm_source != undefined) {
            input["source"] = queries.utm_source;
        }
        if (queries.utm_medium != undefined) {
            input["medium"] = queries.utm_medium;
        }
        if (queries.utm_campaign != undefined) {
            input["campaign"] = queries.utm_campaign;
        }
        input["url"] = url;
        input["product"] = "anniversarySubscriptionYearly";
        //input["product"] = "Deep Learning";
        // console.log("start");
        if ($("#userEmail").data("allFieldValidated")) {
            // console.log("send");
            authorize.ajax(input, "buyBundle", function(data) {
                //trigger payment
                payObject.paymentTypeRazorPay(
                    "anniversarySubscriptionYearly",
                    "courseBundle",
                    input["userType"]
                );
            });
        }
    }

    bundleObj.validateField("#password");
    bundleObj.validateField("#userEmail");
    // bundleObj.validateField("#userMobile");
    let password = $("#password").val();
    let emailId = $("#userEmail").val();
    let confirmPassword = $("#confirmPassword").val();
    if (!isRegistered && !$("#userEmail").data("loggedState")) {
        if (password != confirmPassword) {
            $("#userEmail").data("allFieldValidated", false);
        }
        let input = {
            type: "logging",
            email: emailId,
            password: password,
            fname: userName,
            lname: ""
        };
        // if(!$("input[type=radio][name=userType]:checked").val()){
        //  $("input[type=radio][name=userType]").addClass("is-invalid");
        //  $("#userEmail").data("allFieldValidated", false);
        // }
        // else{
        //  $("input[type=radio][name=userType]").removeClass("is-invalid");
        //  if($("input[type=radio][name=userType]:checked").val() == "student"){
        //    bundleObj.validateField("#registerNumber");
        //    bundleObj.validateField("#collegeName");
        //    bundleObj.validateField("#passedOutYear");
        //    input["registerNumber"] = $("#registerNumber").val();
        //    input["collegeName"] = $("#collegeName").val();
        //    input["passedOutYear"] = $("#passedOutYear").val();
        //  }
        //  else if($("input[type=radio][name=userType]:checked").val() == "faculty"){
        //    bundleObj.validateField("#professorDepartment");
        //    bundleObj.validateField("#collegeName");
        //    input["professorDepartment"] = $("#professorDepartment").val();
        //    input["collegeName"] = $("#collegeName").val();
        //  }
        // }
        input["userType"] = "International";
        /* facebook pixel event code start*/
        // let event="DLProfessionalLead";
        // if(input["userType"]=="faculty"){
        //  event = "DLProfessorLead";
        // }else if(input["userType"]=="student"){
        //  event = "DLStudentLead";
        // }
        // !function(f,b,e,v,n,t,s)
        //               {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        //               n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        //               if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        //               n.queue=[];t=b.createElement(e);t.async=!0;
        //               t.src=v;s=b.getElementsByTagName(e)[0];
        //               s.parentNode.insertBefore(t,s)}(window, document,'script',
        //               'https://connect.facebook.net/en_US/fbevents.js');
        //               fbq('init', '2421896964801907');
        //               fbq('track', event);
        /* facebook pixel event code end*/
        if ($("#userEmail").data("allFieldValidated")) {
            input["source"] = "Not Set";
            input["medium"] = "Not Set";
            input["campaign"] = "Not Set";
            if (queries.utm_source != undefined) {
                input["source"] = queries.utm_source;
            }
            if (queries.utm_medium != undefined) {
                input["medium"] = queries.utm_medium;
            }
            if (queries.utm_campaign != undefined) {
                input["campaign"] = queries.utm_campaign;
            }
            input["url"] = url;
            input["product"] = "anniversarySubscriptionYearly";
            grecaptcha
                .execute("6LdADb4UAAAAAA1feb36sozffPYRKKOqD9WPbibp", {
                    action: "register"
                })
                .then(function(token) {
                    capchetoken = token;
                });
            input["capchetoken"] = capchetoken;
            authorize.ajax(input, "mregister", function(data) {
                //trigger payment
                data = data.substring(1, data.length - 1);
                data = JSON.parse(data);
                hash = data.hash;
                input["emails"] = emailId;
                // input["userMobile"] = userMobile;
                input["userName"] = userName;
                //input["product"] = "Deep Learning";
                authorize.ajax(input, "buyBundle", function(data) {
                    //done logging
                    payObject.paymentTypeRazorPay(
                        "anniversarySubscriptionYearly",
                        "courseBundle",
                        input["userType"],
                        "",
                        hash
                    );
                });
            });
        }
    }
    let input = {
        type: "login",
        emails: emailId,
        password: password,
        userName: userName
    };
    // if(!$("input[type=radio][name=userType]:checked").val()){
    //  $("input[type=radio][name=userType]").addClass("is-invalid");
    //  $("#userEmailc").data("allFieldValidated", false);
    // }
    // else{
    //  $("input[type=radio][name=userType]").removeClass("is-invalid");
    //  if($("input[type=radio][name=userType]:checked").val() == "student"){
    //    bundleObj.validateField("#registerNumber");
    //    bundleObj.validateField("#collegeName");
    //    bundleObj.validateField("#passedOutYear");
    //    input["registerNumber"] = $("#registerNumber").val();
    //    input["collegeName"] = $("#collegeName").val();
    //    input["passedOutYear"] = $("#passedOutYear").val();
    //  }
    //  else if($("input[type=radio][name=userType]:checked").val() == "faculty"){
    //    bundleObj.validateField("#professorDepartment");
    //    bundleObj.validateField("#collegeName");
    //    input["professorDepartment"] = $("#professorDepartment").val();
    //    input["collegeName"] = $("#collegeName").val();
    //  }
    // }
    input["userType"] = "International";
    /* facebook pixel event code start*/
    // let event="DLProfessionalLead";
    // if(input["userType"]=="faculty"){
    //  event = "DLProfessorLead";
    // }else if(input["userType"]=="student"){
    //  event = "DLStudentLead";
    // }
    // !function(f,b,e,v,n,t,s)
    //        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    //        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    //        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    //        n.queue=[];t=b.createElement(e);t.async=!0;
    //        t.src=v;s=b.getElementsByTagName(e)[0];
    //        s.parentNode.insertBefore(t,s)}(window, document,'script',
    //        'https://connect.facebook.net/en_US/fbevents.js');
    //        fbq('init', '2421896964801907');
    //        fbq('track', event);
    /* facebook pixel event code end*/
    if (
        isRegistered &&
        !$("#userEmail").data("loggedState") &&
        $("#userEmail").data("allFieldValidated")
    ) {
        input["source"] = "Not Set";
        input["medium"] = "Not Set";
        input["campaign"] = "Not Set";
        if (queries.utm_source != undefined) {
            input["source"] = queries.utm_source;
        }
        if (queries.utm_medium != undefined) {
            input["medium"] = queries.utm_medium;
        }
        if (queries.utm_campaign != undefined) {
            input["campaign"] = queries.utm_campaign;
        }
        input["url"] = url;
        input["product"] = "anniversarySubscriptionYearly";
        //input["product"] = "Deep Learning";
        authorize.ajax(input, "buyBundle", function(data) {
            data = JSON.parse(data);
            bundleObj.hideProp("#userMessage");
            if (data.access == "true") {
                if (data.auth) {
                    authorize.setSession("signInAuth", data.auth);
                }
                // $("#userEmail").data("loggedState", true);
                bundleObj.hideProp("#userMessage");
                bundleObj.hideProp("#invalidPassword");
                // bundleObj.showProp("#loginSuccessful");
                let payObject = new coursePayment();
                let authToken = authorize.getSession("signInAuth");
                payObject.paymentTypeRazorPay(
                    "anniversarySubscriptionYearly",
                    "courseBundle",
                    input["userType"],
                    authToken
                );
            } else if (data.access == "false") {
                bundleObj.hideProp("#loginSuccessful");
                bundleObj.showProp("#invalidPassword");
            }
        });
    }
});

$(document).on("", "#buy-bundle", function(data) {
    try {
        data.preventDefault();
        $("#userEmail").data("allFieldValidated", true);
        let bundleObj = new CourseBundle();
        bundleObj.validateField("#password");
        let isRegistered = $("#userEmail").data("registeredUser");
        if (!isRegistered) {
            bundleObj.validateField("#confirmPassword");
        }
        if (!$("input[type=radio][name=userType]:checked").val()) {
            $("input[type=radio][name=userType]").addClass("is-invalid");
            $("#userEmail").data("allFieldValidated", false);
        } else {
            $("input[type=radio][name=userType]").removeClass("is-invalid");
            if ($("input[type=radio][name=userType]:checked").val() == "student") {
                bundleObj.validateField("#registerNumber");
                bundleObj.validateField("#collegeName");
            }
        }
        if ($("#userEmail").data("allFieldValidated") && !isRegistered) {
            let firstName = $("#userName").val();
            let email = $("#userEmail").val();
            let password = $("#password").val();
            let mobile = $("#userMobile").val();
            let input = {
                email: email,
                password: password,
                fname: firstName,
                lname: "",
                phone: mobile
            };
            authorize.ajax(input, "mregister", function(data) {
                console.log("registered");
            });
        }
    } catch (error) {}
});

$(document).on("input change", "input[type=radio][name=userType]", function(
    data
) {
    $("#nonUserMessage").prop("hidden", true);
    $("#userMessage").prop("hidden", true);
    if (this.value == "student") {
        $("#collegeName").prop("hidden", false);
        $("#registerNumber").prop("hidden", false);
        $("#studentAcknowledge").prop("hidden", false);
        $("#passedOutYear").prop("hidden", false);
        $("#studentPrice").prop("hidden", false);
        $("#professorDepartment").prop("hidden", true);
        $("#professionalPrice").prop("hidden", true);
    } else if (this.value == "professional") {
        $("#collegeName").prop("hidden", true);
        $("#registerNumber").prop("hidden", true);
        $("#studentAcknowledge").prop("hidden", true);
        $("#passedOutYear").prop("hidden", true);
        $("#studentPrice").prop("hidden", true);
        $("#professorDepartment").prop("hidden", true);
        $("#professionalPrice").prop("hidden", false);
    } else if (this.value == "faculty") {
        $("#collegeName").prop("hidden", false);
        $("#studentAcknowledge").prop("hidden", false);
        $("#studentPrice").prop("hidden", false);
        $("#professorDepartment").prop("hidden", false);
        $("#professionalPrice").prop("hidden", true);
        $("#passedOutYear").prop("hidden", true);
        $("#registerNumber").prop("hidden", true);
    }
    if (!this.value) {
        $("input[type=radio][name=userType]").addClass("is-invalid");
    } else {
        $("input[type=radio][name=userType]").removeClass("is-invalid");
    }
});

$(document).on("input change", "#userEmail", function(data) {
    $("#userEmail").data("validated", false);
});

$(document).on("click", "#viewSampleVideo", function(data) {
    let content =
        '<div class="embed-responsive embed-responsive-21by9 video-wrap"><video class="embed-responsive-item" id="sampleVideo"></video></div>';
    let width = "100%";
    if (window.innerWidth > 500) {
        width = "50%";
    }
    var myModal = new jBox("Modal", {
        content: content,
        width: width,
        onCreated: function() {
            const customPlayer = new Plyr("#sampleVideo");
            window.customPlayer = customPlayer;
            let courseObj = new CourseBundle();
            courseObj.renderCustomVideo();
            $(".video-wrap").css("margin", 0);
            $(".jBox-content").css("padding", 0);
        },
        onCloseComplete: function() {
            customPlayer.pause();
        }
    });

    myModal.open();
});

$(document).on("click", ".is-invalid", function() {
    $(this).removeClass("is-invalid");
});

// $(document).on("click",".viewMore",function(){
//  $(this).text("View less ");
//  $(this).addClass("viewLess");
//  $(this).addClass("collapse");
//  $(this).removeClass("viewMore");
//  $(this).removeClass("collapsed");

//  $(".more").css("display","unset");
// });
// $(document).on("click",".viewLess",function(){
//  $(this).text("View more ");
//  $(this).removeClass("viewLess");
//  $(this).addClass("viewMore");
//  $(".more").css("display","none");
// });



//course list

function initialLoad(completionCallback) {
    authorize.ajax({ "requestType": "paidCourses" }, "courseFetch", function(data) {
        allPaidCourses_unordered = JSON.parse(data);
        allPaidCourses = {};
        Object.keys(allPaidCourses_unordered).sort().forEach(function(key) {
            allPaidCourses[key] = allPaidCourses_unordered[key];
          });
        let paidCourseString = "";
        let priorityMarkup = "";
        let keys = Object.keys(allPaidCourses);
        let priorityCourses = ["azure_step_by_step_english", "mongodb_en", "angular_step_by_step_english", "mysql", "introduction-to-ml", "servletjsp_en", "javascript_en", "java_en", "python_en", "computational_thinking"];
        let i = 0
        for (i = 0; i < keys.length; i++) {

            if (priorityCourses.includes(keys[i])) {
                priorityMarkup += getCourseCard(allPaidCourses[keys[i]], "list");
            } else {
                paidCourseString += getCourseCard(allPaidCourses[keys[i]], "list");
            }


        }
        $("#totalCourseCount").html("("+i+")");
        $("#paid-course-list ul").html(priorityMarkup + paidCourseString);
        calculateRating();
        $("#pagination-prev").addClass("pagination-disable");
        coursesList = new List('paid-course-list', {
            valueNames: ["course-title", "proficiency"],
            innerWindow: 0,
            outerWindow: 0,
            page: 9,
            pagination: true
        }).on("updated", function(list) {
            let isFirst = list.i == 1;
            let isLast = list.i > list.matchingItems.length - list.page;
            let totalPage = 0;
            if (list.matchingItems.length != 0) {
                totalPage = Math.ceil(list.matchingItems.length / list.page);
            }
            createPageNumber(totalPage, list.i);
            let currentPage = 0
            if (list.i == 1 && totalPage != 0) {
                currentPage = 1;
            } else if (list.i > 1) {
                currentPage = ((list.i - 1) / list.page) + 1;
            }
            $("#current-page").html(currentPage);
            $("#total-page").html(totalPage);
            $("#pagination-prev.pagination-disable, #pagination-next.pagination-disable").removeClass("pagination-disable");
            if (isFirst) {
                $("#pagination-prev").addClass("pagination-disable");
            }
            if (isLast) {
                $("#pagination-next").addClass("pagination-disable");
            }
            if (list.matchingItems.length <= 9) {
                $(".pagination-wrap").hide();
            } else {
                $(".pagination-wrap").show();
            }
        });
        let totalPage = 0;
        if (coursesList.matchingItems.length != 0) {
            totalPage = Math.ceil(coursesList.matchingItems.length / coursesList.page);
        }
        let currentPage = 0
        if (coursesList.i == 1) {
            currentPage = 1;
        } else if (coursesList.i > 1) {
            currentPage = ((coursesList.i - 1) / coursesList.page) + 1;
        }
        $("#current-page").html(currentPage);
        $("#total-page").html(totalPage);
        createPageNumber(totalPage, coursesList.i);

        // const coursesListLang = new List("course-library-list", {
        //   valueNames: ["course-title","proficiency"]
        // });
        const searchInput = $("#searchInput");
        const langFilter = $("#langFilter");

        langFilter.change(() => {

            const langKeyword = langFilter.val();
            coursesList.filter(function(item) {
                let langFilters = false;
                if (langKeyword == "") {
                    langFilters = true;
                } else {
                    langFilters = item.values().proficiency == langKeyword;

                }
                return langFilters
            });
            searchInput.keyup();
        });

        searchInput.keyup(() => {
            const keyword = searchInput.val();
            coursesList.search(keyword);
        });

        // changeCourseOnLoad(completionCallback);
    });
}


function getCourseCard(course, type = "cart") {

    // console.log(course["name"])
    liststr = `<a class="dropdown-item col-md-12 col-lg-6 col-xl-4 my-1" data-course="${course['ckey']}"  onclick='showSyllabus("${course['ckey']}")'>${course["name"]} (${course["lang"]})</a>`
    $('.list0').append(liststr);
    let courseCardString = "";
    let courseTag = `<span class="course-tag premium">Premium</span>`;
    if (course.discount_price == 0) {
        courseTag = `<span class="course-tag essential">Essentials</span>`;
    }
    courseCardString += `<div class="col-md-12 col-lg-6 col-xl-4 tag"> <div class="card course-card shadow"> <div class="card-header d-flex flex-row"> <div class=" course-banner ${authorize.getCourseImage(course['ckey'])} "></div> </div> <div class="card-body"> <div class="d-flex justify-content-between"><h5 class="card-title course-title">${course.name}&nbsp;(${course["lang"]})</h5>${courseTag}</div><div class="course-rating d-flex flex-row">`;
    if (course["rating"] == 0) {
        courseCardString += "New";
    } else {
        courseCardString += `<div class="course-rating d-flex flex-row"><div class="star-ratings-css" data-rating='${course["rating"]}' data-max="5"><div class="star-ratings-css-top"><i class="five-stars"></i></div><div class="star-ratings-css-bottom"><i class="five-stars"></i></div></div><span class="rating-count">(${course["rating-count"]})</span></div>`;
    }
    courseCardString += `</div><ul class="list-unstyled course-highlights"> <li class="lesson-count">${course["lesson-count"]} Exclusive Lessons</li> <li class="course-duration">${course["duration"]} hrs</li> <li class="proficiency">${course["lang"]}</li> </ul>`;
    // if(type=="cart"){
    //  courseCardString +=`<div class="d-flex justify-content-end"> <a class="btn remove-cart pointer" data-course="${course['ckey']}"></a> </div>`;
    // }
    // else if(course.alreadyEnrolled){
    //  courseCardString +=`<div class="d-flex justify-content-end"> <p class="price-wrap">  <span class="price slashed"><s>${course["discount_price"]}</s></span> </p></div><div class="d-flex justify-content-between mt-4"><a class="btn btn-syllabus pointer" data-coursedetails="${course['ckey']}">Show syllabus</a>  <a class="btn btn-secondary text-white" diabled>Already Enrolled</a> </div> `;
    // }
    // else{
        let syllabusBtn="btn-syllabus";
        let freedomPage = $("main").hasClass("freedom");
        if(freedomPage){
        syllabusBtn="btn-secondary text-white ";

        }
        if(course["preview_url"]== undefined){
            courseCardString += `<div class="d-flex justify-content-end"></div><div class="d-flex justify-content-end mt-4"><a class="btn ${syllabusBtn}pointer show-syllabus" data-coursedetails="${course['ckey']}">Show syllabus</a></div> `;
        }else{
            courseCardString += `<div class="d-flex justify-content-end"></div><div class="d-flex justify-content-between mt-4"><button class="btn preview-btn pt-0 p-0 ml-n2 text-purple" id="preview" data-course="${course['ckey']}"  data-src="${course["preview_url"]}" aria-expanded="false" aria-controls="courseTopic1">&nbsp;&nbsp;Course Preview &nbsp;&nbsp;                                                    <picture>
            <source type="image/webp" data-srcset="images/webps/play.webp">
            <img data-src="images/minified/play.png" class="lazyload" alt="play">
        </picture></button><a class="btn ${syllabusBtn} pointer show-syllabus" data-coursedetails="${course['ckey']}">Show syllabus</a></div> `;
        }

    // }

    courseCardString += `</div> </div> </div>`;
    // return "";
    return courseCardString;
}

function calculateRating() {
    let stars = ".star-ratings-css";
    let starSetter = ".star-ratings-css-top";
    $(stars).each((idx, star) => {
        let rating = $(star).data("rating");
        let max = $(star).data("max");
        let width = `${(rating / max) * 100}%`;
        $(star)
            .find(starSetter)
            .css("width", width);
    });
}
// function getCourseLocal(){
//      let courses = JSON.parse(authorize.getSession("bundle"));
//      return courses!=null ? courses : [];
// }

function domCourseCatlogueChange(courses) {
    let id;
    for (i = 0; i < courses.length; i++) {
        id = $("[data-course=" + courses[i] + "]");
        id.removeClass("add-to-cart");
        id.addClass("remove-cart");
    }
}

function changeCourseLocal(course, action) {
    let selctedCourses = getCourseLocal();
    if (action == "add") {
        selctedCourses = selctedCourses.concat(course.filter((item) => selctedCourses.indexOf(item) < 0));
    } else if (action == "remove") {
        selctedCourses = selctedCourses.filter(x => !course.includes(x))
    }
    authorize.setSession("bundle", selctedCourses = JSON.stringify(selctedCourses));
    domCourseCartChange(JSON.parse(selctedCourses));
    updatePrice();
}

function changeCourseServer(course, action) {
    let req = {};
    req["courses"] = course;
    req["requestType"] = action;
    if (authorize.getSession("signInAuth") != null) {
        req["tempauth"] = authorize.getSession("signInAuth");
    }
    authorize.ajax(req, "myBundle", function(data) {
        data = JSON.parse(data);
        if (data.status == true) {
            authorize.setSession("bundle", data.courses);
            domCourseCartChange(JSON.parse(data.courses));
            domCourseCatlogueChange(JSON.parse(data.courses));
            updatePrice();
        }
    });
}

function cartFull(size) {
    if (size > 9) {
        $(".add-to-cart").each(function() {
            $(this).removeClass("pointer");
            $(this).addClass("not-allowed");
        });
    }
}
// function changeCourseOnLoad(completionCallback){
//      if(authorize.getSession("authToken")!=null ||authorize.getSession("signInAuth")!=null){
//              let req = {};
//      req["courses"] = [];
//      req["requestType"] = "onload";
//      req["action"] = getCourseLocal().length > 0 ? "set" : "get";
//      if(authorize.getSession("signInAuth")!=null){
//              req["tempauth"] = authorize.getSession("signInAuth");
//      }
//    authorize.ajax(req,"myBundle",function(data){
//         data = JSON.parse(data);
//         if(data.status==true){
//              let courses = data.size ? data.courses : JSON.stringify([]);
//              authorize.setSession("bundle",data.courses);
//              courses = JSON.parse(courses);
//              domCourseCatlogueChange(courses);
//              domCourseCartChange(courses);
//              cartFull(data.size);
//              updatePrice();
//              if(completionCallback){
//                      completionCallback();
//              }
//         }
//    });

//      }else{
//              let courses = getCourseLocal();
//              domCourseCatlogueChange(courses);
//              domCourseCartChange(courses);
//              cartFull(courses.length);
//              updatePrice();
//      }
// }
function changeCourse(course, action) {
    let size = getCourseLocal().length;
    if (size > 8) {
        if (action == "add") {
            if (size > 9) {
                return false;
            }
            $(".add-to-cart").each(function() {
                $(this).removeClass("pointer");
                $(this).addClass("not-allowed");
            });
            $("[data-course=" + course[0] + "]").addClass("pointer");
            $("[data-course=" + course[0] + "]").removeClass("not-allowed");

        } else if (action == "remove") {
            $(".add-to-cart").each(function() {
                $(this).addClass("pointer");
                $(this).removeClass("not-allowed");
            });
        }
    }
    if (authorize.getSession("authToken") != null || authorize.getSession("signInAuth") != null) {
        changeCourseServer(course, action);
    } else {
        changeCourseLocal(course, action);
    }
    updatePrice();
    return true;
}

function updatePrice() {
    try {
        let updatedPrice = 0;
        let courseList = getCourseLocal();
        for (let itr = 0; itr < courseList.length; itr++) {
            let courseId = courseList[itr];
            updatedPrice += allPaidCourses[courseId]["price"];
        }
        $("#actualPrice").html("Rs." + updatedPrice);
    } catch (error) {

    }
}

function createPageNumber(totalPage, firstElem) {
    $(".page-number").each(function() {
        $(this).addClass("hide");
    });
    if (totalPage != 0) {
        let pageId = "#page-1";
        let previousPages = ((firstElem - 1) / 9);
        let nextPages = ((firstElem - 1) / 9) + 2;
        if(previousPages <= 0){
            previousPages = 1;
            nextPages = 3;
        }
        if(nextPages >= totalPage){
            nextPages = totalPage;
        }
        for (let j = previousPages; j <= nextPages; j++) {
            pageId = "#page-" + j;
            $(pageId).removeClass("hide");
            $(pageId).removeClass("pagination-disable");
            $(pageId).addClass("pagination-disable");
        }
        if (firstElem == 1) {
            $(".page-number").each(function() {
                $(this).removeClass("active");
            });
            $("#page-1").addClass("active");
        } else {
            $("#page-" + (((firstElem - 1) / 9) + 2)).addClass("active");
            // goToPage(((firstElem-1)/9)+2);
        }
    }
}



function goToPage(page) {
    let firstElem = 1;
    if (page != 1) {
        firstElem = ((page - 1) * 9) + 1;
    }
    coursesList.show(firstElem, 9);
    $(".page-number").each(function() {
        $(this).removeClass("active");
    });
    $("#page-" + page).addClass("active");
}
$(document).on("click", "#pagination-next", function() {
    if (!($(this).hasClass("pagination-disable"))) {
        $(".pagination .active")
            .next()
            .trigger("click");
        goToPage($(".page-number.active").data("page") + 1);
        domCourseCatlogueChange(getCourseLocal());
    }
});

$(document).on("click", "#pagination-prev", function() {
    if (!($(this).hasClass("pagination-disable"))) {
        $(".pagination .active")
            .prev()
            .trigger("click");
        let prevPage = $(".page-number.active").data("page") - 1
        goToPage(prevPage);
        if (prevPage == 0) {
            $("#page-1").addClass("active");
            $("#pagination-prev").addClass("pagination-disable");
        }
        domCourseCatlogueChange(getCourseLocal());
    }
});

function renderCourseDetail(data, key) {
    var arrayBeginner = [],
        arrayIntermediate = [],
        arrayAdvanced = [],
        arrayExpert = [];
    console.log(data);
    for (var i = 1; i < data.length; i++) {
        if (data[i][1] == "l1") arrayBeginner += "<li><a>" + data[i][0] + "</a></li>";
        if (data[i][1] == "l2") arrayIntermediate += "<li><a>" + data[i][0] + "</a></li>";
        if (data[i][1] == "l3") arrayAdvanced += "<li><a>" + data[i][0] + "</a></li>";
        if (data[i][1] == "l4") arrayExpert += "<li><a>" + data[i][0] + "</a></li>";
    }
    let datas = arrayBeginner + arrayIntermediate + arrayAdvanced + arrayExpert;
    html = '<div id="courseTopic2" class="course-topic-details collapse show" data-parent="#course-pack-structure" style=""><div class="row"><div class="col"><ul class="list-unstyled stepper scrolly syllabusData">' + datas + '</ul></div></div></div>';
    // console.log(html);
    // $(key+"_lesson_count").html(data.length-1+" Exclusive Lessons");
    // console.log(key);

    $(".syllabus-content").html(html);
    $("#course-syllabus").html("Syllabus - " + allPaidCourses[key]["name"]);
    $("#syllabus-modal").modal("show");
}
$(document).on('click', ".show-syllabus", function(e) {
    let key = $(this).data("coursedetails");
    showSyllabus(key);
});

function showSyllabus(key) {
    let requestData = { type: "coursePack", courseId: [key] };
    authorize.ajax(requestData, "coursePack", function(data) {

        data = JSON.parse(data);
        // console.log(data["java_en"]);
        // for(var i=0;i<courses.length;i++){
        renderCourseDetail(data[key], key);
        // }
    });

}
// $('.dropdown-toggle').click(function(e) {
//     e.preventDefault();
//     $('.dropdown-toggle').dropdown();
// });
// $(document).on("click", ".dropdown-menu a", function(e) {
//     console.log("hi");
//     e.preventDefault();
// });

$(document).on("click", "#handlePayment", function() {
    if (authorize.getSession("authToken") || $("#userEmail").data("registeredHash")) {
        $("#bundlePayment").trigger("click");
    } else {
        $("#ssoModal").modal("show");
    }
    // $("#bundlePayment").trigger("click");
    // if(!$("#userEmail").data("allFieldValidated")){
    //  $("#ssoModal").modal("show");
    // }
});

$("#viewSyllabusBtn p").click(function(e) {
    e.preventDefault();
    $("#viewSyllabusBtn p").toggleClass('d-none');
});
$("#viewAboutBtn p").click(function(e) {
    e.preventDefault();
    $("#viewAboutBtn p").toggleClass('d-none');
});

$(document).on("click", ".pagination-prev", function(e) {
    e.preventDefault();
});
$(document).on("click", ".page-number", function(e) {
    e.preventDefault();
    let selectedPage = $(this).data("page");
    goToPage(selectedPage);
});


$(document).on("click", "a.scrollLink", function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
});

$(document).on('hidden.bs.modal', "#notificationModal", function() {
    $("html, body").animate({ scrollTop: $("#paid-course-list").offset().top }, 500);
})

$(document).on("click", "#autoSelect", function() {
    console.log("log");
});

/* ===== Logic for creating fake Select Boxes ===== */
$(document).ready(function() {
    $('.sel').each(function() {
        $(this).children('select').css('display', 'none');

        var $current = $(this);

        $(this).find('option').each(function(i) {
            if (i == 0) {
                $current.prepend($('<div>', {
                    class: $current.attr('class').replace(/sel/g, 'sel__box')
                }));

                var placeholder = $(this).text();
                $current.prepend($('<span>', {
                    class: $current.attr('class').replace(/sel/g, 'sel__placeholder text-purple'),
                    text: placeholder,
                    'data-placeholder': placeholder
                }));

                return;
            }

            $current.children('div').append($('<span>', {
                class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
                text: $(this).text()
            }));
        });
    });

    $(document).click(function(e) {
        if ($(e.target).parents(".sel ").length > 1) {
            console.log($(e.target).parents(".sel"));
            $(".sel.active").removeClass("active");
        }
    });

    // Toggling the `.active` state on the `.sel`.
    $('.sel').click(function() {
        // $(this).addClass('active');
    });

    // Toggling the `.selected` state on the options.
    $('.sel__box__options').click(function() {
        var txt = $(this).text();
        var index = $(this).index();

        $(this).siblings('.sel__box__options').removeClass('selected');
        $(this).addClass('selected');
        // $("#langFilter").val(txt);
        var $currentSel = $(this).closest('.sel');
        $(".sel.active").removeClass("active");
        $currentSel.children('.sel__placeholder').text(txt);
        $currentSel.children('select').prop('selectedIndex', index + 1);
        $("#langFilter").trigger("change");

    });

    $(document).on("click", function(evt) {
        if ($(evt.target).is('.sel')) {
            if ($('#activeSelect').hasClass("active")) {
                $(".sel").removeClass('active');
            } else {
                $(".sel").addClass('active');
            }
        } else {
            $(".sel").removeClass('active');
        }
    })
})

$(document).on("click", "#applyOffer", function(e) {
    e.preventDefault();
    let requestData = {};
    let courseName = $("#bundlePayment").data("course");
    if(courseName == undefined){
        courseName = $("#bundlePaymentInternational").data("course");
    }
    let auth = authorize.getSession("authToken");
    if (auth == null) {
        let bundleObj = new CourseBundle();
        bundleObj.validateField("#userEmail");
        if (!($("#userEmail").hasClass("is-invalid"))) {
            requestData["email"] = $("#userEmail").val();
        } else {
            return false;
        }
    }
    requestData["type"] = "offerCode";
    requestData["courseName"] = courseName;
    requestData["offerCode"] = $("#referralCode").val();
    if ($("#applyOffer").hasClass("remove")) {
        requestData["requestType"] = "remove";
        authorize.ajax(requestData, "discount_check", function(responseData) {
            $(".result-message").html("");
            $("#discountedPrice").html("");
            $("#discountedPrice").removeClass("price");
            $("#paymentPrice, .actualPrice").removeClass("strikeout");
            $("#referralCode").val("");
            $("#applyOffer").removeClass("remove");
            $("#applyOffer").addClass("apply");

            //new
            $(".discountedPrice").html("");
            $(".discountedPrice").prop("hidden", true);

        });
        return false;
    }
    if (!requestData["offerCode"]) {
        
    } else {
        authorize.ajax(requestData, "discount_check", function(responseData) {
            responseData = JSON.parse(responseData);
            // console.log(responseData.countryCode);
            let priceClass;
            let priceData = '';
            let priceDataSuffix = ''
            if(responseData.country_code == 'IN'){
                 priceClass="price"
            }
            else{
                 priceClass=""
                 priceData= "$"
                 priceDataSuffix = '(USD)'
            }
            if (responseData.offer_status == "expired") {
                $(".result-message").html("<span class='text-danger'>Invalid or Expired coupon</span>");
                $("#discountedPrice").html("");
                $("#discountedPrice").removeClass("price");
                $("#paymentPrice, .actualPrice").removeClass("strikeout");
                $("#applyOffer").removeClass("remove");
                $("#applyOffer").addClass("apply");

                //new
                $(".discountedPrice").html("");
                $(".discountedPrice").prop("hidden", true);
            } else {
                let res1 = "";
                res1 += `<i class="fa fa-inr">`+ responseData.remaining_amount + '<i>';
                $(".result-message").html(`<span class="text-primary"><span>Congratulations! You have been given </span><span class='${priceClass} text-primary'>${priceData}` + responseData.offer_price + ` Off</span></span>`);
                $("#discountedPrice").html(res1);
                $("#discountedPrice").addClass("price");
                $("#paymentPrice, .actualPrice").addClass("strikeout");
                $("#applyOffer").removeClass("apply");
                $("#applyOffer").addClass("remove");

                //new
                $(".discountedPrice").html(priceData+" "+responseData.remaining_amount);
                $(".discountedPrice").prop("hidden", false);
            }

            if ($("#bundlePayment").hasClass("hide")) {
                replaceDummy();
                $("#bundlePayment").trigger("click");


            }
        });

    }
});
$(document).on("click", "#preview", function(data) {
    if(authorize.getSession("jboxLoadedPremium") != "true"){
		$("head").append(`<link defer href="js/library/jBox.all.min.css" rel="stylesheet"><script  src="js/library/jBox.all.min.js"></script>`);
		authorize.setSession("jboxLoadedPremium","true");
		console.log("loaded")
	}
	if(authorize.getSession("plyrLoadedPremium") != "true"){
		$("head").append(`<link rel="stylesheet" href="library/plyr/plyr.css">
		<link rel="stylesheet" href="css/plyrfix.css">`);
		$("body").append(`<script  src="library/plyr/plyr.polyfilled.js" ></script>`);
		authorize.setSession("plyrLoadedPremium","true");
	}
    let content = '<div class="embed-responsive embed-responsive-16by9 video-wrap"><video class="embed-responsive-item" id="sampleVideo"></video></div>';
    let width = "100%";
    if (window.innerWidth > 500) {
        width = "50%";
    }
    let video = $(this).data("src");
    var myModal = new jBox('Modal', {
        content: content,
        width: width,
        onCreated: function() {
            const customPlayer = new Plyr("#sampleVideo");
            window.customPlayer = customPlayer;
            let courseObj = new CourseBundle();
            renderCustomVideo("", video);
            $(".video-wrap").css("margin", 0);
            $(".jBox-content").css("padding", 0);
        },
        onCloseComplete: function() {
            customPlayer.pause();
        }
    });

    myModal.open();
});

function renderCustomVideo(selector, source) {
    try {
        let videoExtention = "mp4";
        customPlayer.source = {
            type: 'video',
            sources: [{
                src: source,
                provider: 'youtube',
            }],
        };
        customPlayer.play();
        $(".plyr--full-ui").addClass("embed-responsive-item");
        $(".plyr__video-wrapper").addClass("embed-responsive-item");
        $("video").addClass("embed-responsive-item");
    } catch (error) {
        // console.log(error);
    }

}

$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        $(".course-drop").dropdown('hide')

    }
});

$(document).on('click', "#callbackBtn", function(){
    let data = {};
        let search = new URLSearchParams(document.location.search.substring(1));

    data["name"] = validate("#name",1, /^[a-zA-Z. ]+$/);
    data["mobile"] = validate("#phno",8, /[0-9 -()+]{10}$/, 15);
    data["course"] = "anniversarySubscriptionYearly";
    data["type"]="insert_contact";
    data["url"]=window.location.href;
        data["campaign"]= search.get("campaign")?search.get("campaign"):"";
        data["medium"]= search.get("medium")?search.get("medium"):"";
        data["source"]= search.get("source")?search.get("source"):"";
    // let verififed=$("#name").data("verified");
    if(data["name"] && data["mobile"]){
        authorize.ajax(data, "courseCallback", function(response){
            response=JSON.parse(response);
            if(response["status"]=="success"){
                $("#callbackBtn").attr("hidden",true);
                $("#successMsg").html(`<div class="alert alert-primary" role="alert">Your request for callback has been submitted successfully!</div>`);
            }
        })
    }
});

function validate(id, length, regex = false, maxLength = false) {
    let element = $(id);
    let value = element.val();
    let status;
    if (maxLength && value.length > maxLength) {
        element.addClass("is-invalid");
        status = $("#name").data("verified");
        if (status) {
            $("#name").data("verified", false);
        }
        return false;
    }
    // console.log(value.length >= length);
    if (value) {
        if (value.length >= length) {
            if (regex) {
                if (regex.test(value)) {
                    return value;
                } else {
                    element.addClass("is-invalid");
                    status = $("#name").data("verified");
                    if (status) {
                        $("#name").data("verified", false);
                    }
                    return false;
                }
            } else {
                return value;
            }
        } else {
            element.addClass("is-invalid");
            status = $("#name").data("verified");
            if (status) {
                $("#name").data("verified", false);
            }
            return false;
        }
    } else {
        element.addClass("is-invalid");
        status = $("#name").data("verified");
        if (status) {
            $("#name").data("verified", false);
        }
        return false;
    }
}
$(document).on("click",".dummy",function(){
    if(authorize.getSession("plyrLoadedPremium") != "true"){
        $("head").append(`<link rel="stylesheet" href="library/plyr/plyr.css">
        <link rel="stylesheet" href="css/plyrfix.css">`);
        $("body").append(`<script  src="library/plyr/plyr.polyfilled.js" ></script>`);
        authorize.setSession("plyrLoadedPremium","true");
    }
    let obj = new CourseBundle();

    const player = new Plyr("#course-video");
    window.player = player;
    $("#videoId").show();
    $(".dummy").hide();
    obj.renderVideo();
})