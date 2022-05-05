import { Router } from '@angular/router';

export class PokeClass {
    viewDetails(id: any, router:Router): void {
        var url = '/pokedex/pokemon/';
        if (typeof id === 'string') {
            console.log('typeOf is String');
            id = id.toLocaleLowerCase();
        }
        url += id;
        router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          router.navigate([url]);      
          window.scrollTo(0, 0);
        });
    }

    goHome(router:Router): void {
        const url = '/pokedex';
        router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          window.location.href = url;
          window.scrollTo(0, 0);
        });
    }

    goError(router:Router): void {
        const url = '/pokedex/not-found';
        router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          window.location.href = url;
          window.scrollTo(0, 0);
        });
    }

    setColor(type: string): string {
        switch(type) {
            case 'normal':
                return '#a0a0a0';
            case 'fighting':
                return '#c85500';
            case 'flying':
                return '#79bcd7'; 
            case 'poison':
                return '#be78be';
            case 'ground':
                return '#cca142';
            case 'rock':
                return '#a07850';
            case 'bug':
                return '#32b432';
            case 'ghost':
                return '#8c78f0';
            case 'steel':
                return '#96b4dc';
            case 'fire':
                return '#ff3700'; 
            case 'water':
                return '#0094e5'; 
            case 'grass':
                return '#92bf19'; 
            case 'electric':
                return '#e4b700';
            case 'psychic':
                return '#dc78c8'; 
            case 'ice':
                return '#00b7ee'; 
            case 'dragon':
                return '#3c64c8'; 
            case 'dark':
                return '#646464'; 
            case 'fairy':
                return '#ff7eb8';
            case 'unknown':
                return '#f16e57';
            case 'shadow':
                return '#bdb9b8';
            default:
                return '#a5a5a5';
        }
    }
}
