import { Component, VERSION,ViewChild,ViewContainerRef,ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Danseur } from './models/danseur.model';
import { Placement } from './models/placement.model';
import { Position } from './models/position.model';
import { Choregraphie } from './models/choregraphie.model';

 
@Component({
 selector: 'my-app',
 templateUrl: './app.component.html',
 styleUrls: [ './app.component.css' ]
})
 
export class AppComponent  {
 danseurs: Danseur[] = [];
 choregraphieVisionnee = new Choregraphie();
 dragPositions : Position[] = [];

 danseurPasX = [];
 danseurPasY = [];

 loop =  null;
 arret = false;
 tousEnPlace = false;

 indicePlacement = 1;
 indicePla = -10000;
 longueur = 0;

 
 
     componentRef: any;
 @ViewChild('ele', { read: ViewContainerRef }) entry: ViewContainerRef;
 
 constructor(private resolver: ComponentFactoryResolver){}

 ngOnInit() {
   this.choregraphieVisionnee.listePlacements = [new Placement()];
 }
 
 add() {
   let danseur = new Danseur(0,0);
   danseur.id = this.danseurs.length+1;
   this.danseurs.push(danseur);
 }
 
 onDragEnded(event, index) {
   let danseurCourant = this.danseurs[index];
   danseurCourant.x = event.source.getFreeDragPosition().x;
   danseurCourant.y = event.source.getFreeDragPosition().y;
 }

 savePlacement(){
   let placement = new Placement;
   placement.listeDanseurs = [new Danseur(0,0)]; //Créer un placement vide en 0 sinon bug -> travailler à  partir du placement 1
 
   for (let i = 0; i<this.danseurs.length; i++)
   {
    let danseurEtudie = new Danseur(0,0);
    danseurEtudie.id = i+1 ;
    danseurEtudie.x = this.danseurs[i].x ;
    danseurEtudie.y = this.danseurs[i].y ;
    placement.listeDanseurs[i] = danseurEtudie;
   }
   
   this.choregraphieVisionnee.listePlacements.push(placement);
   console.log(this.choregraphieVisionnee.listePlacements);

   this.longueur =  this.choregraphieVisionnee.listePlacements.length - 1;
  
 }


 detectePositionSuivante2(initial : Placement, final : Placement){
  this.verifTousEnPlace2(initial,final)
  if(this.tousEnPlace==true) //Tous les danseurs sont bien placés
    {
      clearInterval(this.loop)
      this.tousEnPlace=false;
    }

  if(this.arret==true) //L'utilisateur a cliqué sur le bouton stop 
  {
    clearInterval(this.loop);
    this.arret=false;
  }
 }

 stop()
 {
   this.arret = true;
 }

 verifTousEnPlace2(initial : Placement, final : Placement)
 {
  let ok = true;

  for (let i = 0; i<initial.listeDanseurs.length; i++)
  {
   if(final.listeDanseurs[i].x != this.danseurs[i].x || final.listeDanseurs[i].y != this.danseurs[i].y)
   {
     ok = false;
   }
  }

  if(ok==true)
  this.tousEnPlace = true;
 }
 


 changementPosition(initial : Placement, final : Placement){


  let placementIni = new Placement;
   placementIni.listeDanseurs = [new Danseur(0,0)]; //Créer un placement vide en 0 sinon bug -> travailler à  partir du placement 1
 

   for (let i = 0; i<this.danseurs.length; i++)
   {
    let danseurEtudie = new Danseur(0,0);
    danseurEtudie.id = i+1 ;
    danseurEtudie.x = initial.listeDanseurs[i].x ;
    danseurEtudie.y = initial.listeDanseurs[i].y ;
    placementIni.listeDanseurs[i] = danseurEtudie;
   }

   this.affichePlacement(placementIni);

   let placementFin = new Placement;
   placementFin.listeDanseurs = [new Danseur(0,0)]; //Créer un placement vide en 0 sinon bug -> travailler à  partir du placement 1
 
   for (let i = 0; i<this.danseurs.length; i++)
   {
    let danseurEtudie = new Danseur(0,0);
    danseurEtudie.id = i+1 ;
    danseurEtudie.x = final.listeDanseurs[i].x ;
    danseurEtudie.y = final.listeDanseurs[i].y ;
    placementFin.listeDanseurs[i] = danseurEtudie;
   }



  this.calculPasIniFin(placementIni, placementFin);
  let nbIntervalle = 0;
  this.loop = setInterval(() => {
   
   for (let i = 0; i<placementIni.listeDanseurs.length; i++)
   {
     this.detectePositionSuivante2(placementIni, placementFin);

     this.dragPositions[i] = {x : this.danseurs[i].x, y: this.danseurs[i].y};
     this.danseurs[i].x = this.danseurs[i].x + this.danseurPasX[i] ;
     this.danseurs[i].y = this.danseurs[i].y + this.danseurPasY[i] ;


     if(Math.abs(placementFin.listeDanseurs[i].x - this.danseurs[i].x)<5 && Math.abs(placementFin.listeDanseurs[i].y - this.danseurs[i].y)<5)
     {
       
       this.dragPositions[i] = {x : this.danseurs[i].x, y: this.danseurs[i].y};
       this.danseurs[i].y = placementFin.listeDanseurs[i].y;
       this.danseurs[i].x = placementFin.listeDanseurs[i].x;

     }
    
   }

   nbIntervalle = nbIntervalle + 1;


   if(nbIntervalle>=50)
   {
    clearInterval(this.loop);
   }
   
  
  }, 25);

}

calculPasIniFin(placementIni : Placement, placementFin : Placement){

  for (let i = 0; i<placementIni.listeDanseurs.length; i++) //Autant de danseur au debut qu'à la fin
  {
 
  let variationX = placementFin.listeDanseurs[i].x - placementIni.listeDanseurs[i].x;
  let variationY = placementFin.listeDanseurs[i].y - placementIni.listeDanseurs[i].y;
  let distDirecte = Math.round(Math.sqrt(variationX*variationX+variationY*variationY));
  let d = distDirecte/50;
  let pasX=0;
  let pasY=0;

  
  
  
      let tan = Math.abs(variationY)/Math.abs(variationX);
      let angle = Math.atan(tan);
      pasX = Math.abs(Math.cos(angle))*d;
      pasY = Math.abs(Math.sin(angle))*d;

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

  console.log("danseur i =  ",i);
  console.log(this.danseurPasX[i]);
}

console.log("tableau pas x ",this.danseurPasX);

}

 affichePlacement(placement : Placement){

  for (let i = 0; i<placement.listeDanseurs.length; i++)
   {
     this.danseurs[i] = placement.listeDanseurs[i];
   }

   for (let i = 0; i<this.danseurs.length; i++)
   {
     this.dragPositions[i] = {x : this.danseurs[i].x, y: this.danseurs[i].y};
   }

 }


 suivant()
 {

   if(this.indicePlacement < this.choregraphieVisionnee.listePlacements.length-1)
   {
    this.affichePlacement(this.choregraphieVisionnee.listePlacements[this.indicePlacement+1]);
    this.indicePlacement = this.indicePlacement + 1;
   }
   else
   {
    this.affichePlacement(this.choregraphieVisionnee.listePlacements[this.indicePlacement]);
   }

   this.indicePla = this.indicePlacement;
  
 }


 suivant_autom()
 {

 
   if(this.indicePlacement < this.choregraphieVisionnee.listePlacements.length-1)
   {
    this.changementPosition(this.choregraphieVisionnee.listePlacements[this.indicePlacement], this.choregraphieVisionnee.listePlacements[this.indicePlacement+1]);
    this.indicePlacement = this.indicePlacement + 1;
   }
   else
   {
    this.affichePlacement(this.choregraphieVisionnee.listePlacements[this.indicePlacement]);
   }

   this.indicePla = this.indicePlacement;
  
 }
 
 

 precedent()
 {

  if(this.indicePlacement > 1)
  {
   this.affichePlacement(this.choregraphieVisionnee.listePlacements[this.indicePlacement-1]);
   this.indicePlacement = this.indicePlacement - 1;
  }
  else
  {
   this.affichePlacement(this.choregraphieVisionnee.listePlacements[1]);
  }

  this.indicePla = this.indicePlacement;

 }





 modifierPlacement(){
  
  console.log("AVANT MODIF");
  console.log(this.choregraphieVisionnee.listePlacements[this.indicePlacement]);


  for (let i = 0; i<this.danseurs.length; i++)
  {
   this.choregraphieVisionnee.listePlacements[this.indicePlacement].listeDanseurs[i].x = this.danseurs[i].x ;
   this.choregraphieVisionnee.listePlacements[this.indicePlacement].listeDanseurs[i].y = this.danseurs[i].y ;
 
  }
  
  console.log("APRES MODIF");
  console.log(this.choregraphieVisionnee.listePlacements[this.indicePlacement]);

}

 
 
}
 

