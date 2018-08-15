import { Component, HostListener} from '@angular/core';
import { ActionService } from '../services/action.service';

import {CONFIG_HORIZONTAL_GRID, CONFIG_VERTICAL_GRID, CONFIG_SLOT_WIDTH} from './config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	appWidth: number;
	asideWidth: number;
	nextId: number;
	gameId = 0;
	score = 0;
	bestScore = 0;
	isGameOver= false;

	constructor(private action: ActionService){
		action.start();
		this.appWidth= ((CONFIG_HORIZONTAL_GRID) * (CONFIG_SLOT_WIDTH+2));
		this.asideWidth= 4 * (CONFIG_SLOT_WIDTH+2);

	}

	pause(){
		this.action.togglePause();
	}

	restart(){
		this.pause();
		this.isGameOver=false;
		this.score=0;
		this.gameId++;
	}

	gameOver(){
		this.pause();
		this.isGameOver=true;
	}

	updateScore(add){
		this.score+=add;
		this.bestScore= Math.max(this.score, this.bestScore);
	}

	@HostListener('document:keydown', ['$event']) openEars(event: KeyboardEvent) { 
    	this.action.hearKey(event.key);
    	

  	}



}
