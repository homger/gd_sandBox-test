'use strict';


/*

__addEventType does what it says:

name = name of the new type of event;
eventObjectNameArray = name of the member varaible or function to be dispatched 
with the event object like : keyboardEvent.key.

Variable and function inside eventObjectNameArray should exist inside the class that extends _gd_event

need to make a version that does not need to extend _gd_event


*/
class _gd_event{
    constructor(){

        this.eventNameList = new Map();
        this._is_gd_event_target = true;
        this._gd_parrent = undefined;
        //this.makeEventObject = this.makeEventObject.bind(this);
    }

    //removed the checks so that user can know if he did something wrong
    addEventListener(name, callFunction){
        /*if(this.eventNameList.has(name)){
            this.eventNameList.get(name).callFunctionList.add(callFunction);
        }*/
        this.eventNameList.get(name).callFunctionList.add(callFunction);
    }
    removeEventListener(name, callFunction){
        /*if(this.eventNameList.has(name)){
            this.eventNameList.get(name).callFunctionList.delete(callFunction);
        }*/
        this.eventNameList.get(name).callFunctionList.delete(callFunction);
    }

    /*eventObjectNameArray is an Array of string. Each of them elements of the future object that will dispatch the event*/
    __addEventType(name, eventObjectNameArray){
        this.eventNameList.set(name, {eventObjectNameArray: eventObjectNameArray, callFunctionList: new Set()});
    }

    dispatchEvent(eventName){
        
        if(this.eventNameList.has(eventName)){

            let cach = this.eventNameList.get(eventName);
            let dispatchObject = this.make_ObjectToDispatchWith_Event(cach.eventObjectNameArray);
            //debugger;
            cach.callFunctionList.forEach(callFunction => callFunction(dispatchObject) );
            return;
        }
        throw new Error("dispatchEvent(eventName)  eventName not found");
    }

    
    //need a better name?..
    __circulateEvent(event){

    }

    make_ObjectToDispatchWith_Event(eventObjectNameArray){
        let eventObj = {};
        eventObj.eventOrigin = this;
        eventObjectNameArray.forEach(name => eventObj[name] = this[name]);

        return eventObj;
    }

}
