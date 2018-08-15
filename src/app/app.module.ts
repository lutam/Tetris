import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { NextComponent } from './next/next.component';


import { ActionService } from '../services/action.service';
import { PieceService } from '../services/piece.service';


@NgModule({
  declarations: [
    AppComponent,
    ChessboardComponent,
    NextComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [ActionService, PieceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
