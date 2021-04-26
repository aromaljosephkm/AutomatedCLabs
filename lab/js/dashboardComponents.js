function renderMyCourse(data,identifier,international,callback=false){let myCourses=JSON.parse(data);let append_string="";let desicrew=[];for(let iterator=0;iterator<myCourses.length;iterator++){course=myCourses[iterator];if(international){course["duration"]=course["international-duration"];}
let key=course["ckey"];let courseClass="course-link";let courseCardClass="card-header";courseUrl="courses-video.html?course="+key;if(course["disable"]){courseClass="link-block";courseCardClass="card-header cursor-block";}
if(key=="english"){courseUrl="english.html";}else if(key=="aptitude_tamil"){courseUrl="aptitude_tamil.html";}else if(desicrew.indexOf(key)!=-1){courseUrl=key+".html";}
if(course["activation_status"]=="no"){courseUrl="g10x.html";courseClass="course-link locked";}
if(key!=null){append_string+='<div class="col-md-12 col-lg-6 col-xl-4"><div class="card course-card"><div class="'+courseCardClass+'"><a href="'+courseUrl+'" class="'+courseClass+'"><div class="course-banner '+authorize.getCourseImage(course["ckey"])+'  guvi-lazy-img"></div></a></div><div class="card-body"><h5 class="card-title my-course-title">'+course["name"]+'</h5><ul class="list-unstyled course-highlights"><li class="duration">'+course["duration"]+' hrs</li><li class="language">'+course["lang"]+'</li><li class="lastseen">';if(course["lastSeen"]=="NOT_YET_STARTED"){append_string+="Start the course";}else if(course["lastSeen"]=="recently"){append_string+="last seen "+course["lastSeen"];}else{append_string+="last seen "+course["lastSeen"]+" ago";}
if(course["disable"]){append_string+='</li></ul><div class="progress"><div class="progress-bar" role="progressbar" data-valuenow=0% aria-valuenow=0% aria-valuemin="0" aria-valuemax="100"><span class="coming-soon text-highlight">Coming Soon</span></div></div></div></div></div>';}else{append_string+='</li></ul><div class="progress"><div class="progress-bar" role="progressbar" data-valuenow='+Math.ceil(course["progress"])+'% aria-valuenow='+Math.ceil(course["progress"])+'% aria-valuemin="0" aria-valuemax="100"><span class="progress-value"></span></div></div></div></div></div>';}}}
$(identifier).html(append_string);const allProgressBars='.progress-bar';const progressContent='.progress-value';$(allProgressBars).each((idx,progressBar)=>{const progressValue=$(progressBar).data('valuenow');$(progressBar).css('width',progressValue);$(progressBar).find(progressContent).html(progressValue);});lazyload();if(callback!=false){callback();}};function renderMyCodekata(data,identifier,callback=false){let codekataQuestions=JSON.parse(data);codekataQuestions=codekataQuestions["questions"];let max=codekataQuestions.length;$("#codekata-submission-tab").append('<span class="badge badge-secondary mr-2 ml-1 ">'+max+'</span>');let append_string="";if(max<=0){append_string='<div align="center"> No Recent Code kata submission</div>';$(identifier).html(append_string);return false;}
for(let qIterator=1;qIterator<max+1;qIterator++){question=codekataQuestions[qIterator-1];append_string+='<li class="card d-flex flex-row"><p class="submission-count-id">'+qIterator+'</p><div class="submission">'+question["question"]+'<span class="tags">';if(question.tags!=null){for(let iterator=0;iterator<question["tags"].length;iterator++){if(question["tags"][iterator]!="")
{append_string+='<span class="badge badge-pill badge-guvi-tag"> '+question["tags"][iterator]+' </span>';}}}
accordId="cq"+qIterator;}
$(identifier).html(append_string);if(callback!=false){callback();}}
function renderMyProject(data,identifier,callback=false){let projectQuestions=JSON.parse(data);let count=projectQuestions.length;$("#project-submission-tab").append('<span class="badge badge-secondary mr-2 ml-1 ">'+count+'</span>');let append_string="";if(count<=0){append_string='<div align="center"> No Recent Project submission</div>';$(identifier).html(append_string);return false;}
var link;for(let iterator=0;iterator<projectQuestions.length;iterator++){question=projectQuestions[iterator];var img=question["img"]==null?"":"images/companies/"+question["img"];let urls="";if(question['platform']=='web development'){$('#puw').css('display','block');urls='<div id="puw">Project url : <h6><a href='+question["web_github"]+'>'+question["web_github"]+'</a></h6></div><div id="puw">Hosted url : <h6><a href='+question["hosted_url"]+'>'+question["hosted_url"]+'</a></h6></div>';}
else{$('#pua').css('display','block');urls='<div id="pua" >Project url :<h6> <a href='+question["android_github"]+'>'+question["android_github"]+'</a></h6></div>';}
append_string+='<li class="card d-flex flex-row"><p class="submission-count-id">'+(parseInt(iterator)+1)+'</p><div class="col-md-12 col-lg-9" style="padding-top: 1rem;"><span class="content">'+question["question"]+'<div id="project'+(parseInt(iterator)+1)+'" class="collapse" data-parent="#project-submission-list" > '+urls+' </div><button class="btn collapsed" data-toggle="collapse" data-target="#project'+(parseInt(iterator)+1)+'" aria-expanded="false" aria-controls="project'+(parseInt(iterator)+1)+'" style="display:block" > View </button></span></div><div class="col-md-12 col-lg-2 recruiter" style="position: relative;"><span style="position: relative;top: 33%"><img src="'+img+'" style="height:auto;width:150px"></span></div></li>';}
$(identifier).html(append_string);if(callback!=false){callback();}}
$(".pagination-next").click(function(){$(".pagination .active").next().trigger("click");});$(".pagination-prev").click(function(){$(".pagination .active").prev().trigger("click");});function lazyload(){let lazyloadImages;if("IntersectionObserver"in window){lazyloadImages=document.querySelectorAll(".guvi-lazy-img");var imageObserver=new IntersectionObserver(function(entries,observer){entries.forEach(function(entry){if(entry.isIntersecting){var image=entry.target;image.classList.remove("guvi-lazy-img");imageObserver.unobserve(image);}});});lazyloadImages.forEach(function(image){imageObserver.observe(image);});}else{var lazyloadThrottleTimeout;lazyloadImages=document.querySelectorAll(".guvi-lazy-img");function lazyload(){if(lazyloadThrottleTimeout){clearTimeout(lazyloadThrottleTimeout);}
lazyloadThrottleTimeout=setTimeout(function(){var scrollTop=window.pageYOffset;lazyloadImages.forEach(function(img){if(img.offsetTop<(window.innerHeight+scrollTop)){img.src=img.dataset.src;img.classList.remove('guvi-lazy-img');}});if(lazyloadImages.length==0){document.removeEventListener("scroll",lazyload);window.removeEventListener("resize",lazyload);window.removeEventListener("orientationChange",lazyload);}},20);}
document.addEventListener("scroll",lazyload);window.addEventListener("resize",lazyload);window.addEventListener("orientationChange",lazyload);}}