import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DraggableComponent } from './dragg.component';

@NgModule({
  imports:      [ DragDropModule],
  declarations: [ DraggableComponent ],
  exports:    [ DraggableComponent ]
})
export class DraggModule { }
