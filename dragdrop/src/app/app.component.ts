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
      this.dragPositions[i] = {x : this.danseurs[i].x, y: this.danseurs[i].y};
      this.danseurs[i].x = this.danseurs[i].x + 1 ;
      this.danseurs[i].y = this.danseurs[i].y + 1 ;
      this.detectePositionSuivante();
    }
    
   }, 25);
  
 }

 detectePositionSuivante(){

  for (let i = 0; i<this.danseurs.length; i++)
    {
      if(Math.abs(this.placementEnr.listeDanseurs[i].x - this.danseurs[i].x)<5 && Math.abs(this.placementEnr.listeDanseurs[i].y - this.danseurs[i].y)<5)
        {
          clearInterval(this.loop);
          
          this.danseurs[i].y = this.placementEnr.listeDanseurs[i].y;
          this.danseurs[i].x = this.placementEnr.listeDanseurs[i].x;
          this.dragPositions[i] = {x : this.danseurs[i].x, y: this.danseurs[i].y};
          

          console.log("COORDO OBJ");
          console.log(this.danseurs[0].y);
          console.log("COORDO ARRÊT");
          console.log(this.placementEnr.listeDanseurs[0].y);
          console.log("COORDO OBJ ROUND ");
          console.log(Math.round(this.danseurs[0].y));
          console.log("COORDO ARRÊT ROUND");
          console.log(Math.round(this.placementEnr.listeDanseurs[0].y));
          


        }

    }

  if(this.arret==true)
  {
    clearInterval(this.loop);
    this.arret=false;
  }

  
 }

 stop()
 {
   this.arret = true;
 }


 versProchainePosition(){
   this.calculPas();

   console.log("PAS");
   console.log(this.danseurPasX);
   console.log(this.danseurPasY);
   console.log("FIN PAS");

   this.loop = setInterval(() => {
    for (let i = 0; i<this.danseurs.length; i++)
    {
      this.dragPositions[i] = {x : this.danseurs[i].x, y: this.danseurs[i].y + 1};
      this.danseurs[i].x = this.danseurs[i].x + this.danseurPasX[i] ;
      this.danseurs[i].y = this.danseurs[i].y + this.danseurPasY[i] ;
      this.detectePositionSuivante();
    }
    
   }, 25);

 }


calculPas(){

  for (let i = 0; i<this.danseurs.length; i++)
  {
  let variationX = this.placementEnr.listeDanseurs[i].x - this.danseurs[i].x;
  let variationY = this.placementEnr.listeDanseurs[i].y - this.danseurs[i].y;
  let distDirecte = Math.round(Math.sqrt(variationX*variationX-variationY*variationY));
  let d = distDirecte/50;
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

  this.danseurPasX[i] = pasX;
  this.danseurPasY[i] = pasY;
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
 
