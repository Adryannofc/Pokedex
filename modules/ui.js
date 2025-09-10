export function createPokemonCard(pokemon){
    const container = document.querySelector(".cards");

    // Card
    const card = document.createElement("article");
    card.classList.add("card");

    // Card Header
    const header = document.createElement("div");
    header.classList.add("card-header");

    // ID
    const id = document.createElement("span");
    id.classList.add("card-id");
    id.textContent = `#${pokemon.id.toString().padStart(4, '0')}`;

    // Name
    const name = document.createElement("h2");
    name.classList.add("card-name");
    name.textContent = pokemon.name;

    // Types
    const types = document.createElement("div");
    types.classList.add("card-types");
    pokemon.types.forEach(t => {
        const type = document.createElement("span");
        type.classList.add("type", t.type.name);
        type.textContent = t.type.name;
        types.appendChild(type); // span/type está dentro da div/types
    });

    // Image
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("card-image");

    const image = document.createElement("img");
    console.log(pokemon.sprites)
    image.src = pokemon.sprites.other["official-artwork"].front_default;
    image.alt = pokemon.name
    imageContainer.appendChild(image);
    
    header.appendChild(name);
    header.appendChild(id);

    card.appendChild(header);
    card.appendChild(imageContainer);
    card.appendChild(types);

    container.appendChild(card);
}