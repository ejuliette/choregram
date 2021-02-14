import { Component, VERSION,ViewChild,ViewContainerRef,ComponentFactoryResolver } from '@angular/core';
import { DraggableComponent } from './components/dragg.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Juliette';
      componentRef: any;
      count=0;
  @ViewChild('ele', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver){

  }
  create(event){
    console.log(event)
const factory = this.resolver.resolveComponentFactory(DraggableComponent);
        this.componentRef = this.entry.createComponent(factory);
        this.count++;
        this.componentRef.instance.text = "Draggble" +this.count;
        
  }
  dropped(){
    alert("hi")
  }




}
