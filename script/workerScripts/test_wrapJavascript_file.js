'use strict';

onmessage = function(message){
    debugger;
    let post_data = "<script>try{" + message.data + "}catch(error){console.log(error)}</script>";
    postMessage(post_data);
}