import { Component, VERSION,ViewChild,ViewContainerRef,ComponentFactoryResolver } from '@angular/core';
import { Danseur } from './models/danseur.model';
import { Placement } from './models/placement.model';
import { Position } from './models/position.model';
 
@Component({
 selector: 'my-app',
 templateUrl: './app.component.html',
 styleUrls: [ './app.component.css' ]
})
 
export class AppComponent  {
 danseurs: Danseur[] = [];
 placementEnr = new Placement();
 dragPositions : Position[] = [];
 
 
     componentRef: any;
 @ViewChild('ele', { read: ViewContainerRef }) entry: ViewContainerRef;
 
 constructor(private resolver: ComponentFactoryResolver){}
 
 add() {
   let danseur = new Danseur(0,0);
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
   this.placementEnr.id = 1;
   this.placementEnr.nom = 'triangle';
   this.placementEnr.listeDanseurs = [new Danseur(0,0)];


   for (let i = 0; i<this.danseurs.length; i++)
   {
    let danseurEtudie = new Danseur(0,0);
    danseurEtudie.id = i+1 ;
    danseurEtudie.x = this.danseurs[i].x ;
    danseurEtudie.y = this.danseurs[i].y ;
    this.placementEnr.listeDanseurs[i] = danseurEtudie;
   }


 }
 
 affichePosition(){

  console.log('AFFICHAGE');
  console.log('placement enregistré');
  console.log(this.placementEnr.listeDanseurs);


  
  for (let i = 0; i<this.danseurs.length; i++)
   {
     this.danseurs[i] = this.placementEnr.listeDanseurs[i];
 
   }
   

   console.log('position affichée');
   console.log(this.danseurs);

   
   for (let i = 0; i<this.danseurs.length; i++)
   {
     this.dragPositions[i] = {x : this.danseurs[i].x, y: this.danseurs[i].y};
 
   }


   console.log(this.dragPositions);
 
 }
 
 
}
 
