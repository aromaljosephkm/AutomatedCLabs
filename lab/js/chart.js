var skillDict={"flask":"Flask","html":"HTML","mysql":"MySQL","python":"Python","computationalThinking":"Computational Thinking","java":"Java","javascript":"Javascript","dsAndAlgo":"Data structure & Algorithm","php":"PHP","css":"CSS","mongodb":"MongoDB"};var color=d3.scale.ordinal().range(["#09e176"]);var margin={top:100,right:100,bottom:100,left:100},width=Math.min(500,window.innerWidth-10)-margin.left-margin.right,height=Math.min(width,window.innerHeight-margin.top-margin.bottom-20);var microarcChartFlag=0;var dataa={};authorize.ajax(dataa,'microarcSkills',function(response){let length=Object.getOwnPropertyNames(response).length;var temp=[];for(let i=0;i<length;i++){if(response[i].score!=-1){microarcChartFlag=1;temp.push({"axis":skillDict[response[i].skill],"value":response[i].score.toFixed(2)});}}
var data=[];data=[temp];let radarChartOptions={w:width,h:height,margin:margin,maxValue:1,levels:5,roundStrokes:true,color:color};if(microarcChartFlag){RadarChart("#arcChart",data,radarChartOptions);}else{$(".knowledge-graph").css("display","none");}})