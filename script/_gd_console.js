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
}

function testConole (output, ...dataArray){
    dataArray.forEach((data) => {
        output.print(data);
    })
}

