'use strict';



class _gd_sandbox_project{
    constructor(project_name, projectFolder = new _gd_sandbox_folder(project_name, "div") ){
        if( !(typeof project_name == "string") )
            throw new TypeError('typeof project_name == "string"');
        
        if(!(projectFolder instanceof _gd_sandbox_folder)){
            console.warn("No projectFolder given or invalid projectFolder");
            this.projectFolder = new _gd_sandbox_folder(project_name);
        }
        else{
            this.projectFolder = projectFolder;
        }
        
        this.name = project_name;
        //this.projectFolder._make_ui_element();
        
        this.projectFolderUiElement = this.projectFolder.uiElement;
        this.projectFolderUiElement._contextmenu_type = "project";
        addClass(this.projectFolderUiElement, "project");
        removeClass(this.projectFolderUiElement, "folder");
        addClass(this.projectFolder.uiContent, "folder project-content");
        this.uiElement = document.createElement("li");
        this.uiElement.append(this.projectFolderUiElement);

        //this.projectFolder.toggleUiContent();
        console.log(this.projectFolder.folderContent);
    }

    projectData(){
        return{
            name : this.name,
            content : this.projectFolder.folderData(),
        };
    }
    addFolder(path){
      this.projectFolder.addFolder(new _gd_sandbox_folder(path));
    }
    addFile(path){
      this.projectFolder.addFolder(new _gd_sandbox_folder(path));
    }

    uiSetup(){
      let cach = this.projectFolder.folderContent;
      this.ui = ui_project(this.projectFolder.name, this.projectFolder);
      while(true){
        this.ui.append(ui_folder());
      }
    }
    
    __uiSetupAddFolder(master, folder){

    }
}

//FOR IE

function removeClass(element, _class){
  let index = element.className.indexOf(_class);

  if(index > -1){
    let classArray = element.className.split("");
    classArray.splice(index, _class.length);
    element.className = classArray.join("");
    return;
  }
}
function addClass(element, _class){
  let index = element.className.indexOf(_class);
  if(index == -1){
    element.className = element.className + " " + _class;
  }
}
function toggleClass(element, _class){
  let index = element.className.indexOf(_class);
  if(index > -1){
    let classArray = element.className.split("");
    classArray.splice(index, _class.length);
    element.className = classArray.join("");
    return;
  }
  element.className = element.className + " " + _class;
}





