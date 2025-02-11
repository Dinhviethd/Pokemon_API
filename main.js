
const container= document.querySelector(".content");
const searchBar_Infor= document.querySelector(".SearchBar input");
async function loadPokemon(){
    showLoading();
    const response= await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const firstAPI= await response.json(); //ở đây đang có 1 list các object
    const arr= firstAPI.results;
    let HTML= "";
    for (let i=0; i<arr.length; i++){
        const response2= await fetch(arr[i].url)
        const info= await response2.json();
        const typeHTML= info.types.map((typeNames) => {
            const typeName= typeNames.type.name;
            return `<span class="Type ${typeName}">${typeName}</span>`
        }).join("");
        HTML+= `<div class="Pokemon">
            <span style="margin-left: 40%">#${info.id} <br></span>
            <img class="photo"
                src="${info.sprites.other.home.front_default}"
                alt="${info.name}">
            <h3>${info.name}</h3>
            <div class="Element">
                ${typeHTML}
            </div>
        </div>`;
        container.innerHTML= HTML;
    }
}
function searchPokemon(){
    const infor= searchBar_Infor.value;
    
}
function showLoading() {
    const loading_screen= "<p>Getting Data From Pokedeck...</p>"
    container.innerHTML =loading_screen;
}
loadPokemon();