import {getPokemon} from './modules/api.js';
import {createPokemonCard} from './modules/ui.js'
// import {formatName} from './modules/utils.js'

async function main() {
    const bulbasaur = await getPokemon(1);
    if(bulbasaur) createPokemonCard(bulbasaur);
    if(bulbasaur) createPokemonCard(bulbasaur);
    if(bulbasaur) createPokemonCard(bulbasaur);
    if(bulbasaur) createPokemonCard(bulbasaur);
    if(bulbasaur) createPokemonCard(bulbasaur);
    if(bulbasaur) createPokemonCard(bulbasaur);
}   

main();