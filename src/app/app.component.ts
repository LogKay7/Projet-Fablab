import { OnInit, Input } from '@angular/core';
import { Component } from '@angular/core';
import { RequestApiService } from './request-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @Input() isLoaded = this.requestApiService.getIsLoaded(); // True si les données de l'api ont déjà été chargées
  isRoot: boolean;  //True si la navigation sur une page a lieu


  constructor(private requestApiService: RequestApiService, private location: Location, private router : Router) {
    
  }

  ngOnInit() { 

    if(!this.isLoaded)  //Si les données ne sont pas encore chargées
    {
        this.requestApiService.request("wp-json/mk/members").subscribe((members) => { // Récupère celles-ci de l'API
        this.requestApiService.setMembers(members); // Stocke les membres dans le requestApiService
        this.requestApiService.setIdList();     // Génère la liste des id des membres récupérés
        this.requestApiService.setSkillsList();   // Génère la liste des compétences existantes 
        this.requestApiService.setIsLoaded(true); // Envoie l'information que les données ont été chargées, d'abord dans le requestApiService
        this.isLoaded = this.requestApiService.getIsLoaded(); //Récupère cette même information, indiquant que les données ont bien été chargées
      },
      (error) =>   // Si une erreur survient lors du chargement des données
      {
        console.log('Une erreur est survenue lors de la connexion avec nos serveurs... '+error);  
        this.requestApiService.setIsLoaded(false);
        this.isLoaded = this.requestApiService.getIsLoaded();
      }
      );
    }
    this.router.events.subscribe(event => { // Détecte si une navigation a lieu
      if (this.location.path() !== '/membres') {
        this.isRoot = false;
      } else {
        this.isRoot = true;
      }
    });
  }

}
