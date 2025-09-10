import {getPokemon, getPokemons} from './modules/api.js';
import {createPokemonCard} from './modules/ui.js'
// import {formatName} from './modules/utils.js'

/* TESTE

async function main() {
    const list = await getPokemons(limit, offset);

    for (const item of list){
        const pokemon = await getPokemon(item.name);
        createPokemonCard(pokemon);
    }
} 

*/
  
let offset = 0;
const limit = 20;
let loading = false;

async function loadPokemons() {
    if (loading) return;
    loading = true;

    const list = await getPokemons(limit, offset);

    for (const item of list){
        const pokemon = await getPokemon(item.name);
        createPokemonCard(pokemon);
    }

    offset += limit;
    loading = false
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadPokemons();
    }
})

loadPokemons();