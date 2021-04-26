class CourseBuy{

	renderPreview(data,international){
		this.renderVideo(data);
		this.renderDetails(data,international);
		this.renderLessonDetails(data);
	}

	// renderVideo(data){
	// 	try{
	// 		let source = 'https://d11kzy43d5zaui.cloudfront.net';
	// 		let videoExtention = "";
	// 		if(data[0].videoURL[0] != ""){
	// 			source += data[0].videoURL[0];
	// 			videoExtention = data[0].videoURL[0].substr(data[0].videoURL[0].lastIndexOf(".")+1);
	// 		}
	// 		else{
	// 			source += data[0].videoURL[1];
	// 			videoExtention = data[0].videoURL[1].substr(data[0].videoURL[1].lastIndexOf(".")+1);
	// 		}
	// 		const appleVideo = document.querySelector('#course-video');
	// 		if (appleVideo.canPlayType('application/vnd.apple.mpegurl')) {
	// 			appleVideo.src = source;
	// 			appleVideo.addEventListener('loadedmetadata', function() {
	// 			});
	// 		}
	// 		else if(videoExtention == "m3u8"){
	// 			const video = document.querySelector('#course-video');
	// 			const player = new Plyr(video);
	// 			window.player = player;
	// 			const hls = new Hls();
	// 			hls.loadSource(source);
	// 			hls.attachMedia(video);
	// 			window.hls = hls;
	// 		}
	// 		else{
	// 			player.source = {
	// 				type: 'video',
	// 				title: data[0].topic,
	// 				sources : [{
	// 					src : source,
	// 					type : 'video/' + videoExtention
	// 				}]
	// 			};
	// 			player.play();
	// 		}
	// 		$(".plyr--full-ui").addClass("embed-responsive-item");
	// 		$(".plyr__video-wrapper").addClass("embed-responsive-item");
	// 		$("video").addClass("embed-responsive-item");
	// 	}
	// 	catch(error){
	// 		console.log(error);
	// 	}
	// }
		renderVideo(data){
		try{
			let videoWrap = $(".video-wrap");
			let summaryTabId = $("#video-summary-tab");
			summaryTabId.data("playerState", false);
			videoWrap.removeData();
			videoWrap.data("seekedTime", 0);
			videoWrap.data("currentTime", 0);
			videoWrap.data("videoActivity", false);
			let source = 'https://d11kzy43d5zaui.cloudfront.net';
			let videoExtention = "";
			if(data[0].videoURL[0] != ""){
				source += data[0].videoURL[0];
				videoExtention = data[0].videoURL[0].substr(data[0].videoURL[0].lastIndexOf(".")+1);
			}
			else{
				source += data[0].videoURL[1];
				videoExtention = data[0].videoURL[1].substr(data[0].videoURL[1].lastIndexOf(".")+1);
			}
			let youtubeVideo = false;
			let youtubeSource = "";
			if((youtubeSource = data[0].videoURL[0] ? data[0].videoURL[0] : data[0].videoURL[1]) && youtubeSource.includes("www.youtube.com")){
				youtubeVideo = true;
			}
			//const source = "../../MVI_8509.MOV";
			let appleVideo = document.querySelector('#course-video');
			if (!youtubeVideo && appleVideo && appleVideo.canPlayType('application/vnd.apple.mpegurl')) {
				appleVideo.src = source;
				appleVideo.addEventListener('loadedmetadata', function() {
					summaryTabId.data("playerState", true);
				});
			}
			else if(youtubeVideo){
				player.source = {
		        	type: 'video',
			        sources: [{
			        	src: youtubeSource.slice(youtubeSource.indexOf("watch?v=")+8),
			        	provider: 'youtube',
			        }]
				};
				player.ratio = "21:9"
			}
			else if(videoExtention == "m3u8"){
				const video = document.querySelector('#course-video');
				const player = new Plyr(video);
				window.player = player;
				const hls = new Hls();
				hls.loadSource(source);
				hls.attachMedia(video);
				window.hls = hls;	
				summaryTabId.data("playerState", true);
			}
			else{
				player.source = {
					type: 'video',
					title: data[0].topic,
					sources : [{
						src : source,
						type : 'video/' + videoExtention
					}]
				};
			}
			$(".plyr--full-ui").addClass("embed-responsive-item");
			$(".plyr__video-wrapper").addClass("embed-responsive-item");
			$("video").addClass("embed-responsive-item");
			player.on("ready", function(){
				summaryTabId.data("playerState", true);
			});

			
		}
		catch(error){
			// console.log(error);
		}
	}


	renderDetails(data,international){
		try{
			let courseDetails = JSON.parse(data[0].course_details);
			let courseName = courseDetails.course_name;
			$("#cname").html(courseName);
			let courseLength = data.length-2;
			let rating = 0;
			let ratingBlock = "";
			let search = new URLSearchParams(document.location.search.substring(1));
			let courseId = search.get("course");
			authorize.setSession(courseId + "_pricePoints", courseDetails.pricePoints);
			if(courseDetails.rating && courseDetails.rating_count){
				rating = courseDetails.rating.toFixed(1);
				let ratingCount = courseDetails.rating_count;
				ratingBlock = '<li><div class="course-rating d-flex flex-row"><div class="star-ratings-css" data-rating="'+ rating +'" data-max="5"><div class="star-ratings-css-top"><i class="five-stars"></i></div><div class="star-ratings-css-bottom"><i class="five-stars"></i></div></div><span class="rating-count">( '+ ratingCount +' )</span></div></li>';
			}
			else{
				let ratingCount = "New";
				ratingBlock = '<li><div class="course-rating d-flex flex-row"><span class="rating_count">' + ratingCount + '</span></div></li>';
			}
			let ratingCount = courseDetails.rating_count;
			let price = courseDetails.price;
			let discountedPrice = this.calculateDiscount(courseDetails.price, courseDetails.discount);
			let priceString = '<p class="price-wrap">';
			if(price > discountedPrice){
				priceString += '<span class="price slashed"><s>'+ price +'</s></span>';
			}
			priceString += '<span id="offerPrice" class="price">'+ discountedPrice +'</span></p>';
			if(international){
				discountedPrice = courseDetails.international_price;
				priceString = '<p class="price-wrap"><span id="offerPrice" class="usd-price">'+ discountedPrice +'</span></p>';
				$('.price').addClass("usd-price").removeClass("price");
			}
			let detailsData = '<div><h2>'+ courseName +' course</h2><p>Learn '+ courseName +' like a Professional !</p><ul class="list-unstyled course-hightlights"><li>'+ courseLength +'+ Exclusive Lesson from top Industry Experts</li>' + ratingBlock + '<li>Online learning + Gamified Practice Platform</li><li>Dedicated chat and forum support to clear doubts at any point of time</li></ul></div><div><div class="d-flex justify-content-end"><a href="#" id="buynow2"  class="btn btn-primary paynow" data-toggle="modal">Enroll</a></div><div class="d-flex justify-content-between"><a href="#course-detail-structure" class="btn pl-0 more-details">Course details</a>'+priceString+'</div></div>';
			$("#course-details").html(detailsData);
			this.setRating();
			let whyBlock = '<h2>WHY</h2><p>'+ courseName +' developer is one of the top most in demand job and fast-growing career paths.</p><ul class="list-unstyled course-outcomes"><li class="earnings"><strong>5-10</strong> Lakhs per year</li><li class="hike"><strong>35 %</strong> Average Salary Hike.</li><li class="new-jobs"><strong>23,000 new jobs</strong> being posted online every month</li></ul>';
			$(".why-course").html(whyBlock);
			let exclusiveData = '<h2>EXCLUSIVE LESSONS</h2>';//<div class="exclusive-lesson"><span class="icon-exclusive-lesson"></span><div class="d-flex flex-column justify-content-between"><p>students give an average rating of '+ rating +' out of 5 stars.</p><p><strong>100% SATISFACTION GUARANTEED. 7-DAY MONEY BACK GUARANTEE.</strong></p></div></div>';
			$(".exclusive-lesson-wrap").html(exclusiveData);
		}
		catch(error){
			console.log(error);
		}
	}

	renderLessonDetails(data){
		let beginnerLength = 0;
		let intermediateLength = 0;
		let advancedLength = 0;
		let expertLength = 0;
		let beginnerAssignmentLength = 0;
		let intermediateAssignmentLength = 0;
		let advancedAssignmentLength = 0;
		let expertAssignmentLength = 0;
		let sublessonData = '';
		let beginnerData = '<div id="courseTopic1" class="course-topic-details collapse show" data-parent="#course-detail-structure"><div class="row"><div class="col"><ul class="list-unstyled stepper">';
		let intermediateData = '<div id="courseTopic2" class="course-topic-details collapse" data-parent="#course-detail-structure"><div class="row"><div class="col"><ul class="list-unstyled stepper">';
		let advancedData = '<div id="courseTopic3" class="course-topic-details collapse" data-parent="#course-detail-structure"><div class="row"><div class="col"><ul class="list-unstyled stepper">';
		let expertData = '<div id="courseTopic4" class="course-topic-details collapse" data-parent="#course-detail-structure"><div class="row"><div class="col"><ul class="list-unstyled stepper">';
		for(let itr = 1; itr < data.length; itr++){
			if(data[itr].level == "l1"){
				beginnerData += '<li><a>' + data[itr].topic + '</a></li>';
				beginnerLength++;
				if(data[itr].type == "assignment"){
					beginnerAssignmentLength++;
				}
			}
			else if(data[itr].level == "l2"){
				intermediateData += '<li><a>' + data[itr].topic + '</a></li>';
				intermediateLength++;
				if(data[itr].type == "assignment"){
					intermediateAssignmentLength++;
				}
			}
			else if(data[itr].level == "l3"){
				advancedData += '<li><a>' + data[itr].topic + '</a></li>';
				advancedLength++;
				if(data[itr].type == "assignment"){
					advancedAssignmentLength++;
				}
			}
			else if(data[itr].level == "l4"){
				expertData += '<li><a>' + data[itr].topic + '</a></li>';
				expertLength++;
				if(data[itr].type == "assignment"){
					expertAssignmentLength++;
				}
			}
		}
		let beginnerDisplay,intermediateDisplay,advancedDisplay,expertDisplay;
		if(beginnerAssignmentLength == 0 && beginnerLength == 0) beginnerDisplay="hide";
		if(intermediateAssignmentLength == 0 && intermediateLength == 0) intermediateDisplay="hide";
		if(advancedAssignmentLength == 0 && advancedLength == 0) advancedDisplay="hide";
		if(expertAssignmentLength == 0 && expertLength == 0) expertDisplay="hide";

		let endDiv = '</ul></div></div></div></div>';
		sublessonData += this.getLevelCard(beginnerLength, beginnerAssignmentLength, "l1",beginnerDisplay) + beginnerData + endDiv + this.getLevelCard(intermediateLength, intermediateAssignmentLength, "l2",intermediateDisplay) + intermediateData + endDiv + this.getLevelCard(advancedLength, advancedAssignmentLength, "l3",advancedDisplay) + advancedData + endDiv + this.getLevelCard(expertLength, expertAssignmentLength, "l4",expertDisplay) + expertData + endDiv;
		$("#course-detail-structure").html(sublessonData);
		
	}

	getLevelCard(levelLength, assignmentLength, level,display=""){
		let levelNumber = "";
		let levelName = "";
		let hours = Math.floor(levelLength * 0.75);
		let quizLength = levelLength - assignmentLength;
		if(level == "l1"){
			levelName = "Beginner Module";
			levelNumber = 1;
		}
		else if(level == "l2"){
			levelName = "Intermediate Module";
			levelNumber = 2;
		}
		else if(level == "l3"){
			levelName = "Advanced Module";
			levelNumber = 3;
		}
		else if(level == "l4"){
			levelName = "Expert Module";
			levelNumber = 4;
		}
		return '<div class="course-topic '+display+'"><div class="row"><div class="col-md-12 col-lg-4"><div class="course-info"><span>'+ levelName +'</span></div></div><div class="col-md-12 col-lg-8"><ul class="list-unstyled related-facts"><li><strong>'+ (assignmentLength*3) +'</strong> assignments</li><li><span><strong>'+ quizLength +'</strong> quizzes</span><button class="btn accordion-trigger" data-toggle="collapse" data-target="#courseTopic'+ levelNumber +'" aria-expanded="true" aria-controls="courseTopic'+ levelNumber +'"></button></li></ul></div></div>';
	}

	calculateDiscount(price, discountPercentage){
		return Math.round(price - (price/100)*discountPercentage);
	}

	setRating(){
		const stars = '.star-ratings-css';
		const starSetter = '.star-ratings-css-top';
		$(stars).each((idx, star) => {
			const rating = $(star).data('rating');
			const max = $(star).data('max');
			const width = `${(rating / max) * 100}%`;
			$(star).find(starSetter).css('width', width);
		});
	}
}

const sidebar = (function sidebar() {
	const menuList = '#sidebar';
	const toggleicon = '#sidebarToggle .material-icons';
	const collapseClass = 'sidebar-collapse';
	const activeClass = 'active';
	const EventMenuOpened = 'shown.bs.collapse';
	const EventMenuClosed = 'hidden.bs.collapse';

	function handleMobileUI() {
		$(menuList).on(EventMenuClosed, () => $(toggleicon).html('menu'));

		$(menuList).on(EventMenuOpened, () => $(toggleicon).html('close'));
	}

	function toggleSidebar() {
		$(menuList).hover(() => $(menuList).toggleClass(collapseClass));
	}

const init = () => {
	handleMobileUI();
	toggleSidebar();
};

return { init };
}());

const coursesProductPage = (function coursesProductPage() {
	const pageEl = '#courses-product-page';

	const isFunction = functionToCheck => (functionToCheck && {}.toString.call(functionToCheck) === '[object Function]');

	const finishLoading = (pageEl, cb) => {
		$('.spinner').hide();
		$(pageEl).removeClass('loading');
		return isFunction(cb) ? cb() : false;
	};

	const init = () => {
		const thisPage = ($(pageEl).length !== 0);

		if (!thisPage) {
			return;
		}

		sidebar.init();
    //setStarRating();
    finishLoading(pageEl);
};

return {
	init,
};

}());
var applyCoupon = 0;
$(document).ready(function(){


	// $("#loginModal").on('shown.bs.modal', function() {
	// 	console.log('login shown')
    //     clearTimeout(modalTimer);
	// });
	$(document).on('shown.bs.modal', function() {
		// console.log('login shown')
		clearTimeout(modalTimer);
	});
	authorize.loginCheck();
	coursesProductPage.init();
	bindingGoogleInputs();
	let obj = new CourseBuy();
	const player = new Plyr("#course-video");
	window.player = player;
	let search = new URLSearchParams(document.location.search.substring(1));
	let courseId = search.get("course");
	var freeCourses = ["python_hi", "rpa_english", "pygame_english"];
	if(!freeCourses.includes(courseId)){
		var modalTimer = setTimeout(function() {
			$("#advisorModal").modal("show");
		}, 15000);
	}
	//let authToken = "murugaauth"; //need to be from the session
	if(courseId){
		if(courseId == "introduction-to-ml"){
			$(".offerBlock").remove();
		}
		let input = {type : "preview", courseId : courseId};
		authorize.ajax(input, "courseContent", function(data){

			data = JSON.parse(data);
			international = data["international"];
			data = JSON.parse(data["data"]);
			if(data["metaData"]){
				$("title").html("GUVI | "+data["metaData"]["title"]);
				$("head").append(`<meta name="description" content="`+data["metaData"]["description"]+`">`);
			}
			$("#paymentbtn").data("departPass",data.defaultData);

			if(!data){
				window.location.href = "courses-video.html?course=" + courseId;
			}
			else if(data == "invalid" || data.status == "error"){
				window.location.href = "courses.html"
			}
			else if(data){
				obj.renderPreview(data.previewData,international);
			}
		});	
	}
	else{
		window.location.href = "courses.html";
	}
	var userType = 2;
	if (authorize.getSession("authToken") == null) {
		$("#emailInput").on('focusout',function() {
			let email = validate("#emailInput","mobile");
			if (email) {
				authorize.ajax({ requestType: "mail_check",email: email }, "registerCheck", function(response) {

					userType = JSON.parse(response)["user"];
					$("#passField").css("display","block");
					if(!userType){
						$("#confirmPassField").css("display","block");
					}
				});
			}
		});
	}else{
		let obj = {}

		authorize.ajax({ requestType: "loggedIn"}, "registerCheck", function(response) {
			response = JSON.parse(response);
			$("#paymentbtn").data("profileData",response); //Dont Remove
			authorize.setSession("email",response["email"]);
			authorize.setSession("mobile",response["mobile"]);
			if(response["passedoutyear"] != "-select-" && response["passedoutyear"]){
				authorize.setSession("passedoutyear",response["passedoutyear"]);
			}
			if(response["department"] != "-select-" && response["department"]){
				authorize.setSession("department",response["department"]);
			}
			/*
			let email = JSON.parse(response)["email"];
			let name = JSON.parse(response)["name"];*/
			$("#emailInput").val(response["email"]);
			$("#emailInput").attr("disabled","true");
			$("#name").val(response["firstName"]);
			// $("#name").attr("disabled","true");

		});
	}

});

$(document).on("click", "#try-codekata", function(data){
	window.location.href = "code-kata.html";
});

$(document).on("change", "#emailInput", function(data){
	$("#passField").css("display","none");
	$("#confirmPassField").css("display","none");
});

$(document).on("click", "#applyCoupon", function(data){
	applyCoupon = $("#applyCoupon").hasClass("apply");
	if(applyCoupon){
		$("#applyCoupon").removeClass("apply");
		$("#applyCoupon").addClass("remove");
	}else{
		$("#applyCoupon").removeClass("remove");
		$("#applyCoupon").addClass("apply");
	}
});

$(document).on("click", "#covid-info", function(){
	covidModal();
});

$(document).on("click", "#btn1", function(){
	$("#covid_modal").modal("hide");
    askLater();
});

$(document).on("click", "#btn2", function(){
	$("#covid_modal").modal("hide");
    neverAsk();
});

function neverAsk() {
    localStorage.setItem("dontAsk","true");
}

function askLater() {
  var d = new Date();
  d.setTime(d.getTime() + (86400000)); //set the time to 24 hours later
  var expires = "expires="+d.toUTCString();
  localStorage.setItem("modal_expiration",expires);
}

$(document).on('shown.bs.modal', "#notificationModal", function(){
	$("#productBuyModal").modal("hide");
	// console.log('login modal shown last')
});

$(document).on('hidden.bs.modal', "#notificationModal", function(){
	window.location.reload();
})

$(document).on('click', "#callbackBtn", function(){
	$("#name").data("verified", true);
	let search = new URLSearchParams(document.location.search.substring(1));
	let data={};
	data["name"] = validate("#name",1, /^[a-zA-Z. ]+$/);
	data["mobile"] = validate("#phno",8, /[0-9 -()+]{10}$/, 15);
	data["course"] = search.get("course");
	data["url"]=window.location.href;
	data["campaign"]= search.get("campaign")?search.get("campaign"):"";
	data["medium"]= search.get("medium")?search.get("medium"):"";
	data["source"]= search.get("source")?search.get("source"):"";
	data["type"]="insert_contact";
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
})


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