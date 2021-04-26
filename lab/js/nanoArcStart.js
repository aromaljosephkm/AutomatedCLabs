class NanoArcStart{

	validateFields(dataArray){
		let allFieldsValidated = true;
		let invalidFields = [];
		let validFields = [];
		try{
			for(let itr = 0; itr < dataArray.length; itr++){
				if(dataArray[itr].type == "email"){
					let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					allFieldsValidated =  (dataArray[itr].value !== "") && emailRegex.test(dataArray[itr].value);
					if(!allFieldsValidated){
						invalidFields.push(dataArray[itr].selector);
					}
					else{
						validFields.push(dataArray[itr].selector);
					}
				}
				else{
					if(dataArray[itr].value === ""){
						allFieldsValidated = false;
						invalidFields.push(dataArray[itr].selector);
					}
					else{
						validFields.push(dataArray[itr].selector);
					}
				}
			}
		}
		catch(error){
			// console.log(error);
		}
		this.renderErrors(invalidFields, validFields);
		return {status : allFieldsValidated, invalidFields : invalidFields};
	}

	renderErrors(invalidFields, validFields){
		try{
			for(let itr = 0; itr < invalidFields.length; itr++){
				$(invalidFields[itr]).addClass("is-invalid");
			}
			for(let itr = 0; itr < validFields.length; itr++){
				$(validFields[itr]).removeClass("is-invalid");
			}
		}
		catch(error){
			//handle error
		}
	}

	decideFlow(response){
		try{
			if(response.status == "success"){
				authorize.setSession("assessmentSession", response.assessmentSession);
				window.location.href = "nanoArcTest.html";
			}
			else if(response.status == "error"){
				this.renderNotificationSlider(response.message, false);
			}
			else{
				this.renderNotificationSlider("Oops..! we have faced some issues, please refresh the page and try again", false);
			}
		}
		catch(error){
			console.log(error);
		}
	}

	renderNotificationSlider(content, nature){
		try{
			new jBox('Notice', {
				content: content,
				showCountdown: true,
				delayOnHover: true,
				animation: "tada",
				offset: {
					y: 50
				},
				responsiveWidth: true,
				audio: "audio/notification/plucky"
			});
			if(!nature){
				$(".jBox-Notice .jBox-content").css({"background-color":"#ff4136","color":"#ffffff"});
			}
			else{
				$(".jBox-Notice .jBox-content").css({"background-color":"#09e176","color":"#ffffff"});
			}
		}
		catch(error){
			console.log(error);
		}
	}
}

$(document).ready(function(){
	$(".spinner").hide();
	$("#email").data("loggedIn", false);
	authorize.ajax({ requestType: "loggedIn"}, "registerCheck", function(response) {
        response = JSON.parse(response);
        if(response.email){
        	$("#email").data("loggedIn", true);
        	$(".notLogged").hide();
        }
        else{
        	$(".notLogged").show();
        }
    });
});

$(document).on("click", "#takeTestTop", function(){
	let obj = new NanoArcStart();
	if($("#email").data("loggedIn")){
		authorize.ajax({requestType: "generateToken"}, "nanoArc", function(response){
			response = JSON.parse(response);
			obj.decideFlow(response);
		});
	}
	else{
		$('html, body').animate({
	        scrollTop: $("#centerView").offset().top
	    }, 1000);
	}
});

$(document).on("click", "#takeTestCenter", function(){
	let obj = new NanoArcStart();
	let email = $("#email").val();
	let name = $("#name").val();
	if($("#email").data("loggedIn")){
		authorize.ajax({requestType: "generateToken"}, "nanoArc", function(response){
			response = JSON.parse(response);
			obj.decideFlow(response);
		});
	}
	else{
		let proceed = obj.validateFields([{type : "email", value : email, selector : "#email"}, {type : "text", value : name, selector : "#name"}]);
		if(proceed["status"]){
			authorize.ajax({requestType: "generateToken", emailId: email, name: name}, "nanoArc", function(response){
				response = JSON.parse(response);
				obj.decideFlow(response);
			});
		}
	}
});