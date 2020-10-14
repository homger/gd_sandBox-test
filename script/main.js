'use strict'

document.addEventListener("readystatechange", function(){

  if(document.readyState === "complete"){
    loadScript("script/_gd_window.js");
    loadScript("script/_gd_sandbox_file.js");
    loadScript("script/_gd_sandbox_folder.js");
    loadScript("script/_gd_sandbox_project.js");
    loadScript("script/_gd_sandbox_editor.js");
    loadScript("script/_gd_context_menu.js");
    loadScript({src: "script/gd_SandBox.js", loadFunction: main});
    //console.log("MAIN :" + main);

  }
});


function main(){
  let viewer = document.createElement("div");
  viewer.className = "LOL";
  console.log("main start");
  let box = new gd_SandBox({
    nav: document.querySelector(".gd_sandBox > nav"),
    header: document.querySelector(".gd_sandBox > header"),
    editor: document.querySelector(".gd_sandBox > section"),
    footer: document.querySelector(".gd_sandBox > footer"),
  }
  );
  document.querySelector(".gd_sandBox > section").appendChild(viewer);
  
  //let _win = new _gd_window(viewer,{boundingBlock: document.querySelector(".gd_sandBox > section")});
  box.newProject("Project Gorgon");

  box.addFolder("/Project Gorgon","Subjects");
  box.addFolder("/Project Gorgon","Dogs");
  box.addFolder("/Project Gorgon/Subjects","pan");
  box.addFolder("/Project Gorgon/Subjects/pan","ldledle");
  box.addFolder("/Project Gorgon/Subjects/pan","pate");
  box.addFolder("/Project Gorgon/Subjects/pan/pate","cathegories");
  box.addFolder("/Project Gorgon/Subjects/pan/pate/cathegories","Liquid");
  box.addFolder("/Project Gorgon/Subjects/pan/pate/cathegories","Solid");
  box.addFolder("/Project Gorgon/Subjects/pan/pate/cathegories","Gas");
  box.addFile("/Project Gorgon/Subjects/pan/pate/cathegories/Gas",new _gd_sandbox_file("Efect of gas type pate", "text/plain","The effects of the Gas type pate are so horendous that i dare not describe them in this document. Sowwy :("));
  box.addFile("/Project Gorgon/Subjects/pan/pate/cathegories",new _gd_sandbox_file("read me", "text/plain","Good job."));
  box.addFile("/Project Gorgon",new _gd_sandbox_file("test", "text/plain","Mad lad"));
  
  let Tete = box.newProject("Tete");
  let test1 = box.addFolder("/Tete","test1");
  let test2 = box.addFolder("/Tete","test2");
  box.addFile("/Tete/test1",new _gd_sandbox_file("read me", "text/plain","Readed."));
  box.addFile("/Tete/test2",new _gd_sandbox_file("Try me", "text/plain","Tried."));

  for(let i = 0; i < 15; ++i){
    box.addFile("/Tete/test2",new _gd_sandbox_file("Try me" + i, "text/plain","Tried."));
  }
  test1.mergeFolder(test2);
  Tete.projectFolder.removeChildFoler("test2");

  
}

function ui_project(_gd_project_name){
  let project = document.createElement("div");
  project.className = "project";
  

  project.innerHTML = `<div class="project-name">${FOLDER_ICON}${_gd_project_name}</div>`;
  let ul = document.createElement("ul");
  ul.className = "folder project-content";
  project.append(ul);
  return project;
}

function ui_folder(name, _fullName, content){
  let folder = document.createElement("li");
  folder.className = "folder";

  let ul = document.createElement("ul");
  ul.className = "folder-content"
  let ul_content = "";
  content.folders.forEach(function(folderName){
    ul_content += `<li class="folder">${folderName}</li>`;
  });

  ul.innerHTML = ul_content;

  content.files.forEach(function(fileName){
    ul.append(ui_file(fileName));
  });

  folder.innerHTML = `<div class="folder-name">${FOLDER_ICON}${name}<div>`;
  folder.appendChild(ul);
  return folder;
}

function ui_file(name){
  
  let file = document.createElement("li");
  file.className = "file";
  
  file.innerHTML = `
      <div class="file-name">${name}</div>
    `;
  return file;
}




//const FOLDER_ICON = `<svg class="folder-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g transform="translate(0 16) rotate(-90)"><path d="M 14.79290008544922 15.5 L 0.5 15.5 L 0.5 1.207100033760071 L 7.646450042724609 8.353549957275391 L 14.79290008544922 15.5 Z"/><path d="M 1 2.414219856262207 L 1 15 L 13.58578014373779 15 L 7.292889595031738 8.707109451293945 L 1 2.414219856262207 M 0 0 L 8 8 L 16 16 L 0 16 L 0 0 Z"/></g></svg>`;








/** loadScript.js https://github.com/homger/utility/blob/master/loadScript/loadScript.js */


var SCRIPT_LIST = [];
const DEFAULT_PARAMERTERS_VALUE = {src: "",  loadFunction: undefined, reference_sibling: document.querySelector("script"), append: false, msg: "_"};

function loadScript(parameters = {src: "",  loadFunction: undefined, reference_sibling: document.querySelector("script"), append: false, msg: "_"}){
  //console.log(parameters);
  if( (typeof parameters === "string") ){
    parameters = {src : parameters};
  }
  parameters = objectDefaultValue(parameters, DEFAULT_PARAMERTERS_VALUE);

  if(parameters.msg === "/****/ script has been loaded /****/"){
    SCRIPT_LIST.shift();
    if(SCRIPT_LIST.length > 0){
      console.log("AUTO LUNCH LOAD");
      launchLoad(SCRIPT_LIST[0]);
    }
    return;
  }
  
  console.log(parameters.msg);

  let script = document.createElement("script");
  script.src = parameters.src;
  script.addEventListener("load", function(){
    loadScript({msg:"/****/ script has been loaded /****/"});
    console.log("script :  " + this.src + "  load done");
    /*console.log("this.__hasLoadFunction : " + this.__hasLoadFunction);
    console.log("this.__loadFunction : " + this.__loadFunction);*/
    if(this.__hasLoadFunction){
      this.__loadFunction();
      this.__hasLoadFunction = undefined;
      this.__loadFunction = undefined;
    }
  });


  let parameter_object = {};
  parameter_object.script = script;
  parameter_object.reference_sibling = parameters.reference_sibling;
  parameter_object.append = parameters.append;

  script.__hasLoadFunction = false;

  if(parameters.loadFunction !== undefined ){
    script.__hasLoadFunction = true;
    script.__loadFunction = parameters.loadFunction;
  }

  SCRIPT_LIST.push(
    parameter_object
  );

  if(SCRIPT_LIST.length == 1){
    launchLoad(SCRIPT_LIST[0]);
  }
}

function launchLoad(parameter_object){
  if(parameter_object.append){
    parameter_object.reference_sibling.parentNode.append(parameter_object.script);
    return;
  }
  parameter_object.reference_sibling.parentNode.insertBefore(parameter_object.script,
    parameter_object.reference_sibling);
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
    //debugger;
    if(typeof objectToCheck[key] === "undefined"){
      objectToCheck[key] = defaultObject[key];
    }
    /*else if(typeof objectToCheck[key] === "undefined"){
      objectToCheck[key] = defaultObject[key];
    }*/
  });
  //console.log(objectToCheck);
  return objectToCheck;
}