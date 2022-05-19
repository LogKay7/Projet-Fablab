import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() displayText : string;
  research = this.searchService.research; 
  isSearching = false;    // True si une recherche est en cours

  constructor(private searchService : SearchService, private router: Router) { }

  ngOnInit(): void {
    if(this.research.value == '') //Si la texte dans la barre de recherche est différente de '', alors une recherche est en cours
    {
      this.isSearching = false;
    } 
    else 
    {
      this.isSearching = true;
    }

    this.searchService.research.valueChanges  //Détecte les changements de valeur du texte dans la barre de recherche et détermine si une recherche est toujours en cours
    .subscribe(result  => {
      if(result == '')
    {
      this.isSearching = false;
    } 
    else 
    {
      this.isSearching = true;
    }
     });
  }

  // Suppression de la recherche
  deleteSearch()
  {
    this.searchService.research.setValue('');
    this.research.setValue('');
    this.isSearching = false;
  }

  // Retour vers la liste des membres
  goMembers(){
    this.router.navigate(['..']);
  }
}
