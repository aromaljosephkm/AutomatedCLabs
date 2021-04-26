$(document).ready(function(e){console.log("ready");let $json={type:"get-faq"};authorize.ajax($json,"meetup",function(data){let faq=JSON.parse(data);for(let i=0;i<faq.length;i++){const element=faq[i];$("#faqAccordian").append(`<div class="col card faq-card shadow-sm">
            <div class="card-header" id="faq${i}Heading">
                <h5 class="mb-1 pointer row d-flex justify-content-between faq-header mt-3" data-target="#faq${i}Content"> ${i+1} . ${element.Q}
                  <button class="btn " data-toggle="collapse" data-target="#faq${i}Content" aria-expanded="false" aria-controls="faq${i}Content"> </button></h5>
            </div>
            <div id="faq${i}Content" aria-labelledby="faq${i}Heading" data-parent="#faqAccordian" style="">
                <div class="card-body mt-0">
                <strong>Ans:</strong> ${element.A}
                </div>
            </div>
        </div>`);}});});