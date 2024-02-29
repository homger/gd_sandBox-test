'use strict';

const GD_WINDOW_LIST = [];
const DEFAULLT_PARAMETERS = {
  boundingBlock: null,
  default_z_index: -1,
  moving_z_index: 0,
  sizeMin: {
    w: "25%",
    h: "25%",
  },
  sizeHalf: {
    w: "50%",
    h: "50%",
  },
  sizeFull: {
    w: "100%",
    h: "100%",
  },
  defaultPosition: {
    top: 0,
    left: 0,
  },
  controlPanelPadding: true,
}
if(document.readyState === "complete"){
  DEFAULLT_PARAMETERS.boundingBlock = document.body;
}
else{
  console.warn("document.readyState === complete is false");
}
/*document.addEventListener("readystatechange", function(){
  if(document.readyState === "complete"){
    DEFAULLT_PARAMETERS.boundingBlock = document.body;
  }
});*/

class _gd_window{
    constructor(htmlBlockElementToMove, parameters = DEFAULLT_PARAMETERS){
      
            this.parameters = objectDefaultValue(parameters, DEFAULLT_PARAMETERS);
            
            this.size_full_className = "size-full";
            this.size_half_className = "size-half";
            this.size_min_className = "size-min";
            /*if(!parentTest(boundingBlock, html)){
                throw new Error("!boundingBlock.childNodes.includes(htmlBlockElementToMove) === false");
            }*/
            this.movingDiv = document.createElement("div");
            this.default_z_index = this.parameters.default_z_index;
            this.moving_z_index = this.parameters.moving_z_index;
            
            //debugger;
            this.initialTop = 0, this.initialLeft = 0;
            this.top = this.parameters.defaultPosition.top, this.left = this.parameters.defaultPosition.left, this.boundingBlock = this.parameters.boundingBlock, 
            this.htmlBlockElementToMove = htmlBlockElementToMove, this._size = "mini";
            this.elementValidation(htmlBlockElementToMove);

            this._mouseDownPositionX = 0;
            this._mouseDownPositionY = 0;
            this.refreshGeometry = this.refreshGeometry.bind(this);
            this.styleSetup();
            this.refreshGeometry();
            this.sizeCheck();
            this.setPosition();

            this.mouseUp = this.mouseUp.bind(this);
            this.mouseMove = this.mouseMove.bind(this);
            this.mouseDown = this.mouseDown.bind(this);
            this.boundingBlock_scroll = this.boundingBlock_scroll.bind(this);

            this.boundingBlock.addEventListener("scroll",
            this.boundingBlock_scroll
            );

            if(this._size == "mini")
                this.movingDiv.addEventListener("mousedown", this.mouseDown);

            htmlBlockElementToMove.appendChild(this.movingDiv);
            this.htmlBlockElementToMove.addEventListener("transitionend",() => {
                this.refreshGeometry();
                //this.sizeCheck();
                this.setPosition();
            });
            
            this.htmlBlockElementToMove.addEventListener("scroll",this.scrollFix.bind(this));

            this.observer = new ResizeObserver(this.refreshGeometry);

            this.observer.observe(this.htmlBlockElementToMove, {box: "border-box"});
            
            GD_WINDOW_LIST.push(this);
            this.mountControls();
            

            this.deactivateTransitions();
            this.transition_was_activated = false;
            //return this;
    }

    setBoundingBlock(newBoundingBlock){ //to-do block all _gd_window action durring change..

      this.boundingBlock.removeEventListener("scroll", this.boundingBlock_scroll);
      this.boundingBlock = newBoundingBlock;
      this.boundingBlock.appendChild(this.htmlBlockElementToMove);

      this.boundingBlock.addEventListener("scroll", this.boundingBlock_scroll);

      
      this.refreshGeometry();
      this.sizeCheck();
      this.setPosition();

    }

    scrollFix(event){
      
      this.movingDiv.style.top = this.htmlBlockElementToMove.scrollTop + "px";
      this.movingDiv.style.left = this.htmlBlockElementToMove.scrollLeft + "px";
    }
    refreshGeometry(){
        //this.offsetTopLeft = get_offsetXY(this.boundingBlock);
        this.htmlBlockElementToMove_OffsetHeight = this.htmlBlockElementToMove.offsetHeight;
        this.htmlBlockElementToMove_OffsetWidth = this.htmlBlockElementToMove.offsetWidth;

        this.maxY = this.boundingBlock.clientHeight /*+ this.offsetTopLeft.top*/ - this.htmlBlockElementToMove_OffsetHeight;
        console.log("this.boundingBlock.clientHeight : " + this.boundingBlock.clientHeight);
        console.log("this.boundingBlock.scrollHeight : " + this.boundingBlock.scrollHeight);
        this.maxX = this.boundingBlock.clientWidth /*+ this.offsetTopLeft.left*/ - this.htmlBlockElementToMove_OffsetWidth;
        if(this.boundingBlock.clientHeight == 0){
          console.warn("boundingBlock.clientHeight == 0 is true. This 'could' posse some problems..");
        }
        this.minY = 0;//this.offsetTopLeft.top;
        this.minX = 0;//this.offsetTopLeft.left;
    }

    limitTopLeft(){
        if(this.top > this.maxY)
            this.top = this.maxY;
        else if(this.top < this.minY)
            this.top = this.minY;

        if(this.left > this.maxX)
            this.left = this.maxX;
        else if(this.left < this.minX)
            this.left = this.minX;
    }

    mouseMove(event){
        this.top =  this.initialTop + event.pageY - this._mouseDownPositionY;// + this.boundingBlock.scrollTop;
        this.left = this.initialLeft + event.pageX - this._mouseDownPositionX;// + this.boundingBlock.scrollLeft;
        console.log("minY :  " + this.minY + "      minX :  "  + this.minX);
        this.setPosition();
    }
    mouseDown(event){
        if(event.target === this.controlPanel){//event.target === this.movingDiv){
          event.preventDefault();
          this.initialLeft = this.left;
          this.initialTop = this.top;
          this._mouseDownPositionX = event.pageX;
          this._mouseDownPositionY = event.pageY;
          this.movingDiv.style.zIndex = this.moving_z_index;

          if(this.transition_is_activated){
            this.transition_was_activated = true;
          }
          else{
            this.transition_was_activated = false;
          }
          this.deactivateTransitions();
          
          window.addEventListener("mousemove", this.mouseMove);
          window.addEventListener("mouseup", this.mouseUp);
        }
    }
    mouseUp(){
      if(this.transition_was_activated){
        this.activateTransition();
      }
        this.movingDiv.style.zIndex = this.default_z_index;
        window.removeEventListener("mousemove", this.mouseMove);
        window.removeEventListener("mouseup", this.mouseUp);
    }

    boundingBlock_scroll(event){
      if(true){
        //this.top += this.boundingBlock.scrollTop;
        //this.left += this.boundingBlock.scrollLeft;
        this.setPosition();
      }
    }

    size_min(){
        if(this._size != "mini"){
            this._size = "mini";
            this.movingDiv.addEventListener("mousedown", this.mouseDown);
            this.htmlBlockElementToMove.style.height = this.parameters.sizeMin.h;
            this.htmlBlockElementToMove.style.width =  this.parameters.sizeMin.w;
            this.htmlBlockElementToMove.position = "absolute";
            this.refreshGeometry();
            this.sizeCheck();
            this.setPosition();
        }
    }
    size_half(){
        if(this._size != "half"){
            /*if(this._size == "mini")
                this.movingDiv.removeEventListener("mousedown", this.mouseDown);*/
            this._size = "half";
            this.htmlBlockElementToMove.style.height =  this.parameters.sizeHalf.h;
            this.htmlBlockElementToMove.style.width =  this.parameters.sizeHalf.w;
            this.refreshGeometry();
            this.sizeCheck();
            this.setPosition();
        }
    }
    size_full(){
        if(this._size != "full"){
            /*if(this._size == "mini")
                this.movingDiv.removeEventListener("mousedown", this.mouseDown);*/
            this._size = "full";
            this.htmlBlockElementToMove.style.height =  this.parameters.sizeFull.h;
            this.htmlBlockElementToMove.style.width =  this.parameters.sizeFull.w;
            this.refreshGeometry();
            this.sizeCheck();
            this.setPosition();
        }
    }

    mountControls(){
        let cach = [this.size_full, this.size_half, this.size_min];
        this.controlPanel = document.createElement("div");
        this.controlPanel.classList = "control-panel";
        this.controlPanel.style.boxSizing = "border-box";
        /*this.controlPanel.innerHTML =  `
            <div onclick=${() => this.size_full()}></div>
            <div onclick=${() => this.size_half()}></div>
            <div onclick=${() => this.size_min()}></div>
        `;*/
        cach.forEach(element => {
            let _cach = document.createElement("div");
            _cach.onclick = element.bind(this);
            _cach.style.boxSizing = "border-box";
            this.controlPanel.appendChild(_cach);
        });

        this.setControlClassName();        
            
        this.movingDiv.appendChild(this.controlPanel);
    }
    setControlClassName(){
        this.controlPanel.childNodes[0].className = this.size_full_className;
        this.controlPanel.childNodes[1].className = this.size_half_className;
        this.controlPanel.childNodes[2].className = this.size_min_className;
    }
    elementValidation(htmlBlockElementToMove){
        console.log("this.moving_z_index :  " + this.moving_z_index);
        if(!(htmlBlockElementToMove.parentNode === this.boundingBlock)){
            throw new Error("htmlBlockElementToMove is not direct child of boundingBlock");
        }
        let zIndex = 1;
        let cachZindex;
        htmlBlockElementToMove.childNodes.forEach(child =>{
          if((child instanceof Element)){
            cachZindex = window.getComputedStyle(child).getPropertyValue("z-index");
            console.log(cachZindex);
            if(!isNaN(cachZindex))
            zIndex = cachZindex > zIndex ? cachZindex : zIndex ;
          }
        });
        if(zIndex > this.moving_z_index)
            this.moving_z_index = zIndex;
        console.log("this.moving_z_index :  " + this.moving_z_index);
        console.log("htmlBlockElementToMove z-index: " + 
        window.getComputedStyle(htmlBlockElementToMove).getPropertyValue("z-index"));
        if(isNaN(window.getComputedStyle(htmlBlockElementToMove).getPropertyValue("z-index")))
            htmlBlockElementToMove.style.zIndex = "0";
    }
    setPosition(){
        
        this.limitTopLeft();

        this.htmlBlockElementToMove.style.top = 
        this.top + this.boundingBlock.scrollTop + "px";
        this.htmlBlockElementToMove.style.left = 
        this.left +  this.boundingBlock.scrollLeft + "px";
    }
    styleSetup(){
        this.movingDiv.className = "_gd_window";
        this.movingDiv.style.position = "absolute";
        this.movingDiv.style.boxSizing = "border-box";
        this.movingDiv.style.top = "0";
        this.movingDiv.style.left = "0";
        this.movingDiv.style.width = "100%";
        this.movingDiv.style.height = "100%";
        this.movingDiv.style.margin = "0";
        this.movingDiv.style.padding = "0";
        this.movingDiv.style.zIndex = this.default_z_index;
        this.htmlBlockElementToMove.style.position = "absolute";
        this.htmlBlockElementToMove.style.boxSizing = "border-box";

        console.log("this.get_boundingBlockComputedWidthHeight().height :::  " 
        + this.get_boundingBlockComputedWidthHeight().height);
        //this.boundingBlock.style.height = this.get_boundingBlockComputedWidthHeight().height;
        
        if(this.parameters.controlPanelPadding){
          this.htmlBlockElementToMove.style.paddingTop = "50px";
        }

        this.initialTransition = "width, height, top, left";
    }
    sizeCheck(){
        if(this.htmlBlockElementToMove.offsetHeight > this.boundingBlock.offsetHeight)
            this.htmlBlockElementToMove.style.height = this.boundingBlock.offsetHeight + "px";
        if(this.htmlBlockElementToMove.offsetWidth > this.boundingBlock.offsetWidth)
            this.htmlBlockElementToMove.style.width = this.boundingBlock.offsetWidth + "px";
    }

    setSizeClassName( {full, half, min}  ){
        if(typeof full === "string")
            this.size_full_className = full;
        if(typeof half === "string")
            this.size_half_className = half;
        if(typeof min === "string")
            this.size_min_className = min;

            this.setControlClassName();
    }
    
    get_boundingBlockComputedWidthHeight(){
      let liveCSS = window.getComputedStyle(this.boundingBlock);

      let width = liveCSS.getPropertyValue("width");
      let height = liveCSS.getPropertyValue("height");
      return {width,height};
    }

    deactivateTransitions(){
      //this.initialTransition = window.getComputedStyle(this.htmlBlockElementToMove).getPropertyValue("transition-property");
      this.htmlBlockElementToMove.style.transitionProperty = "none";
      console.log("this.initialTransition  ::" + 
      this.initialTransition);

      this.transition_is_activated = false;
    }
    activateTransition(){
      this.htmlBlockElementToMove.style.transitionProperty = this.initialTransition;
      this.transition_is_activated = true;
    }
}
function get_offsetXY(element){
    let e = element;
    let top = 0, left = 0;

    while(e.nodeName != document.nodeName){
        console.log(e.nodeName);
        top += e.offsetTop;
        left += e.offsetLeft;
        e = e.parentNode;
    }
    console.log(`TOP: ${top} |||||  LEFT: ${left}`);
    return{
        top,
        left,
    }
}


/*
use Object.freeze on defaultObject
*/
function objectDefaultValue(objectToCheck, defaultObject){
  if(typeof defaultObject !== "object"){
    throw new Error("Invalid defaultObject argument");
  }
  if(typeof objectToCheck !== "object"){
    console.warn("argument objectToCheck is not an object. defaultObject wil be copied");
    objectToCheck = {};
  }
  
  let keyArray = Object.keys(defaultObject);
  keyArray.forEach(function(key){
    if(typeof objectToCheck[key] !== typeof defaultObject[key]){
      objectToCheck[key] = defaultObject[key];
    }
  });
  return objectToCheck;
}