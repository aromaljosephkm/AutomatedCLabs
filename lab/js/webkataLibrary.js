const sidebar = (function sidebar() {
const menuList = '#sidebar';
const toggleicon = '#sidebarToggle .material-icons';
const collapseClass = 'sidebar-collapse';
const activeClass = 'active';
const EventMenuOpened = 'shown.bs.collapse';
const EventMenuClosed = 'hidden.bs.collapse';

function handleMobileUI() {
$(menuList).on(EventMenuClosed, () => $(toggleicon).html('menu'));
$(menuList).on(EventMenuOpened, () => $(toggleicon).html('close'));
}

function toggleSidebar() {
$(menuList).hover(() => $(menuList).toggleClass(collapseClass));
}

const init = () => {
handleMobileUI();
toggleSidebar();
};

return { init };
}());


var tableList;
var totalPage = 0;
var query = window.location.search.substring(1).split('&');
var concept = query[0].split('=')[1];
$(document).ready(function () {
    sidebar.init();
    if(!authorize.getSession("authToken")){
        window.location.href = "webkata.html";
    }
    var counter = 1;
    var globalDevice = "desktop";
    var coursesPerPage = 10;
    if($(window).width() < 550){
        coursesPerPage = 10;
        pageShowCount = 3;
        globalDevice = "mobile";
    }
    
    var tableRow = '';
    var difficultyLevel = ['all'];

    $(".conceptTitle").html(concept);
    $(".conceptName").html(' ' + concept + ' ');
    authorize.ajax({type: "getQuestionList", conceptId: concept}, "webkataOperations", function(data){
        data = JSON.parse(data);
        $("main").removeClass("loading");
        if(data.status == "success"){
            var solved = 0;
            data.questionList.forEach(element => {
                if(element.state == "solved"){
                    solved += 1;
                }
                
                var qnClass = element.questionName.toLowerCase().replace(/([^A-Za-z0-9])/g, '_')+'-'+element.questionId;
                tableRow += `<tr>
                <td class="sNo">${counter++}</td>
                <td class="questionName">
                    <div>
                        <div>
                            <a href="webkata-main.html?concept=${concept}" class="text-oxfordBlue ${qnClass}">${element.questionName}${element.state == "solved" ? `<img class="img-responsive mx-1" src="images/webkata/solved.svg">` : ''}</a> 
                        </div>
                        <div class="d-inline-flex mt-2">
                            <img class="img-responsive" src="images/webkata/tag.svg">`;
                var tagString = ``;
                element.tags.forEach(tag => {
                    tagString += `<div class="rounded-pill bg-secondary text-white px-2 mx-1"><small>${tag}</small></div>`;
                });
                tableRow += tagString;
                tableRow += `</div>
                        </div>
                    </td>
                    <td class="text-right text-oxfordBlue state text-capitalize">${element.state}</td>
                    <td class="hardnessScore text-oxfordBlue text-center">${element.hardnessScore}</td>
                </tr>`;
                // <td class="totalSubmission text-oxfordBlue text-right pr-5"><p class="">${element.totalSubmissions}</td>

                if(!difficultyLevel.includes(parseInt(element.hardnessScore))){
                    difficultyLevel.push(parseInt(element.hardnessScore));
                }
              
            });
            $(".problemCount span").html(solved + " / " + data.questionList.length );
            var difficltyString = '';
            difficultyLevel.sort().forEach(level => {
                difficltyString += `<button class="dropdown-item" href="#">${level}</button>`
            })
            $(".difficultyLevel.dropdown-menu").html(difficltyString);
            $("#qnTable tbody").html(tableRow);
            var pagingRows = coursesPerPage;
            var paginationOptions = {
                innerWindow: 20,
                left: 0,
                right: 0
            };
            var options = {
            valueNames: ['sNo','questionName', 'state', 'totalSubmission', 'hardnessScore'],
            page: pagingRows,
            plugins: [ ListPagination(paginationOptions) ],
            };
            tableList = new List('qnContainer', options);
            tableList.on("updated", function(list) {
                let isFirst = list.i == 1;
                let isLast = list.i > list.matchingItems.length - list.page;
                totalPage = 0;
                if (list.matchingItems.length != 0) {
                    totalPage = Math.ceil(list.matchingItems.length / list.page);
                }
                // generatePageNumber(totalPage);
                createPageNumber(totalPage, list.i);
                let currentPage = 0;
                if (list.i == 1 && totalPage != 0) {
                    currentPage = 1;
                } else if (list.i > 1) {
                    currentPage = ((list.i - 1) / list.page) + 1;
                }
                $("#current-page").html(currentPage);
                $("#total-page").html(totalPage);
                $("#pagination-prev.pagination-disable, #pagination-next.pagination-disable").removeClass("pagination-disable");
                if (isFirst) {
                    $("#pagination-prev").addClass("pagination-disable");
                }
                if (isLast) {
                    $("#pagination-next").addClass("pagination-disable");
                }
                if (list.matchingItems.length <= coursesPerPage) {
                    $(".pagination-wrap").hide();
                } else {
                    $(".pagination-wrap").show();
                }
    
            });
            totalPage = 0;
            if (tableList.matchingItems.length != 0) {
                totalPage = Math.ceil(tableList.matchingItems.length / tableList.page);
            }
            generatePageNumber(totalPage);
            let currentPage = 0;
            if (tableList.i == 1) {
                currentPage = 1;
            } else if (tableList.i > 1) {
                currentPage = ((tableList.i - 1) / tableList.page) + 1;
            }
            $("#current-page").html(currentPage);
            $("#total-page").html(totalPage);
            createPageNumber(totalPage, tableList.i);

            const tableFilter = (filterObj) => {
                tableList.filter(function(item) {
                    let difficultyFilter = false;
                    let stateFilter = false;
                    if(filterObj.difficultyKey){
                        difficultyFilter = item.values()[filterObj.difficultyKey] == filterObj.difficultyValue;
                    }else{
                        difficultyFilter = true;
                    }

                    if(filterObj.stateKey){
                        stateFilter = item.values()[filterObj.stateKey] == filterObj.stateValue;
                    }else{
                        stateFilter = true;
                    }
                    return difficultyFilter && stateFilter;
                });
            }

            var filterObj = {};
            $(".difficultyLevel .dropdown-item").on('click', function(e) {
                e.preventDefault();
                var selText = $(this).text();
                if(selText === 'all'){
                    delete filterObj['difficultyKey'];
                    delete filterObj['difficultyValue'];
                    tableFilter(filterObj);
                }else{
                    filterObj['difficultyKey'] = "hardnessScore";
                    filterObj['difficultyValue'] = selText;
                    tableFilter(filterObj);
                }
                $("#difficultyLevel span").html('Difficulty : '+selText);
               
            });

            $(".qnStatus .dropdown-item").on('click', function(e) {
                e.preventDefault();
                var selText = $(this).text();
                if(selText.toLowerCase() === 'all'){
                    delete filterObj['stateKey'];
                    delete filterObj['stateValue'];
                    tableFilter(filterObj);
                }else{
                    filterObj['stateKey'] = "state";
                    filterObj['stateValue'] = selText.toLowerCase();
                    tableFilter(filterObj);
                }
                $("#qnStatus span").html(selText);
               
            });

            // $(".qnFilter input[type=checkbox][name=qnState]").change(function (e) { 
            //     e.preventDefault();
            //     if(this.checked){
            //         if($(this).val() == 'solved'){
            //             filterObj['stateKey'] = "state";
            //             filterObj['stateValue'] = "solved";
            //             tableFilter(filterObj);
            //             $("#unSolvedQns").prop("checked", false);
            //         }
            //         else if($(this).val() == 'unsolved'){
            //             filterObj['stateKey'] = "state";
            //             filterObj['stateValue'] = "unsolved";
            //             tableFilter(filterObj);
            //             $("#solvedQns").prop("checked", false);
            //         }
            //     }else{
            //         delete filterObj['stateKey'];
            //         delete filterObj['stateValue'];
            //         tableFilter(filterObj);
            //     }
            // });

            $(document).on('click', '.questionName a', function () {
                authorize.setSession('webkataQuestionId:'+concept , $(this).attr("class").split(" ")[1].split('-')[1] );
            });
        }
    });  
      
   
      $('#pagination-next').on('click', function(){
          var list = $('.pagination').find('li');
          $.each(list, function(position, element){
              if($(element).is('.active')){
                  $(list[position+1]).trigger('click');
                  page = $(".pagination-wrap .page-number.active").data("page") + 1;
                  if(page <= totalPage){
                    goToPage(page);
                  }
              }
          });
      });

  
      $('#pagination-prev').on('click', function(){
          var list = $('.pagination').find('li');
          $.each(list, function(position, element){
              if($(element).is('.active')){
                  $(list[position-1]).trigger('click');
                  page = $(".pagination-wrap .page-number.active").data("page") - 1;
                  if(page > 0){
                    goToPage(page);
                  }
              }
          });
      });

      $(document).on("click", ".page-number", function(e) {
        e.preventDefault();
        let selectedPage = $(this).data("page");
        goToPage(selectedPage);
      });    

      function generatePageNumber(totalPage){
          pageRawString = '';
          for(i=0;i<totalPage;i++){
              pageRawString += `<a class="page-number mx-2 hide" href="#" id="page-${i+1}" data-page="${i+1}">${i+1}</a>`;
          }
          $(".pagination-container").html(pageRawString);
      }

      function createPageNumber(totalPage, firstElem){
        if(globalDevice=="mobile"){
            createPageNumberMobile(totalPage, firstElem);
        }else{
            createPageNumberDesktop(totalPage, firstElem);
        }
     }
    
    function createPageNumberDesktop(totalPage, firstElem) {
        $(".page-number").each(function() {
            $(this).addClass("hide");
        });
        if (totalPage != 0) {
            let pageId = "#page-1";
            for (let j = 1; j <= totalPage; j++) {
                pageId = "#page-" + j;
                $(pageId).removeClass("hide");
                $(pageId).removeClass("pagination-disable");
                $(pageId).addClass("pagination-disable");
            }
            if (firstElem == 1) {
                $(".page-number").each(function() {
                    $(this).removeClass("active");
                });
                $("#page-1").addClass("active");
            } else {
                $("#page-" + (((firstElem - 1) / totalPage) + 2)).addClass("active");
            }
        }
    }
    function createPageNumberMobile(totalPage, firstElem) {
        $(".page-number").each(function() {
            $(this).addClass("hide");
        });
        
        if (totalPage != 0) {
            let pageId = "#page-1";
            let firstPageNumber = firstElem < 2 ? 0 : (((firstElem - 1) / coursesPerPage) + 2)-1;
            let lastPageNumber = firstElem < 2 ? (pageShowCount) : ((firstPageNumber + (pageShowCount-1)) > totalPage ?  totalPage : firstPageNumber + (pageShowCount-1));
            if(firstPageNumber+(pageShowCount-1) > totalPage){
                firstPageNumber = totalPage-(pageShowCount-1);
            }
            for (let j = firstPageNumber; j <= lastPageNumber; j++) {
                pageId = "#page-" + j;
                $(pageId).removeClass("hide");
                $(pageId).removeClass("pagination-disable");
                $(pageId).addClass("pagination-disable");
            }
            $(".page-number").each(function() {
                $(this).removeClass("active");
            });
            if (firstElem == 1) {
                $("#page-1").addClass("active");
            } else {
                $("#page-" + firstPageNumber).addClass("active");
            }
        }
    }
  
    function goToPage(page) {
        let firstElem = 1;
        if (page != 1) {
            firstElem = ((page - 1) * coursesPerPage) + 1;
        }
        tableList.show(firstElem, coursesPerPage);
        $(".page-number").each(function() {
            $(this).removeClass("active");
        });
        $("#page-" + page).addClass("active");
        $(".number-id").html(page);
    }

});