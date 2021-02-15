import { Component, VERSION,ViewChild,ViewContainerRef,ComponentFactoryResolver } from '@angular/core';
import { DraggableComponent } from './components/dragg.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  numbers: number[] = [];
  count = 0;

      componentRef: any;
  @ViewChild('ele', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver){}

  add() {
    this.numbers = [ this.numbers.length, ...this.numbers];
    this.count = this.numbers.length;
  }



  create(event){
    
        const factory = this.resolver.resolveComponentFactory(DraggableComponent);
        this.componentRef = this.entry.createComponent(factory);
        this.count++;
        this.componentRef.instance.text = "Draggble" +this.count;
        
  }





}



