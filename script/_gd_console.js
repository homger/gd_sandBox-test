'use strict';

class _gd_console{
    constructor(container){
        this.container = container;
    }

    print(data){
        this.container.append(document.createElement("div").innerHTML = data);
    }
}

function testConole (output, ...dataArray){
    dataArray.forEach((data) => {
        output.print(data);
    })
}