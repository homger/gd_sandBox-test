'use strict';

//let test_wrapJavascript_file_url_made = false;
let test_wrapJavascript_file = new _gd_sandbox_file("test_wrapJavascript_file", "text/javascript", `
onmessage = function(message){
    
    let post_data = "\\
    <script>\\
        window.console = window.parent._gd_SandBox.console;\\
        window.onerror = function(event, source, lineno, colno){\\
            console.log(event + ' || File : ' + source + ' || Line: ' + lineno + ' Col : ' + colno);\\
        }\\
        \\
    </script>" + "<script>try{" + message.data + "}catch(error){console.log(error)}</script>";
    postMessage(post_data);
}  
`);

console.log(test_wrapJavascript_file.content);
//let test_wrapJavascript_file_URL = test_wrapJavascript_file.url();
//const test_wrapJavascript_worker = new Worker("./workerScripts/test_wrapJavascript_file.js",{});
const test_wrapJavascript_worker = test_wrapJavascript_file.worker(); ///new Worker(test_wrapJavascript_file_URL);

test_wrapJavascript_worker.onmessage = function(message){
    test_wrapJavascript_calling_function(message.data);
}
var test_wrapJavascript_calling_function = function(){};

function test_wrapJavascript(jsData, callingF){
    
    //debugger;
    test_wrapJavascript_calling_function = callingF;
    test_wrapJavascript_worker.postMessage(jsData);
}




/*onmessage = function(message){
    
    let post_data = "try{" + message.data + "}catch(error){console.log(error)}";
    this.postMessage(post_data);
}*/