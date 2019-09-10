
let c = document.getElementById("c");

class gd_switchButton{
    constructor(buttonSizeMultiplier = 1, container, buttonClass = "gd_switchButton", 
    activeButtonClass = "", inactiveButtonClass = ""){   
        this.activeButtonClass = activeButtonClass;
        this.inactiveButtonClass = inactiveButtonClass;     
        if(isNaN(buttonSizeMultiplier)){
            throw new Error("buttonSize is not a number");
        }
        if( (container instanceof HTMLElement)){
            this.dom_container = container;
        }
        else{
            this.dom_container = null;
        }
        this.mutiplier = buttonSizeMultiplier;
        this.mainContainer = document.createElement("div");
        /**
         */
        this.mainContainer.className = "mainContainer";
         /* 
         */
        this.mainContainer.style.width = "100%";
        this.mainContainer.style.height = "100%";
        this.mainContainer.style.position = "relative";

        this.makeButtonContainer();
        this.mainContainer.appendChild(this.buttonContainer);
        if(this.dom_container){
            console.log("mount call");
            this.mount();
            console.log("mount called");
        }

        this.isOpen = false;
        this.buttonClass = buttonClass;
        this.button.className = buttonClass;
        this.addEvents();
    }

    makeButtonContainer(){
        this.buttonContainer = document.createElement("div");
        this.buttonContainer.style.height = "100%";
        this.buttonContainer.style.position = "absolute";
        this.buttonContainer.style.top = "0";
        this.buttonContainer.style.zIndex = "1";
        this.buttonContainer.style.borderLeft = 0;
        this.buttonContainer.style.borderRight = 0;

        //
        this.buttonContainer.style.border = 0;
        //

        this.buttonContainerSides = [];
        let side;
        for(let i = 0; i < 2; ++i){
            side = document.createElement("div");
            side.style.borderRadius = "50%";
            side.style.position = "absolute";
            side.style.height = "100%";
            side.style.zIndex = "0";
            side.style.backgroundColor = "inherit";

            this.buttonContainerSides.push(side);
            this.buttonContainer.appendChild(side);
        }

        this.button = document.createElement("div");
        this.button.style.position = "absolute";
        this.button.style.borderRadius = "50%";
        this.button.style.zIndex = "2";
        /*this.button.style.transitionProperty = "left";
        this.button.style.transition = "linear 0.3s";*/
        
        this.buttonContainer.appendChild(this.button);
    }
    mount(){

        let observer = new MutationObserver((mutationList, observer) => {
            mutationList.forEach(mutation => {
                console.log("dom_container mutation observed");
                if(mutation.type == "childList"){
                    console.log("mutation type == 'childList'");
                    let length = mutation.addedNodes.length;
                    console.log("this.buttonContainer :  " + this.mainContainer);
                    for(let i = 0; i < length; ++i){
                        console.log("ADDED NODE : " + mutation.addedNodes[i]);
                        if(mutation.addedNodes[i] === this.mainContainer){
                            console.log("mutation.addedNodes[i] === this.buttonContainer");
                            this.fixStyle();
                            observer.disconnect();
                            console.log("mutation obsever disconnect");
                            break;
                        }
                    }
                }
            });

        }) ;

        observer.observe(this.dom_container,{childList: true});
        this.dom_container.appendChild(this.mainContainer);
    }

    fixStyle(){
        let buttonContainerStyle = window.getComputedStyle(this.buttonContainer);
        let height = this.buttonContainer.offsetHeight > this.buttonContainer.offsetWidth ?
        this.buttonContainer.offsetHeight : this.buttonContainer.offsetWidth
        ;

        this.buttonContainer.style.width = this.mainContainer.offsetWidth - height + "px";
        this.buttonContainer.style.left = height / 2 + "px";
        
        let b_top = buttonContainerStyle.getPropertyValue("border-top-width");
        let b_top_color = buttonContainerStyle.getPropertyValue("border-top-color");
        let b_top_style = buttonContainerStyle.getPropertyValue("border-top-style");

        let borderWidth = b_top.substring(0,b_top.length - 2);

        console.log(borderWidth);
        this.buttonContainer.style.top = -borderWidth + "px";

        let length = this.buttonContainerSides.length;
        let side;
        for(let i = 0; i < length; ++i){
            side = this.buttonContainerSides[i];
            side.style.width = height;
            side.style.top = -borderWidth + "px";
            side.style.border = borderWidth + "px " +  b_top_style + " " + b_top_color;

            if(i == 0)
                side.style.left = -height/2;
            else
                side.style.right = -height/2;
        }
        let diamerter = height*this.mutiplier - borderWidth*2;
        this.button.style.height = diamerter;
        this.button.style.width = diamerter;
        this.button.style.top = "calc(50% - "+diamerter / 2+"px)";
        
        this._closeData = {
            button:{
                left: -diamerter/2,
            }
        }
        this._openData = {
            button:{
                left: "calc(100% - "+ diamerter/2 +"px)",
            }
        }
        this.close();
        //this.button.style.left = this._closeData.button.left;
        console.log("STYLE FIXED");
    }

    addEvents(){
        this.click = this.click.bind(this);

        this.buttonContainer.addEventListener("click", this.click);
    }

    open(){
        this.button.className = this.buttonClass + " " + this.activeButtonClass;
        this.button.style.left = this._openData.button.left;
    }

    close(){
        this.button.className = this.buttonClass + " " + this.inactiveButtonClass;
        this.button.style.left = this._closeData.button.left;
    }
    click(){
        if(this.isOpen){
                this.close();
            this.isOpen = false;
            return;
        }
        this.open();
        this.isOpen = true;
    }
}