import {getPokemon} from './modules/api.js';
import {createPokemonCard} from './modules/ui.js'
import {formatName} from './modules/utils.js'

// Modulo para requisicao do Pokemon
export async function getPokemon(identifier) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);

        if(!response){
            throw new Error('Pokemon não encontrado');
        } 

        const data = await response.json();
        return data; // devolve o objeto {Pokemon}
    } catch (error) {
        console.error(error);
        return null
    }
}