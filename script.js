import { getPokemon, getAllPokemons } from './modules/api.js';
import { createPokemonCard } from './modules/ui.js';

// --- Variáveis Globais ---
let allPokemonData = []; // Guarda os dados de todos os pokémons para acesso rápido
let activeFilters = []; // Guarda os tipos que estão selecionados no filtro
const cardsContainer = document.querySelector(".cards"); // Referência ao container dos cards para não precisar buscar toda hora

// --- Funções Principais ---
async function main() {
    cardsContainer.innerHTML = '<p class="loading-message">Carregando Pokémons...</p>';  
    const pokemonList = await getAllPokemons();
    allPokemonData = await Promise.all(pokemonList.map(p => getPokemon(p.name))); 
    
    addEventListeners();   
    renderPokemons(); // 5. Renderiza (desenha) todos os pokémons na tela pela primeira vez
}

// Renderiza os pokémons na tela com base nos filtros que estão ativos.
function renderPokemons() {
    cardsContainer.innerHTML = "";

    // Decide qual lista de pokémons usar: a completa ou a filtrada
    let pokemonsToRender;

    if (activeFilters.length === 0) {
        pokemonsToRender = allPokemonData;
    } else {
        pokemonsToRender = allPokemonData.filter(pokemon => {
            const pokemonTypes = pokemon.types.map(t => t.type.name);
            // Verifica se o pokémon tem PELO MENOS UM dos tipos do filtro ativo
            return activeFilters.some(filter => pokemonTypes.includes(filter));
        });
    }

    // Cria e exibe os cards para a lista de pokémons a ser renderizada
    if (pokemonsToRender.length > 0) {
        pokemonsToRender.forEach(pokemon => createPokemonCard(pokemon));
    } else {
        cardsContainer.innerHTML = '<p class="error-message">Nenhum Pokémon encontrado com os filtros selecionados.</p>';
    }
}

// --- Funções de Eventos ---
// Função central que adiciona todos os listeners da página
function addEventListeners() {
    const filterItems = document.querySelectorAll('.type-filter-item');
    const searchInput = document.getElementById("search-input");
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const filterToggleButton = document.querySelector('.filter-toggle-button');
    const filtersPanel = document.querySelector('.filters');
    let debounceTimer;

    // Listener para cada botão de tipo (Fire, Water, etc.)
    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            const type = item.dataset.type;
            item.classList.toggle('active');
            
            if (activeFilters.includes(type)) {
                activeFilters = activeFilters.filter(f => f !== type);
            } else {
                activeFilters.push(type);
            }
            renderPokemons();
        });
    });

    // Listener para a barra de busca (com delay para não buscar a cada letra)
    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            searchPokemon(searchTerm);
        }, 300);
    });

    // Listener para os botões de recolher/expandir (seta)
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.parentElement.nextElementSibling;
            button.classList.toggle('active');
            content.classList.toggle('collapsed');
        });
    });

    // Listener para o botão flutuante que abre/fecha o painel de filtros
    if (filterToggleButton && filtersPanel) {
        filterToggleButton.addEventListener('click', () => {
            filtersPanel.classList.toggle('is-open');
        });
    }
}

function searchPokemon(searchTerm) {
    activeFilters = []; // Limpa os filtros de tipo ao iniciar uma busca para não causar conflitos
    document.querySelectorAll('.type-filter-item.active').forEach(item => item.classList.remove('active'));

    if (!searchTerm) {
        renderPokemons();
        return;
    }
    
    const filtered = allPokemonData.filter(p => p.name.startsWith(searchTerm));
    
    cardsContainer.innerHTML = ""; // Limpa a tela

    if (filtered.length > 0) {
        filtered.forEach(pokemon => createPokemonCard(pokemon));
    } else {
        cardsContainer.innerHTML = `<p class="error-message">Nenhum Pokémon encontrado com o nome "${searchTerm}".</p>`;
    }
}

main();