'use strict';




function _gd_sandbox_viewer(className, id, log, _console){
    let iframe = document.createElement("iframe");
    iframe.setDocument = function(content = ""){
        console.log(typeof this.srcdoc);
        if(typeof this.srcdoc == "string"){
            this.srcdoc = content;
        }
        else{
            this.addEventListener("load", function({target: iframe}){
                this.contentDocument.documentElement.body.innerHTML = content;
            });
        }
    }
    iframe.sandbox = "allow-scripts allow-same-origin";
    iframe.className = className;
    iframe.id = id;
    //iframe.contentWindow.console.log = log;
    iframe.assingConsole = function(_console){
        //this.contentWindow.parent.
    }
    return iframe;
}

/*
class _gd_sandbox_viewer{
    constructor(){
        this.iframe = document.createElement("iframe");
        
    }


    set document(content = ""){
        console.log(typeof this.iframe.srcdoc);
        if(typeof this.iframe.srcdoc == "string"){
            this.iframe.srcdoc = content;
        }
        else{
            this.iframe.addEventListener("load", function({target: iframe}){
                iframe.contentDocument.documentElement.innerHTML = content;
            });
        }
    }
    setDocument(content = ""){
        this.document = content;
        
    }
}*/