import { Component, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';

import {CONFIG_HORIZONTAL_GRID, CONFIG_VERTICAL_GRID, CONFIG_SLOT_WIDTH} from '../config/config';

import { Slot } from './slot';

import { ActionService } from '../../services/action.service';
import { PieceService } from '../../services/piece.service';



 
@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent {
	slots: Slot[][];
  piece : PieceService;
  @Output() changeNext= new EventEmitter<number>();
  @Output() updateScore = new EventEmitter<number>();
  @Output() declareGameOver = new EventEmitter<number>();
  @Input() gameId: number;


	chessboardWidth= ((CONFIG_HORIZONTAL_GRID) * (CONFIG_SLOT_WIDTH+2)) +"px";
  chessboardHeight = ((CONFIG_VERTICAL_GRID) * (CONFIG_SLOT_WIDTH+2)) +"px";
  slotWidth = CONFIG_SLOT_WIDTH+2+"px";

  	constructor(private actions: ActionService) { 

  		this.slots=[];
  		for(let i=0; i<CONFIG_VERTICAL_GRID; i++){
        this.slots[i]=[];
        for(let j=0; j< CONFIG_HORIZONTAL_GRID; j++){
  		    this.slots[i][j]=new Slot(i,j, 0);
        }
  		}
  		this.actions.frame$.subscribe((newFrame: number) => { 
  			this.movePiece([1,0]);
	    });

      this.actions.movement$.subscribe((newMovement:number)=> {
        this.movePiece([0, newMovement]);
      });

      this.actions.rotate$.subscribe((newRotation:number)=> {
        this.piece.slots= this.piece.rotatePiece(newRotation);

        
        

        for(let i=0; i<this.piece.slots.length; i++){
          let pieceI= this.piece.slots[i].i;
          let pieceJ= this.piece.slots[i].j;
          for(let gaugeI=-3; gaugeI<3; gaugeI++){
            for(let gaugeJ=-3; gaugeJ<3; gaugeJ++){
              let tmpI=pieceI+gaugeI;
              let tmpJ=pieceJ+gaugeJ;

              if(tmpI>0 && tmpI < CONFIG_VERTICAL_GRID && tmpJ>0 && tmpJ < CONFIG_HORIZONTAL_GRID){
                if(this.slots[tmpI][tmpJ].value!=0 && !this.slots[tmpI][tmpJ].stopped){

                  this.slots[tmpI][tmpJ].value=0;
                } 
              }

          }
        }
      }

this.movePiece([0,0]);

      

      });
      

  	}



        movePiece(d: [number]){
          let justDeployed=false;
          if(typeof this.piece == 'undefined'){ justDeployed=true; this.deploy();} 
          for(let i=0; i<this.piece.slots.length; i++){
            let p=this.piece.slots[i];
            if(p.i<CONFIG_VERTICAL_GRID && p.j< CONFIG_HORIZONTAL_GRID && p.j>=0){
              if((p.i+d[0] == CONFIG_VERTICAL_GRID || this.slots[p.i+d[0]][p.j].stopped) && p.value!=0){ 
                this.stopAndEvaluatePoints();
                return;
              }else if((p.j+d[1]<0 || p.j+d[1]==CONFIG_HORIZONTAL_GRID || this.slots[p.i][p.j+d[1]].stopped) && p.value!=0){
                return;
              }
            }
          }

          if(!justDeployed){
          if(d[1]==-1){
            for(let i=0;i<this.piece.slots.length; i++){
               this.executeNextStep(i,d);
              
            }
          }else{
            for(let i=this.piece.slots.length-1; i>=0; i--){
                this.executeNextStep(i,d);
              
            }  
          }
        }
        
      }
      

      

      deploy(){
        this.piece= new PieceService();
        this.changeNext.emit(this.piece.getQueueType());

        for(let i=0; i<this.piece.slots.length; i++){
          if(this.piece.slots[i].value!=0){
            console.log(this.piece.slots[i].i, this.piece.slots[i].j, this.piece.slots[i].value )
          this.slots[this.piece.slots[i].i][this.piece.slots[i].j].value=this.piece.slots[i].value;
        }
                  }
        this.checkIsNotGameOver();

      }


      checkIsNotGameOver(){
                
         for(let i=0; i<this.piece.slots.length; i++){
          if(this.piece.slots[i].value!=0 &&  this.slots[this.piece.slots[i].i][this.piece.slots[i].j].stopped){
            this.declareGameOver.emit(1);
            return;
          }
        }

      }
      stopAndEvaluatePoints(){
        for(let i=this.piece.slots.length-1; i>=0; i--){
          if(this.piece.slots[i].value!=0){
            this.slots[this.piece.slots[i].i][this.piece.slots[i].j].stopped=true;
          }
        }

        let riga=[];
        for(let i=0; i<CONFIG_VERTICAL_GRID; i++){
          riga[i]=0;
          for(let j=0; j<CONFIG_HORIZONTAL_GRID; j++){
            if(this.slots[i][j].value!=0){ riga[i]++;}
          }
        }
        for(let k=0; k<riga.length; k++){
          if(riga[k]==CONFIG_HORIZONTAL_GRID){
            let quante=k;
            do{ k++;  }while(riga[k]==CONFIG_HORIZONTAL_GRID);
            for(let i=k-1; i > k-quante; i--){
              for(let j=0; j<CONFIG_HORIZONTAL_GRID; j++){
                this.slots[i][j].value=this.slots[i-(k-quante)][j].value;
                this.slots[i][j].stopped=this.slots[i-(k-quante)][j].stopped;

              }
            } console.log('ELIMINO', k-quante, 'RIGHE');
                              this.updateScore.emit((k-quante)*(k-quante));

          }
        }
        delete this.piece; 
      }

      executeNextStep(i,d){
        if(this.piece.slots[i].i<= CONFIG_VERTICAL_GRID && this.piece.slots[i].j < CONFIG_HORIZONTAL_GRID){
          if(this.piece.slots[i].value!=0){
            this.slots[this.piece.slots[i].i][this.piece.slots[i].j].value=0;


          }
          
          this.piece.slots[i].i+=d[0];
          this.piece.slots[i].j+=d[1];
          if(this.piece.slots[i].value!=0){
            this.slots[this.piece.slots[i].i][this.piece.slots[i].j].value=this.piece.slots[i].value;
          }
        }
      }

      clearChessboard(){
        for(let i=0; i<CONFIG_VERTICAL_GRID; i++){
        this.slots[i]=[];
        for(let j=0; j< CONFIG_HORIZONTAL_GRID; j++){
          this.slots[i][j]=new Slot(i,j, 0);
        }
      }

      delete this.piece;
      }

      ngOnChanges(changes: SimpleChanges) {
        this.clearChessboard();
      }
      

  	
}
