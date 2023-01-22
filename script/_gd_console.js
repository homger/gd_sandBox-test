'use strict';

class _gd_console{
    constructor(container){
        this.container = container;
    }

    print(data){
        let newPrintOut = document.createElement("div");
        newPrintOut.innerHTML = data;
        this.container.append(newPrintOut);
    }

    //simpleText for now
    log(...newData){
        let newPrintOut;
        newData.forEach((data) => {
            newPrintOut = document.createElement("div")
            newPrintOut.innerHTML = data;
            newPrintOut.className = "_gd_console_log";
            this.container.append(newPrintOut);
            newPrintOut.scrollIntoView();
        });
    }
    error(...newData){
        let newPrintOut;
        newData.forEach((data) => {
            newPrintOut = document.createElement("div")
            newPrintOut.innerHTML = data;
            newPrintOut.className = "_gd_console_error";
            this.container.append(newPrintOut);
            newPrintOut.scrollIntoView();
        });
    }
}

function testConole (output, ...dataArray){
    dataArray.forEach((data) => {
        output.print(data);
    })
}

