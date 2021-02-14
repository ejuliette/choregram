import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import {DraggModule} from './components/app.draggable.module';


@NgModule({
  imports:      [ BrowserModule, FormsModule ,DragDropModule,DraggModule],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ],

})
export class AppModule { }
