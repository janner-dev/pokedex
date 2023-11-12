const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i <= 151; i++){
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
    
}

function mostrarPokemon(pokemon){
    //console.log(pokemon.name);
    let tipos = pokemon.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');
    //console.log(tipos);

    let pokemonId = pokemon.id.toString();
    if (pokemonId.length === 1){
        pokemonId = '00' + pokemonId;
    }else if(pokemonId.length === 2){
        pokemonId = '0' + pokemonId;
    }

    const div = document.createElement("div");
    div.classList.add('pokemon');
    div.innerHTML = `
                    <p class="pokemon-id-back">#${pokemonId}</p>
                    <div class="pokemon-imagen">
                        <img src="${pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}" alt="${pokemon.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#${pokemonId}</p>
                            <h2 class="pokemon-nombre">${pokemon.name}</h2>
                        </div>
                        <div class="pokemon-tipos">
                             ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${pokemon.height}</p>                            
                            <p class="stat">${pokemon.weight}</p>                            
                        </div>
                    </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;  

    listaPokemon.innerHTML = "";

    for(let i = 1; i <= 151; i++){
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos"){
                    mostrarPokemon(data);
                } else{
                    const tipos = data.types.map(type => type.type.name);
                    if(tipos.some(tipo => tipo.includes(botonId))){
                        mostrarPokemon(data);
                    }
                }
            })       
    }
}))


/* referencia de la tarjeta div

                <div class="pokemon">
                    <p class="pokemon-id-back">#025</p>
                    <div class="pokemon-imagen">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="pikachu">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#025</p>
                            <h2 class="pokemon-nombre">Pikachu</h2>
                        </div>
                        <div class="pokemon-tipos">
                            <p class="electric tipo">Electric</p>
                            <p class="fighting tipo">Fighting</p>
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">4m</p>                            
                            <p class="stat">60kg</p>                            
                        </div>
                    </div>
                </div>

 */