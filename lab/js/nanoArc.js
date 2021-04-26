function startTimer()
{
    var sec = authorize.getSession("assesmentTime");
    var time = setInterval(myTimer, 1000);    
    var count = 0
    function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
    function myTimer() {
     
        time = fmtMSS(sec)
        time = time.split(":")
        // timeClock
        if(parseInt(time[0]) <= 0 && parseInt(time[1]) <= 0)
        {
            $("#timerLeft").html(`<img class="position-relative timeClock mr-3" src="images/nanoArc/ic_alarm_24px.svg" alt="Time Remaining">00m : 00s Left`);
        }
        else
        {
            $("#timerLeft").html(`<img class="position-relative timeClock mr-3" src="images/nanoArc/ic_alarm_24px.svg" alt="Time Remaining">${time[0]}m : ${time[1]}s Left`);
        }
        
        sec--;
        count++;
        if(sec < 0)
        {
           sec = 0
        }
        if(sec == 0)
        {
            authorize.setSession("assesmentTime",sec)
            authorize.ajax({requestType: "submitAssessment", assessmentSession: authorize.getSession("assessmentSession")}, "nanoArc", function(data){
                
                $('#timeOutModal').modal({backdrop: 'static', keyboard: false}) 
                $('#timeOutModal').modal('show');
            });
        }
        if(count == 20)
        {
            authorize.setSession("assesmentTime",sec)
            count = 0
            authorize.invisibleAjax({requestType: "updateTime", assessmentSession: authorize.getSession("assessmentSession"), timeRemaining: sec}, "nanoArc", function(data)
            {
                data = JSON.parse(data)
                authorize.setSession("assesmentTime",data["timeRemaining"])
            
            });
            
        }
        if (sec <= -1) {
            clearInterval(time);
            $('#timeOutModal').modal({backdrop: 'static', keyboard: false}) 
            $('#timeOutModal').modal('show');
        }
    }
    
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


let path = [];
function render_path(data)
     {
     final = ""
     count = 1
     for (i = 0; i <= data.length; i++)
     {

        if(count == 5)
        {
            str = `<div class="row m-0 my-3 questionRow">${final}</div>`
            $("#nanoPath").append(str);
            $("#nanoPathMob").append(str);
            count = 1
            final = ""
        }else if(i == data.length){

            str = `<div class="row m-0 my-3 questionRow">${final}</div>`
            $("#nanoPath").append(str);
            $("#nanoPathMob").append(str);
            count = 1
            final = ""
        }
      
        final = final + `<div class="custom-btn col h-100 align-items-center px-1 mx-1"><div class=" cursor-pointer d-flex flex-column justify-content-center h-100 w-100 bg-texture rounded text-center text-oxfordBlue btn" id="quesView" data-ques="Q${i+1}"> <p class="font-weight-bold m-0">${i+1}</p></div></div>`;
        count = count+1 
    }
    }
    

 
function path_state(data)
{
    
    var answers = data["answerObject"];

    for (var key of Object.keys(answers))
    {
     var  temp =  answers[key]
    //  console.log(answers[key])
      if(temp["answered"] == true)
      {
          
          var qid = key.split("qid")
          $("."+qid[1]+"opt"+temp["selectedOption"]).addClass("active");
          $("[data-ques='Q"+ qid[1] +"']").removeClass('bg-texture');
          $("[data-ques='Q"+ qid[1] +"']").addClass('bg-primary');
          
      }
           
    }

}  
    

$(document).ready(function () {
     
   

    let reportLink = "";
    // authorize.setSession("assessmentSession",data["assessmentSession"]);
    if(!authorize.getSession("assessmentSession"))
    {
      
        window.location.replace('nanoarc.html');
    }
    else
    {
        authorize.ajax({requestType: "initiateTest", assessmentSession:authorize.getSession("assessmentSession")}, "nanoArc", function(data){
        
        data = JSON.parse(data);
        
        if(data["status"] == "error")
        {
            $('#errorModal').modal('toggle');
            return false;
        }
        else if(data["arcData"]["assessmentState"] == "inprogress")
        {
           
            authorize.setSession("assesmentTime",data["arcData"]["timeRemaining"]);
            startTimer();
        }
        else if(data["arcData"]["assessmentState"] == "completed")
        {
            authorize.clearSession("leadFrom");
            reportLink = data["arcData"]["reportLink"] 
            $('#AlreadyModal').modal({backdrop: 'static', keyboard: false})  
            $('#AlreadyModal').modal('toggle');

        }
        else if(data["arcData"]["assessmentState"] == "created")
        {
            authorize.setSession("assesmentTime",data["arcData"]["timeRemaining"]);
            startTimer();
        }
        
        
        
        
        question = data["arcData"]["questionObject"];
        qa = 0
        $("#totalQA").text("Questions("+question.length+")")
        for (var key of Object.keys(question))
        {

         qno = question[key]["testcase"][0]["mcq_num"];   
         options = question[key]["options"];
         ques = question[key]["question"];
         let opts = ""
         
         for (i = 0; i < options.length; i++) { 
            // console.log()
            opts = opts+`<button class="btn options ${(parseInt(key)+1)+"opt"+(i+1)}" >${options[i]["opt"]}<input type="radio" id="op${i+1}" name="Q${qno}" value="${1+i}"></button><br><br>` 
        }
         
         next = qa+1
         prev = qa-1
         button  = "Next question"
         state = ""
         if(next == question.length)
         {
             next = "end";
             state = "hidden"
         }
         path[key]="Q"+qno;
         if(next == 1)
         {
            var h = "hidden"
         }
         else
         {
             var h = ""
         }
         
         quest = `<div class="mx-3 mx-md-0 ques${qa} QA" id="Q${qno}" data-next="ques${next}" data-qno="${parseInt(key)+1}" data-current="${qno}"  data-prev="ques${prev}"  hidden>
         <div class="py-2">
             
             <h5 class="question-title font-weight-bold qnHeading">${parseInt(key)+1}. Choose the correct answer</h5>
             <br>
             <br>
             <h4 class="title font-weight-bold qnHeading">${ques}</h4>
         </div>
         <div class="my-3">
             <div class="py-2">
                 <h4 class="title font-weight-bold qnHeading">Options</h4>
             </div>
             
             <div class="1 option-buttons" id="optionsQ${qno}" data-toggle="buttons">
                 ${opts}
             </div>
             <div class="row col-11 justify-content-between my-5 mx-0">
                 <a class="cursor-pointer   btn btn-lg btn-outline-primary text-oxfordBlue px-4 mb-2" id="prev" ${h}>Previous question</a>
                 <button type="button" class="cursor-pointer  btn btn-lg btn-primary px-4 text-white mb-2" id="submitTestMod">Submit Test</button>
                 <a  class="cursor-pointer  btn btn-lg btn-primary px-4 text-white mb-2 ${button+"Test"}" id="nxt" ${state}>${button}</a>
             </div>
         </div>
         </div>` 
         
     $(".ques").append(quest);
     qa = qa+1;
    }
     render_path(path);

     $("#Q"+question[0]["testcase"][0]["mcq_num"]).removeAttr('hidden').addClass('active');   
     
     $(document).on('click',"#nxt",function () {        
        var currentElement = $(".QA.active");
        lastq = $(currentElement).data('current');
        qno = $(currentElement).data('qno');
        // console.log("send Data: "+qno)
        if($(`input[name=Q${lastq}]:checked`, `#optionsQ${lastq}`).val())
        {
            var answer = $(`input[name=Q${lastq}]:checked`, `#optionsQ${lastq}`).val()
            authorize.invisibleAjax({requestType: "updateAnswer", assessmentSession:authorize.getSession("assessmentSession") , questionId: qno, selectedOption: answer}, "nanoArc", function(data){
                data = JSON.parse(data);
                path_state(data)
                if($(currentElement).data('next') == "quesend")
                {

                    $('#submitModal').modal('toggle');
        
                }
              
            });
            

        }
        if($(currentElement).data('next') != "quesend")
        {
            $('.QA').attr('hidden', 'true');
            $(currentElement).removeClass('active');
            $("." + $(currentElement).data('next')).removeAttr('hidden').addClass('active');
            
        }
        else
        {
            $('#submitModal').modal('toggle');
        }
        
        });

        $(document).on('click',"#submitTest",function () {  
            $('#submitModal').modal('toggle');
            var currentElement = $(".QA.active");
            lastq = $(currentElement).data('current');
            qno = $(currentElement).data('qno');
            // console.log("send Data: "+qno)
            if($(`input[name=Q${lastq}]:checked`, `#optionsQ${lastq}`).val())
            {
                var answer = $(`input[name=Q${lastq}]:checked`, `#optionsQ${lastq}`).val()
                authorize.invisibleAjax({requestType: "updateAnswer", assessmentSession:authorize.getSession("assessmentSession") , questionId: qno, selectedOption: answer}, "nanoArc", function(data){
                    data = JSON.parse(data);
                    path_state(data)
                    authorize.ajax({requestType: "submitAssessment", assessmentSession: authorize.getSession("assessmentSession")}, "nanoArc", function(data){
                        // console.log(data)
                        data = JSON.parse(data);
                        authorize.setSession("assesmentTime",0);
                        window.location.replace(data["reportLink"]);
                        // console.log(reportLink)
                        
                        // startTimer();
                    });
                });
                
    
            }
            else{
                authorize.ajax({requestType: "submitAssessment", assessmentSession: authorize.getSession("assessmentSession")}, "nanoArc", function(data){
                    // console.log(data)
                    data = JSON.parse(data);
                    authorize.setSession("assesmentTime",0);
                    window.location.replace(data["reportLink"]);
                    // console.log(reportLink)
                    
                    // startTimer();
                });
            }
            

        });    

        $(document).on('click',"#submitTestMod",function () { 
            $('#submitModal').modal('toggle');
        
        });

        $(document).on('click',"#AlreadyTest",function () {  

            window.location.replace(reportLink);
        
        });   

    $(document).on('click',"#prev",function () {        
        var currentElement = $(".QA.active");
        lastq = $(currentElement).data('current');
        qno = $(currentElement).data('qno');
        // console.log("send Data: "+qno)
        if($(`input[name=Q${lastq}]:checked`, `#optionsQ${lastq}`).val())
        {
            var answer = $(`input[name=Q${lastq}]:checked`, `#optionsQ${lastq}`).val()
            authorize.invisibleAjax({requestType: "updateAnswer", assessmentSession:authorize.getSession("assessmentSession") , questionId: qno, selectedOption: answer}, "nanoArc", function(data){
                data = JSON.parse(data);
                path_state(data)
              
            });
            

        }
        if($(currentElement).data('prev') != "ques-1")
        {
            $('.QA').attr('hidden', 'true');
            $(currentElement).removeClass('active');
            
            $("." + $(currentElement).data('prev')).removeAttr('hidden').addClass('active');
        }
        
    });

    $(document).on('click',"#quesView",function () {    
        var currentElement = $(".QA.active");    
        var d = $(this).data('ques');
        // console.log(currentElement)
        lastq = $(currentElement).data('current');
        qno = $(currentElement).data('qno');
        // console.log(lastq)
        var answer = $(`input[name=Q${lastq}]:checked`, `#optionsQ${lastq}`).val()
        if($(`input[name=Q${lastq}]:checked`, `#optionsQ${lastq}`).val())
        {
            authorize.invisibleAjax({requestType: "updateAnswer", assessmentSession:authorize.getSession("assessmentSession") , questionId: qno, selectedOption: answer}, "nanoArc", function(data)
            {
                data = JSON.parse(data);
                path_state(data)
            });
        }      
        $('.QA').attr('hidden', 'true');
        $(currentElement).removeClass('active');
        d = d.split("Q")

        // $("#"+d).removeAttr('hidden').addClass('active');
         
        $("[data-qno='"+ d[1] +"']").removeAttr('hidden').addClass('active');
        $('.close').trigger('click');
    });
    path_state(data["arcData"])

});
    }
let ques = path;


});

