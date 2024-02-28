'use strict';

/*
const vrCursor = {
    sloted_gd_sandbox_editor : {},
    editor_slothed : false,
    slothEditor : function(editor){
        if(editor instanceof _gd_sandbox_editor){
            if(this.editor_slothed){
                this.sloted_gd_sandbox_editor.slothed_in_vrCursor = false;   
            }
            this.sloted_gd_sandbox_editor = editor;
            this.editor_slothed = true;
            this.sloted_gd_sandbox_editor.slothed_in_vrCursor = true;
        }
        else{
            console.warn("editor instanceof _gd_sandbox_editor  == false");
        }
    },
    line : 0,
    index : 0,
    _lineOffset: 0,
    _indexOffset: 0,
    _apply_lineOffset: () => {this.line += this._lineOffset; this._lineOffset = 0},
    _apply_indexOffset: () => {this.index += this._indexOffset; this._indexOffset = 0},
    applyOffset: () => {
        this._apply_lineOffset();
        this._apply_indexOffset();
    },
    reset : function(editor){
        if(editor !== this.sloted_gd_sandbox_editor){
            throw new Error("editor !== this.sloted_gd_sandbox_editor");
            return;
        }
        this.line = 0;
        this.index = 0;
        this._lineOffset = 0;
        this._indexOffset = 0;
    },
    updateFrom : function(from){
        switch(from){
            case "anchor_selection":
                let currentSelection = window.getSelection();
                let valid_anchor = getValidParent(currentSelection.anchorNode);
                this.line = !isNaN(valid_anchor._line_number)?  valid_anchor._line_number : this.line;
                this.index = currentSelection.anchorOffset;
                console.log("line :  " + this.line + "       index :  " + this.index);
                break;
            case "filteredSelector":
                
                this.sloted_gd_sandbox_editor.__filteredSelectorObjectUpToDate = false;
                this.line = this.sloted_gd_sandbox_editor.filteredSelector().startLine;
                this.index = this.sloted_gd_sandbox_editor.filteredSelector().startIndex;
                console.log("line :  " + this.line + "       index :  " + this.index);
                break;
            case "previousData":
                
                this.line = this.sloted_gd_sandbox_editor.lineBeforUnslot;
                this.index = this.sloted_gd_sandbox_editor.indexBeforUnslot;
                console.log("line :  " + this.line + "       index :  " + this.index);
            default: return;
        }
    },
    update : function(element){
        switch(element){
            case "index":
                this.index = currentSelection.anchorOffset;
                break;
            case "carret":
                this.sloted_gd_sandbox_editor.__updateCursorPosition();
                break;
            default: return;
        }
    },
    up : function(){
        if(this.line > 0){
            --this.line;
            if(this.index > this.sloted_gd_sandbox_editor.current_line.length - 1){
                this.index = this.sloted_gd_sandbox_editor.current_line.length;
            }
        }
    },
    down : function(){
        if(this.sloted_gd_sandbox_editor.lineCount > this.line + 1){
            ++this.line;
            if(this.index > this.sloted_gd_sandbox_editor.current_line.length - 1){ //??
                this.index = this.sloted_gd_sandbox_editor.current_line.length;
            }
        }
    },
    left : function(){
        if(this.index > 0){
            --this.index;
            return true;
        }
        else if(this.line > 0){
            --this.line;
            this.index = this.sloted_gd_sandbox_editor.current_line.length;
            return true;
        }
        return false;
    },
    right : function(){
        if(this.sloted_gd_sandbox_editor.current_line.length > this.index){
            ++this.index;
            return true;
        }
        else if(this.line < this.sloted_gd_sandbox_editor.lineCount - 1){
            ++this.line;
            this.index = 0;
            return true;
        }
        return false;
    },
    home : function(){ 
        this.index = 0;
    },
    end : function(){ 
        this.index = this.sloted_gd_sandbox_editor.current_line.length;
    },

}
vrCursor.updateFrom = vrCursor.updateFrom.bind(vrCursor);
vrCursor.update = vrCursor.update.bind(vrCursor);
*/

class vrCursor{
    constructor(editor){
        this._gd_sandbox_editor = editor;
        this.editor_slothed = true;
        this.line = 0;
        this.index = 0;
        this._lineOffset = 0;
        this._indexOffset = 0;
    }
    /*slothEditor(editor){
        if(editor instanceof _gd_sandbox_editor){
            if(this.editor_slothed){
                this.sloted_gd_sandbox_editor.slothed_in_vrCursor = false;   
            }
            this.sloted_gd_sandbox_editor = editor;
            this.editor_slothed = true;
            this.sloted_gd_sandbox_editor.slothed_in_vrCursor = true;
        }
        else{
            console.warn("editor instanceof _gd_sandbox_editor  == false");
        }
    }*/
    _apply_lineOffset(){
        this.moveLineX(this._lineOffset);
        this._lineOffset = 0;
    }
    _apply_indexOffset(){
        this.moveIndeX(this._indexOffset);
        this._indexOffset = 0;
    }
    moveIndeX(x){
        if(x < 0){
            for(let i = 0; i > x; --i){
                this.left();
            }
        }
        else{
            for(let i = 0; i < x; ++i){
                this.right();
            }
        }
    }
    moveLineX(x){
        if(x < 0){
            for(let i = 0; i > x; --i){
                this.up();
            }
        }
        else{
            for(let i = 0; i < x; ++i){
                this.down();
            }
        }
    }
    applyOffset(){
        this._apply_lineOffset();
        this._apply_indexOffset();
    }
    reset(){
        /*if(editor !== this._gd_sandbox_editor){
            throw new Error("editor !== this.sloted_gd_sandbox_editor");
            return;
        }*/
        this.line = 0;
        this.index = 0;
        this._lineOffset = 0;
        this._indexOffset = 0;
    }
    updateFrom (from){
        switch(from){
            case "anchor_selection":
                let currentSelection = window.getSelection();
                let valid_anchor = getValidParent(currentSelection.anchorNode);
                this.line = !isNaN(valid_anchor._line_number)?  valid_anchor._line_number : this.line;
                this.index = currentSelection.anchorOffset;
                console.log("line :  " + this.line + "       index :  " + this.index);
                break;
            case "filteredSelector":
                
                this._gd_sandbox_editor.__filteredSelectorObjectUpToDate = false;
                this.line = this._gd_sandbox_editor.filteredSelector().startLine;
                this.index = this._gd_sandbox_editor.filteredSelector().startIndex;
                console.log("line :  " + this.line + "       index :  " + this.index);
                break;
            case "previousData":
                
                this.line = this._gd_sandbox_editor.lineBeforUnslot;
                this.index = this._gd_sandbox_editor.indexBeforUnslot;
                console.log("line :  " + this.line + "       index :  " + this.index);
            default: return;
        }
    }
    update (element){
        switch(element){
            case "index":
                this.index = currentSelection.anchorOffset;
                break;
            case "carret":
                this._gd_sandbox_editor.__updateCursorPosition();
                break;
            default: return;
        }
    }
    up (){
        if(this.line > 0){
            --this.line;
            if(this.index > this._gd_sandbox_editor.current_line.length - 1){
                this.index = this._gd_sandbox_editor.current_line.length;
            }
        }
    }
    down(){
        if(this._gd_sandbox_editor.lineCount > this.line + 1){
            ++this.line;
            if(this.index > this._gd_sandbox_editor.current_line.length - 1){ //??
                this.index = this._gd_sandbox_editor.current_line.length;
            }
        }
    }
    left(){
        if(this.index > 0){
            --this.index;
            return true;
        }
        else if(this.line > 0){
            --this.line;
            this.index = this._gd_sandbox_editor.current_line.length;
            return true;
        }
        return false;
    }
    right(){
        if(this._gd_sandbox_editor.current_line.length > this.index){
            ++this.index;
            return true;
        }
        else if(this.line < this._gd_sandbox_editor.lineCount - 1){
            ++this.line;
            this.index = 0;
            return true;
        }
        return false;
    }
    home(){ 
        this.index = 0;
    }
    end(){ 
        this.index = this._gd_sandbox_editor.current_line.length;
    }

}

//@GDn&p+gbg
class _gd_sandbox_editor{
    constructor(){

        this._hasFile = false;
        this._editor = document.createElement("pre");
        this._editor.className = "editor";
        this._editor.contentEditable = true;
        this._editor._gdm_editor = true;

        this.slothed_in_vrCursor = false;
        this.vrCursor = new vrCursor(this);
        //vrCursor.slothEditor(this);
        this.vrCursor.reset();
        //this.getVrCursor = this.__vrCursor;
        this.vrCursorSetup();
        
        this.keyAction = this.keyAction.bind(this);
        this.keyUpAction = this.keyUpAction.bind(this);

        this._lineArray = [];
        this._lineMap = new Map(); //to test will delete this._lineArray if ok
        this.lineCount = 0;
        this.newLine = this.newLine.bind(this);
        this.insertLine = this.insertLine.bind(this);
        this.splitLine = this.splitLine.bind(this);
        //this.deleteSelection = this.deleteSelection.bind(this);
        
        this.__filteredSelectorObjectUpToDate = false;
        this.__filteredSelectorObject = null;

        this.focusedLine = -1;
        
        this.copyPastSetup();
        this.keyActionExceptionSetup();
        this.keyActionSetup();
        this.keyCombinationSetup();
        //this.mutationObserverSetup(); Useless for now
        
        /*this._editor.addEventListener("keyup", function(){
            this._file.content = this._editor.textContent;
            console.log(`slect start:  ${this._getSelector().anchorOffset} || slect end: ${this._getSelector().focusOffset}`);
        }.bind(this));*/
        this._editor.addEventListener("keydown", this.keyAction);
        this._editor.addEventListener("keyup", this.keyUpAction);

        this.hasFocus = false
        this._editor.addEventListener("focus", this.onFocus.bind(this));
        this._editor.addEventListener("focusout", this.onFocusout.bind(this));
        this._editor.addEventListener("click", this.click.bind(this));
        

        this.uiElement = this._editor;

        
    }

    /*get __vrCursor(){
        return vrCursor;
    }*/
    vrCursorSetup(){
        this.indexBeforUnslot = 0;
        this.lineBeforUnslot = 0;
    }
    onFocus(){
        if(this.lineCount == 0){
            this.newLine();
            this.focusedLine = 0;
        }

        //vrCursor.slothEditor(this);
        //vrCursor.updateFrom("previousData");
        this.hasFocus = true;
    }
    onFocusout(){
        /*this.indexBeforUnslot = vrCursor.index;
        this.lineBeforUnslot = vrCursor.line;*/
        this.hasFocus = false;
    }
    click(){
        this.vrCursor.updateFrom("anchor_selection");
    }
    get cursorIndex(){
        return this._getSelector().anchorOffset == this._getSelector().focusOffset ? this._getSelector().focusOffset : undefined;
    }
    

    get textAreaValueLength(){
        return this._editor.textContent.length;
    }
    
    get charAt(){
        return this._editor.textContent[index];
    }

    getDataAsString(){
        let dataString = "";
        this._lineArray.forEach((line) => {dataString += line.basicTextData + "\n";} );

        return dataString;
    }
    _getSelector(){
        if(document.activeElement === this._editor)
            return window.getSelection();
        //return Error(" document.activeElement === this._editor is false");
        return undefined;
    }
    
    filteredSelector(forceUpdate = false){
        if(!forceUpdate && this.__filteredSelectorObjectUpToDate){
            return this.__filteredSelectorObject;
        }
        let selectorCach = this._getSelector();
        //debugger;
        let filteredSelector_f_startLine = getValidParent(selectorCach.anchorNode)._line_number;
        let filteredSelector_f_endLine = getValidParent(selectorCach.focusNode)._line_number;

        this.__filteredSelectorObject =  {
            startLine: filteredSelector_f_startLine,
            endLine: filteredSelector_f_endLine,

            startIndex: selectorCach.anchorOffset,
            endIndex: selectorCach.focusOffset,

            multilineSelection: filteredSelector_f_startLine != filteredSelector_f_endLine,
            selection: selectorCach.anchorOffset != selectorCach.focusOffset || filteredSelector_f_startLine != filteredSelector_f_endLine,
        }

        this.__filteredSelectorObjectUpToDate = true;
        return this.__filteredSelectorObject;
    }
    get anchorNode(){
        return this._getSelector().anchorNode;
    }
    get focusNode(){
        return this._getSelector().focusNode;
    }
    get selectionActive(){
        let selection = this._getSelector();
        return this.selectionIsValid(selection) && selection.anchorNode !== selection.focusNode || selection.anchorOffset != selection.focusOffset;
    }
    get singlelineSelectionActive(){
        let selection = this._getSelector();
        return this.selectionIsValid(selection) && selection.anchorNode === selection.focusNode && selection.anchorOffset != selection.focusOffset;
    }

    get multilineSelectionActive(){
        let selection = this._getSelector();
        return this.selectionIsValid(selection) && selection.anchorNode !== selection.focusNode;
    }

    // Focsued line if singlelineSelectionActive is false
    get focusedLine(){

        if(!this.singlelineSelectionActive){
            //debugger;
            let selection = this._getSelector();
            if(selection.isCollapsed){

                //if(!isNaN(selection.anchorNode.parentNode._line_number))
                    return getValidParent(selection.anchorNode)._line_number;
                
                return selection.anchorNode._line_number;
            }
                
        }

        return undefined;

    }
    set focusedLine(index){
        //debugger;

        
        if(index < 0){
            //throw new Error("index is negative :  " + index);
            console.warn("index is negative :  " + index);
            return;
        }
        this.vrCursor.line = index;

        this.setCursorPosition(this._lineArray[index].uiElement, 0);
    }
    get anchorNodeIsEmpty(){
        return !isNaN(getValidParent(selection.anchorNode).dataset._line_number) ? true : false;
    }
    get lineFromSelection(){

    }
    get lineNumberFromSelection(){
        let selection = this._getSelector();
    }
    selectionIsValid(selection){
        //debugger
        //return this._lineMap.has(selection.anchorNode.parentNode) && this._lineMap.has(selection.focusNode.parentNode)

        
        // this._lineArray ver
        
        return this._lineArray[selection.anchorNode.parentNode._line_number] === selection.anchorNode.parentNode._gd_line && 
        this._lineArray[selection.focusNode.parentNode._line_number] === selection.focusNode.parentNode._gd_line;
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
    /*set anchorOffset(s_start){
        return this._getSelector().anchorOffset = s_start;
    }*/
    get focusOffset(){
        return this._getSelector().focusOffset;
    }
    /*set focusOffset(s_end){
        return this._getSelector().focusOffset = s_end;
    }*/
    set className(className){
        this._editor.className = className;
    }

    setCursorPosition(node, index){
        console.log(node);
        let selector = this._getSelector();
        console.log("selector   :   "   +  selector);
        if(selector)
            getValidParent(node)._gd_line.cursorToIndex(selector, index);
            
        else
            console.error("SELECTOR :  " + selector);
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
            //this._editor.textContent = this.file.content;
            this.parseFile();
            this._file.editor = this;
        }
        else{
            throw new Error("file is already open");
        }
    }
    parseFile(){
        if(this.file.content == undefined){
            this.file.content = "";
        }
        let dataString = this.split_string_by_line_break(this._file._content);

        dataString.forEach(string => console.log("'" + string + "'"));
        
        console.log("Paste data  lenght:  "  + dataString.length);
        
        //debugger;
        
        if(dataString.length == 1){
            
            this.newLine( new _line(dataString[0]))
            //this.__print(dataString[0]);
        }
        else if(dataString.length > 1){
            
            
            
            for(let i = 0; i < dataString.length; ++i){
                /*if(i > 0){
                    this.splitLine();
                    vrCursor.down();
                    vrCursor.home();
                } 
                this.__print(dataString[i]);*/
                this.newLine( new _line(dataString[i]));
            }
        
            //vrCursor.update("carret");
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
        this.insertTextAtLine(text, 0);
    }
    
    insertTextAtLine(text, lineNumber = 0){
        this.insertTextAtLineIndex(text, lineNumber, 0);
    }
    insertTextAtLineIndex(text, lineNumber = 0, index = 0){
        if(this._lineArray[lineNumber]){
            this._lineArray[lineNumber].insertString(text, index);
        }
    }
    __wrapSelection(selector = this.filteredSelector(), startPrintValue, endPrintValue){
        console.log("Will wrap")
        if(selector.selection){
            let startLine = selector.startLine;
            let endLine = selector.endLine;
            let startIndex = selector.startIndex;
            let endIndex = selector.endIndex;

            if(startLine > endLine){
                startLine = endLine;
                endLine = selector.startLine;
    
                startIndex = endIndex;
                endIndex = selector.startIndex;
            }
            else if(startIndex > endIndex){
                startIndex = endIndex;
                endIndex = selector.startIndex;
            }

            if(!selector.multilineSelection){
                this._lineArray[startLine].wrapText(startIndex, startPrintValue, endIndex, endPrintValue);
            }
            else{
                this._lineArray[startLine].insertString(startPrintValue, startIndex);
                this._lineArray[endLine].insertString(endPrintValue, endIndex);
            }
            //debugger;
            this._getSelector().removeAllRanges();
            if(startLine == endLine){
                this._getSelector().addRange(this.createRange(startLine, startIndex + startPrintValue.length, endLine, endIndex + endPrintValue.length));
            }
                
            else{
                //debugger;
                this._getSelector().addRange(this.createRange(startLine, startIndex + startPrintValue.length, endLine, endIndex));
            }
                
            /*
            this._lineArray[selection.anchorNode.parentNode._line_number].insertString(startPrintValue, selection.anchorOffset);
            this._lineArray[selection.focusNode.parentNode._line_number].insertString(endPrintValue, selection.focusOffset);*/
        }
        console.log();
        this.__filteredSelectorObjectUpToDate = false;
    }
    // FN NO DONE to-do
    __wrapSelection_brut(selection, startPrintValue, endPrintValue){
        console.log("Will wrap")
        if(this.selectionIsValid(selection)){
            let anchorOffset = selection.anchorOffset, focusOffset = selection.focusOffset;
            console.log("WRAP anchorOffset    :  " + anchorOffset);
            console.log("WRAP focusOffset    :  " + focusOffset);
            if(selection.anchorNode === selection.focusNode){
                //TEST

                this._lineArray[selection.anchorNode.parentNode._line_number].highlight(0,selection.focusOffset, selection.anchorNode, HIGHLIGHT_TAG.keywords);

                //this._lineArray[selection.anchorNode.parentNode._line_number].wrapBrutContent(anchorOffset, startPrintValue, focusOffset, endPrintValue);
                return;
            }
            //debugger;
            if(selection.anchorNode.parentNode._line_number > selection.focusNode.parentNode._line_number){
                this._lineArray[selection.focusNode.parentNode._line_number].insertString(startPrintValue, selection.focusOffset);
                this._lineArray[selection.anchorNode.parentNode._line_number].insertString(endPrintValue, selection.anchorOffset);
                return;
            }
            this._lineArray[selection.anchorNode.parentNode._line_number].insertString(startPrintValue, selection.anchorOffset);
            this._lineArray[selection.focusNode.parentNode._line_number].insertString(endPrintValue, selection.focusOffset);
            this._lineArray[selection.anchorNode.parentNode._line_number].highlight()
        }
        console.log();
    }
    __print(printValue, cursorOffset = 0, index = this.vrCursor.index, line = this.vrCursor.line){
        console.log(line);
        /*if(line === undefined){
            line = this.anchorNode._line_number;
        }*/
        this._lineArray[line].insertString(printValue,index);
        index += printValue.length;
        //debugger;
        this.vrCursor.line = line;
        this.vrCursor.index = index;

        this.vrCursor.update("carret");
        //this.setCursorPosition(this._lineArray[line].uiElement, index);
    }
    get current_line(){
        return this._lineArray[this.vrCursor.line];
    }
    __print_brut(printValue, index = this.vrCursor.index, line = this.vrCursor.line){
        console.log(line);
        /*if(line === undefined){
            line = this.anchorNode._line_number;
        }*/
        this._lineArray[line].insertBrutContent(printValue,index);
        ++this.vrCursor.index;
        this.setCursorPosition(this._lineArray[line].uiElement, index);
    }
    __updateCursorPosition(){
        this.setCursorPosition(this._lineArray[this.vrCursor.line].uiElement, this.vrCursor.index);
    }
    backspace(){
        if(this.filteredSelector().selection){
            this.deleteSelection();
            
        }
        else{
            if(this.vrCursor.index > 0){
                --this.vrCursor.index;
                this._lineArray[this.vrCursor.line].backspace(this.vrCursor.index);
                this.setCursorPosition(this._lineArray[this.vrCursor.line].uiElement, this.vrCursor.index);
            }
            else if(this.vrCursor.index == 0 && this.vrCursor.line > 0){
                this.vrCursor.left();
                this._lineArray[this.vrCursor.line].appendLine(this._lineArray[this.vrCursor.line + 1]);
                this.deleteLine(this.vrCursor.line + 1);
                this.setCursorPosition(this._lineArray[this.vrCursor.line].uiElement, this.vrCursor.index);
            }
            
            //--vrCursor.index
        }
        this.__filteredSelectorObjectUpToDate = false;
    }
    moveCursorLeft(x){
        if(x > this.vrCursor.index){
            x -= this.vrCursor.index;
            //vrCursor.line
        }
        this.setCursorPosition(this._lineArray[this.vrCursor.line].uiElement, this.vrCursor.index);
    }
    ArrowLeft(){
        this.vrCursor.left();
        this.__updateCursorPosition();
    }
    ArrowRight(){
        this.vrCursor.right();
        this.__updateCursorPosition();
    }
    ArrowUp(){
        this.vrCursor.up();
        this.__updateCursorPosition();
    }
    ArrowDown(){
        this.vrCursor.down();
        this.__updateCursorPosition();
    }
    selectAll(){
        //debugger;
        this._getSelector().removeAllRanges();
        this._getSelector().addRange(this.createRange(0,0,this.lineCount - 1, this._lineArray[this.lineCount - 1].length));
        console.log(this._getSelector());
    }

    createRange(startLine, startIndex, endLine, endIndex){
        if(startLine < 0 || endLine >= this.lineCount){
            throw new Error("startLine < 0 || endLine >= this.lineCount");
        }
        
        
        //debugger;
        let newRange = new Range();
        let cachuielement = this._lineArray[endLine].lastNode;
        newRange.setStart(this._lineArray[startLine].firstNode, startIndex);
        newRange.setEnd(this._lineArray[endLine].lastNode, endIndex);

        return newRange;
    }
    /*// print xor wrap xor specialAction ?? or...
    keyAction options = {
        printKey: false,
        printValue: "",
        printBrut: false,
        cursorOffset: 0, //don't use
        additionalOffset: 0,
        specialAction: false,
        specialFunction: function(textArea){},
        wrapText: false,
        beforeWrapValue:"",
        afterWrapValue:"",
        preventDefault: false,
        keyCombination: {down: false},
    }
    */
    
    keyCombinationSetup(){
        
        this.combination_Starter_Keys = new Map();
        this.combination_Starter_Keys_down_count = 0;

        this.combinationActionPending = false;
        this.combinationActionFunction = undefined;
        /**
         * this.combination_Finisher_Data:
         * key = name of finishing key:  Control + a = a is finisher.
         * value = {
         *  1:[["Control",true, specialFunction], ["Alt", false], ["Meta", true, specialFunction]],
         *  2:[["Control","Alt", false], ["Control","Maj", true, specialFunction], ["Control", "Shift", true, specialFunction], ["Alt", "Shift", false]],
         * }
         */
        this.combination_Finisher_Data = new Map();

        this.combinationFinisherKeys = new Map();

        
        this.addCombination_Starter_Keys("Control");
        this.addCombination_Starter_Keys("Alt");
        this.addCombination_Starter_Keys("AltGraph");
        //this.addCombination_Starter_Keys("Shift");

        this.addKeyCombination(["Alt","p"], function(){alert("Alt ! ");}.bind(this));
        this.addKeyCombination(["Control","p"], function(){alert("Control ! ");}.bind(this));
        
        this.addKeyCombination(["Control","t"], function(){this.__print("Hello kitty");}.bind(this));
        this.addKeyCombination(["Control","a"], this.selectAll.bind(this));
        this.addKeyCombination(["Control","c"]);
        this.addKeyCombination(["Control","v"]);
        /*this.addKeyCombination(["AltGraph","{"]);
        this.addKeyCombination(["AltGraph","}"]);
        this.addKeyCombination(["Control", "Alt","{"]);
        this.addKeyCombination(["Control", "Alt","}"]);*/
        //this.addKeyCombination(["Control","c"]);
        //this.addKeyCombination( function(){this.__print("Super combination");}.bind(this) , "Control","Alt","t","x"); Does not work. Will not make it work

        this.add_combinationFinisherKeys("_l","p", "0","p", "r","t");
        
    }
    add_combinationFinisherKeys(...finisherKeysPair){
        //arguments come in pair
        //first argument = keyboardEvent.key, second argument = the actual value used to search for a valid combination. 
        // can use this to make alias of key. alias key becomes usless as a key finisher
        for(let i = 0; i < finisherKeysPair.length; i += 2){
            this.combinationFinisherKeys.set(finisherKeysPair[i], finisherKeysPair[i + 1]);
        }
    }
    addKeyCombination(key_sequence, specialFunction = undefined){

        let finisherKey = key_sequence[key_sequence.length - 1].toLowerCase();
        let key_sequence_length = key_sequence.length;

        //First create an array that contain the data of the new sequence
        let additional_key_sequence = key_sequence.splice(0, key_sequence_length - 1);
        if(specialFunction === undefined){
            additional_key_sequence.push(false);
        }
        else{
            additional_key_sequence.push(true, specialFunction);
        }


        //debugger;
        //if "finisherKey" already has at least one sequance using it
        if(this.combination_Finisher_Data.has(finisherKey)){
            
            //if "finisherKey" already has at least one sequance of length = key_sequence_length - 1
            if(this.combination_Finisher_Data.get(finisherKey)[key_sequence_length - 1]){
                this.combination_Finisher_Data.get(finisherKey)[key_sequence_length - 1].push(additional_key_sequence);
            }
            else{
                this.combination_Finisher_Data.get(finisherKey)[key_sequence_length - 1] = [additional_key_sequence];
            }
        }
        else{
            this.combination_Finisher_Data.set(finisherKey,{
                [key_sequence_length - 1]: [additional_key_sequence],
            });
        }
        console.log("addKeyCombination key_sequence_length : " + key_sequence_length);
        this.add_combinationFinisherKeys(finisherKey,finisherKey, finisherKey.toUpperCase(),finisherKey);
    }
    addCombination_Starter_Keys(keyValue){
        
        this.combination_Starter_Keys.set(keyValue, {down: false});
        this.addKeyAction(keyValue, {keyCombination: true});
    }
    keyActionExceptionSetup(){
        this.keyActionExceptionMap = new Map();

        this.addKeyActionException("F5");
        this.addKeyActionException("F12");
        //this.addKeyActionException("AltGraph");
        

    }
    addKeyActionException(keyValue){
        this.keyActionExceptionMap.set(keyValue, null);
    }
    keyActionSetup(){
        this.genericKeyAction = this.classicKeyAction.bind(this);
        this.keyActionMap = new Map();

        this.addKeyAction("Shift__", {specialAction: true, specialFunction: function(){
            alert("SPE");
        }.bind(this)});
        
        this.addKeyAction("ArrowLeft", {specialAction: true, specialFunction: this.ArrowLeft.bind(this)});
        this.addKeyAction("ArrowRight", {specialAction: true, specialFunction: this.ArrowRight.bind(this)});
        this.addKeyAction("ArrowUp", {specialAction: true, specialFunction: this.ArrowUp.bind(this)});
        this.addKeyAction("ArrowDown", {specialAction: true, specialFunction: this.ArrowDown.bind(this)});
        this.addKeyAction("Home", {specialAction: true, specialFunction: function(){ this.vrCursor.home(); this.vrCursor.update("carret"); }.bind(this)});
        this.addKeyAction("End", {specialAction: true, specialFunction: function(){ this.vrCursor.end(); this.vrCursor.update("carret"); }.bind(this)});


        this.addKeyAction("Tab", {printKey: true, printValue: "  "});
        this.addKeyAction("Backspace", {specialAction: true, specialFunction: this.backspace.bind(this)});
        this.addKeyAction("Delete", {specialAction: true, specialFunction: function(){
            if(this.vrCursor.right()){
                this.backspace();
            }
        }.bind(this)});

        
        this.addKeyAction("<", {
            printKey: true, printValue: "<></>",
            cursorOffset: -4
        });
        /*this.addKeyAction("{", {
            printKey: true, printValue: "{}",
            wrapText: true, beforeWrapValue:"{", afterWrapValue:"}",
            cursorOffset: -1
        });*/
        this.addKeyAction("\"", {
            printKey: true, printValue: "\"\"",
            wrapText: true, beforeWrapValue:"\"", afterWrapValue:"\"",
            cursorOffset: -1
        });
        this.addKeyAction("(", {
            printKey: true, printValue: "()", 
            wrapText: true, beforeWrapValue:"(", afterWrapValue:")",
            cursorOffset: -1});
        this.addKeyAction("{", {
            printKey: true, printValue: "{}", 
            wrapText: true, beforeWrapValue:"{", afterWrapValue:"}",
            cursorOffset: -1});
        //this.addKeyAction("Backspace", {specialAction: true, specialFunction: function(textArea){}});
        this.addKeyAction("Enter", {specialAction: true, specialFunction: () => {this.splitLine(); this.vrCursor.down(); this.vrCursor.home(); this.vrCursor.update("carret");}});
        this.addKeyAction("²", {
            printKey: true, printValue: "<special></special>", printBrut: true,
            wrapText: true, beforeWrapValue:"<special>", afterWrapValue:"</special>",
            cursorOffset: -1});
        

    }
    addKeyAction(keyValue, options){
        this.keyActionMap.set(keyValue, options);
    }
    
    keyAction(keyboardEvent){
        this.genericKeyAction(keyboardEvent);
    }

    classicKeyAction(keyboardEvent){
        
        _slot_keyAction_call();

        
        
        let key = this.keyActionMap.get(keyboardEvent.key);
        console.log("VR C INDEX BEFORE UPDATE: " + this.vrCursor.index);
        //keyboardEvent.preventDefault();
        if(key){

            if(key.keyCombination){
                //debugger;
                this.genericKeyAction = this.keyCombinationKeyAction.bind(this);
                this.combination_Starter_Keys.set(keyboardEvent.key, {down: true});   
                ++this.combination_Starter_Keys_down_count;
            }
            else
             this.classicKeyAction_SubFunction(key, keyboardEvent);
        }
        else if(keyboardEvent.key.length == 1 && keyboardEvent.key.search(VALID_BASIC_TEXT_DATA_VALUES__AS_REGXP) == 0){
            keyboardEvent.preventDefault();
            this.deleteSelection();
            //debugger;
            this.__print(keyboardEvent.key);
            console.log("to basic data:  " + keyboardEvent.key);
        }
        else if(!this.keyActionExceptionMap.has(keyboardEvent.key)){
            keyboardEvent.preventDefault();
        }
        //vrCursor.updateFrom("anchor_selection");

        
        
        
        _slot_keyAction_add(this.vrCursor.updateFrom, "anchor_selection");
        
        this.__filteredSelectorObjectUpToDate = false;
        //alert(keyboardEvent.key);*/

        this.file.content = this.getDataAsString();
    }

    //Don't know how to name it, making this to not replicate code inside keyCombinationKeyAction();
    classicKeyAction_SubFunction(key, keyboardEvent){
        console.log(keyboardEvent.key);
        if(!key){
                if(keyboardEvent.key.length == 1 && keyboardEvent.key.search(VALID_BASIC_TEXT_DATA_VALUES__AS_REGXP) == 0){
                keyboardEvent.preventDefault();
                this.deleteSelection();
                //debugger;
                this.__print(keyboardEvent.key);
                console.log("to basic data:  " + keyboardEvent.key);
            }
        }
        else if(this.selectionActive){
            if(key.wrapText){
                keyboardEvent.preventDefault();
                if(key.printBrut){
                    this.__wrapSelection_brut(this._getSelector(), key.beforeWrapValue, key.afterWrapValue);
                }
                else{
                    this.__wrapSelection(this.filteredSelector(), key.beforeWrapValue, key.afterWrapValue);
                }
                
            }
            else if(key.printKey){
                keyboardEvent.preventDefault();
                this.deleteSelection();
                if(key.printBrut){
                    this.__print_brut(key.printValue);
                }
                else{
                    this.__print(key.printValue);
                    this.vrCursor._indexOffset += key.cursorOffset;
                    this.vrCursor.applyOffset();
                    this.vrCursor.update("carret");
                }
                
            }
            else if(key.specialAction){
                keyboardEvent.preventDefault();
                key.specialFunction();
            }
        }
        else if(key.printKey){
            keyboardEvent.preventDefault();
            //debugger;
            if(key.cursorOffset){
                this.__print(key.printValue);
                this.vrCursor._indexOffset += key.cursorOffset;
                this.vrCursor.applyOffset();
                this.vrCursor.update("carret");
            }
            else{
                this.__print(key.printValue);
            }
        }
        else if(key.specialAction){
            keyboardEvent.preventDefault();
            key.specialFunction();

        }
    }
    
    keyCombinationKeyAction(keyboardEvent){
        //debugger;
        if(keyboardEvent.repeat){
            keyboardEvent.preventDefault();
            return;
        }
        let keycombvalue = this.combination_Starter_Keys.get(keyboardEvent.key);
        if(keycombvalue && !keycombvalue.down){
            ++this.combination_Starter_Keys_down_count;
            this.combination_Starter_Keys.set(keyboardEvent.key, {down: true});   
        }
        else if(this.combinationFinisherKeys.has(keyboardEvent.key)){
            //debugger;
            let keyCombinationData = this.keyCombination_Active(keyboardEvent.key);
            if(keyCombinationData !== undefined){
                if(keyCombinationData.hasSpecialFunction){
                    keyboardEvent.preventDefault();
                    this.combinationActionPending = true;
                    this.combinationActionFunction = keyCombinationData.specialFunction;
                }
                else{
                    this.combinationActionPending = false;
                    console.log("this.combination_Starter_Keys_down_count : " + this.combination_Starter_Keys_down_count);
                    return;
                }
            }
            else{
                this.combinationActionPending = false;
            }
        }
        let key = this.keyActionMap.get(keyboardEvent.key);
        
        this.classicKeyAction_SubFunction(key, keyboardEvent);
        
        keyboardEvent.preventDefault();
        console.log("this.combination_Starter_Keys_down_count : " + this.combination_Starter_Keys_down_count);
        //this.__filteredSelectorObjectUpToDate = false;
    }

    keyUpAction(keyboardEvent){
        let key = this.combination_Starter_Keys.get(keyboardEvent.key);
        if(key && key.down){
            --this.combination_Starter_Keys_down_count;
            this.combination_Starter_Keys.set(keyboardEvent.key, {down: false});  
            if(this.combination_Starter_Keys_down_count == 0){
                this.genericKeyAction = this.classicKeyAction.bind(this);
                if(this.combinationActionPending){
                    this.combinationActionFunction();
                    this.combinationActionPending = false;
                    this.combinationActionFunction = undefined;
                }
            }
        }
        else if(this.combinationActionPending){
            this.combinationActionFunction();
            this.combinationActionPending = false;
            this.combinationActionFunction = undefined;
        }
        console.log("this.combination_Starter_Keys_down_count : " + this.combination_Starter_Keys_down_count);
    }

    keyCombination_Active(key){
        let combinationData = this.combination_Finisher_Data.get( this.combinationFinisherKeys.get(key) )[this.combination_Starter_Keys_down_count];
        if(combinationData == undefined){
            return undefined;
        }


        for(let i = 0; i < combinationData.length; ++i){

            let combinationSequance = combinationData[i];
            let pressedCombinationStarterKeys_found = 0;

            for(let y = 0; y < this.combination_Starter_Keys_down_count; ++y){
                if(this.combination_Starter_Keys.get(combinationSequance[y]).down ){
                    ++pressedCombinationStarterKeys_found;
                }
            }

            if(pressedCombinationStarterKeys_found == this.combination_Starter_Keys_down_count){
                //debugger;
                return {
                    index: i,
                    hasSpecialFunction: combinationSequance[this.combination_Starter_Keys_down_count],
                    specialFunction: combinationSequance[this.combination_Starter_Keys_down_count + 1],
                };

            }

        }

        return undefined;
    }
    newLine(line = new _line("")){
        
        line.setLineNumber(this.lineCount);
        this._lineArray.push(line);
        this._lineMap.set(line.uiElement, line);

        this.lineCount += 1;
        this._editor.append(line.uiElement);
        this.setCursorPosition(line.uiElement,0);
        this.checkLineCount();
        console.log(this.lineCount);
        //this.updateUi();
    }
    //splitLine(splitIndex = this.filteredSelector().startIndex, lineNumber = this.filteredSelector().startLine){
    splitLine(splitIndex = this.vrCursor.index, lineNumber = this.vrCursor.line){
        if(lineNumber < 0 || lineNumber >= this.lineCount)
            throw new Error("index < 0 || index >= this.lineCount");
        
            //debugger;
        let newLine = this._lineArray[lineNumber].splitLine_returnLine(splitIndex);
        //vrCursor.index = 0;
        this.insertLine(newLine, lineNumber);
        
    }
    //insertLine(line = new _line(""), index = this.filteredSelector().startLine){
    insertLine(line = new _line(""), index = this.vrCursor.line){
        // alert(); 
        //debugger;
        if(index < 0 || index >= this.lineCount)
            return false;
        //debugger;
        if(false && this._lineArray[index].textData == ""){



            return true;
        }
        this._lineArray.splice(index + 1, 0, line);
        
        line.setLineNumber(index + 1);
        this.reorderLines_startAt_index(index);
        if(index == this.lineCount){
            this._editor.append(line.uiElement);
        }
        else{
            this._lineArray[index].uiElement.insertAdjacentElement("afterend", line.uiElement);
        }

        /*vrCursor.line = line._line_number;
        vrCursor.index = vrCursor.index % (line.basicTextData.length + 1);
        this.setCursorPosition(line.uiElement, vrCursor.index);*/
        this.lineCount += 1;
        
        this.checkLineCount();
        console.log(this._lineArray);
        //this.__filteredSelectorObjectUpToDate = false;
        return true;
    }
    checkLineCount(){
        let i = 0;
        this._lineArray.forEach(line => {
            if(line._line_number != i){
                console.log(line);
                throw new Error("Line n° " + i + "  number invalid");
                //this.reorderLines_startAt_index(i);
                return;
            }
            ++i
        });
    }
    _get_lineNumberX(lineNumber){
        if( this.lineCount - lineNumber != 1){
            console.error("lineNumber invalid");
            return;
        }
        return this._lineMap.values()[lineNumber];
    }

    mutationObserverSetup(){
        this.removedNodesCount = 0;
        this.lineObserver = new MutationObserver(this.lineMutationFonction.bind(this));
        this.lineObserver.observe(this._editor, {childList: true});
        
    }
    reorderLines(){
        let lineNumber = 0;
        this._lineArray.forEach(line => {

            if(line._line_number != lineNumber)
                line.setLineNumber(lineNumber)
            ++lineNumber
        });
        this.checkLineCount();
    }
    reorderLines_startAt_index(index){//VF_1
        while(index < this._lineArray.length){
            this._lineArray[index].setLineNumber(index);
            ++index;
        }
    }
    deleteLine(lineNumber){//VF_1
        //debugger;
        if(lineNumber < 0 || lineNumber >= this.lineCount)
            return false;
        this._lineArray[lineNumber].delete();
        this._lineArray.splice(lineNumber, 1);
        this.reorderLines_startAt_index(lineNumber);
        this.lineCount -= 1;
        return true;
    }
    deleteSelection(selection = this.filteredSelector(), ajustCursor = true){
        console.log("deleteSelection");
        if(!selection.selection){
            console.log("deleteSelection no selection");
            console.log(selection);
            return;
        }
        //debugger;
        let startLine = selection.startLine;
        let endLine = selection.endLine;
        let startIndex = selection.startIndex;
        let endIndex = selection.endIndex;
        if(startLine > endLine){
            startLine = endLine;
            endLine = selection.startLine;

            startIndex = endIndex;
            endIndex = selection.startIndex;
        }
        else if(startIndex > endIndex){
            startIndex = endIndex;
            endIndex = selection.startIndex;
        }
        if(startLine != endLine){
            //Multiple splice
            for(let i = startLine  + 1; i < endLine;){
                this.deleteLine(i);
                --endLine;
            }
            //debugger;
            
            this._lineArray[startLine].deleteFromTo(startIndex, this._lineArray[startLine].length);
            this._lineArray[endLine].deleteFromTo(0,endIndex);

            this._lineArray[startLine].appendLine(this._lineArray[endLine]);
            this.deleteLine(endLine);
            //--endLine;
            /*if(this._lineArray[endLine].length == 0){
                this.deleteLine(endLine);
                --endLine;
            }*/
            //debugger;
        }
        else{
            
            this._lineArray[startLine].deleteFromTo(startIndex, endIndex);
        }
        if(ajustCursor){
            this.vrCursor.line = startLine;
            this.vrCursor.index = startIndex;

            this.vrCursor.update("carret");
        }
        this.__filteredSelectorObjectUpToDate = false;
    }
    lineMutationFonction(mutationRecordArray, mutationObserver){
        //debugger;
        if(mutationRecordArray.length > 0 && mutationRecordArray[0].type == "childList"){
        
            mutationRecordArray.forEach(mutationRecord => {
                if(mutationRecord.removedNodes.length > 0){
                    mutationRecord.removedNodes.forEach(removedNode => {

                        //if(this._lineMap.delete(removedNode))
                        if(this.deleteLine(removedNode._line_number)){
                            console.log(this.lineCount);
                            this.removedNodesCount += 1;
                        }
                    });
                }
                else if(mutationRecord.addedNodes.length > 0){
                    console.log("ADDED NODES : ");
                    mutationRecord.addedNodes.forEach(addedNodes => {
                        console.log("added node : " + addedNodes);
                    });
                    
                }
            });
            this.reorderLines();
            console.log(mutationRecordArray);
            console.log("Out : mutationRecordArray if");
        }
    }
    //

    copyPastSetup(){
        this.copyBuffer = null;
        this._editor.addEventListener("paste", this.pastFromPastEvent.bind(this));
        this._editor.addEventListener("cut", this.cut.bind(this));
    }

    copy(selection){
        if(this.selectionIsValid(selection)){
            if(this.multilineSelectionActive(selection)){

            }
        }
    }
    pastFromPastEvent(pasteEvent){
        let pasteData = pasteEvent.clipboardData.getData("text/plain");
        pasteEvent.preventDefault();

        let pasteDataArray = this.split_string_by_line_break(pasteData);

        pasteDataArray.forEach(string => console.log("'" + string + "'"));
        //debugger;
        console.log("Paste data  lenght:  "  + pasteDataArray.length);
        
        this.deleteSelection();
        if(pasteDataArray.length == 1){
            
            this.__print(pasteDataArray[0]);
            /*this.current_line.addString(pasteDataArray[0]);
            vrCursor.end();*/
            
            //vrCursor.updateFrom("filteredSelector");
        }
        else if(pasteDataArray.length > 1){
            
            
            
            for(let i = 0; i < pasteDataArray.length; ++i){
                //debugger;
                //this.insertLine(new _line(pasteDataArray[i]));
                if(i > 0){
                    this.splitLine();
                    this.vrCursor.down();
                    this.vrCursor.home();
                } 
                this.__print(pasteDataArray[i]);
            }
        
            this.vrCursor.update("carret");
        }
        //this.insertLine(new _line(pasteData));
    }
    split_string_by_line_break(string){

        return string.split(/\n|\r|\r\n/);
    }
    past(){
        
    }
    cut(cutEvent){
        cutEvent.preventDefault();
        cutEvent.clipboardData.setData('text/plain', this._getSelector().toString());
        this.deleteSelection();
    }

    updateEditor_from_lineArray(){ //use after reorder line

    }
    /// highlightSystem
    

    ///
    
}






/* const HIGHLIGHT_TAG = `<hlt class="gdh fn sl1 used1"></hlt>`  = 36 char
                                      gdh cl   
                                      gdh kw
                                      gdh vr
                                      gdh cd
                                      gdh st
gdh = gdhighlight
sl1 = selecttion, sl0 = no selection
used1 = variable or function... is used, used0 = variable or function... is not used
fn = function
cl = className
kw = keywords : class / new / this / function
vr = variable
cd = conditional statment like if else switch... and return ??
st = string
*/
const HIGHLIGHT_TAG = {
    noTag: {
        start: "",
        end: "",
        startLength: 0,
        endLength: 0,
        totalLength: 0, 
        used: false,
    },
    function: {
        start: "<fn>",
        end: "</fn>",
        startLength: 4,
        endLength: 5,
        totalLength: 9, 
        used: true,
    },
    className: {
        start: "<cl>",
        end: "</cl>",
        startLength: 4,
        endLength: 5,
        totalLength: 9, 
        used: true,
    },
    keywords: {
        start: "<kw>",
        end: "</kw>",
        startLength: 4,
        endLength: 5,
        totalLength: 9, 
        used: true,
    },
    variable: {
        start: "<vr>",
        end: "</vr>",
        startLength: 4,
        endLength: 5,
        totalLength: 9, 
        used: false,
    },
    conditional: {
        start: "<cd>",
        end: "</cd>",
        startLength: 4,
        endLength: 5,
        totalLength: 9, 
        used: true,
    },
    string: {
        start: "<st>",
        end: "</st>",
        startLength: 4,
        endLength: 5,
        totalLength: 9, 
        used: false,
    },
    selection: {
        start: "<sl>",
        end: "</sl>",
        startLength: 4,
        endLength: 5,
        totalLength: 9,
        used: true,
    },
    special: {
        start: "<special>",
        end: "</special>",
        startLength: 9,
        endLength: 10,
        totalLength: 19,
        used: true,
    },
}

class __line{
    constructor(){
        this._plain_text = "";
    }
}

class _line{
    constructor(initialStringValue = ""){
        
        this.uiElement = document.createElement("div");
        
        this.uiElement.className = "_line";
        this.uiElement._gdm = true;
        this.uiElement._gd_line = this;
        

        //***to-do for mutiline textwrap */
        this.highlightSetup();

        this.basicTextData = initialStringValue;//initialStringValue.replaceAll(NOT_VALID_BASIC_TEXT_DATA_VALUES__AS_REGXP, "");
        
        
        // this.basicTextData IS main plain text
        // only plain text for now
        

        
        //this.brutContent = this.basicTextData;
        //this.uiElement.appendChild(document.createElement("br"));
        
        //this.updateUi()
        this.fixedChildListFixedCount = 0;
        this.childListPresentSet = new Set();
        this.textNodeList = [];

        this.textNodeList.push(new Text(this.basicTextData));
        this.uiElement.appendChild(this.textNodeList[0]);
    }
    
    get length(){
        return this.basicTextData.length;
    }
    setLineNumber(lineNumber){
        //debugger;
        this.uiElement.dataset._line_number = lineNumber;
        this.uiElement._line_number = lineNumber;
        this._line_number = lineNumber;
    }
    clear(){
        this.__setText("");
    }
    
    __setText(text){

        this.basicTextData = text;
        
        this.recomputeUiElement();
    }
    //NO DATA CHECK
    inputKey(key){
        /*if(key == "\n" || key == "\r" || key == "\r\n"){

        }*/
        this.basicTextData += key;
        this.recomputeUiElement();
    }
    addString(string){
        console.log("ADD STRING");
        this.basicTextData = this.basicTextData.concat(string);
        
        this.recomputeUiElement();
    }
    prependLine(line){
        this.isLine_crash(line);

        this.basicTextData = line.basicTextData + this.basicTextData;
        this.recomputeUiElement();
    }
    appendLine(line){
        this.isLine_crash(line);

        this.basicTextData += line.basicTextData;
        this.recomputeUiElement();
    }
    splitLine_returnLine(index){
        let tempLine = new _line (this.basicTextData.substring(index));
        this.basicTextData = this.basicTextData.substring(0, index);

        this.recomputeUiElement();
        return tempLine;
    }
    splitLine_returnString(index){
        let tempLine = this.basicTextData.substring(index);
        this.basicTextData = this.basicTextData.substring(0, index);

        this.recomputeUiElement();
        return tempLine;
    }
    insertString(string, index){
        if(index == this.length){
            this.addString(string);
            return this.uiElement;
        }
        let basicTextData = this.basicTextData;
        index = index % (this.basicTextData.length + 1);

        this.basicTextData = basicTextData.substring(0, index) + string + basicTextData.substring(index);
        
        this.recomputeUiElement();
        return this.uiElement;
    }
    get textData(){
        return this.basicTextData;
    }
    set textData(newTextData){
        this.__setText(newTextData);
        return;
        this.uiElement.replaceChild(document.createTextNode(newTextData), this.uiElement.firstChild);
    }
    get_textData_range(a = 0 , b = undefined){
        let orderedIndex = this.__orderAndCheckIndex(a,b);
        
        return this.textData.substring(orderedIndex.a,orderedIndex.b);
    }
    get_textData_range_as_line(a = 0 , b = undefined){
        return new _line(this.get_textData_range(a,b));
    }
    recomputeUiElement(){


        console.log(this.textn);
        if(this.textNodeList.length == 0){
            this.textNodeList.push(new Text(""));
            this.uiElement.appendChild(this.textNodeList[0]);
        }
        this.textNodeList[0].replaceData(0, this.textNodeList[0].length, this.basicTextData);
        
        console.log(this.textn);
    }
    
    get firstNode(){
        return this.textNodeList[0];
    }
    get lastNode(){
        return this.textNodeList[this.textNodeList.length - 1];
    }


    wrapText(startIndex, startString, endIndex, endString){
        /**
         * 
         * to-do Check parameters values
         */

         let basicTextData = this.basicTextData;
         /*let orderedIndex = this.__orderAndCheckIndex(startIndex, endIndex);
         startIndex = orderedIndex.a, endIndex = orderedIndex.b;*/
         this.basicTextData = basicTextData.substring(0, startIndex) + startString + basicTextData.substring(startIndex, endIndex) + endString + basicTextData.substring(endIndex);
         this.recomputeUiElement();
         

    }
    filledTextNode(text){
        return document.createTextNode(text);
    }
    get brutContent(){
        return this.uiElement.innerHTML;
    }
    set brutContent(newBrutContent){
        this.uiElement.innerHTML = newBrutContent;
        
    }
    // can break the _line object
    insertBrutContent(brutString, index){
        let brutContent = this.brutContent;
        index = index % (this.brutContent.length + 1);

        this.brutContent = brutContent.substring(0, index) + brutString + brutContent.substring(index);
        
    }

    getBrutContent(){

    }
    
    wrapBrutContent(startIndex, startContent, endIndex, endContent){
        /**
         * 
         * to-do Check parameters values
         */

         let brutContent = this.brutContent;
         let orderedIndex = this._brut__orderAndCheckIndex(startIndex, endIndex);
         startIndex = orderedIndex.a, endIndex = orderedIndex.b;
         this.brutContent = brutContent.substring(0, startIndex) + startContent + brutContent.substring(startIndex, endIndex) + endContent + brutContent.substring(endIndex);
    }
    

    _brut__orderAndCheckIndex(a,b = undefined){

        let length = this.brutContent.length;
        a = Math.abs(a);
        if(b === undefined)
            b = length - 1;
        b = Math.abs(b);
        if( a > b){
            let cach = a;
            a = b;
            b = cach;
        }
        return {a,b};
    }
    //to-do solution if a is negative other than error
    __orderAndCheckIndex(a = -1, b = -1){

        let length = this.length;
        /*a = Math.abs(a);
        if(b === undefined)
            b = length - 1;
        b = Math.abs(b);*/
        if(a < 0 || b < 0 || a > length+1 || b > length+1){
            throw new Error("provided index are invalid:  Index a:" + a + " < 0 || Index b:" + b + " < 0 || Index a:" + a + " >= " + length + "+1 || Index b:" + b + " >= " + length + "+1");
            
        }
        if( a > b){
            let cach = a;
            a = b;
            b = cach;
        }
        return {a,b};
    }
    dismountUI(){
        this.uiElement.parentNode.removeChild(this.uiElement);
    }
    delete(){
        this.dismountUI();
    }
    deleteFromTo(a,b){
        //delete from a to b (char n°a is also deleted char n°b is not deleted)
        console.log("FUNCTION CALL: deleteFromTo(a,b)");
        let order = this.__orderAndCheckIndex(a,b);
        let start = order.a, end = order.b;

        if((end - start) == this.length){
            this.clear();
            return;
        }
        this.basicTextData = this.basicTextData.substring(0, start) + this.basicTextData.substring(end);
        this.recomputeUiElement();
        
    }
    backspace(index){
        //debugger;
        if(this.length > 0){
            this.basicTextData = this.basicTextData.substring(0, index) + this.basicTextData.substring(index + 1);

            this.recomputeUiElement();
            return true;
        }
        return false;
    }

    sectorsSetup(){
        this._texte_sector = new _gd_interval_sector();
    }

    highlightSetup(){
        //called "tag" but are html balise
        //_highlightMap entrie : [type of tag, _gd_interval object, bool tag status open/closed] 
        this._highlightMap = new Map();
    }
    highlight(id, startIndex, endIndex, type = HIGHLIGHT_TAG.noTag){
        
        let orderedIndex = this.__orderAndCheckIndex(startIndex, endIndex);
        this._highlightMap.set(id, [type, new _gd_interval(orderedIndex.a, orderedIndex.b, id), false]);

        apply_highlight();

    }
    apply_highlight(){
        let IntervalArray = Array.from(this._highlightMap.values());
        let tag_layering_array = _gd_interval.nested_interval_range_from_interval_list(IntervalArray);

        let indexDecal = 0;
        let concatenated_tag_string = "";
        tag_layering_array.forEach((value) => {
            value[1].forEach((value) => {
                this._highlightMap.get(value)[2]  != this._highlightMap.get(value)[2];
                concatenated_tag_string += this._highlightMap.get(value)[2] ? this._highlightMap.get(value)[0].start : this._highlightMap.get(value)[0].end;
                
            });
            this.insertBrutContent(concatenated_tag_string, value[0] + indexDecal);
            indexDecal += concatenated_tag_string.length;
            concatenated_tag_string = "";
        });
    }
    cursorToIndex(selection = window.getSelection(), index = this.length){
        console.log(index);
        try{
            selection.collapse(this.textNodeList[0], index);
        }
        catch(error){
            console.error(error);
            selection.collapse(this.uiElement, index);
        }
        
    }
    isLine(supposed_line){
        return supposed_line instanceof _line;
    }
    isLine_crash(supposed_line){
        if(!this.isLine(supposed_line)){
            throw new Error("argument is not instanceof _line");
        }
        //return supposed_line instanceof _line;
    }
    
}

function getValidParent(node){
    if(node._gdm){
        return node;
    }
    else if(node._gdm_editor || node === document.documentElement || node == undefined){
        return null;
    }

    return getValidParent(node.parentNode);
}
//for key action call function sloted to be called before the main bloc.
const _slot_keyAction = {

}
var __slotkeyaction = [];
function _slot_keyAction_call(){
    __slotkeyaction.forEach(fn_arg_array => {
        if(fn_arg_array[1] !== undefined){
            fn_arg_array[0](fn_arg_array[1]);
        }
        fn_arg_array[0]()
    });
    __slotkeyaction = [];
}

function _slot_keyAction_add(fn, arg = undefined){
    __slotkeyaction.push([fn, arg]);
}

/* interval = {
        start: Number,
        end: Number,
}*/
const VALID_BASIC_TEXT_DATA_VALUES__AS_REGXP = /\p{L}|\p{S}|\p{M}|\p{N}|\p{P}|\p{Zs}/u;
const NOT_VALID_BASIC_TEXT_DATA_VALUES__AS_REGXP = /\P{L}|\P{Ll}/ug;
const INTERVAL_ARRAY = [
    [0,0], //interval 1
    [0,0], // interval 2
];
function interval(intervalArray = INTERVAL_ARRAY){
    let intervallMap = new Map();
    intervalArray.forEach((interval, index) => {
        if(intervallMap.has(interval[0]))
            intervallMap.get(interval[0]).push(index);
        else
            intervallMap.set(interval[0], [index]);

        if(intervallMap.has(interval[1]))
            intervallMap.get(interval[1]).push(index);
        else
            intervallMap.set(interval[1], [index]);
    })
    return intervallMap;
}

function h_test(str){
    txtdata.search(str);
}