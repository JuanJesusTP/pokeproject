export interface PokeData {
    pokeid: number;
    name: string;
    img: string;
    types: string[];
    weaknesses: string[];
    description: string;
    height: number;
    weight: number;
    abilities: string[];
    stats: string[];
    evolution: Array<any>;
    genders: string[];
    specie: string;
    nextPoke: any;
    prevPoke: any;
}
