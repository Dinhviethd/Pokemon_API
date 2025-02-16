const container = document.querySelector(".content");
const searchBar = document.querySelector(".SearchBar input");

let allPokemon = []; // Lưu danh sách tất cả Pokémon

async function loadPokemon() {
    showLoading();
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`); 
    const firstAPI = await response.json();
    const arr = firstAPI.results;

    allPokemon = []; // Xóa danh sách cũ (nếu có)

    for (let i = 0; i < arr.length; i++) {
        const response2 = await fetch(arr[i].url);
        const info = await response2.json();
        allPokemon.push({
            id: info.id,
            name: info.name.toLowerCase(),
            img: info.sprites.other.home.front_default,
            types: info.types.map(t => t.type.name)
        });
    }

    displayPokemon(allPokemon); 
}

// Hiển thị danh sách Pokémon
function displayPokemon(pokemonList) {
    if (pokemonList.length === 0) {
        container.innerHTML = `<p style="text-align: center; font-size: 20px;">No Pokémon found 😢</p>`;
        return;
    }

    container.innerHTML = pokemonList.map(pokemon => {
        const typeHTML = pokemon.types.map(type => {
            return `<span class="Type ${type}">${(type)}</span>`;
        }).join("");

        return `
        <div class="Pokemon">
            <span style="margin-left: 40%">#${pokemon.id} <br></span>
            <img class="photo" src="${pokemon.img}" alt="${pokemon.name}">
            <h3>${(pokemon.name)}</h3>
            <div class="Element">${typeHTML}</div>
        </div>`;
    }).join("");
}
function searchPokemon() {
    const query = searchBar.value.toLowerCase(); 
    const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.includes(query));
    displayPokemon(filteredPokemon); 
}
function showLoading() {
    container.innerHTML = "<p style='text-align:center;'>Getting Data From Pokedeck...</p>";
}
searchBar.addEventListener("input", searchPokemon);
loadPokemon(); 
