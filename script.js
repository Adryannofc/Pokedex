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

async function searchPokemon() {
    const input = document.querySelector("#search-input");
    const name = input.value.trim().toLowerCase();

    if(!name) return;

    document.querySelector(".cards").innerHTML = "";

    const pokemon = await getPokemon(name)
    
    if(pokemon){
        createPokemonCard(pokemon);
    } else {
        const container = document.querySelector('.cards');
        container.innerHTML = `<p style="text-align:center; color:red;">Pokémon "${name}" não encontrado.</p>`;
    }
}

document.getElementById("search-btn").addEventListener("click", searchPokemon)

document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault(); 
    searchPokemon();
})

loadPokemons();