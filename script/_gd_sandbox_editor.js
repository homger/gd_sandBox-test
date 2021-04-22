'use strict';

class _gd_sandbox_editor{
    constructor(){

        this._hasFile = false;
        this._editor = document.createElement("pre");
        this._editor.className = "editor";
        this._editor.contentEditable = true;
        
        this.keyActionSetup();
        
        this.keyAction = this.keyAction.bind(this);
        
        
        this._editor.addEventListener("keyup", function(){
            this._file.content = this._editor.textContent;
            console.log(`slect start:  ${this._getSelector().anchorOffset} || slect end: ${this._getSelector().focusOffset}`);
        }.bind(this));
        this._editor.addEventListener("keydown", this.keyAction);

        this.uiElement = this._editor;
    }
    get cursorIndex(){
        return this._getSelector().anchorOffset == this._getSelector().focusOffset ? this._getSelector().focusOffset : undefined;
    }
    
    set cursorIndex(index){
        /*if(index > this.textAreaValueLength){
            this._textArea.anchorOffset = this.textAreaValueLength - 1;
            this._textArea.focusOffset = this.textAreaValueLength - 1;
        }*/
        this._getSelector().anchorOffset += index;
        this._getSelector().focusOffset += index;
    }
    /*moveCursorIndex(index){
        this._textArea.anchorOffset = index;
        this._textArea.focusOffset = index;
    }*/
    get textAreaValueLength(){
        return this._editor.textContent.length;
    }
    /*get textAreaValue(){
        return this._textArea.value;
    }
    set textAreaValue(value){
        return this._textArea.value = value;
    }*/
    get charAt(){
        return this._editor.textContent[index];
    }
    _getSelector(){
        if(document.activeElement === this._editor)
            return window.getSelection();
        return undefined;
    }
    get selectionActive(){
        return this._getSelector().anchorOffset == this._getSelector().focusOffset ? false : true;
    }
    get anchor_focus_offset(){
        return {
            anchorOffset: this.anchorOffset,
            focusOffset: this.focusOffset,
        }
    }
    get anchorOffset(){
        return this._getSelector().anchorOffset;
    }
    set anchorOffset(s_start){
        return this._getSelector().anchorOffset = s_start;
    }
    get focusOffset(){
        return this._getSelector().focusOffset;
    }
    set focusOffset(s_end){
        return this._getSelector().focusOffset = s_end;
    }
    set className(className){
        this._editor.className = className;
    }
    get className(){
        return this._editor.className;
    }
    set id(id){
        this._editor.id = id;
    }
    get id(){
        return this._editor.id;
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
            this._editor.textContent = this.file.content;
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
    insertText(text){
        if(this.selectionActive){

        }
        this.insertTextAtIndex(text, index);
    }
    
    insertTextAtIndex(text, index){
        
    }
    print(printValue, cursorOffset){
        const {anchorOffset, focusOffset} = this.anchor_focus_offset;
        let value = this._editor.textContent;

        if(anchorOffset != focusOffset){
            if(anchorOffset - focusOffset > 0)
                this._editor.textContent = `${value.slice(0,focusOffset)}${printValue}${value.slice(anchorOffset)}`;
            else
                this._editor.textContent = `${value.slice(0,anchorOffset)}${printValue}${value.slice(focusOffset)}`;
        
        
        
            this._getSelector().removeAllRanges();
            
            let range = document.createRange();
            range.setStart(this._editor, anchorOffset + printValue.length + cursorOffset);
            this._getSelector().addRange(range);

            //this._getSelector().focusOffset = anchorOffset + printValue.length + cursorOffset;
            //this._getSelector().anchorOffset = anchorOffset + printValue.length + cursorOffset;
            return;
        }
        
        this._editor.textContent = `${value.slice(0,anchorOffset)}${printValue}${value.slice(anchorOffset)}`;
        
        
        
        this._getSelector().removeAllRanges();
        
        let range = document.createRange();
        range.setStart(this._editor, anchorOffset + printValue.length + cursorOffset);
        this._getSelector().addRange(range);

        //this._getSelector().focusOffset = focusOffset + printValue.length + cursorOffset;
        //this._getSelector().anchorOffset = anchorOffset + printValue.length + cursorOffset;
        

        //console.log(value);
    }
    /*
    keyAction options = {
        printKey: true,
        printValue: "",
        cursorOffset: 0,
        specialAction: true,
        specialFunction: function(textArea){}
    }
    */

    keyActionSetup(){

        this.keyActionMap = new Map();

        this.addKeyAction("Tab", {printKey: true, printValue: "  "});
        this.addKeyAction("{", {printKey: true, printValue: "{}", cursorOffset: -1});
        this.addKeyAction("(", {printKey: true, printValue: "()", cursorOffset: -1});
        this.addKeyAction("Backspace", {specialAction: true, specialFunction: function(textArea){}});

    }
    addKeyAction(keyValue, options){
        this.keyActionMap.set(keyValue, options);
    }

    keyAction(keyboardEvent){
        
        console.log(keyboardEvent.key);
        let key = this.keyActionMap.get(keyboardEvent.key);
        if(key.printKey == true){
            this.print(key.printValue, key.cursorOffset);

            keyboardEvent.preventDefault();
        }
    }
    

}