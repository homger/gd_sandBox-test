'use strict';

/*
Will use this file temporarly to make "Virtual Worker Files"
And for testing..


*/


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

const test_wrapJavascript_worker = test_wrapJavascript_file.worker();
function test_wrapJavascript(jsData){
    
    //debugger;

    return new Promise(function(resolve, reject){
        test_wrapJavascript_worker.postMessage(jsData);
        test_wrapJavascript_worker.onmessage = (message) => resolve(message.data);    
    });
}




/*onmessage = function(message){
    
    let post_data = "try{" + message.data + "}catch(error){console.log(error)}";
    this.postMessage(post_data);
}*/