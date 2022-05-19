import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RequestApiService } from '../request-api.service';

@Injectable({
    providedIn: 'root'
  })
  
export class SearchService {

    research = new FormControl(''); // La valeur de la recherche entrée dans la barre de recherche

    
  constructor(private requestApiService : RequestApiService) { }


  //Fonction de recherche :

  searchMembers(items : any[], searchText: String)
  {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();  // Met le texte recherché en minuscule

    //Recherche par nom ou prénom  :
    let resultSearchByName = items.filter(it => {

      return it.firstname.toLocaleLowerCase().startsWith(searchText) || it.lastname.toLocaleLowerCase().startsWith(searchText); //Retourne les membres dont le nom ou prénom commence par la valeur recherché
    });


    //Recherche par compétence :
    // Recherche, si la valeur recherchée est comprise dans la liste des compétences existantes. Cette liste est générée au chargement des membres de l'Api. Si la compétence existe dans la liste, son id est retourné. La recherche des membres possédant cette compétence s'effectue ensuite sur base de cet id.
    let resultSearchByTag;
    let skillPosition : number = -1;  // Position de la compétence dans la liste des compétences. Initialisée à -1
    let skillId : number;             // Id de cette compétence
    let checkSkill = 0; // Passe à 1 si la compétence existe

    this.requestApiService.skillsList.filter(element => {   //Filtre la liste des compétences existantes
        
      //Si la recherche est égale à une compétence de la liste ou si le mot recherché fait + de 2 lettres et est compris dans une compétence de la liste
        if(element == searchText || (searchText.length>3 && element.includes(searchText))){ 
            skillPosition = this.requestApiService.skillsList.indexOf(element); //Retourne la position de la compétence dans la liste
            checkSkill++; // Passe à 1 la valeur de checkSkill, pour indiquer qu'un résultat est trouvé
            skillId = this.requestApiService.skillsIdList[skillPosition]; // Retourne l'id de cette compétence
            return element.includes(searchText)
        } 
        else  //Sinon, effectue une recherche plus approfondie dans la liste
        {
          let skillsWord = element.split(' ');  //Split les noms de compétence
          skillsWord.forEach(word => {
            if(word.startsWith(searchText)) // Pour chaque mot, vérifie si celui-ci commence par le texte recherché
            { // Si c'est le cas, récupère ses informations
              skillPosition = this.requestApiService.skillsList.indexOf(element);
              checkSkill++;
              skillId = this.requestApiService.skillsIdList[skillPosition];
              return element.includes(searchText)
            }
          });
        }  
    });

    if(checkSkill)  //Si le texte recherché est bien une compétence existante, effectue une recherche par compétence en plus de la recherche par nom/prénom
      {
          resultSearchByTag = this.searchMembersByTag(items, skillId)  // Résultat de cette recherche (membres)
          let result = resultSearchByName.concat(resultSearchByTag);  // Puisque la recherche par nom/prénom a toujours lieu, fusionne le résultat de celle-ci avec la recherche par compétence

          return result;  // Retourne le résultats de ces recherches (membres)
      }

      let result = resultSearchByName; // Le résultat de la recherche par nom/prénom 
    return result;  // Retourne le résultat de la recherche par nom/prénom uniquement (membres)
    
  }

 // Fonction de recherche par Compétence :
  // Filtre les compétences des membres afin de retourner ceux possédant la compétence ayant le même id
  searchMembersByTag(items : any[], searchId: number)
  {
     let result = items.filter(it => {
        let test = it.skills.filter(skill =>{
          return skill.id == searchId;
        });
      if(test.length>0){
        return it;
      }
    });
    return result;
  }
}

/*
  Structure des données reçues :

  description: string
  email: string
  firstname: string
  id: number
  lastname: string
  phone: number
  skills: [{id: number, name: string, slug: string},
          {id: number, name: string, slug: string},
          {id: number, name: string, slug: string},
          {id: number, name: string, slug: string},]

 Exemple :

  description: ""
  email: "benoithen@gmail.com"
  firstname: "Benoit"
  id: "488"
  lastname: "Henry"
  phone: "0499010203"
  skills: Array(5)
      0: {id: 37, name: "Gestion imprimante 3D", slug: "gestion-imprimante-3d"}
      1: {id: 41, name: "Maitrise Apple", slug: "maitrise-apple"}
      2: {id: 40, name: "Maitrise informatique Windows", slug: "maitrise-informatique-windows"}
      3: {id: 42, name: "Maitrise logiciel suite Adobe", slug: "maitrise-logiciel-suite-adobe"}
      4: {id: 36, name: "Modélisation 3D", slug: "modelisation-3d"}
 */