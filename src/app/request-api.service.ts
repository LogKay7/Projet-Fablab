import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AuthBasicCredentials {
  user: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {
  private credentials: AuthBasicCredentials;
  private apiPath: string;
  private members : any;   //Liste des membres
  private idList;         // Liste des id de ces membres
  private isLoaded : boolean;   //True si les données ont toutes été chargées
  skillsList;   // Liste des compétences existantes
  skillsIdList; //Liste des id de ces compétences

  constructor(private http: HttpClient) {
    this.credentials = {
      user : "fablabapp",
      password : "Fx3KEFES1dP#bD^vy(iIQRNv"
    }
    this.apiPath = "https://www.fablabwapi.be";
  }

  //Requête vers l'Api
  request(url: string) {
    const base64 = btoa(`${this.credentials.user}:${this.credentials.password}`);

    return this.http.get(`${this.apiPath}/${url}`,{
      headers: { 
        Authorization : `Basic ${base64}`,
        'Accept' : 'application/json'
      },
      responseType : "json"
    });
  }

  //getter de members
  getMembers(){
    return this.members;
  }

  //setter de members : Filtre les membres afin de ne garder que ceux ayant renseigné un n° de téléphone ou un email
    // Les autres ne souhaitant donc pas être contactés
  setMembers(members){
    const memberTmp = new Array<any>();
    for(let member of members)
    { 
      if(member.phone != "" || member.email != false)
      {
        memberTmp.push(member);
      }
    }
    this.members = memberTmp;
  }

  //Getter de isLoaded
  getIsLoaded(){  
    return this.isLoaded;
  }

  //Setter de isLoaded
  setIsLoaded(value:boolean)
  {
    this.isLoaded = value;
  }

  //Retourne le membre dont l'id correspond à l'id passé en paramètre
  getMemberById(id: number) {
    const member = this.members.find(
      (s) => {
        return s.id == id;
      }
    );
    return member;
  }

  // Génère une liste reprenant les id de tous les membres présents dans la liste
  setIdList(){
    const idArray = new Array<number>();

    for(let member of this.members)
    {
      idArray.push(member.id);
    }
    this.idList = idArray;
    this.idList.sort((a, b) => a - b);
  }

  // Fonction permettant d'effectuer une recherche dans la liste des id membres
  searchInIdList(id : number){
    return this.idList.find(s => s ==id)
  }

  // Génère la liste des compétences existantes parmis les membres, sur base des compétences renseignées par les membres récupérés de l'api uniquement
  setSkillsList(){
    const skillList = new Array<string>();
    const skillIdList = new Array<number>();

    for(let member of this.members)
    {
      if(member.skills.length)  // Si le membre a des compétences
      {
          for(let skill of member.skills)
          {
            if(skillList.includes(skill.name.toLowerCase()) == false) // Si la compétence n'est pas encore présente dans la liste des compétences existantes
              {
                skillList.push(skill.name.toLowerCase()); // Ajoute la compétence dans la liste
                skillIdList.push(skill.id); // Ajoute l'id de cette compétence dans la liste des id de compétences
              }
          }
      }
    }
    this.skillsList = skillList;
    this.skillsIdList = skillIdList;
  }
}