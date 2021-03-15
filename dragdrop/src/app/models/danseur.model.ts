import { Position } from "./position.model";

export class Danseur {
    nom : string;
    id : number;
    
    //position : Position;

    
    constructor(public x : number, public y : number){
        this.x = x;
        this.y = y; 
    }
    

    /*
    constructor(public pos : Position){
        this.pos = pos;
    }
    */
  
 }
 