import { Injectable, Optional  } from '@angular/core';


import { Slot } from '../app/chessboard/slot';

import {CONFIG_HORIZONTAL_GRID, CONFIG_VERTICAL_GRID} from '../app/config/config';

let ELLE = []; let SQUARE = []; let LONG = []; let TI= []; let ESSE = []; let REVERSE_ESSE = []; let REVERSE_ELLE = [];
ELLE['s']= [[1,1, 0], [1, 0, 0] , [1, 0, 0]];
ELLE['l']=2;
ELLE['c']=1;

REVERSE_ELLE['s']=[[0,1,1],[0,0,1],[0,0,1]];
REVERSE_ELLE['l']=2;
REVERSE_ELLE['c']=2;

SQUARE['s'] = [[1,1],[1,1]];
SQUARE['l']=1;
SQUARE['c']=3;

LONG['s'] = [[1,0,0,0], [1,0,0,0], [1,0,0,0], [1,0,0,0]];
LONG['l'] = 3;
LONG['c']=4;

TI['s'] = [[1,1,1], [0,1,0], [0,0,0]];
TI['l']=2;
TI['c']=5;

ESSE['s'] = [[1,0,0], [1,1,0] , [0,1,0]];
ESSE['l'] = 2;
ESSE['c']=6;

REVERSE_ESSE['s']= [[0,0,1],[0,1,1],[0,1,0]];
REVERSE_ESSE['l']=2;
REVERSE_ESSE['c']=7;


const TYPES = [ELLE, REVERSE_ELLE, SQUARE, LONG, TI, ESSE, REVERSE_ESSE];



@Injectable()


export class PieceService {

	type: number;
  static queueType = Math.round(Math.random()*6);
	slots: Slot[];



  
  constructor( @Optional() specificType?: number) { 
    this.slots=[];
    let  d = new Date();
    if(typeof specificType == 'undefined'){
      this.type = PieceService.queueType;
      PieceService.queueType = Math.round(Math.random()*6);
    }else{
        this.type= specificType;


    }

    this.initPiece();

  }




  initPiece(){
  	 let p = TYPES[this.type]['s'];
    


  	let l = p.length; 

  	let b = Math.floor( Math.random() * (CONFIG_HORIZONTAL_GRID-l));
  	for(let i=0; i<l; i++){
  		for(let j=0; j<l; j++){
        let color=0;
        if( p[i][j]==1 ){ color=TYPES[this.type]['c'];}
  			 this.slots.push( new Slot(i, j+b, color));
      }
    }
  }

      




  getQueueType(){
    return PieceService.queueType;
  }



rotatePiece(direction){
  let tmp=[];



  for(let i=0; i<this.slots.length; i++){
    let r=Math.floor(i / TYPES[this.type]['s'].length);
    let c = i - TYPES[this.type]['s'].length * r;
    tmp.push([r, c, this.slots[i].value]);
  }
  let pptmp=[];
  for(let i=0; i<this.slots.length; i++){
    let oldr=Math.floor(i / TYPES[this.type]['s'].length);
    let oldc = i - TYPES[this.type]['s'].length * oldr;
    let newr= TYPES[this.type]['s'].length-1-oldc;
    let newc=oldr;
    let newi= newr*TYPES[this.type]['s'].length+newc; 
     pptmp[i]=[tmp[i][0], tmp[i][1], tmp[  newi ][2]];
  }
  let newTmp=[];
  for(let i=0; i<this.slots.length; i++){
   newTmp[i]=[this.slots[0].i+pptmp[i][0], this.slots[0].j+pptmp[i][1], pptmp[i][2]];
  }

let toret=[];
  for(let i=0; i<this.slots.length; i++){
    toret.push(new Slot(newTmp[i][0],newTmp[i][1],newTmp[i][2]));
  }


  return toret;

}







}
