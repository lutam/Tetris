import { Component, Input, SimpleChanges} from '@angular/core';

import { PieceService } from '../../services/piece.service';


@Component({
  selector: 'app-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.css']
})
export class NextComponent  {

	@Input() nextId: number;
	nextpiece: PieceService;
	rowsNumber: number;

  constructor() { 
  		

  }

  ngOnChanges(changes: SimpleChanges) {
	  this.nextpiece= new PieceService(changes.nextId.currentValue);
	  this.rowsNumber=Math.sqrt(this.nextpiece.slots.length)*20;

	}


}
