// Modulo para requisicao do Pokemon
export async function getPokemon(identifier) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);

        if(!response.ok){
            throw new Error('Pokemon não encontrado');
        } 

        const data = await response.json();
        return data; // retorna o objeto {Pokemon}
    } catch (error) {
        console.error(error);
        return null
    }
}

export async function getPokemons(limit, offset){
    try {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

        if(!result.ok){
            throw new Error("Erro ao carregar lista de Pokemons")
        } 

        const data = await result.json();
        return data.results; // Retorna arrau com { name, url }
    } catch (error){
        console.error(error);
        return []
    }
}