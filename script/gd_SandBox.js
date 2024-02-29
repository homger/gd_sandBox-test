'use strict';
let _LOG;


const PARAMETERS_DEFAULT_VALUE = {
  nav: null,
  header: null,
  editor: null,
  footer: null,
}
const UI_ELEMENTS_NAME = ["nav","header","editor","footer"]

const folderClassName = "folder";

class gd_SandBox{

    constructor(globalContainer){//parameters = PARAMETERS_DEFAULT_VALUE){
        
        this.test = this.test.bind(this);
        this.dblclickCall = this.dblclickCall.bind(this);

        this.parameters = PARAMETERS_DEFAULT_VALUE;//objectDefaultValue(parameters, PARAMETERS_DEFAULT_VALUE);
        
        this.editorList = new Map();
        this.globalContainer = globalContainer;

        this.projectsList = [];
        this.projectsNameList = [];
        this.projectCount = 0;
        this.globalClassNameList = new Set();

        
        window._gd_SandBox = {};
        this.initialSetUp();
        
        
        window.addEventListener("dblclick", this.dblclickCall);
        
        
        this._preventDefault = this._preventDefault.bind(this);

    }

    initialSetUp(){
      console.log("initialSetUp");
      this.contextMenuNameList = [];


      this.buildUi();

      this.contextMenuSetup();
      this.clickSetup();
      this.dblclickSetup();
      this.editorSetup();
      this.consoleSetup();
      this.optionsSetup();
    }
    buildUi(){

      this.main = document.createElement("main");
      this.main.className = "gd_sandBox";
      this.globalContainer.append(this.main);

      this.nav = document.createElement("nav");
      this.header = document.createElement("header");
      this.editor = document.createElement("section");
      this.footer = document.createElement("footer");

      this.nav.className = "gd_sandBox_nav";
      this.header.className = "gd_sandBox_header";
      this.editor.className = "gd_sandBox_editor";
      this.footer.className = "gd_sandBox_footer";


      UI_ELEMENTS_NAME.forEach(name => this.main.append(this[name]));

      this.nav.innerHTML = "<ul></ul>";
      this.ul = this.nav.querySelector("ul");

      this.viewWindow = document.createElement("div");
      this.viewWindow.className = "gd_sandBox_viewWindow";

      this.main.append(this.viewWindow);
      this.viewWindow_gd_window_object = new _gd_window(this.viewWindow, {defaultPosition:{top: 500, left: 500},boundingBlock: this.main, default_z_index: -1});
      this.viewWindow_gd_window_object_boundingblock = "main";


      
      
      this.viewer = _gd_sandbox_viewer("gd_viewer");
      this.viewWindow.append(this.viewer);
      
    }
    globalClassNameList_setUp(){
      this.globalClassNameList.add("selector");
      this.globalClassNameList.add("editor-selector");
      this.globalClassNameList.add("folder");
      this.globalClassNameList.add("gd_sandBox");
      this.globalClassNameList.add("gd_sandBox_nav");
      this.globalClassNameList.add("gd_sandBox_header");
      this.globalClassNameList.add("gd_sandBox_editor");
      this.globalClassNameList.add("gd_sandBox_footer");
    }

    clickSetup(){
      this._clickFunction = this._clickFunction.bind(this);
      this.main.addEventListener("click", this._clickFunction);
    }
    
    _clickFunction(event){

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
            newproject._gd_parrent = this;
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
    contextMenuSetup(){
      //
      let scope = document.body;
      //
      this.contextMenu = new _gd_context_menu(scope);

      this.contextMenu.addContextMenu("folder");//,[], [folderClassName]);
      this.contextMenu.addClass("folder", folderClassName);


      this.contextMenu.addOption("folder",["New Folder", function(uiElementCaller){
        console.log(uiElementCaller._gd_oject);
        this.contextMenu_ChoosenElement =  uiElementCaller._gd_oject;
        this.contextMenu_ChoosenElement.newFolder(prompt("New Folder name", "N/A"));
      }.bind(this)]);
      this.contextMenu.addOption("folder",["Remove folder", function(uiElementCaller){
        this.contextMenu_ChoosenElement =  uiElementCaller._gd_oject;
        this.contextMenu_ChoosenElement.removeFolder();
      }.bind(this)]);
      this.contextMenu.addOption("folder",["New File", function(uiElementCaller){
        this.contextMenu_ChoosenElement =  uiElementCaller._gd_oject;
        this.contextMenu_ChoosenElement.newFile(prompt("New File name", "N/A"), "text/plain");
      }.bind(this)]);
      
      
      this.contextMenu.addContextMenu("project",[],["project"]);
      this.contextMenu.addOption("project",["New Folder", function(uiElementCaller){
          this.contextMenu_ChoosenElement =  uiElementCaller._gd_oject;
          this.contextMenu_ChoosenElement.newFolder(prompt("New Folder name", "N/A"));
        }.bind(this)]);
      
      this.contextMenu.addContextMenu("file",[
        ["Remove file", function(uiElementCaller){

          this.contextMenu_ChoosenElement =  uiElementCaller._gd_oject;

          if(this.contextMenu_ChoosenElement.isOpen){
            this.closeFile(this.contextMenu_ChoosenElement);
          }
          this.contextMenu_ChoosenElement.removeFile();
          
        }.bind(this), "remove-file"],

        ["Open file", function(uiElementCaller){

          this.contextMenu_ChoosenElement =  uiElementCaller._gd_oject;
          this.openFile(this.contextMenu_ChoosenElement);

        }.bind(this), "open-file"],

        ["Close file", function(uiElementCaller){
          
          this.contextMenu_ChoosenElement =  uiElementCaller._gd_oject;
          this.closeFile(this.contextMenu_ChoosenElement);

        }.bind(this), "close-file"],
      ], ["file","selector"]);

      this.contextMenu.addContextMenu("option");//,[], [folderClassName]);
      this.contextMenu.addClass("option", "option");
      }
    
    _preventDefault(event){
      event.preventDefault();
    }
    dblclickSetup(){
      this.dblclickNameList = [];
      this.dblclickNameList.push("file");
    }
    /**Description:dbcliclCall;
     *When doubleclicking on an element inside the sandbox tryes to find if the element or ones of his parent posses a class listed in ~dblclickNameList~
     *if true an appropriate action should be called using ~dblclickAction~.[Not implemented]
     */
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
    /**Description:dblclickAction;
     *Called when ~dblclickCall~ finds an element with the required class. [Needs to be implemented]
     *Make-sure: mabybe use aposition of the cursor. {
                x: event.pageX,
                y: event.pageY,
              }
              wrote this as an addition arg for dblclickAction don't remember why
     */
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

        file.addEventListener("filechange", this.test);
      }
    }

    bundleProject(){

    }

    

    test(fileEvent){
      if( !this.optionMap.get("auto_refresh").status ){
        return;
      }
      console.log("FILE EVENT TEST");
      //this.viewer.setDocument("<script>window.console = window.parent._gd_SandBox.console;</script>" + fileEvent.content);
      //test_wrapJavascript(fileEvent.content, this.test_wraped_reciveFile.bind(this));
      test_wrapJavascript(fileEvent.content).then((fileStr) => {
        console.log("THEN ");
        this.viewer.setDocument(fileStr);
      });
      console.log("test(fileEvent){");
    }

    renderCurrentSelectedFile(){
      test_wrapJavascript(this.selectedFile.content).then((fileStr) => {
        console.log("THEN ");
        this.viewer.setDocument(fileStr);
      });
    }

    test_wraped_reciveFile(fileString){
      console.log("test_wraped_reciveFile(fileString){");
      this.viewer.setDocument(fileString);
    }

    closeFile(file){
      if(file.isOpen){

          let _editor = this.editorList.get(file);
          _editor.removeFile();
          this.editorList.delete(file);
          this.editor.removeChild(_editor.uiElement);
          this.removeEditorSelector(file);
          file.removeEventListener("filechange", this.test);
        }
    }
    /**Description:editorSetup;
     *The only use for the moment is calling ~editorSelectorSetup~
     * ~editorSelectorSetup~ is to create the little widgets at the top of the editor window that allow you to select a different file.
     * 
     */
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



    //Experimenting with the console

    consoleSetup(){
      this._console = new _gd_console(this.footer);

      window._gd_SandBox.console = this._console;
    }
    /*log(...data){
      //debugger;
      testConole(this._console, ...data);
    }*/
    

    optionsSetup(){
      this.optionMap = new Map();
      
      this.optionMap.set("auto_refresh", new _gd_sandbox_option("auto_refresh", "checkbox", "toggle auto refresh of the render viewport"));
      this.header.append(this.optionMap.get("auto_refresh").uiElement)
      
      //=========================================================
      
      this.optionMap.set("refresh_viewport", new _gd_sandbox_option("refresh_viewport", "function", "refresh the viewport", this.renderCurrentSelectedFile.bind(this)));
      this.header.append(this.optionMap.get("refresh_viewport").uiElement)
      
      //=========================================================
      
      this.optionMap.set("toggle_view_window_transition", 
      new _gd_sandbox_option("toggle_view_window_transition", "checkbox", "toggle transitions of the render viewport"));
      
      this.optionMap.get("toggle_view_window_transition").addEventListener("activated",function(event){
        if(event.status){
          this.viewWindow_gd_window_object.activateTransition();
        }
        else{
          this.viewWindow_gd_window_object.deactivateTransitions();
        }
      }.bind(this));

      this.header.append(this.optionMap.get("toggle_view_window_transition").uiElement);

      //=========================================================

      this.optionMap.set("select_viewer_bounding_block", new _gd_sandbox_option("select_viewer_bounding_block", "text_value_select", "Select the boundingblock of the render viewport",
      ["nav","header","editor","footer","main"]));

      this.optionMap.get("select_viewer_bounding_block").addEventListener("activated",function({status}){
        if(this.viewWindow_gd_window_object_boundingblock == status)
          return;

        this.viewWindow_gd_window_object.setBoundingBlock(this[status]);
        this.viewWindow_gd_window_object_boundingblock = status
        
      }.bind(this));
      this.header.append(this.optionMap.get("select_viewer_bounding_block").uiElement);

      //=========================================================
      
    }
}

async function gd_search(searchStr){

}

const gd_search_worker_file = new _gd_sandbox_file("gd_search_worker_file", "text/javascript");


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