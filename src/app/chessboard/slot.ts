import {CONFIG_HORIZONTAL_GRID, CONFIG_VERTICAL_GRID} from '../config/config';


export class Slot{
	//id:number;
	value:number;
	i: number;
	j: number;
	stopped: boolean;

	constructor(_i:number, _j:number, _value:number){
		//this.id = _i*CONFIG_HORIZONTAL_GRID + _j;
		this.value=_value;
		this.i=_i;
		this.j=_j;
		this.stopped=false;
	} 

}