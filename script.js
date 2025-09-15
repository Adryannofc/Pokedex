import { getPokemon, getPokemons, getAllPokemons} from './modules/api.js';
import { createPokemonCard } from './modules/ui.js'

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

// Carrega uma lista de Pokemons
async function loadPokemons() {
    if (loading) return;
    loading = true;

    const list = await getPokemons(limit, offset);

    for (const item of list) {
        const pokemon = await getPokemon(item.name);
        createPokemonCard(pokemon);
    }

    offset += limit;
    loading = false
}

let isSearching = false;

// Carrega a lista de Pokemons enquanto scroll
window.addEventListener('scroll', () => {
    if (isSearching) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadPokemons();
    }
})

async function searchPokemon() {
    const input = document.getElementById("search-input");
    const name = input.value.trim().toLowerCase();

    const container = document.querySelector(".cards");
    container.innerHTML = "";

    if (!name) {
        isSearching = false;
        offset = 0;
        await loadPokemons();
        return;
    }

    isSearching = true;

    const allPokemons = await getAllPokemons();
    const filtered = allPokemons.filter(p => p.name.startsWith(name));

    if (filtered.length > 0) {
        for (const item of filtered) {
            const pokemon = await getPokemon(item.name);
            createPokemonCard(pokemon);
        }
    } else {
        container.innerHTML = `<p style="text-align:center; color:red;">Nenhum Pokémon encontrado com "${name}".</p>`;
    }
}

let debounceTimer;

document.getElementById("search-input").addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(searchPokemon, 300);
})

loadPokemons();