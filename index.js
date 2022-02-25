var inp = document.getElementById("input");
var outer = document.getElementById("output");
var err = document.getElementById("output");
var x = document.getElementById("drop");


var run = document.getElementById("run");
run.onclick = function(){
    console.log(inp.value);
    sendData(inp.value,x.value);
    inp.value="";
};

function sendData(inp,x){

    var request = new XMLHttpRequest();

    request.open("POST"," https://codequotient.com/api/executeCode");

    request.setRequestHeader("Content-Type", "application/json");

    request.send(JSON.stringify({"code":`${inp}`,langId:`${x}`}));

    request.addEventListener('load',function(event){
            var code = JSON.parse(event.target.responseText);
            
            var codeid = code['codeId'];
             console.log(codeid);


             setTimeout(function(){
                 getData(codeid);
             },3000);
             
         });
 
}



function getData(code){
    var req = new XMLHttpRequest();
    req.open("GET",`https://codequotient.com/api/codeResult/${code}`);
    req.send();
    req.addEventListener('load',function(event){
        var data = JSON.parse(event.target.responseText);
       var output =  JSON.parse(data.data)
        console.log(output);
        out(output);
    })
}



function out(get){

    var x = get.output + get.errors;
    
   
    console.log(x);
    outer.innerHTML=x;
    inp.value=get.code;
}