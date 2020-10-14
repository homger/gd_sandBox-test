'use strict';

const contextMenuClassName = "context-menu";
const _contextMenuWraper_className = "context-menu-wrapper";


const contextMenuOptions = {
  classList : [],
  optionList : [
    ["N/A", function(event,contextMenuCaller){}],
  ]
};



class _gd_context_menu{
    constructor(contextMenuScope = document.body){
      this.scope = contextMenuScope;

      this.menuList = new Map();
      this._HTMLClassList = new Map();
      this.contextMenuList = new Map();
      this.contextMenuCall = this.contextMenuCall.bind(this)
      this.___windowClick = this.___windowClick.bind(this);
      this.scope.addEventListener("contextmenu", this.contextMenuCall);

      this.contextMenu_ToCall = new Set();
      this._lastTarget = null;
      
      

      this.setUp();

    }
    setUp(){
      this._contextMenuWraper = document.createElement("div");
      this._contextMenuWraper.className = _contextMenuWraper_className;
    }
    
    addContextMenu(contextMenuName, menuOptions = [], _HTMLClassList = []){

      _HTMLClassList.forEach(className => {
        this.__addClassTo_HTMLClassList(className);
        this._HTMLClassList.get(className).add(contextMenuName);

      });
      this.contextMenuList.set(contextMenuName, new __context_menu(contextMenuName, menuOptions, _HTMLClassList));
    }
    addOption(contextMenuName, option = ["N/A",function (){}]){
      if(!this.contextMenuList.has(contextMenuName)){
        console.warn(`contextmenu :  "${contextMenuName}"  not found.`);
        return;
      }
      this.contextMenuList.get(contextMenuName).addOption(option);
    }

    contextMenuCall(event){
      //alert("C MENU CALL");
      let _x = event.pageX, _y = event.pageY;
      if(this._lastTarget === event.target){
        this.mountContextMenu({x: _x, y: _y});
        event.preventDefault();
        return;
      }
      
      this.choseElement(event.target);
      if(this._lastTarget == null)
        return;
      this._buildContextMenu();
      this.mountContextMenu({x: _x, y: _y});
      event.preventDefault();
    }

    addClass(contextMenuName, className = "n/a"){
      if(this.contextMenuList.has(contextMenuName) && typeof className == "string" && className!= "n/a"){
        this.contextMenuList.get(contextMenuName).addHTMLClass(className);

        this.__addClassTo_HTMLClassList(className);
        this._HTMLClassList.get(className).add(contextMenuName);
        return;
      }
      throw new Error("addClass bad parameters");
    }

    __addClassTo_HTMLClassList(className){
      if(!this._HTMLClassList.has(className))
        this._HTMLClassList.set(className, new Set());
    }
    _buildContextMenu(){
      this._contextMenuWraper.innerHTML = "";
      
      this.contextMenu_ToCall.forEach(menuName => {
        //console.log()
        console.log(this._lastTarget);
        this.contextMenuList.get(menuName).contextMenuTarget = this._conextMenuTarget;
        this._contextMenuWraper.appendChild(this.contextMenuList.get(menuName)._uiElement);
      });
    }
    mountContextMenu(screenXY){

      document.body.appendChild(this._contextMenuWraper);
      let xy = this.contextMenuBounding(screenXY);
      this._contextMenuWraper.style.left = xy.x + "px";
      this._contextMenuWraper.style.top = xy.y + "px";

      window.addEventListener("mousedown", this.___windowClick);
    }
    dismountContextMenu(){
      document.body.removeChild(this._contextMenuWraper);
    }
    ///////////////////
    ___windowClick(event){
      if(event.target.parentNode.parentNode === this._contextMenuWraper ){
          return;
        }
      this.dismountContextMenu();
      window.removeEventListener("mousedown", this.___windowClick);
    }
    //////////////////////
    choseElement(target){
      let cach = target;
      this.contextMenu_ToCall.clear();
        while(true){
          console.log(cach.className);
          cach.className.split(" ").forEach(_HTMLClass => {
            if(this._HTMLClassList.has(_HTMLClass)){
              this._HTMLClassList.get(_HTMLClass).forEach(contextMenuName => this.contextMenu_ToCall.add(contextMenuName));
            }
          });

          if(this.contextMenu_ToCall.size > 0){
            console.log(this.contextMenu_ToCall);
            this._lastTarget = target;
            this._conextMenuTarget = cach;
            return;
          }
          cach = cach.parentNode;
          if(cach.className == undefined){
            console.log("No valid element found");
            this._lastTarget = null;
            return;
          }
        }

    }
    

    contextMenuBounding({x,y}){
      let _y = y + this._contextMenuWraper.offsetHeight - document.documentElement.offsetHeight;
      let _x = x + this._contextMenuWraper.offsetWidth - document.documentElement.offsetWidth;
      console.log("_y  :  " + _y);
      if(_y > 0)
        _y  = y - _y;
      else
        _y = y;
      if(_x > 0)
      _x  = x - _x;
      else
        _x = x;

      console.log("contextMenuBounding");
        
      return {x:_x,y:_y};
    }
}

class __context_menu{
  constructor(name, menuItems = [], _HTMLClassList = []){

    this.name = name;

    this.valid_HTMLClasses = new Map();

    _HTMLClassList.forEach(className => this.valid_HTMLClasses.set(className, true));

    this.options = new Map();
    this.nameList = new Set();
    this.optionsToMount = new Set();

    //this.menuItemList = menuItems;
    this.updateUi = true;

    
    this._makeUiElement();
    this.addOptions(menuItems);
  }

  addHTMLClass(className){
    if(typeof className == "string"){
      this.valid_HTMLClasses.set(className, true);
      console.log("addHTMLClass : added Class " + className);
      return;
    }
    throw new Error("addHTMLClass(className)  className is not a string");
  }

  _HTMLClassIsValid(_HTMLClass){
    if(this.valid_HTMLClasses.has(_HTMLClass)){

      return true;
    }
    return false;
  }

  set contextMenuTarget(caller){
    this.options.forEach(option => {
      option.option.contextMenuTarget = caller;
    });
  }

  addOption(item, updateUi = true){
    if(typeof item[0] === "string" && typeof item[1] === "function"){

      if(this.nameList.has(item[0])){
        console.warn(`Option ${item[0]} will be overwritten`);
      }
        
      this.nameList.add(item[0]);
      this.options.set(item[0], {option: new __option(item[0], item[1]), uiMounted: false});
      
      this.optionsToMount.add(item[0]);
      
      this.updateUi = true;

      if(updateUi)
        this. _updateUi();
      return;
    }
    console.warn("addOpiton item is not valid. No option was added");
  }

  addOptions(options){
    options.forEach(item => this.addOption(item, false));
    this. _updateUi();
  }
  _makeUiElement(){
    this._uiElement = document.createElement("div");
    this._uiElement.className = contextMenuClassName;
    this.uiElementMade = true;
    this._updateUi();
  }

  _updateUi(){
    if(!this.uiElementMade){
      throw new Error("this.uiElementMade == false");
      //console.error("Error : this.uiElementMade == false");
      //return;
    }
    let cach;
    this.optionsToMount.forEach(option => {
      cach = this.options.get(option);
      this._uiElement.append(cach.option._uiElement);
      cach.uiMounted = true;
    });

    this.optionsToMount.clear();
    this.updateUi = false;
    console.log("__context_menu UI UPDATED");
  }


}

class __option{
  constructor(name,clickFunction){
    if(!typeof name === "string" || !typeof clickFunction === "function"){

      throw new Error("__option name or function is invalid");
      this.contextMenuTarget = null;
      //return;
    }
    this.name = name;
    this.clickFunction = clickFunction.bind(this);
    //this.validElementIdentifier = validElementIdentifier;
    

    this._uiElement = document.createElement("div");
    
    this._uiElement.innerHTML = name;
    this._uiElement.addEventListener("click", (event) => { 
      console.log(this.contextMenuTarget);
      this.clickFunction(this.contextMenuTarget);
    });
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
  
  
  function hasClass(element, _class){
    let index = element.className.indexOf(_class);
  
    if(index > -1){
      if(checkBorder(element.className, index, _class.length)){
        console.log(element.className);
      }
      return checkBorder(element.className, index, _class.length);
    }
    return false;
  }
  
  function checkBorder(string, index, length){
    let m_length = length - 1;
    if(index > 0 && string[index - 1] !== " ")
      return false;
    if(string.length > index + length && string[index + length] !== " ")
      return false;
    return true;
  }