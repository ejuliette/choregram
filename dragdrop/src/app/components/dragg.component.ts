
import { Component } from '@angular/core';

@Component({
  selector: 'my-app-draggable',
  templateUrl: './app.draggable.html',
  styleUrls: [ './app.draggable.css' ]
})
export class DraggableComponent  {
  text="Drag me";
  count=0;


  dragPosition = {x: 0, y: 0};



  
}