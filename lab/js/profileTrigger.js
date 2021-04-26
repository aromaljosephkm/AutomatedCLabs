function renderTrigger()
{authorize.ajax({"type":"count"},"profileTrigger",function(response){var score=JSON.parse(authorize.getSession("ProfileScore"));score=Math.floor(score["Profile_Completion_Score"]["score"]);var modal_adv=`<div class="modal fade" tabindex="-1" role="dialog" id="profileFormPage">
       <!-- my own -->
       <div id="mod1" class="modal-dialog modal-dialog-centered modal-lg mx-auto" role="document">
       <div class="modal-content card-mod">
           <div class="float-right pr-2 pt-2 mr-2">
               <button type="button" id="closer" class="close closer" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
               </button>
           </div>
           <div class="col-11 mx-auto">
               <div class="row mt-4">
                   <div class="col-sm-12 col-md-6 my-2">
                       <h6 class="font-weight-bold ltr-sp">Hi, `+authorize.getSession("cusername")+`</h6>
                   </div>
                   <div class="col-sm-12 col-md-6 my-2">
                       <div class="row align-items-center mx-auto">
                           <div>
                               <i class="fa fa-info-circle fa-lg text-secondary" aria-hidden="true"></i>
                           </div>
                           <div class="mx-2 w-75">
                               <div class="progress">
                                   <div class="progress-bar rounded" role="progressbar" aria-valuenow="18" aria-valuemin="0"
                                       aria-valuemax="100" style="width:`+score+`%"></div>
                               </div>
                           </div>
                           <div>
                               <span class="color-light">`+score+`%</span>
                           </div>
                       </div>
                   </div>
               </div>
           </div>

           <div class="col-sm-11 col-md-10 mx-auto my-4">
                   <div class="text-center w-100 my-4">
                       <p>Complete Your profile to make it visible to the recruiters</p>
                   </div>
                   <div class="text-center w-100 my-4">
                       <h4 class="font-weight-bold">Tell us a bit about yourself</h4>
                   </div>
           </div>     
               <div class="col-sm-12 col-md-8 mx-auto">
                   <div class="form-group mx-auto">
                       <div>
                           <p class="lead text-secondary">Gender</p>
                       </div>
                       <div class="d-flex mt-3 mx-auto" id="genderSelector">
                           <div class="form-check pl-0 mr-2">
                               <button type="button" class="btn p-3 px-4 bg-light btn-sm border-secondary">
                                   <input class="form-check-input" type="radio" name="gender" value="Male" id="male" checked>
                                   <span class="position-absolute checkIcon">
                                       <i class="fas fa-lg fa-check-circle text-primary ml-2 align-self-center"></i>
                                   </span>
                                   <label class="form-check-label" for="male">
                                       <p class="m-0 text-dark">Male</p>
                                   </label>

                               </button>
                           </div>
                           <div class="form-check pl-0 ml-2">
                               <button type="button" class="btn p-3 px-4 bg-light btn-sm border-secondary">

                                   <input class="form-check-input" type="radio" name="gender" value="Female" id="female">
                                   <span class="position-absolute checkIcon">
                                       <i class="fas fa-lg fa-check-circle text-primary ml-2 align-self-center"></i>
                                   </span>
                                   <label class="form-check-label" for="female">
                                       <p class="m-0 text-dark">Female</p>
                                   </label>
                               </button>
                           </div>
                       </div>
                   </div>
                   <div class="row form-group mx-auto">
                   <input type="text" class="form-control bg-light border-secondary mx-auto" id="country" aria-describedby="country" placeholder="Country">
                   </div>
                   <div class="row form-group mx-auto">
                   <input type="text" class="form-control bg-light border-secondary mx-auto" id="city" aria-describedby="city" placeholder="City">
                   </div>

   <!-- Completion 1 -->
   <div id="completionStatus1" class="profileModalPage1 form-group mx-auto" hidden="hidden" >
       <div class="text-center mt-4 my-2 p-3">
           <img src="images/confetti.svg" class="img-responsive" alt="Awesome">
       </div>
       <div class="text-center w-100 my-4">
           <h4 class="font-weight-bold">Awesome you did a great job !</h4>
       </div>
       <div class="text-center w-100 my-4">
           <p>Cool, you are almost there. Fill your profile 90% to make your profile visible to the recruiters.</p>
       </div>
         </div> 
   </div>

           <div class="jumbotron mb-0 p-4">
               <div class="d-flex justify-content-center justify-content-md-end col-12 mx-auto">
                   <button type="button" class="btn btn-primary text-white px-4 py-2 my-2" id="modal1-sub">Continue &nbsp; <i
                           class="fa fa-angle-right fa-lg"></i>
                   </button>
               </div>
           </div>
       </div>
   </div>
       <!-- my own -->
       <div id="mod2" class="modal-dialog modal-dialog-centered modal-lg mx-auto" role="document" hidden>
        <div class="modal-content card-mod">
            <div class="float-right pr-2 pt-2 mr-2">
                <button type="button" id="closer" class="closer close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="col-11 mx-auto">
                <div class="row mt-4">
                    <div class="col-sm-12 col-md-6 my-2">
                        <h6 class="font-weight-bold ltr-sp">Hi,`+authorize.getSession("cusername")+`</h6>
                    </div>
                    <div class="col-sm-12 col-md-6 my-2">
                        <div class="row align-items-center mx-auto">
                            <div>
                                <i class="fa fa-info-circle fa-lg text-secondary" aria-hidden="true"></i>
                            </div>
                            <div class="mx-2 w-75">
                                <div class="progress">
                                    <div class="progress-bar rounded" role="progressbar" aria-valuenow="18" aria-valuemin="0"
                                        aria-valuemax="100" style="width:`+score+`%"></div>
                                </div>
                            </div>
                            <div>
                                <span class="color-light">`+score+`%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div class="col-sm-11 col-md-10 mx-auto mb-5">
                    <div id="educationDetails" class="profileModalPage form-group mx-auto active">
                        <div class="text-center w-100 my-4">
                            <p>Complete Your profile to make it visible to the recruiters</p>
                        </div>
                        <div class="text-center w-100 my-4 py-2">
                            <h4 class="font-weight-bold">Tell us a bit about yourself</h4>
                        </div>
                        <div class="d-flex justify-content-center mb-5">
                            <div class="form-check pl-0 mr-2">
                                <button type="button" class="btn bg-light btn-sm border-secondary p-3">
                                    <input class="form-check-input" type="radio" name="education" value="College_Student" id="collegeStudent" checked>
                                    <span class="position-absolute checkIcon">
                                        <i class="fas fa-lg fa-check-circle text-primary ml-2 align-self-center"></i>
                                    </span>
                                    <label class="form-check-label" for="collegeStudent">
                                        <p class="m-0 text-dark">College Student</p>
                                    </label>
                                </button>
                            </div>
                            <div class="form-check pl-0 ml-2">
                                <button type="button" class="btn bg-light btn-sm border-secondary p-3">

                                    <input class="form-check-input" type="radio" name="education" value="School_Student" id="schoolStudent">
                                    <span class="position-absolute checkIcon">
                                        <i class="fas fa-lg fa-check-circle text-primary ml-2 align-self-center"></i>
                                    </span>
                                    <label class="form-check-label" for="schoolStudent">
                                        <p class="m-0 text-dark">School Student</p>
                                    </label>
                                </button>
                            </div>
                            <div class="form-check pl-0 ml-2">
                                <button type="button" class="btn bg-light btn-sm border-secondary p-3">

                                    <input class="form-check-input" type="radio" name="education" value="College_Graduate" id="collegeGraduate">
                                    <span class="position-absolute checkIcon">
                                        <i class="fas fa-lg fa-check-circle text-primary ml-2 align-self-center"></i>
                                    </span>
                                    <label class="form-check-label" for="collegeGraduate">
                                        <p class="m-0 text-dark">College Graduate</p>
                                    </label>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- College Details -->
                    <div id="collegeDetails" class="profileModalPage form-group mx-auto" data-prev="educationDetails" data-next="completionStatus" hidden>
                        <div class="text-center w-100 my-4">
                            <p>Complete Your profile to make it visible to the recruiters</p>
                        </div>
                        <div class="text-center w-100 my-4 py-2">
                            <h4 class="font-weight-bold">Tell us a bit about yourself</h4>
                        </div>
                        <div class="w-75 mx-auto">
                            <div class="form-check pl-0">
                                <div class="form-group mx-auto">
                                <input type="text" class="form-control bg-light border-secondary mx-auto" id="college" aria-describedby="college" placeholder="College">
                                </div>
                            </div>
                            <div class="form-check pl-0">
                                <div class="form-group mx-auto">
                                    <select id="degrees" class="form-control bg-light border-secondary mx-auto">
                                        <option value="" disabled selected>Degree</option>
                                        <option value="BE" >BE</option>
                                        <option value="ME">ME</option>
                                        <option value="BTECH">BTECH</option>
                                        <option value="MTECH">MTECH</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MCA">MCA</option>
                                        <option value="B.Sc">B.Sc</option>
                                        <option value="M.Sc">M.Sc</option>
                                        <option value="B.A">B.A</option>
                                        <option value="M.A">M.A</option>
                                        <option value="B.Pharm">B.Pharm</option>
                                        <option value="M.Pharm">M.Pharm</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-check pl-0">
                                <div class="form-group mx-auto">
                                <input type="text" class="form-control bg-light border-secondary mx-auto" id="Grad-year" aria-describedby="Grad-year" placeholder="Graduation year">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /College Details -->

                    <!-- School Details -->
                    <div id="schoolDetails" class="profileModalPage form-group mx-auto" data-prev="educationDetails" data-next="completionStatus" hidden>
                        <div class="text-center w-100 my-4">
                            <p>Complete Your profile to make it visible to the recruiters</p>
                        </div>
                        <div class="text-center w-100 my-4 py-2">
                            <h4 class="font-weight-bold">Tell us a bit about yourself</h4>
                        </div>
                    <div class="w-75 mx-auto mb-5">
                        <div class="form-check pl-0">
                            <div class="form-group mx-auto">
                                <input class="form-control bg-light border-secondary mx-auto" type="text" name="schoolName" id="schoolName" placeholder="School name">
                            </div>
                        </div>
                        <div class="form-check pl-0">
                            <div class="form-group mx-auto">
                                <select id="Class-lvl" class="form-control bg-light border-secondary mx-auto">
                                    <option value="" disabled selected>Class</option>
                                    <option value="1">I</option>
                                    <option value="2">II</option>
                                    <option value="3">III</option>
                                    <option value="4">IV</option>
                                    <option value="5">V</option>
                                    <option value="6">VI</option>
                                    <option value="7">VII</option>
                                    <option value="8">VIII</option>
                                    <option value="9">IX</option>
                                    <option value="10">X</option>
                                    <option value="11">XI</option>
                                    <option value="12">XII</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- /School Details -->

                 <!-- College Graduate -->
                 <div id="graduateDetails" class="profileModalPage form-group mx-auto" data-prev="educationDetails" hidden>
                    <div class="text-center w-100 my-4">
                        <p>Complete Your profile to make it visible to the recruiters</p>
                    </div>
                    <div class="text-center w-100 my-4 py-2">
                        <h4 class="font-weight-bold">What describes you better?</h4>
                    </div>
                    <div class="d-flex justify-content-center mb-5">
                        <div class="form-check pl-0 mr-2">
                            <button type="button" class="btn bg-light btn-sm border-secondary p-3">
                                <input class="form-check-input" type="radio" name="graduateInfo" value="Working_Professional" id="workingProfessional" checked>
                                <span class="position-absolute checkIcon">
                                    <i class="fas fa-lg fa-check-circle text-primary ml-2 align-self-center"></i>
                                </span>
                                <label class="form-check-label" for="workingProfessional">
                                    <p class="m-0 text-dark">Working Professional</p>
                                </label>
                            </button>
                        </div>
                        <div class="form-check pl-0 ml-2">
                            <button type="button" class="btn bg-light btn-sm border-secondary p-3">
                                <input class="form-check-input" type="radio" name="graduateInfo" value="Looking_for_a_Job" id="lookingForJob">
                                <span class="position-absolute checkIcon">
                                    <i class="fas fa-lg fa-check-circle text-primary ml-2 align-self-center"></i>
                                </span>
                                <label class="form-check-label" for="lookingForJob">
                                    <p class="m-0 text-dark">Looking for a job</p>
                                </label>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- /College Graduate -->

                 <!-- Current Status -->
                 <div id="statusDetails" class="profileModalPage form-group mx-auto" data-prev="graduateDetails" hidden>
                    <div class="text-center w-100 my-4">
                        <p>Complete Your profile to make it visible to the recruiters</p>
                    </div>
                    <div class="text-center w-100 my-4 py-2">
                        <h4 class="font-weight-bold">Your status</h4>
                    </div>
                    <div class="d-flex justify-content-center mb-5">
                        <div class="form-check pl-0 mr-2">
                            <button type="button" class="btn bg-light btn-sm border-secondary p-3">
                                <input class="form-check-input" type="radio" name="statusInfo" value="Experienced" id="experienced" checked>
                                <span class="position-absolute checkIcon">
                                    <i class="fas fa-lg fa-check-circle text-primary ml-2 align-self-center"></i>
                                </span>
                                <label class="form-check-label" for="experienced">
                                    <p class="m-0 text-dark">Experienced</p>
                                </label>
                            </button>
                        </div>
                        <div class="form-check pl-0 ml-2">
                            <button type="button" class="btn bg-light btn-sm border-secondary p-3">
                                <input class="form-check-input" type="radio" name="statusInfo" value="Fresher" id="fresher">
                                <span class="position-absolute checkIcon">
                                    <i class="fas fa-lg fa-check-circle text-primary ml-2 align-self-center"></i>
                                </span>
                                <label class="form-check-label" for="fresher">
                                    <p class="m-0 text-dark">Fresher</p>
                                </label>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- /Current Status -->

                <!-- Work Details -->
                <div id="workDetails" class="profileModalPage form-group mx-auto" data-prev="graduateDetails" data-next="completionStatus" hidden>
                    <div class="text-center w-100 my-4">
                        <p>Complete Your profile to make it visible to the recruiters</p>
                    </div>
                    <div class="text-center w-100 my-4 py-2">
                        <h4 class="font-weight-bold">Tell us about your work</h4>
                    </div>
                <div class="w-75 mx-auto">
                    <div class="form-check pl-0">
                        <div class="form-group mx-auto">
                            <input class="form-control bg-light mx-auto" type="text" name="domain" id="domain" placeholder="Domain">
                        </div>
                    </div>
                    <div class="form-check pl-0">
                        <div class="form-group mx-auto">
                            <input class="form-control bg-light mx-auto" type="text" name="role" id="role" placeholder="Role">
                        </div>
                    </div>
                    <div class="form-check pl-0">
                        <div class="form-group mx-auto">
                            <input class="form-control bg-light mx-auto" type="text" name="company" id="company" placeholder="Company">
                        </div>
                    </div>
                    <div class="form-check pl-0">
                        <div class="form-group mx-auto">
                            <input class="form-control bg-light mx-auto" type="text" name="experience" id="yearsOfExperience" placeholder="Years of Experience">
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Work Details -->

            <!-- Skillset Details -->
            <div id="skillSetDetails" class="profileModalPage form-group mx-auto" data-prev="statusDetails" data-next="interestDetails" hidden>
               <div class="text-center w-100 my-4">
                   <p>Complete Your profile to make it visible to the recruiters</p>
               </div>
               <div class="text-center w-100 my-4 py-2">
                   <h4 class="font-weight-bold">Tell us about your skillsets</h4>
               </div>
           <div class="mx-2 mb-5">
               <div class="form-check pl-0">
                   <div class="form-group mx-auto">

                       <div class="col" id="userSkillSet">
                           <select class="form-control" id="systemSkills">

                           </select>
                       </div>
                       <div class="col py-3">
                           <div class="py-2"><p class="lead">SUGGESTED TAGS</p></div>
                           <div class="py-1 row m-0">
                               <div class="pr-4 py-1"><p class="text-secondary">Frontend development</p></div>
                               <div class="pr-4 py-1"><p class="text-secondary">Backend development</p></div>
                               <div class="pr-4 py-1"><p class="text-secondary">Database</p></div>
                               <div class="pr-4 py-1"><p class="text-secondary">Graphic designing</p></div>
                               <div class="pr-4 py-1"><p class="text-secondary">UX designing</p></div>
                           </div>
                       </div>
                   </div>
               </div>

           </div>
       </div>
       <!-- /Skillset Details -->

       <!-- Area of Interest Details -->
       <div id="interestDetails" class="profileModalPage form-group mx-auto" data-prev="skillSetDetails" data-next="completionStatus" hidden>
           <div class="text-center w-100 my-4">
               <p>Complete Your profile to make it visible to the recruiters</p>
           </div>
           <div class="text-center w-100 my-4 py-2">
               <h4 class="font-weight-bold">What are your interests ?</h4>
           </div>
       <div class="mx-2 mb-5">
           <div class="form-check pl-0">
               <div class="form-group mx-auto">
                   <div class="col" id="userInterest">
                       <select class="form-control" id="interestedArea">

                       </select>
                   </div>
                   <div class="col py-3">
                       <div class="py-2"><p class="lead">SUGGESTED TAGS</p></div>
                       <div class="py-1 row m-0">
                           <div class="pr-4 py-1"><p class="text-secondary">Ethical hacking</p></div>
                           <div class="pr-4 py-1"><p class="text-secondary">programming</p></div>
                           <div class="pr-4 py-1"><p class="text-secondary">Frontend development</p></div>
                           <div class="pr-4 py-1"><p class="text-secondary">Backend</p></div>
                           <div class="pr-4 py-1"><p class="text-secondary">UI designing</p></div>
                           <div class="pr-4 py-1"><p class="text-secondary">Graphic designing</p></div>
                           <div class="pr-4 py-1"><p class="text-secondary">UX designing</p></div>
                       </div>
                   </div>
               </div>
           </div>

       </div>
   </div>
   <!-- /Area of Interest Details -->

         <!-- Completion Status -->
         <div id="completionStatus" class="profileModalPage form-group mx-auto" hidden="hidden" >
            <div class="text-center mt-4 my-2 p-3">
                <img src="images/confetti.svg" class="img-responsive" alt="Awesome">
            </div>
            <div class="text-center w-100 my-4">
                <h4 class="font-weight-bold">Awesome you did a great job !</h4>
            </div>
            <div class="text-center w-100 my-4">
                <p>Cool, you are almost there. Fill your profile 90% to make your profile visible to the recruiters.</p>
            </div>
    </div>
    <!-- /Completion Status -->
    </div>
          <div class="jumbotron mb-0 p-4 mt-5">
                <div class="d-flex justify-content-between col-12 mx-auto">
                    <button id="PrevPageBtn" type="button" class="btn btn-transparent text-secondary px-4 py-2 my-2">
                        <i class="fa fa-angle-left fa-lg"></i> &nbsp; <span>Previous</span></button>
                    <button id="ContPageBtn" type="button" class="btn btn-primary text-white px-4 py-2 my-2">
                        <span>Continue</span> &nbsp; <i class="fa fa-angle-right fa-lg"></i> </button>
                    <button id="Done" type="button" class="btn btn-primary text-white px-4 py-2 my-2" data-dismiss="modal" aria-label="Close" hidden>
                        <span>Done</span> &nbsp; <i class="fa fa-angle-right fa-lg"></i> </button>    
                </div>
            </div>
        </div>
    </div>
   </div>`
function validate(id){let element=$(id);let value=element.val();let status;if(value){element.removeClass("is-invalid");return value}else{element.addClass("is-invalid");return false;}}
function clear_incomplete(){var score=JSON.parse(authorize.getSession("ProfileScore"));score["Profile_Completion_Score"]["incomplete"]=[];authorize.setSession("ProfileScore",JSON.stringify(score));}
const checkButton=()=>{if($(".profileModalPage.active").attr('id')=='educationDetails'){$("#PrevPageBtn").addClass('disabled').attr('disabled','true');}else{$("#PrevPageBtn").removeClass('disabled').removeAttr('disabled');}
if($(".profileModalPage.active").attr('id')=='completionStatus'){$("#ContPageBtn").addClass('active');$("#Done").removeAttr('hidden').addClass('active');}else{$("#ContPageBtn").removeClass('active');}}
$('#profileFormPage').on('shown.bs.modal',function(){checkButton();});Array.prototype.contains=function(needle){for(i in this){if(this[i]==needle)return true;}
return false;}
let gender="";let country="";let city="";$(modal_adv).appendTo('body');var count=JSON.parse(response);count=parseInt(count["count"]);if(count==2){$('.closer').attr('hidden','true');}
var score=JSON.parse(authorize.getSession("ProfileScore"));var profileTriggerState=JSON.parse(authorize.getSession("ProfileScore"));if(score!=null){var incomplete=score["Profile_Completion_Score"]["incomplete"];}
if(profileTriggerState["Profile_Completion_Score"]["trigger"]=="true")
{return false;}
if(incomplete.contains("city")||incomplete.contains("gender")){setTimeout(function(){$('#profileFormPage').modal({backdrop:'static',keyboard:false})},1000);}else if(incomplete.contains("department")||incomplete.contains("college")||incomplete.contains("school")||incomplete.contains("school")){$("#mod1").hide();$("#mod2").removeAttr('hidden')
setTimeout(function(){$('#profileFormPage').modal({backdrop:'static',keyboard:false})},1000);}
$('#modal1-sub').click(function(){if(incomplete.contains("department")||incomplete.contains("college")||incomplete.contains("school")||incomplete.contains("school")){gender=$('input[name="gender"]:checked').val();country=validate("#country");city=validate("#city");if(city&&country){$("#mod1").hide();$("#mod2").removeAttr('hidden');}}else{gender=$('input[name="gender"]:checked').val();country=validate("#country");city=validate("#city");if(city!=""&&country!=""){var data={};data["currentCity"]=city;data["country"]=country;data["gender"]=gender;data["trigger"]="true";authorize.ajax(data,"profileTrigger",function(ajaxResponse){$("#mod1").hide();$("#mod2").removeAttr('hidden');$('#'+$(".profileModalPage.active").attr('id')).attr('hidden','true');$("#completionStatus").removeAttr('hidden').addClass('active');$('#ContPageBtn').attr('hidden','true');$("#Done").removeAttr('hidden').addClass('active');clear_incomplete();});}}});const PageMap={'collegeStudent':'collegeDetails','schoolStudent':'schoolDetails','collegeGraduate':'graduateDetails','workingProfessional':'workDetails','lookingForJob':'statusDetails','experienced':'workDetails','fresher':'skillSetDetails','fresherInterest':'interestDetails',}
var interested=[];var skills=[];$('#userInterest #interestedArea').selectize({delimiter:',',persist:true,maxItems:null,placeholder:"Area of Interest",sortField:{field:"text",direction:"asc",preload:focus,allowEmptyOption:true,},create:true,onChange:function(value){interested=value;}});$('#userSkillSet #systemSkills').selectize({delimiter:',',persist:true,maxItems:null,placeholder:"Select your skills",sortField:{field:"text",direction:"asc",preload:focus,allowEmptyOption:true,},create:true,onChange:function(value){skills=value;}});$("#ContPageBtn").click(function(e){e.preventDefault();if($(".profileModalPage.active").attr('id')=="skillSetDetails"){var student_type=$('input[name="education"]:checked').val();var grad_type=$('input[name="graduateInfo"]:checked').val();var grad_status=$('input[name="statusInfo"]:checked').val();if(skills!=""){$("#systemSkills").removeClass("is-invalid");data={skills:skills,student_type:student_type,grad_type:grad_type,grad_status:grad_status,trigger:"true"}
if(city!=""&&country!=""){data["currentCity"]=city,data["country"]=country,data["gender"]=gender}
authorize.ajax(data,"profileTrigger",function(ajaxResponse){var currentElement=$(".profileModalPage.active");$('.profileModalPage').attr('hidden','true');$(currentElement).removeClass('active');$("#"+$(currentElement).data('next')).removeAttr('hidden').addClass('active');clear_incomplete();});}else{$("#systemSkills").addClass("is-invalid");return false;}}else if($(".profileModalPage.active").attr('id')=="interestDetails"){var student_type=$('input[name="education"]:checked').val();var grad_type=$('input[name="graduateInfo"]:checked').val();var grad_status=$('input[name="statusInfo"]:checked').val();if(skills!=""){$("#interestedArea").removeClass("is-invalid");data={areaOfInterest:interested,student_type:student_type,grad_type:grad_type,grad_status:grad_status,trigger:"true"}
if(city!=""&&country!=""){data["currentCity"]=city,data["country"]=country,data["gender"]=gender}
authorize.ajax(data,"profileTrigger",function(ajaxResponse){var currentElement=$(".profileModalPage.active");$('.profileModalPage').attr('hidden','true');$('#ContPageBtn').attr('hidden','true');$("#Done").removeAttr('hidden').addClass('active');$(currentElement).removeClass('active');$("#"+$(currentElement).data('next')).removeAttr('hidden').addClass('active');clear_incomplete();});}else{$("#interestedArea").addClass("is-invalid");return false;}}else if($(".profileModalPage.active").attr('id')=="workDetails"){var domain=validate("#domain");var role=validate("#role");var company=validate("#company");var exp=validate("#yearsOfExperience");var student_type=$('input[name="education"]:checked').val();var grad_type=$('input[name="graduateInfo"]:checked').val();if(domain&&role&&company&&exp){var data={workExperience:[{"designation":role,"companyName":company,"domain":domain,"startTime":exp}],student_type:student_type,grad_type:grad_type,trigger:"true"}
if(city!=""&&country!=""){data["currentCity"]=city,data["country"]=country,data["gender"]=gender}
authorize.ajax(data,"profileTrigger",function(ajaxResponse){var currentElement=$(".profileModalPage.active");$('.profileModalPage').attr('hidden','true');$('#ContPageBtn').attr('hidden','true');$("#Done").removeAttr('hidden').addClass('active');$(currentElement).removeClass('active');$("#"+$(currentElement).data('next')).removeAttr('hidden').addClass('active');clear_incomplete();});}else{return false}}else if($(".profileModalPage.active").attr('id')=="schoolDetails"){var schoolName=validate("#schoolName");var Class=$("#Class-lvl option:selected").val();var student_type=$('input[name="education"]:checked').val();if(schoolName&&Class!=""){$("#Class-lvl").removeClass("is-invalid");var data={schoolName:schoolName,Class:Class,student_type:student_type,trigger:"true"}
if(city!=""&&country!=""){data["currentCity"]=city,data["country"]=country,data["gender"]=gender}
authorize.ajax(data,"profileTrigger",function(ajaxResponse){var currentElement=$(".profileModalPage.active");$('.profileModalPage').attr('hidden','true');$('#ContPageBtn').attr('hidden','true');$("#Done").removeAttr('hidden').addClass('active');$(currentElement).removeClass('active');$("#"+$(currentElement).data('next')).removeAttr('hidden').addClass('active');clear_incomplete();});}else{$("#Class-lvl").addClass("is-invalid");return false;}}else if($(".profileModalPage.active").attr('id')=="collegeDetails"){var college=validate("#college");var gradYear=validate("#Grad-year");var degrees=$("#degrees option:selected").val();var student_type=$('input[name="education"]:checked').val();if(college&&gradYear&&degrees!=""){$("#degrees").removeClass("is-invalid");var data={collegeName:college,passedoutyear:gradYear,degree:degrees,student_type:student_type,trigger:"true"}
if(city!=""&&country!=""){data["currentCity"]=city,data["country"]=country,data["gender"]=gender}
authorize.ajax(data,"profileTrigger",function(ajaxResponse){var currentElement=$(".profileModalPage.active");$('.profileModalPage').attr('hidden','true');$('#ContPageBtn').attr('hidden','true');$("#Done").removeAttr('hidden').addClass('active');$(currentElement).removeClass('active');$("#"+$(currentElement).data('next')).removeAttr('hidden').addClass('active');clear_incomplete();});}else{$("#degrees").addClass("is-invalid");return false;}}else{if($(".profileModalPage.active").attr('id')=='completionStatus'){$("#Done").removeAttr('hidden').addClass('active');return;}
var currentElement=$(".profileModalPage.active");$('.profileModalPage').attr('hidden','true');if($(currentElement).data('next')){$(currentElement).removeClass('active');$("#"+$(currentElement).data('next')).removeAttr('hidden').addClass('active');}else{$(currentElement).removeClass('active');$("#"+PageMap[$("#"+$(currentElement).attr('id')+" input[type='radio']:checked").attr('id')]).removeAttr('hidden').addClass('active');}
$("#PrevPageBtn").data('prev',$(currentElement).attr('id'));checkButton();}});$("#PrevPageBtn").click(function(e){e.preventDefault();if($(".profileModalPage.active").attr('id')=="educationDetails"){$("#mod2").attr('hidden','true');$("#mod1").show();}else{var currentElement=$(".profileModalPage.active");$('.profileModalPage').attr('hidden','true');if($(currentElement).data('prev')){$(currentElement).removeClass('active');$("#"+$(currentElement).data('prev')).removeAttr('hidden').addClass('active');}else{$(currentElement).removeClass('active');$("#"+$(this).data('prev')).removeAttr('hidden').addClass('active');}
checkButton();}});$("h4").click(function(e){e.preventDefault();var currentElement=$(".profileModalPage.active");});$('.close').click(function(){authorize.ajax({"type":"addCount"},"profileTrigger",function(response){authorize.setSession("modalClose","true");});});});}
function callFunction(callback){setTimeout(function(){callback();},(Math.random()+1)*1000|0);}
$(document).ready(function(){if(authorize.getSession("modalClose")!=null){return false;}
else
{let data={};data.requestType="score";data.profileURL=authorize.getSession("unique_url");authorize.ajax(data,"profileView",function(ajaxResponse){obj=JSON.parse(ajaxResponse);authorize.setSession("modalClose","true")
authorize.setSession("ProfileScore",ajaxResponse);if(obj["Profile_Completion_Score"]["trigger"][0]=="false"){callFunction(function repeat(){if($('#OfferModal.show').length||$('#dashAccessModal.show').length||$('#surveyModal.show').length||$('#dataScienceModal.show').length||$('#welcomeModal.show').length){setTimeout(function(){callFunction(repeat)},4000);}
else
{renderTrigger();}});}});}});