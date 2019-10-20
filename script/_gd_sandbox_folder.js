'use strict';


class _gd_sandbox_folder{
    constructor(name, uiElementType = "li", path = "/", files = new Map(), folders = new Map(), 
    creationDate = Date.now(), lastModified = Date.now()){

        if(!(typeof name == "string"))
            throw new Error ("'name' typeof is not string");
        if(name.includes("/")){
            throw new Error ("'name' Is invalid");
        }

        this._name = name;
        this._path = path;
        this._fullName = this._path + this._name;
        this._childPath = this._path + this.name + "/";
        this._files = files;
        this._folders = folders;
        this._creationDate = creationDate;
        this._lastModified = lastModified;

        this.__array_files_names = this.filesList;
        this.uiElementType = uiElementType;

        this.ui_contentHide = true;
        this.icon = _FOLDER_ICON_48587455485841;

        this.updateChildsParentFolder();
        this._make_ui_element();

    }
    set path(path){
        console.log(path);
        this._path = path;
        this._childPath = path + this._name + "/";
        this._fullName = path + this._name;
        this._folders.forEach(folder => folder.path = this._childPath);
        this._files.forEach(file => file.path = this._childPath);
    }
    set name(name){
        if(!(typeof name == "string"))
            throw new Error ("'name' typeof is not string");
        if(name.includes("/")){
            throw new Error ("'name' Is invalid");
        }
        this._name = name;
        this.path = this._path;
        /*this._childPath = this._path + name + "/";
        this._fullName = this._path + name;
        this._folders.forEach(folder => folder.path = this._childPath);
        this._files.forEach(file => file.path = this._childPath);*/

        this.uiName.innerHTML = this.icon + name;
    }
    get path(){
        return this._path;
    }
    get childPath(){
        return this._childPath;
    }
    get name(){
        return this._name;
    }
    get fullName(){
        return this._fullName;
    }
    get foldersList(){
        return __nameArray(this._folders);
    }
    get filesList(){
        return __nameArray(this._files);
    }
    get folders(){ //List folders folderData()
        let cach = [];
        this._folders.forEach(folder => cach.push(folder.folderData()));
        return cach;
    }
    get foldersNameList(){
        let cach = [];
        this._folders.forEach(folder => cach.push(folder.name));
        return cach;
    }
    get files(){ //List files fileData
        let cach = [];
        this._files.forEach(file => cach.push(file.fileData));
        return cach;
    }
    getFileArrayList(){
        let cach = [];
        this._files.forEach(file => cach.push(file));
        return cach;
    }
    get filesNameList(){
        let cach = [];
        this._files.forEach(file => cach.push(file._name));
        return cach;
    }
    get folderContentList(){
        let cach = [];
        this._folders.forEach(folder => cach.push([folder.name]));
        return[{
            files: this.filesList,
            folders: cach,
        }];
    }
    get folderContent(){
        let cach = [];
        
        this._folders.forEach(folder => cach.push(folder.folderContent) );
        return {
            name: this.name,
            files: this.files,
            folders: cach,
        };
    }
    addFolder(folder){
        if(!is_gd_sandbox_folder(folder)){
            throw new Error("folder is not instanceof _gd_sandbox_folder");
        }
        if(this._folders.has(folder.name)){
            this._folders.get(folder.name).mergeFolder(folder);
        }
        else{
            folder.path = this._childPath;
            this._folders.set(folder.name, folder);
            folder.parentFolder = this;
        }
        this._ui_element_updateData();
        
    }
    newFolder(name){
      let folder = new _gd_sandbox_folder(name);
      this.addFolder(folder);
      return folder;
    }
    addFile(file){
        if(!is_gd_sandbox_file(file)){
            throw new Error("file is not instanceof _gd_sandbox_file");
        }
        this._files.set(file.name, file);
        file._path = this._childPath;
        file.parentFolder = this;
        this._ui_element_updateData();
    }
    mergeFolder(folder){
        if(!is_gd_sandbox_folder(folder)){
            throw new Error("folder is not instanceof _gd_sandbox_folder");
        }
        //folder.path = this._path;
        folder.folders.forEach((folderData) =>{
            if(this._folders.has(folderData.name)){
                this._folders.get(name).
                mergeFolder(_folderFromFolderData(folderData));
            }
            else{
                this._folders.set(folderData.name, 
                  _folderFromFolderData(folderData));
            }
        });
        folder.files.forEach((fileData) => {
            this._files.set(fileData.name, 
              _fileFromFileData(fileData));
        } );

        this.path = this._path;

        console.log("MERGE DONE :  ")
        console.log(this.folderData());
        this._ui_element_updateData();
    }

    folderData(){
        return{
            name: this._name,
            path: this._path,
            files: this.files,
            folders: this.folders,
            creationDate: this._creationDate,
            lastModified: this._lastModified,
            uiElementType: this.uiElementType,
        }
    }

    
    getFolderByName(name){
      if(this._folders.has(name))
        return this._folders.get(name);

      console.warn("folder '"+name+"' not found");
      return undefined;
    }
    getFileByName(name){
      if(this._files.has(name))
        return this._files.get(name);

      console.warn("file '"+name+"' not found");
      return undefined;
    }
    
    _make_ui_element(){
      this.uiElement = document.createElement(this.uiElementType);
      this.uiElement.className = "folder";
      
      this.uiName = document.createElement("div");
      this.uiName.className = "name";
      this.uiName.innerHTML = this.icon + this.name;
      this.uiName.onclick = function(){
        this.parentNode._gd_oject.toggleUiContent();
      }
      this.uiElement.append(this.uiName);

      this.uiContent = document.createElement("ul");
      this.uiContent.className = "folder-content";

      this.uiElement._gd_oject = this;
      this.uiElement._contextmenu_type = "folder";
      this._ui_made = true;

      this.ui_ShowContent();

      if(this.ui_contentHide)
        this.ui_HideContent();
    }

    ui_ShowContent(){
      if(this._ui_made){
        this.uiElement.append(this.uiContent);
        this.contentShow = true;
        toggleClass(this.uiElement, "show-content");
      }
    }

    ui_HideContent(){
      if(this._ui_made && this.contentShow){
        this.uiElement.removeChild(this.uiContent);
        this.contentShow = false;
        toggleClass(this.uiElement, "show-content");
      }
    }

    toggleUiContent(){
      console.log("toggleUiContent");
      if(this._ui_made){
        //debugger;
        if(this.contentShow){
          this.ui_HideContent();
          console.log("HIDE");
          return;
        }
        this.ui_ShowContent();
        console.log("SHOW");
      }
    }
    
    _ui_element_updateData(){
      this.uiContent.innerHTML = "";
      this.folderContent.folders.forEach( ({name}) => {
        this.uiContent.append(this._folders.get(name).uiElement);
      });
      this.folderContent.files.forEach( ({name}) => {
        this.uiContent.append(this._files.get(name).uiElement);
      });
    }

    removeFolder(){
      if(this.parentFolder instanceof _gd_sandbox_folder){
        
        this._files.forEach(file => file.removeFile());
        this.parentFolder._folders.delete(this.name);

      }
      this.uiElement.parentNode.removeChild(this.uiElement);
    }
    removeChildFoler(name){
      if(this._folders.has(name))
        this._folders.get(name).removeFolder();
    }
    removeFile(name){
      if(this._files.has(name))
        this._files.get(name).removeFile();
    }

    updateChildsParentFolder(){
      this._folders.forEach((folder) => {
        folder.parentFolder = this;
      });
      this._files.forEach((file) => {
        file.parentFolder = this;
      });
    }
}


function __nameArray(map){
    let cach = [];
    map.forEach(element => {
        if((element instanceof _gd_sandbox_folder)){
            cach.push(element.name, {
                folders: element.foldersList,
                files: element.filesList,
            })    
        }
        else
            cach.push(element.name);
    });
    return cach;
}

function __valueArray(map){
    let cach = [];
    map.forEach(element => {
        cach.push([element.name,element]);
    });
    return cach;
}

function is_gd_sandbox_folder(folder){
    return (folder instanceof _gd_sandbox_folder);
}

function _folderFromFolderData(folderData){
    let cach;
    let filesMap = new Map();
    let foldersMap = new Map();
    folderData.files.forEach(file => filesMap.set(file.name, _fileFromFileData(file)) );
    
    folderData.folders.forEach(folder => foldersMap.set(folder.name, _folderFromFolderData(folder)));

    cach = new _gd_sandbox_folder(folderData.name, folderData.uiElementType,folderData.path, 
        filesMap, foldersMap, folderData.creationDate, folderData.lastModified);
    ;
    return cach;
}



const _FOLDER_ICON_48587455485841 = `<svg class="gd-folder-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
<g transform="translate(0 16) rotate(-90)">
<path d="M 14.79290008544922 15.5 L 0.5 15.5 L 0.5 1.207100033760071 L 7.646450042724609 8.353549957275391 L 14.79290008544922 15.5 Z"/>
<path d="M 1 2.414219856262207 L 1 15 L 13.58578014373779 15 L 7.292889595031738 8.707109451293945 L 1 2.414219856262207 M 0 0 L 8 8 L 16 16 L 0 16 L 0 0 Z"/>
</g>
</svg>`;

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