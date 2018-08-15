import { Injectable } from '@angular/core';

import { interval } from 'rxjs/observable/interval';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
 


@Injectable()
export class ActionService {

static CURRENTFRAME = 0;
frame$: Observable<number>;
private frameSubject: Subject<number>;

movement$: Observable<number>;
private movementSubject: Subject<number>;

rotate$: Observable<number>;
private rotateSubject: Subject<number>;

intervalSource: any;
isPause= false;


	constructor(){ 

		this.frameSubject = new Subject<number>();
        this.frame$ = this.frameSubject.asObservable();

        this.movementSubject = new Subject<number>();
        this.movement$ = this.movementSubject.asObservable();

        this.rotateSubject = new Subject<number>();
        this.rotate$ = this.rotateSubject.asObservable();

        
    }

	start() : void{
		this.intervalSource = interval(600);
		this.intervalSource.subscribe(val => this.nextFrame());

	}

	togglePause(): void{
		this.isPause = this.isPause ? false : true;
		}
	
	nextFrame() : void{
		if(!this.isPause){
			ActionService.CURRENTFRAME++;
			this.frame=ActionService.CURRENTFRAME;
		}
	}

	set frame(newValue) {
      this.frame$ = newValue;
      this.frameSubject.next(newValue);
    }

    set movement(newValue){
    	this.movement$ = newValue;
    	this.movementSubject.next(newValue);
    }

    set rotate(newValue){
    	this.rotate$ = newValue;
    	this.rotateSubject.next(newValue);
    }

   

    hearKey(key):void{
		if(key=='ArrowLeft'){ this.movement=-1; }
		else if(key=='ArrowRight'){ this.movement=1;}
		else if(key=='ArrowDown'){ this.nextFrame();}

		else if( key == 'ArrowUp') { this.rotate = 1;}
		//else if( key == 'z' || key=='Z'){ this.rotate= -1; }
	}

}






	


