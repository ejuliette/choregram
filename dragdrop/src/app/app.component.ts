import { Component, VERSION,ViewChild,ViewContainerRef,ComponentFactoryResolver } from '@angular/core';
import { DraggableComponent } from './components/dragg.component';
import { Danseur } from './modeles/danseur.model';
import { Placement } from './modeles/placement.model';
import { Position } from './modeles/position.model';
 
@Component({
 selector: 'my-app',
 templateUrl: './app.component.html',
 styleUrls: [ './app.component.css' ]
})
 
export class AppComponent  {
 danseurs: Danseur[] = [];
 placement = new Placement();
 dragPositions : Position[] = [];
 
 
     componentRef: any;
 @ViewChild('ele', { read: ViewContainerRef }) entry: ViewContainerRef;
 
 constructor(private resolver: ComponentFactoryResolver){}
 
 add() {
   let danseur = new Danseur();
   danseur.id = this.danseurs.length+1;
   this.danseurs.push(danseur);
 }
 
 onDragEnded(event, index) {
   console.log(event.source.getFreeDragPosition());
   console.log(index);
   let danseurCourant = this.danseurs[index];
   danseurCourant.x = event.source.getFreeDragPosition().x;
   danseurCourant.y = event.source.getFreeDragPosition().y;
   console.log(this.danseurs);
 
 }
 savePlacement(){
   this.placement.id = 1;
   this.placement.nom = 'triangle';
   this.placement.listeDanseurs = this.danseurs;
 }
 
 affichePosition(){
   this.danseurs = this.placement.listeDanseurs;
   console.log(this.danseurs[0]);
   this.dragPositions[0] = {x : this.danseurs[0].x, y : this.danseurs[0].y};
   this.dragPositions[1] = {x : 150, y: 150};
   this.dragPositions[2] = {x : 200, y: 200};
 
   /*
   for (let i = 0; i<this.danseurs.length; i++)
   {
     this.dragPositions[i] = {x : this.danseurs[i].x, y: this.danseurs[i].y};
 
   }
  */
   console.log(this.dragPositions);
 
 }
 
 
}
 
