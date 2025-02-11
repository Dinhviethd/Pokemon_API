
const container= document.querySelector(".content");
async function loadPokemon(){
    showLoading();
    const response= await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const firstAPI= await response.json(); //ở đây đang có 1 list các object
    const arr= firstAPI.results;
    let HTML= "";
    for (let i=0; i<arr.length; i++){
        const response2= await fetch(arr[i].url)
        const info= await response2.json();
        HTML+= `<div class="Pokemon">
            <span style="margin-left: 40%">#${info.id} <br></span>
            <img class="photo"
                src="${info.sprites.other.home.front_default}"
                alt="${info.name}">
            <h3>${info.name}</h3>
            <div class="Element">
                <span class="Type Grass">Grass</span>
                <span class="Type Poison">Poison</span>
            </div>
        </div>`;
        container.innerHTML= HTML;
    }
}
function showLoading() {
    const loading_screen= "<p>Getting Data From Pokedeck...</p>"
    container.innerHTML =loading_screen;
}
loadPokemon();