let str=` <div class="modal fade" id="surveyModal">
<div class="modal-dialog modal-lg">
  <div class="modal-content">

    <!-- Modal Header -->
    <div class="modal-header border border-0 d-flex justify-content-center">
      <!-- <h5 class="modal-title font-weight-bold survey-modal">How did you know about GUVI ?</h5> -->
      <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
    </div>

    <!-- Modal body -->
    <div class="modal-body">
        <h4 class="modal-title font-weight-bold survey-modal survey pb-3">How did you know about GUVI ?</h4>
        <div class='survey'>
        <div class="form-check mb-3">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input mr-2 surveyCheck" value="1"><span class="surveyLabel">From a family member, friend or college</span>
            </label>
        </div>
        <div class="form-check mb-3">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input mr-2 surveyCheck" value="2"><span class="surveyLabel">Online articles or blog</span>
            </label>
        </div>
        <div class="form-check mb-3">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input mr-2 surveyCheck" value="3"><span class="surveyLabel">Through search engine(e.g.., Google, Bing)</span>
            </label>
        </div> 
        <div class="form-check mb-3">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input mr-2 surveyCheck" value="4"><span class="surveyLabel">Social media(e.g, Facebook, Instagram, Twitter, LinkedIn)</span>
            </label>
        </div>
        <div class="form-check mb-3">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input mr-2 surveyCheck" value="5"><span class="surveyLabel">Ads (e.g, Google ads, Facebook ads, Instagram ads)</span>
            </label>
        </div>
        <div class="form-check mb-3">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input mr-2 surveyCheck" value="6"><span class="surveyLabel">Youtube</span>
            </label>
        </div>
        <div class="form-check mb-3">
            <label class="form-check-label"> 
              <input type="checkbox" class="form-check-input mr-2 surveyCheck" value="7"><span class="surveyLabel">Telegram</span>
            </label>
        </div>
        <div class="form-check mb-3">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input mr-2 surveyCheck" value="8"><span class="surveyLabel">Email</span>
            </label>
        </div>
    </div>
        <div class="form-group m-5">
            <!-- <label for="comment">Others (Please Specify)</label> -->
            <textarea class="form-control othersData" rows="5" id="other" placeholder="Others (Please Specify)"></textarea>
        </div>
    </div>

    <!-- Modal footer -->
    <div class="modal-footer border-0 bg-light p-3">
      <button type="button" class="btn btn-primary mb-1" id='surveySub'>Submit</button>
    </div>

  </div>
</div>
</div>`
$(document).ready(function(){var data={}
data['requestType']="survey";data['stype']="count";if(authorize.getSession('survey')==null||!authorize.getSession('survey'))
{authorize.ajax(data,"profileView",function(ajaxResponse)
{let res=JSON.parse(ajaxResponse);if(parseInt(res.count)>0)
{if(parseInt(res.count)>3)
{callFunction(function repeat(){if($('#OfferModal.show').length||$('#dashAccessModal.show').length||$('#dataScienceModal.show').length||$('#welcomeModal.show').length){setTimeout(function(){callFunction(repeat)},2000);}
else
{$("body").append(str);$('#surveyModal').modal({backdrop:'static',keyboard:false});}});}
else
{authorize.setSession('survey',true);callFunction(function repeat(){if($('#OfferModal.show').length||$('#dashAccessModal.show').length||$('#dataScienceModal.show').length||$('#welcomeModal.show').length){setTimeout(function(){callFunction(repeat)},2000);}
else
{$("body").append(str);}});}
$(document).on('click','#surveySub',function(){let message=$('.othersData').val();let dataList=$('.surveyCheck:checkbox:checked');let checklist=[];Object.keys(dataList).forEach(function(key){if(parseInt(key)>-1)
{checklist.push(dataList[key].value);}});if(message.length>0)
{checklist.push(message);}
let data={};data['surveyData']=checklist;data['requestType']="survey";data['stype']="insert";authorize.ajax(data,"profileView",function(ajaxResponse){let res=JSON.parse(ajaxResponse);if(res.status=='success'){authorize.setSession('survey',true);$('#surveyModal').modal('hide');}});});}});}});