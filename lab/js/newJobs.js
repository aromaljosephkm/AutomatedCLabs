var results;function share_modal(param){var myElem=document.getElementById("shareModal");if(myElem===null)
$("body").append('<div class="modal " tabindex="-1" role="dialog" id="shareModal" aria-hidden="true"></div><script>function copy(){var copyText=$("#windowurl");copyText.select();document.execCommand("copy");}</script>');var url_share=window.location.href.split("#");var page_url=url_share[0]+"#a_"+param;var share_modal='<div class="modal-dialog h-100 d-flex flex-column justify-content-center my-0 " role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Share</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="post-share-modal modal-body"><div id="social"><a target="_blank" style="text-decoration: none;" href="https://www.facebook.com/sharer/sharer.php?u='+
encodeURIComponent(page_url)+
'" class="facebookBtn smGlobalBtn"></a><a target="_blank" style="text-decoration: none;" href="https://twitter.com/intent/tweet?text='+
page_url+
'" data-size="large"class="twitterBtn smGlobalBtn"></a><a target="_blank" style="text-decoration: none;" href="https://www.linkedin.com/shareArticle?mini=true&url='+
encodeURIComponent(page_url)+
'" class="linkedinBtn smGlobalBtn"></a></div><hr><div></input></div><div class="input-group mb-3"><input type="text" class="form-control form-rounded" id="windowurl" value="'+
page_url+
'"><div class="input-group-append"><span class="input-group-text" id="basic-addon2"><a href="javascript:copy();"><i class="fas fa-link"></i></a></span></div></div></div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal" style="color:white;">Close</button></div></div></div>';$("#shareModal").html(share_modal);$("#shareModal").modal("show");}
$(document).ready(function(){authorize.loginCheck();var json_value={};var skillset=[];authorize.ajax(json_value,"jobs",function(data){var job=JSON.parse(data);var img="https://guvi-profile-images.s3.amazonaws.com/company_logo/";var card=[];var card1=[];var logo;var image;job.forEach(results=>{skillset=[];for(var j=0;j<results.skill.length;j++){skillset.push('<span class="badge badge-pill badge-guvi-tag id="1st">'+
results.skill[j]+
"</span>");}
if(results.lastdate1>=results.date){website=results.website?((results.website.includes("http://")||results.website.includes("https://"))?results.website:"//"+results.website):"#";results.website=results.website?results.website:results.company;if(authorize.getSession("authToken")){card+=' <div class="col-md-12 col-lg-6"><div id="a_'+
results.id+
'" class="card jobs-card shadow-sm"> <div class="card-header d-flex flex-row justify-content-between"> <h5> <span class="designation" id="title">'+
results.title+
'</span> <span class="package-offered">CTC offered: '+
results.ctc+
'</span> </h5> <p class="recruiter"><span class="recruiter-digitalworks" style="width: 120px; height: 50px;background : url('+
img+
results.picture+
'); display:inline-block ; background-size: contain;  background-position: center;background-repeat: no-repeat;object-fit:cover;"></span><a href="'+
website+
'" target="_blank" class="recruiterLink">'+
results.website+
'</a></p></div><div class="card-body"> <div class="skillsets"> <p><span class="skillset-title">Skillsets:</span>'+
skillset.join(" ")+
' </p></div><div class="d-flex justify-content-between"> <span class="card-text">Last date : '+
results.lastdate+
'</span> <a  href="jobs-detail.html?id='+
results.id+
'"class="btn btn-primary" >Read more</a> <div class="hover-links-wrap"> <ul class="list-unstyled d-flex flex-row justify-content-end secondary-links"> <a href="javascript:share_modal('+
results.id+
');"><li class="share-link"><i class="fas fa-share-alt"></i><span>Share</span></a></li></ul> </div></div></div></div></div>';}else{card+=' <div class="col-md-12 col-lg-6"><div id="a_'+
results.id+
'" class="card jobs-card shadow-sm"> <div class="card-header d-flex flex-row justify-content-between"> <h5> <span class="designation" id="title">'+
results.title+
'</span> <span class="package-offered">CTC offered: '+
results.ctc+
'</span> </h5> <p class="recruiter"><span class="recruiter-digitalworks" style="width: 120px; height: 50px;background : url('+
img+
results.picture+
'); display:inline-block ; background-size: contain;  background-position: center;background-repeat: no-repeat;object-fit:cover;"></span><a href="'+
website+
'" target="_blank" class="recruiterLink">'+
results.website+
'</a></p></div><div class="card-body"> <div class="skillsets"> <p><span class="skillset-title">Skillsets:</span>'+
skillset.join(" ")+
' </p></div><div class="d-flex justify-content-between"> <span class="card-text">Last date : '+
results.lastdate+
'</span> <a href="jobs-detail.html?id='+
results.id+
'" class="btn btn-primary navigationLink" >Read more</a> <div class="hover-links-wrap"> <ul class="list-unstyled d-flex flex-row justify-content-end secondary-links"> <a href="javascript:share_modal('+
results.id+
');"><li class="share-link"><i class="fas fa-share-alt"></i><span>Share</span></a></li></ul> </div></div></div></div></div>';}}else if(results.lastdate1<=results.date){website=results.website?((results.website.includes("http://")||results.website.includes("https://"))?results.website:"//"+results.website):"#";results.website=results.website?results.website:results.company;card1+=' <div class="col-md-12 col-lg-6"><div id="a_'+
results.id+
'" class="card jobs-card shadow-sm"> <div class="card-header d-flex flex-row justify-content-between"> <h5> <span class="designation" id="title">'+
results.title+
'</span> <span class="package-offered">CTC offered: '+
results.ctc+
'</span> </h5> <p class="recruiter"><span class="recruiter-digitalworks" style="width: 120px; height: 50px;background : url('+
img+
results.picture+
'); display:inline-block ; background-size: contain;  background-position: center;background-repeat: no-repeat;object-fit:cover;"></span><a href="'+
website+
'" target="_blank" class="recruiterLink">'+
results.website+
'</a></p></div><div class="card-body"> <div class="skillsets"> <p><span class="skillset-title">Skillsets:</span>'+
skillset.join(" ")+
' </p></div><div class="d-flex justify-content-between"> <span class="card-text">Last date : '+
results.lastdate+
'</span> <div class="hover-links-wrap"> <ul class="list-unstyled d-flex flex-row justify-content-end secondary-links"> <a href="javascript:share_modal('+
results.id+
');"><li class="share-link"><i class="fas fa-share-alt"></i><span>Share</span></a></li></ul> </div></div></div></div></div>';}
var loc=results.location;var comp=results.company;$(".location").html(loc);$(".company-name").html(comp);});$(".tests-list").append(card);$(".tests-list2").append(card1);if(card.length>0){$("#nojob").hide();}
const searchInput="#searchJobs";const currentJobsList=new List("jobs-list",{valueNames:["designation","skillsets"]});const closedJobsList=new List("jobs-list2",{valueNames:["designation","skillsets"]});$(searchInput).keyup(e=>{e.preventDefault();const keyword=$(searchInput).val();currentJobsList.search(keyword);closedJobsList.search(keyword);});});});$(document).on("hover",".jobs-card",function(){$(".jobs-card").toggleClass("shadow");});function showJob(job_id){window.location.href("javascript:share_modal("+job_id+")");}