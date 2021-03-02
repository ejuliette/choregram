import { Component, VERSION,ViewChild,ViewContainerRef,ComponentFactoryResolver, ElementRef } from '@angular/core';
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

 danseurPasX = [];
 danseurPasY = [];
 loop =  null;
 arret = false;

 
 
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
 

 mettreEnMouvement()
{
  
  this.loop = setInterval(() => {
    for (let i = 0; i<this.danseurs.length; i++)
    {
      this.dragPositions[i] = {x : this.danseurs[i].x, y: this.danseurs[i].y + 1};
      this.danseurs[i].x = this.danseurs[i].x + 1 ;
      this.danseurs[i].y = this.danseurs[i].y + 1 ;
      this.detectePositionSuivante();
    }
    
   }, 25);
  
 }

 detectePositionSuivante(){

  console.log(this.arret);
  if(this.arret==true)
  {
    clearInterval(this.loop);
    this.arret=false;
  }
  else if(Math.round(this.danseurs[0].y) == Math.round(this.placementEnr.listeDanseurs[0].y) && Math.round(this.danseurs[0].x) == Math.round(this.placementEnr.listeDanseurs[0].x))
  {
    clearInterval(this.loop);
  }
  
 }

 stop()
 {
   this.arret = true;
 }





 versProchainePosition(){
   this.calculPas(1);

   console.log(this.danseurPasX[0]);

   this.loop = setInterval(() => {
    for (let i = 0; i<this.danseurs.length; i++)
    {
      this.dragPositions[i] = {x : this.danseurs[i].x, y: this.danseurs[i].y + 1};
      this.danseurs[i].x = this.danseurs[i].x + this.danseurPasX[0] ;
      this.danseurs[i].y = this.danseurs[i].y + this.danseurPasY[0] ;
      this.detectePositionSuivante();
    }
    
   }, 25);

 }


calculPas(d){

  let variationX = this.placementEnr.listeDanseurs[0].x - this.danseurs[0].x;
  let variationY = this.placementEnr.listeDanseurs[0].y - this.danseurs[0].y;
  let distDirecte = Math.round(Math.sqrt(variationX*variationX-variationY*variationY));
  let tan = Math.abs(variationY)/Math.abs(variationX);
  let angle = Math.atan(tan);
  let pasX = Math.abs(Math.cos(angle))*d;
  let pasY = Math.abs(Math.sin(angle))*d;

  if(variationX<=0 && variationY<=0)//Prochain point en bas à gauche
  {
    pasX=-pasX;
    pasY=-pasY;
  }
  else if(variationX>=0 && variationY<=0)//Prochain point en bas à droite
  {
    pasY=-pasY;
  }
  else if(variationX<=0 && variationY>=0)//Prochain point en haut à gauche
  {
    pasX=-pasX;
  }

  this.danseurPasX[0] = pasX;
  this.danseurPasY[0] = pasY;

  

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
 
