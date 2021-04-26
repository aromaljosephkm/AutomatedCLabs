function renderMySubmission(){authorize.ajax({"requestType":"onload"},"getCodekata",function(response){let data=JSON.parse(response);if(data["paid"]){renderMyCodekata(data["codekata"],"#codekata-submission-list > .list",function(){var codekataList=new List('codekata-submission-list',{valueNames:['tags'],outerWindow:2,page:3,pagination:true});const searchInput=$('#searchSubmissions');searchInput.keyup(()=>{const keyword=$(searchInput).val();codekataList.search(keyword);});});renderMyProject(data["project"],"#project-submission-list > .list",function(){const projectList=new List('project-submission-list',{outerWindow:2,page:3,pagination:true});});renderMyCourse(data["courses"],".course-list",data["international"],function(){$('.spinner').hide();$('#dashboard-page').removeClass('loading');});}else{$('main').removeClass("loading");let string_modal=`<div class="modal fade show" id="dashAccessModal" tabindex="-1" role="dialog" aria-modal="true" data-keyboard="false" data-backdrop="static" style="padding-right: 16.9909px; display: block;">
            <div class="modal-dialog  modal-lg modal-dialog-centered mx-auto p-3" role="document">
                <div class="modal-content">
                    <div class="jumbotron jumotron-fluid p-0 m-0 bg-white">
                        
                    </div>
                    <div class="container-fluid">
                        <div class="row mt-3">
                            <div class="col-md-12 text-center">
                                <h3 class="text-oxfordBlue d-none d-md-block font-weight-bold m-0">Become a Premium member by purchasing our courses</h1>
                                <h3 class="text-oxfordBlue d-block d-md-none font-weight-bold m-0">Become a Premium member by purchasing our courses</h3>
                            </div>
                        </div>
                        <div class="row justify-content-center mt-5">
                          <div class="col-md-5 mr-3">
                              <div class="card shadow codekata-card">
                                  <div class="card-header basic-header d-flex justify-content-center rounded-bottom">
                                      <strong class="text-white">Free Membership</strong>
                                  </div>
                                  <div class="card-body">
                                      <div class="d-flex justify-content-between">
                                          <div class="d-flex justify-content-start">
                                              <i class="fas fa-check-circle mt-1 mr-2 text-primary"></i>
                                              <p class="font-weight-bold">Codekata</p>
                                          </div>
                                          <p class="font-weight-bold">Limited Access</p>
                                      </div>
                                      <div class="d-flex justify-content-between">
                                          <div class="d-flex justify-content-start">
                                              <i class="fas fa-check-circle mt-1 mr-2 text-primary"></i>
                                              <p class="font-weight-bold">MicroARC</p>
                                          </div>
                                          <p class="font-weight-bold">Limited Access</p>
                                      </div>
                                      <div class="d-flex justify-content-between">
                                          <div class="d-flex justify-content-start">
                                              <i class="fas fa-times-circle mt-1 mr-2 text-danger"></i>
                                              <p class="font-weight-bold">Dashboard</p>
                                          </div>
                                          <p class="font-weight-bold">No Access</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-5 ml-3">
                              <div class="card shadow codekata-card">
                                  <div class="card-header premium-header d-flex justify-content-center after-card rounded-bottom">
                                      <strong class="text-white">Premium Membership</strong>
                                  </div>
                                  <div class="card-body">
                                      <div class="d-flex justify-content-between">
                                          <div class="d-flex justify-content-start">
                                              <i class="fas fa-check-circle mt-1 mr-2 text-primary"></i>
                                              <p class="font-weight-bold">Codekata</p>
                                          </div>
                                          <p class="font-weight-bold">Unlimited Access</p>
                                      </div>
                                      <div class="d-flex justify-content-between">
                                          <div class="d-flex justify-content-start">
                                              <i class="fas fa-check-circle mt-1 mr-2 text-primary"></i>
                                              <p class="font-weight-bold">MicroArc</p>
                                          </div>
                                          <p class="font-weight-bold">Unlimited Access</p>
                                      </div>
                                      <div class="d-flex justify-content-between">
                                          <div class="d-flex justify-content-start">
                                              <i class="fas fa-check-circle mt-1 mr-2 text-primary"></i>
                                              <p class="font-weight-bold">Dashboard</p>
                                          </div>
                                          <p class="font-weight-bold">Unlimited Access</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                           </div>
                           <div class="d-flex flex-row justify-content-center mt-3 mb-5 pb-5">
                               <a id="subscriptionGoToCourses">
                                   <button type="button" class="btn btn-primary rounded-button pl-5 pr-5">Go to Courses</button>
                               </a>
                           </div>
                    </div>
                </div>
            </div>
        </div>`;$(string_modal).appendTo("body");$('#dashAccessModal').modal('show');}});};function validate(id,length,regex=false,maxLength=false){let element=$(id);let value=element.val();let status;if(maxLength&&value.length>maxLength){element.addClass("is-invalid");status=$("#email").data("verified");if(status){$("#email").data("verified",false);}
return false;}
if(value){if(value.length>=length){if(regex){if(regex.test(value)){return value;}else{element.addClass("is-invalid");status=$("#email").data("verified");if(status){$("#email").data("verified",false);}
return false;}}else{return value;}}else{element.addClass("is-invalid");status=$("#email").data("verified");if(status){$("#email").data("verified",false);}
return false;}}else{element.addClass("is-invalid");status=$("#email").data("verified");if(status){$("#email").data("verified",false);}
return false;}}
$(document).ready(function(){authorize.loginCheck();var value=localStorage.getItem("login_modal");if(value){$("#streak-points").html(value*10);$("#welcomeModal").modal("show");localStorage.removeItem("login_modal");}
var data1={};authorize.ajax(data1,"time-script",function(ajaxResponse){var timedata=ajaxResponse;var measuredTime=new Date(null);measuredTime.setSeconds(timedata);var MHSTime=measuredTime.toISOString().substr(11,8);var timesplit=MHSTime.split(":");var d={};d=timesplit[0]+'h'+':'+timesplit[1]+'m';$(".time-duration").html(d);});renderMySubmission();authorize.ajax({"requestType":"get_topics"},"get_concept_to_cover",function(response){let concepts=JSON.parse(response);let length=concepts.length;let completionModal=1;let append_string='<div class="card-header d-flex"><strong class="milestone-header">Concepts to cover </strong><span class="total-geekoin">Earn 300<i class="icon-geekoin" aria-hidden="true"></i></span></div><div class="card-body"><ul class="list-unstyled stepper">';for(let iterator=0;iterator<length;iterator++){let concept=concepts[iterator];if((concept.allCompleted==null)&&(concept.recommended==null)){let complete_class=concept.completed?"completed":"";append_string+='<li class='+complete_class+'><a class="no-underline" href="courses-video.html?course='+concept.courseKey+'"><div class="action-task"><div class="video-thumb-wrap"><img src=https://via.placeholder.com/100x56> </div><div class="video-info"><p class="video-title"><strong>'+concept.name+'</strong></p><p class="video-description">'+concept.topic+'</p></div></div></a></li>';}else if(concept.allCompleted==0){completionModal=0;}}
append_string+='</ul></div>';$('.concepts-to-cover').html(append_string);if(completionModal){let conceptsCompleteModal='<div class="modal fade goodies-modal" id="conceptsCompleteModal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-lg" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="artwork"></div><p class="message">Congratulations, you have successfully completed the today concepts<strong>Bonus 300 Geekoin</strong></p></div></div></div></div>';$('body').append(conceptsCompleteModal);$('#conceptsCompleteModal').modal('show');let newPoint=parseInt(authorize.getSession("userpoints"))+300;authorize.setSession("userpoints",newPoint);}});$(".pagination-next").click(function(){$(".pagination .active").next().trigger("click");});$(".pagination-prev").click(function(){$(".pagination .active").prev().trigger("click");});var s3url="https://s3-ap-southeast-1.amazonaws.com/guvi-profile-images/";function url_split(image){if(image){img_url=image.split("/");if(img_url[2]!="graph.facebook.com"){var d=img_url.length-1;return s3url+img_url[d];}else{return image;}}else{return "./images/profile-pic-sample.jpeg";}}
authorize.ajax({},"peer",function(response){response=JSON.parse(response);for(var i=0;i<response.length;i++){var activity=response[i]["subLesson"]?response[i]["subLesson"]:response[i]["page"];var lesson=response[i]["lesson"]?response[i]["lesson"]+" Course":response[i]["base_page"];var list={"codekata_beginner_submit":" has solved a Codekata problem in beginner level "+activity+" in "+lesson,"codekata_player_submit":" has solved a Codekata problem in player level "+activity+" in "+lesson,"codekata_hunter_submit":" has solved a Codekata problem in hunter level "+activity+" in "+lesson,"codekata_pro_submit":" has solved a Codekata problem in pro level "+activity+" in "+lesson,"watch_video":" Watched "+activity+" video in "+lesson,"watch_video_L1":" Watched  "+activity+" video in "+lesson,"watch_video_L2":" Watched  "+activity+" video in "+lesson,"watch_video_L3":" Watched  "+activity+" video in "+lesson,"watch_video_L4":" Watched  "+activity+" video in "+lesson,"profile_fill":" Updated his profile "+"in "+lesson,"assignment_submit":" Submited assignment "+"in "+lesson,"assignment_submit_L1":" Submited "+activity+" assignment in "+lesson,"assignment_submit_L3":" Submited "+activity+" assignment in "+lesson,"assignment_submit_L3":" Submited "+activity+" assignment in "+lesson,"assignment_submit_L4":" Submited "+activity+" assignment in "+lesson,"quiz_quick_submit":" Submited "+activity+" quiz "+"in "+lesson,"quiz_submit_L1":" Submited "+activity+" Quiz in "+lesson,"quiz_submit_L2":" Submited "+activity+" Quiz in "+lesson,"quiz_submit_L3":" Submited "+activity+" Quiz in "+lesson,"quiz_submit_L4":" Submited "+activity+" Quiz in "+lesson,"post-assessment":" has attended "+activity+" in "+lesson,"pre-assessment":" has attended "+activity+" in "+lesson,"concepts-to-cover":" Completed Todays Concepts-to-Cover video","course_level_up":" has leveled up on "+activity+" in "+lesson,"day1":" has loggged in","day2":" has a login streak of 2 days","day3":" has a login streak of 3 days","day4":" has a login streak of 4 days","day5":" has a login streak of 5 days","login":" has loggged in"};$(".activity-feed-card ul").append('<li class="d-flex flex-row"><div class="gravatar-wrap mr-2"> <a href="https://www.guvi.in/'+response[i]["unique_url"]+'"><img src="'+url_split(response[i]["picture"])+'" class="gravatar" alt=""></div><div class="account-info"><p class="upperCase"><strong>  '+response[i]["name"]+'</strong></a>'+list[response[i]["activity"]]+' </p></div></li>');}});});