auth_verify();function logindetails(auth){"use strict";var vmap={};var course_preview=window.location.href;var params=course_preview.split("?");var preview=params[1];vmap["auth"]=auth;authorize.ajax(vmap,"login",async function(result1){if((result1=result1.substring(1,result1.length-1))){var t=JSON.parse(result1);if((t.access="true")){authorize.setSession("authToken",auth);if(t.isZenUser){authorize.setSession("isZenUser",true);}
if(t.profileimg==null){authorize.setSession("profileimg","img/userprofile/default.jpg");}
authorize.setSession("unique_url",t.unique_url);let data={};data.requestType="score";data.profileURL=authorize.getSession("unique_url");if(t.profileimg!==null){var proimg=t.profileimg;proimg=proimg.substring(4);authorize.setSession("profileimg",proimg);}
if(t.LoginStreak==0){authorize.setSession("login_modal",0);}
if(t.LoginStreak){authorize.setSession("login_modal",parseInt(t.LoginStreak));}
if(t.firstlogin=="yes"){authorize.setSession("firstlogin","yes");}else if(t.firstlogin=="no"){authorize.setSession("firstlogin","no");}
authorize.setSession("admin",t.username);authorize.setSession("userpoints",t.userpoints);if(t.total_credits_points){authorize.setSession("user_wallet_points",t.total_credits_points);}else{authorize.setSession("user_wallet_points","0");}
authorize.setSession("rank",t.rank);authorize.setSession("mail",t.email);authorize.setSession("hash_val",t.hash);authorize.setSession("session_start",t.session_start);authorize.setSession("ipaddress",t.ipaddress);authorize.setSession("AB",t.AB);authorize.getSession("hash_val");authorize.setSession("lang",t.lang);authorize.setSession("skill",t.skills);authorize.setSession("usertype",t.usertype);authorize.setSession("after_admin_logout","0");if(t.pname!=="empty"||t.pname!=""){authorize.setSession("cusername",t.pname);await Moengage.add_unique_user_id(t.email);await Moengage.add_email(t.email);await Moengage.add_user_name(t.pname);await Moengage.track_event("login");}
if(t.college_student==="yes"){authorize.setSession("college_student","yes");}
if(t.paid===true){authorize.setSession("paid","true");}else{authorize.setSession("paid","false");}
if(t.subscribed===true){authorize.setSession("subscribed","true");}else{authorize.setSession("subscribed","false");}
let page=$("main").attr("id");if(page!="sign-in-page"){preview=1;}
let redirectParams=new URLSearchParams(window.location.search)
if(redirectParams.has('location')){let param=authorize.get_queryStringVal("location");if(param=="forum"){window.location="https://forum.guvi.in/api/__/auth/guvi/login?auth="+auth;return false;}else{let additionalParam=location.href.split("&")
console.log(param);param=additionalParam[1]?param+"?"+additionalParam[1]:param;window.location=param;return false;}}else if(redirectParams.has("sourceUri")){let search=new URLSearchParams(document.location.search.substring(1));let sourceUri=search.get("sourceUri");let uriObject=new URL(sourceUri);if(uriObject.origin===window.location.origin){window.location.href=sourceUri;return false;}}
if(preview){if(page!="bundle-pages"&&!$("main").hasClass("no-reload")){location.reload();}}else if(params[0].indexOf("Muruga")>-1||params[0].indexOf("events")>-1||params[0].indexOf("g.uvi")>-1){location.reload();}else if(authorize.getSession("usertype")=="2"){authorize.setSession("ipaddress",t.ipaddress);authorize.setSession("after_admin_logout",1);window.location=authorize.RedirectPagesBasedOnUserType(2);}else if(authorize.getSession("usertype")=="5"){authorize.setSession("ipaddress",t.ipaddress);authorize.setSession("after_admin_logout",1);window.location=authorize.RedirectPagesBasedOnUserType(5);}else if(authorize.getSession("usertype")=="3"){window.location=authorize.RedirectPagesBasedOnUserType(3);}else if(authorize.getSession("usertype")=="4"){window.location=authorize.RedirectPagesBasedOnUserType(4);}else if(authorize.getSession("usertype")=="6"){window.location=authorize.RedirectPagesBasedOnUserType(6);authorize.setSession("after_admin_logout",1);}else if(authorize.getSession("usertype")=="10"){window.location=authorize.RedirectPagesBasedOnUserType(10);}else if(authorize.getSession("usertype")=="11"){window.location=authorize.RedirectPagesBasedOnUserType(11);}else if(authorize.getSession("usertype")=="9"){window.location=authorize.RedirectPagesBasedOnUserType(9);}else{authorize.setSession("is_login_video","1");if(t.paid===true){window.location=authorize.RedirectPagesBasedOnUserType(1);}else{window.location=authorize.RedirectPagesBasedOnUserType(0);}}}else{auth_clear();}}},false);}
function Logcheck(){var user_name=$("#login_email").val();var password=$("#login_password").val();user_name=$.trim(user_name);user_name=user_name.toLowerCase();if(password!=""){var logincheck={};logincheck["emails"]=user_name;logincheck["password"]=password;try{let neoeyed=neoEYED.dumpBehavior(neoEYED.Activities.login,user_name);logincheck["neoeyed"]=neoeyed;}catch(error){logincheck["neoeyed"]={};}
authorize.ajax(logincheck,"usercheck",function(data){str=data.substring(1,data.length-1);str=JSON.parse(str);if(str.access=="true"){var auth=str.auth;logindetails(auth);}else if(str.access=="activate"){$('<div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><h4 id="title" class="modal-title">Activation</h4><p id="content">Please Consider Activating Your Guvi Account.</p><div class="d-flex justify-content-end"><a class="btn btn-primary" id="sendmail">Resend Mail</a></div></div></div></div></div>').appendTo("body");$("#myModal").modal();var firstclick=true;$("#sendmail").click(function(){if(firstclick){firstclick=false;resendmail(user_name);}});}else if(str.access=="notexist"){$("#login_password").removeClass("is-invalid");$("#login_password").addClass("is-valid");$("#login_password").html("");$("#login_password").attr("placeholder","You are not registered user");$("#login_email").focus();$("#login_email, #login_password").val("");try{neoEYED.clearData();}catch(error){}
return false;}else if(str.access=="false"){$("#login_password").removeClass("is-invalid");$("#login_password").addClass("is-invalid");$("#login_email").addClass("is-invalid");$("#pass_warn").html("Incorrect Username or Password");$("#pass_warn").css('text-align','center');$("#login_email").focus();$("#login_password").focus();try{neoEYED.clearData();}catch(error){}
return false;}});}else{$("#pass_warn").html("");}}
function validate_mail(){var user_name=$("#login_email").val();user_name=$.trim(user_name);user_name=user_name.toLowerCase();var testEmail=/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;if(user_name==""){$("#login_email").addClass("is-invalid");$("#login_email").attr("placeholder","E-mail id is required");$("#login_email").focus();}else if(!testEmail.test(user_name)){$("#warning").html("");$("#login_email").addClass("is-invalid");$("#login_email").attr("placeholder","E-mail is Invalid");$("#email_warn").html("E-mail is Invalid");$("#login_email").focus();}else{$("#warning").hide();$("#login_email").removeClass("is-invalid");$("#login_email").removeClass("is-valid");$("#email_warn").html("");$("#login_email").focus();return true;}}
function validate_pwd(){var pass=$("#login_password").val();if(pass==""){$("#login_password").addClass("is-invalid");$("#login_password").attr("placeholder","Password required");$("#login_password").focus();}else{$("#warning").hide();$("#login_password").removeClass("is-invalid");$("#login_password").removeClass("is-valid");$("#pass_warn").html("");$("#login_password").focus();return true;}}
function signin(){if(validate_mail()&&validate_pwd()){Logcheck();}}
function bindingGoogleInputs(){gapi.load("auth2",function(){auth2=gapi.auth2.init({client_id:"701916916581-or1gkqb6qeq9f8gg8iojjh0gr00d7nk0.apps.googleusercontent.com",cookiepolicy:"single_host_origin"});attachSignin(document.getElementById("google-button"));});localStorage.setItem("profileimg","img/userprofile/default.jpg");}
function bindingInputs(){$("#login_email").keypress(function(e){if(e.which=="13"){e.preventDefault();signin();}});$("#login_password").keypress(function(e){$("#login_password").removeClass("is-invalid");$("#login_password").focus();if(e.which=="13"){e.preventDefault();signin();}});$("#login_button").click(function(e){e.preventDefault();signin();});$("#forgot").click(function(e){e.preventDefault();$("#mymodal").modal("show");});bindingGoogleInputs();}
$(document).ready(function(){$(".spinner").hide();let page=$("main").attr("id");if(page=="sign-in-page"){bindingInputs();}});function gauthPwdVerify(email,name,token,id_token){$('#getPasswordModal').modal('show');$(document).on("click","#getPassword",function(){let pass=$("#gpassword").val();if(pass.length>0){$("#gpassword").removeClass("is-invalid");Gcheck(email,name,token,id_token,pass);}
else{$("#gpassword").addClass("is-invalid");}});}
function Gcheck(email,name,token,id_token,pwd=""){var user_name=email;var name=name;var id=token;user_name=$.trim(user_name);user_name=user_name.toLowerCase();var check={};check["name"]=name;check["emails"]=user_name;check["password"]=pwd;check["id"]=id;check["id_token"]=id_token;check["requestType"]="googleLogin";authorize.ajax(check,"userGcheck",function(data){str=data.substring(0,data.length-0);str=JSON.parse(str);if(str.GAuth=="inserted"){alert("New Gauth Inserted");window.location="index.html";}else{if(str.access=="Gauth Error"){}
if(str.access=="true"){var auth=str.auth;authorize.setSession("authToken",auth);if(str.gregister=="true"){authorize.setSession("setPassword","1");setPasswordBinder();}else{logindetails(auth);}}
else if(str.status=="pwdRequired"){if(str.access=="access_denied"){$("#gpassword").addClass("is-invalid");}
else{gauthPwdVerify(email,name,token,id_token);}}
if(str.acesss=="inserted"){alert("Account Has been Added Sign In Again");document.location.reload(true);}}});}
function attachSignin(element){auth2.attachClickHandler(element,{},function(googleUser){document.getElementById("google-button").innerText="Signed in as "+googleUser.getBasicProfile().getName();var email=googleUser.getBasicProfile().getEmail();var name=googleUser.getBasicProfile().getName();var token=googleUser.getBasicProfile().getId();var id_token=googleUser.getAuthResponse().id_token;Gcheck(email,name,token,id_token);});}
function resendmail(email){var data={};data["email"]=email;authorize.ajax(data,"gethash",function(output){if(output=="true"){$("#title").html("Mail sent !");$("#content").html("Please check your mail");}});}
$(document).on("click",".is-invalid",function(){$(this).removeClass("is-invalid");$("#pass_warn").html("");});function setPasswordBinder(){let modal='<div class="modal fade" id="setPasswordModal" tabindex="-1" role="dialog" aria-hidden="true" data-keyboard="false" data-backdrop="static">  <div class="modal-dialog modal-dialog-centered modal-md" role="document"><div class="modal-content"> <div class="modal-header justify-content-center">  <h5><strong>Set Your GUVI Password</strong></h5> </div> <div class="modal-body"><div class="form-group">  <label for="gpassword">New Password</label>  <input id="gpassword" class="form-control" type="password">  <div class="invalid-feedback">Password must be more than 5 characters.it must contain atleast one numeral and one alphabet</div> </div> <div class="form-group">  <label for="gconfirmpassword">Confirm Password</label>  <input id="gconfirmpassword" class="form-control" type="password">  <div class="invalid-feedback">Those password didn\'t match, Try again</div> </div>  <div class="d-flex justify-content-center" id="setPassSubmitDiv" ><button class="btn btn-primary" id="setPassword">Submit</button>  </div> </div></div>  </div> </div>';$("body").append(modal);$("#setPasswordModal").modal("show");$("#setPassword").on("click",function(event){event.preventDefault();let password=authorize.validate("#gpassword","password");let confirmPassword=$("#gconfirmpassword").val();if(password.length<5){$("#gpassword").addClass("is-invalid");return false;}else if(password!=confirmPassword||confirmPassword.length==0){$("#gconfirmpassword").addClass("is-invalid");return false;}else if(password==confirmPassword){reqData={};reqData["password"]=password;$("#setPassword").attr("disabled","true");$("#setPassSubmitDiv").html('<div class="spinner-border text-success" role="status">  <span class="sr-only">Loading...</span></div>');authorize.ajax(reqData,"setPassword",function(data){let res=JSON.parse(data);if(res["status"]=="true"){authorize.clearSession("setPassword");let auth=authorize.getSession("authToken");$("#setPassSubmitDiv").html('<div class="text-success" role="status">  <span>Password saved successfully</span></div>');tap('conversion',"register",0);setTimeout(function(){logindetails(auth);},1000);}else{$("#setPassword").attr("disabled","false");}});}});}
function auth_verify()
{let auth=authorize.getSession("authToken");if(auth!=null)
{authorize.ajax({"auth":auth},"auth_verify",function(data){let res=JSON.parse(data);console.log(res);if(res.key==true)
{authorize.loginCheck();}
else
{localStorage.clear();}});}
else
{authorize.loginCheck();}}