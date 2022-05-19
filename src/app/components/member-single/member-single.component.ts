import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestApiService } from '../../request-api.service';
import { SearchService } from '../../services/search.service';



@Component({
  selector: 'app-member-single',
  templateUrl: './member-single.component.html',
  styleUrls: ['./member-single.component.scss']
})
export class MemberSingleComponent implements OnInit {

  @Input() member;

  @Input() id : number;
  @Input() firstname : string;
  @Input() lastname: string;
  @Input() skills : [];

  @Input() description : string;
  @Input() phone : string;
  @Input() email : string;
  canDisplay : boolean;   //Contient true si le membre existe

  constructor(private route : ActivatedRoute, private requestApiService: RequestApiService, private router: Router) { }

  ngOnInit(): void {
        const id = this.route.snapshot.params['id'];  //Récupère la partie contenue après /membres/ dans l'url

        if (this.isNumeric(id)) // Si c'est un nombre (id)
        {
          if(this.requestApiService.searchInIdList(id)) { // Si ce nombre est présent dans la liste des id membres
            // Autorise l'affichage de sa page et récupère ses informations 
            this.canDisplay = true;  
            this.firstname = this.requestApiService.getMemberById(+id).firstname;
            this.lastname = this.requestApiService.getMemberById(+id).lastname;
            this.skills = this.requestApiService.getMemberById(+id).skills;
            this.description = this.requestApiService.getMemberById(+id).description;
            this.phone = this.requestApiService.getMemberById(+id).phone;
            this.email = this.requestApiService.getMemberById(+id).email;
          } else {  //Si cet id n'appartient à aucun membre existant, redirige vars la page error404
            this.canDisplay = false;
            this.router.navigate(['/not-found']);
          }  
        }
        else // Si ce n'est pas un nombre (id), redirige vers la page error404
        {
          this.canDisplay = false;
            this.router.navigate(['/not-found']);
        }
    }

    // Fonction permettant de vérifier si la valeur passée est un nombre
    isNumeric(value: any): boolean {
      return !isNaN(value - parseFloat(value));
    }

    // Fonction permettant de vérifier si le n° de téléphone est renseigné, si oui, le transforme en lien cliquable pour appeler plus facilement 
    isPhonePresent(){
      if(this.phone){
        document.getElementById('phoneLink').setAttribute("href", "tel:" + this.phone);
        console.log(true)
      }else{
        document.getElementById('phoneLink').removeAttribute('href');
        console.log(false);
      }
    }

    // Fonction permettant de vérifier si le mail est renseigné, si oui, le transforme en lien cliquable pour contacter plus facilement 
    isEmailPresent(){
      if(this.email && this.email!="false"){
        document.getElementById('mailLink').setAttribute("href", "mailto:" + this.email);
      }else{
        document.getElementById('mailLink').removeAttribute('href');
      }
    }

}
