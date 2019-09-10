'use strict';

const PARAMETERS_DEFAULT_VALUE = {
  nav: null,
  header: null,
  editor: null,
  footer: null,
}
const UI_ELEMENTS_NAME = ["nav","header","editor","footer"]

class gd_SandBox{

    constructor(parameters = PARAMETERS_DEFAULT_VALUE){
        this.contextMenuCall = this.contextMenuCall.bind(this);
        this.dblclickCall = this.dblclickCall.bind(this);

        this.parameters = objectDefaultValue(parameters, PARAMETERS_DEFAULT_VALUE);
        
        this.editorList = new Map();

        this.projectsList = [];
        this.projectsNameList = [];
        this.projectCount = 0;
        this.initialSetUp();
        
        window.addEventListener("contextmenu", this.contextMenuCall);
        window.addEventListener("dblclick", this.dblclickCall);
        this.___windowClick = this.___windowClick.bind(this);
        this.removeContextMenu = this.removeContextMenu.bind(this);
        this._preventDefault = this._preventDefault.bind(this);

    }

    initialSetUp(){
      console.log("initialSetUp");
      UI_ELEMENTS_NAME.forEach(function(name){
        if(this.parameters[name] !== null){

          this.parameters[name].innerHTML = "";
          this[name] = this.parameters[name];
        }
      }.bind(this));

      this.nav.innerHTML = "<ul></ul>";
      this.ul = this.nav.querySelector("ul");;
      this.contextMenuNameList = [];
      this.contextMenuSetup();
      this.dblclickSetup();
      this.editorSetup();
      
    }
    
    newProject(name){
        if(!(typeof name == "string")){
            name = "N/A";
        }
        if(typeof this.projectsNameList[name] === "undefined"){
          let newproject = new _gd_sandbox_project(name);
          this.projectsNameList[name] = this.projectCount;
          this.projectsList.push(
            {
              name: name, 
              project: newproject,
              mounted: false,
              //ui_project: ui_project(name),
              index: this.projectCount,
            }
            );
            
            ++this.projectCount;
            this.mountProjects();
            return newproject;
        }
    }

    mountProjects(){
      this.projectsList.forEach(function(projectData){
        if(!projectData.mounted){
          this.ul.append(projectData.project.uiElement);
          this.events(projectData);
        }
      }.bind(this));
    }

    addFolder(path_str, newFolderName){
      let folder = this.findFolder(path_str);
      return folder.newFolder(newFolderName);
    }
    addFile(path_str, file){
      let folder = this.findFolder(path_str);
      folder.addFile(file);
      //return file;
    }
    findFolder(path_str){
      let path_array = this.pathArray(path_str);
      
      let project = this.getProject(path_array[0]);
      let folder = project.projectFolder;
      path_array.shift();

      let length = path_array.length;
      
      
      for(let i = 0; i < length; ++i){
        folder = folder.getFolderByName(path_array[i]);

      }
      return folder;
    }
    getProject(name){
      if(typeof this.projectsNameList[name] === "undefined")
        throw new Error("Project : '" + name + "' not found");
      
      return this.projectsList[this.projectsNameList[name]].project;
    }


    events(projectData){
      console.log("EVENTS");
      //projectData.project.uiElement.addEventListener("contextmenu",this.contextMenuCall);
      //projectData.project.uiElement.addEventListener("click",this.navClick.bind(this));

    }

    contextMenuCall(event){
      console.log(event.screenX);
      
      let gd_object = event.target;
      let length = this.contextMenuNameList.length;
      while(true){
        console.log("ITé --");
        for(let i = 0; i< length; ++i){
          if(hasClass(gd_object, this.contextMenuNameList[i])){
            
            this.contextMenu_ChoosenElement = gd_object._gd_oject;
            console.log(gd_object);
            this.contextMenuPop(this.contextMenu_ChoosenElement,
              {
                x: event.pageX,
                y: event.pageY,
              });
              event.preventDefault();
              return;
          }
        }
        gd_object = gd_object.parentNode;
        if(gd_object.tagName == "BODY" || gd_object.tagName == "body")
          return;
      }
    }
    contextMenuPop(gd_element, xy){
      console.log(gd_element.uiElement._contextmenu_type);

      this.chosenContextMenu = this.contextMenuList[gd_element.uiElement._contextmenu_type];
      this.openedContextmenuType = gd_element.uiElement._contextmenu_type;

      document.body.appendChild(this.chosenContextMenu);

      let _xy = this.contextMenuBounding(xy);
      this.chosenContextMenu.style.top = _xy.y + "px";
      this.chosenContextMenu.style.left = _xy.x + "px";

      window.addEventListener("mousedown", this.___windowClick);
    }

    ___windowClick(event){
      if(event.target.parentNode === this.chosenContextMenu 
        || event.target === this.chosenContextMenu){
          return;
        }
      document.body.removeChild(this.chosenContextMenu);
      window.removeEventListener("mousedown", this.___windowClick);
    }
    removeContextMenu(){
      document.body.removeChild(this.chosenContextMenu);
      window.removeEventListener("mousedown", this.___windowClick);
    }

    navClick(event){
      console.log(" click");
      if(event.target.className === "gd-folder-icon"){
        console.log("gd-folder-icon click");
        event.target.parentNode.parentNode._gd_oject.toggleUiContent();
      }
    }


    pathArray(path_str){
      let path = path_str.split("/");
      path.shift();
      if(path[path.length - 1] == "")
        path.pop();
        
      return path;
    }

    contextMenuBounding({x,y}){
      let _y = y + this.chosenContextMenu.offsetHeight - document.documentElement.offsetHeight;
      let _x = x + this.chosenContextMenu.offsetWidth - document.documentElement.offsetWidth;
      console.log("_y  :  " + _y);
      if(_y > 0)
        _y  = y - _y;
      else
        _y = y;
      if(_x > 0)
      _x  = x - _x;
      else
        _x = x;
        
      return {x:_x,y:_y};
    }
    contextMenuSetup(){
      this.contextMenuList = [];
      
      this.contextMenuMake("folder",[
        ["New Folder", function(){
          this.contextMenu_ChoosenElement.newFolder(prompt("New Folder name", "N/A"));
        }.bind(this), "add-folder"],
        ["Remove folder", function(){
          this.contextMenu_ChoosenElement.removeFolder();
        }.bind(this), "remove-folder"],
      ]);
      
      this.contextMenuMake("project",[
        ["New Folder", function(){
          this.contextMenu_ChoosenElement.newFolder(prompt("New Folder name", "N/A"));
        }.bind(this), "add-folder"],
      ]);
      
      this.contextMenuMake("file",[
        ["Remove file", function(){
          if(this.contextMenu_ChoosenElement.isOpen){
            this.closeFile(this.contextMenu_ChoosenElement);
          }
          this.contextMenu_ChoosenElement.removeFile();
        }.bind(this), "remove-file"],
        ["Open file", function(){
          this.openFile(this.contextMenu_ChoosenElement);
        }.bind(this), "open-file"],
        ["Close file", function(){
          this.closeFile(this.contextMenu_ChoosenElement);
        }.bind(this), "close-file"],
      ]);


      }
    
    _preventDefault(event){
      event.preventDefault();
    }
    contextMenuMake(contextMenuName, options){
      this.contextMenuNameList.push(contextMenuName);
      this.contextMenuList[contextMenuName] = document.createElement("div");
      this.contextMenuList[contextMenuName].className = "context-menu";

      this.contextMenuList[contextMenuName].addEventListener("contextmenu",this._preventDefault);

      let cach;
      options.forEach((option) => {
        cach = document.createElement("div");
        cach.innerHTML = option[0];
        cach.onclick = function(){
          this.removeContextMenu();
          option[1]();
        }.bind(this);
        if(typeof option[3] === "string")
          cach.className = option[3];
        
          this.contextMenuList[contextMenuName].append(cach);
      });

    }
    dblclickSetup(){
      this.dblclickNameList = [];
      this.dblclickNameList.push("file");
    }
    dblclickCall(event){
      console.log(event.screenX);
      
      let gd_object = event.target;
      let length = this.dblclickNameList.length;
      while(true){
        for(let i = 0; i< length; ++i){
          if(hasClass(gd_object, this.dblclickNameList[i])){
            
            this.dblclick_ChoosenElement = gd_object._gd_oject;
            console.log(gd_object);
            this.dblclickAction(this.dblclick_ChoosenElement,
              {
                x: event.pageX,
                y: event.pageY,
              });
              event.preventDefault();
              return;
          }
        }
        gd_object = gd_object.parentNode;
        if(gd_object.tagName == "BODY" || gd_object.tagName == "body")
          return;
      } 
    }
    dblclickAction(element){
      console.log("dblclickAction");
      this.openFile(element);
    }

    openFile(file){
      
      if(!file.isOpen){
        let _editor = new _gd_sandbox_editor();
        this.editorList.set(file, _editor);
        _editor.setFile(file);
        this.editor.append(_editor.uiElement);
        this.addEditorSelector(file);
        this.editorSelectFile(file);
      }
    }
    closeFile(file){
      if(file.isOpen){

          let _editor = this.editorList.get(file);
          _editor.removeFile();
          this.editorList.delete(file);
          this.editor.removeChild(_editor.uiElement);
          this.removeEditorSelector(file);
        }
    }

    editorSetup(){
      this.editorSelectorSetup();
    }
    editorSelectorSetup(){
      this.contextMenuNameList.push("selector");
      this.editorSelector = document.createElement("div");
      this.editorSelector.className = "editor-selector";
      this.editorSelectorList = new Map();
      this.selectedFile = null;

      this.editor.append(this.editorSelector);


      this.editorSelector.addEventListener("click",function(event){
        if(event.target.parentNode.className === "selector"){
          this.editorSelectFile(event.target.parentNode._gd_oject);
        }
        
      }.bind(this));
    }
    addEditorSelector(file){

      let selector = document.createElement("div");
      selector._contextmenu_type = "file";
      selector.className = "selector";
      selector.innerHTML = file.name;
      selector._gd_oject = file;

      let overlay = document.createElement("div");
      overlay.style.position = "absolute";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.height = "100%";
      overlay.style.width = "100%";
      //overlay
      selector.appendChild(overlay);
      this.editorSelectorList.set(file, selector);
      this.editorSelector.append(selector);
    }
    removeEditorSelector(file){
      let selector = this.editorSelectorList.get(file);
      this.editorSelectorList.delete(file);
      this.editorSelector.removeChild(selector);
    }
    editorSelectFile(file){
      if(this.selectedFile instanceof _gd_sandbox_file 
        && this.selectedFile.isOpen){
          this.selectedFile.editor.uiElement.style.zIndex = "0";
          //toggleClass(this.editorSelectorList.get(this.selectedFile), "seleted");
      }
      this.selectedFile = file;
      this.selectedFile.editor.uiElement.style.zIndex = "1";
      //toggleClass(this.editorSelectorList.get(this.selectedFile), "seleted");
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