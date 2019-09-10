'use strict';

class _gd_sandbox_editor{
    constructor(){

        this._hasFile = false;
        this._textArea = document.createElement("textarea");
        this._textArea.className = "editor";
        this._textArea.addEventListener("keyup", function(){
            this._file.content = this._textArea.value;
            console.log(this._file.fileData);
        }.bind(this));

        this.uiElement = this._textArea;
    }
    set className(className){
        this._textArea.className = className;
    }
    get className(){
        return this._textArea.className;
    }
    set id(id){
        this._textArea.id = id;
    }
    get id(){
        return this._textArea.id;
    }
    set file(file){
        //_gd_sandbox_file_isValid(file);
        if(!is_gd_sandbox_file(file)){
            throw new Error("file is not instanceof _gd_sandbox_file");
        }
        this.removeFile();
        if(file.open()){
            this._hasFile = true;
            this._file = file;
            this._textArea.value = this.file.content;
            this._file.editor = this;
        }
        else{
            throw new Error("file is already open");
        }
    }
    removeFile(){
      if(this._hasFile){
          this._file.close();
          this._file.editor = null;
          this._file = null;
          this._hasFile = false;
      }
    }
    get file(){
        return this._file;
    }
    getfile(){
        return this.file;
    }
    setFile(file){
        this.file = file;
    }


}