authorize.loginCheck();var valid_mail=0;let valid_roll_number=0,collegeNameType="old",collegeList=[];var capchetoken;grecaptcha.ready(function(){grecaptcha.execute("6LdADb4UAAAAAA1feb36sozffPYRKKOqD9WPbibp",{action:"register"}).then(function(token){capchetoken=token;});});$("#emailInput").on("focusout",function(){existing_email();});$(function(){$('[data-toggle="popover"]').popover({trigger:'focus'});});$("body").on('click','#togglePassword',function(){$(this).toggleClass("fa-eye fa-eye-slash");var input=$("#passwordInput");input.attr('type')==='password'?input.attr('type','text'):input.attr('type','password')});function existing_email(){$("#emailgroup > .invalid-feedback").text("Please Enter a valid email-id");var email=authorize.validate("#emailInput","email");if(email){authorize.ajax({requestType:"mail_check",email:email},"registerCheck",function(response){userType=JSON.parse(response)["user"];if(userType==1){$("#emailgroup > .invalid-feedback").html("Email-id already Exist. <a href='sign-in.html'>Login here</a>");$("#emailInput").addClass("is-invalid");$("#emailInput").removeClass("is-valid");valid_mail=0;}else{$("#emailInput").addClass("is-valid");$("#emailInput").removeClass("is-invalid");valid_mail=1;}});}else{valid_mail=0;}}
function chkMail(){let rollNumber,collegeName;let Firstname=authorize.validate("#firstName","name");let Lastname=authorize.validate("#lastName","name");let email=$("#emailInput").val();let emailcheck=authorize.validate("#emailInput","email");let password=authorize.validate("#passwordInput","password");let phone=authorize.validate("#mobileNumberInput","mobile");if($("#studentcheck").is(":checked")){rollNumber=authorize.validate("#rollNumber","rollnum");collegeName=authorize.validate("#collegeName","college_name");}else{rollNumber="";college_name="";}
if(rollNumber){$("#rollNumber").addClass("is-valid");}else{$("#rollNumber").removeClass("is-valid");}
if(collegeName){$("#collegeName").addClass("is-valid");}else{$("#collegeName").removeClass("is-valid");}
existingCollegeName(collegeList);if($("#studentcheck").is(":checked")){if(Firstname&&valid_mail&&Lastname&&password&&phone&&rollNumber&&collegeName){registration(email,password,Firstname,Lastname,phone,collegeName,rollNumber,collegeNameType);}}else{if(Firstname&&valid_mail&&Lastname&&password&&phone){registration(email,password,Firstname,Lastname,phone,"","","");}}}
function registration(email,password,Firstname,Lastname,phone,collegeName,rollNumber,collegeNameType){"use strict";var url=window.location.href;var params=url.split("?");var refer=params[1];var reg_data={};if(refer){reg_data["refer"]=refer;}
reg_data["email"]=email;reg_data["password"]=password;reg_data["fname"]=Firstname;reg_data["lname"]=Lastname;reg_data["phone"]=phone;reg_data["college"]=collegeName;reg_data["roll_number"]=rollNumber;reg_data["college_name_type"]=collegeNameType;grecaptcha.execute("6LdADb4UAAAAAA1feb36sozffPYRKKOqD9WPbibp",{action:"register"}).then(function(token){capchetoken=token;});reg_data["capchetoken"]=capchetoken;var mentype="mentee";var usetype="video";authorize.ajax(reg_data,"mregister",async function(output){if(output=="robot"){return false;}
output=output.substring(1,output.length-1);var t=JSON.parse(output);if(authorize.getSession("lang")){$("#lang1").val(authorize.getSession("lang"));}
try{await Moengage.add_unique_user_id(email);await Moengage.add_email(email);await Moengage.add_mobile(phone);await Moengage.add_user_name(Firstname);await Moengage.track_event("Register");await tap('conversion',"register",0);}catch(e){console.log(e);}
window.location="status.html?register=true";});}
$(document).ready(function(){});$("#mobileNumberInput").on("keypress",function(event){var keycode=event.which;if(!(event.shiftKey==false&&(keycode==46||keycode==8||keycode==37||keycode==39||(keycode>=48&&keycode<=57)))){event.preventDefault();}});function existingCollegeName(collegeList){let collegeName=$("#collegeName").val();if(!collegeList.includes(collegeName)){collegeNameType="new";}}
$("#studentcheck").on("click",function(){$("#rollNumber").removeClass("is-invalid");$("#collegeName").removeClass("is-invalid");if($("#studentcheck").is(":checked")){$(".studentcheck_div").show();}else{$(".studentcheck_div").hide();}});$(document).on("click","#signup",function(){chkMail();});$(document).ready(function(e){});$(document).on("click",".is-invalid",function(){$(this).removeClass("is-invalid");});$(document).on("keyup","#passwordInput",function(){let pass=$("#passwordInput").val();let reg=new RegExp("[0-9]");let num=reg.test(pass);let alpha=pass.match(".*[a-zA-Z]+.*");if(num){$('.one-num').addClass('valid');$('.one-num').removeClass('invalid');}else{$('.one-num').removeClass('valid');}
if(pass.length>=5){$('.min-char').addClass('valid');$('.min-char').removeClass('invalid');}else{$('.min-char').removeClass('valid');}
if(alpha){$('.one-alpha').addClass('valid');$('.one-alpha').removeClass('invalid');}else{$('.one-alpha').removeClass('valid');}});$(document).on("click","#signup",function(){let pass=$("#passwordInput").val();let reg=new RegExp("[0-9]");let num=reg.test(pass);let alpha=pass.match(".*[a-zA-Z]+.*");if(num){$('.one-num').addClass('valid');}else{$('.one-num').removeClass('valid');$('.one-num').addClass('invalid');}
if(pass.length>=5){$('.min-char').addClass('valid');}else{$('.min-char').removeClass('valid');$('.min-char').addClass('invalid');}
if(alpha){$('.one-alpha').addClass('valid');}else{$('.one-alpha').removeClass('valid');$('.one-alpha').addClass('invalid');}});$(document).on('focus','#passwordInput',function(){$('.password-cond').removeClass('hide');});function getUrlVars()
{var vars=[],hash;var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');for(var i=0;i<hashes.length;i++)
{hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1];}
return vars;}