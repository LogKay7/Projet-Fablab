import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameCase'
})

// Place des majuscules après un espace ou un - en excluant les prépositions
export class NameCasePipe implements PipeTransform {
    transform(name: string): string {

        if (!name) { return null; }

        return name.split(' ').map((word) => {   // Split à chaque espace

          word.substr(0, 1).toUpperCase();  // Met la 1ère lettre en majuscule de chaque nom splitté
          return word.split('-').map((wd, index) => { // Re-split ces noms à chaque '-' rencontré

            if (index > 0 && this.isPreposition(wd)) {  //Si ce n'est pas le 1ère partie du '-', et est une préposition
              wd = wd.toLowerCase(); 
             } else {
              wd = this.toTitleCase(wd);  // Met le nom en title-case
             }
       
             return wd;
           }).join('-'); //Reforme le nom composé d'un '-'

        }).join(' '); // Reforme le nom composé d'un espace
  }

      // Fonction permettant de déterminer si le nom est une préposition, afin qu'elle soit en minuscule
      private isPreposition(word: string): boolean {
        const prepositions = ['la', 'le', 'les', 'des', 'du', 'de', 'aux', 'à'];
        return prepositions.includes(word.toLowerCase());
      }
    
      //Fonction permettant de mettre en forme le texte avec la 1ère lettre en majuscule et le reste en minuscule
      private toTitleCase(word: string): string {
        return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
    }
}