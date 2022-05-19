import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { RequestApiService } from '../../request-api.service';


@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.scss']
})
export class MemberlistComponent implements OnInit {

  subtitle : string;
  members : any;
  membersSearched : any;
  isMoreContentLoaded : boolean;
  startPage : Number;
  paginationLimit : Number;
  search : string;
  isSearching : boolean;

  constructor(private requestApiService: RequestApiService, private searchService : SearchService) { 
    this.startPage = 0;
    this.paginationLimit = 5;
    this.isMoreContentLoaded = false;
    this.isSearching = false
  }

  ngOnInit(): void {
    this.members = this.requestApiService.getMembers(); // Récupère la liste des membres contenue dans le requestApiService
    this.search = this.searchService.research.value;  // Récupère le texte entré dans la recherche, contenu dans le searchService
    this.membersSearched = this.searchService.searchMembers(this.members, this.search); // Effectue une recherche par rapport à ce texte recherché et stocke le résultat. Permet de conserver l'affichage de la recherche effectuée lorsque l'on navigue sur une page et que l'on revient en arrière.

    this.setSubtitle(); // Détermine le sous-titre en fonction du résultat de la recherche

    this.searchService.research.valueChanges  //Détecte les changements dans la barre de recherche
      .subscribe(result  => {
        this.search = result; 
         this.membersSearched = this.searchService.searchMembers(this.members, this.search);
        this.setSubtitle();

       });  // Actualise les données et l'affichage en fonction de ces changements
  }

  // Fonction permettant de déterminer si une recherche est en cours, et d'en déduire le sous-titre en fonction des résultats
  setSubtitle()
  {
    if (this.search == '')
        {
          this.isSearching = false;
          this.subtitle = `Notre annuaire compte ${this.members.length} membres`;
        }
    else{
          this.isSearching = true;
          switch (this.membersSearched.length) {
            case 0:
              this.subtitle = `Votre recherche n'a retourné aucun résultat`;
              break;
          
            case 1:
              this.subtitle = `Votre recherche a retourné 1 résultat`;
              break;
      
            default:
              this.subtitle = `Votre recherche a retourné ${this.membersSearched.length} résultats`;
              break;
          } 
        }
        
  }

  //Fonction permettant de supprimer la recherche en cours
  deleteSearch()
  {
    this.searchService.research.setValue('');
    this.search = '';
    this.setSubtitle();
  }

}
