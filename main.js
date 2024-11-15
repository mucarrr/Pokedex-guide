const searchBtn = document.querySelector(".searchBtn");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".searchInput");
const pokeContainer = document.querySelector(".pokedex-container");

const pokemon_count = 151;

const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6E5C",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const pokemonNames = document.querySelectorAll (".poke-name")
    pokemonNames.forEach((pokemonName) => {
        if(pokemonName.innerHTML.toLowerCase().includes(searchValue)){
            pokemonName.parentElement.parentElement.style.display = "block";
        }else {
            pokemonName.parentElement.parentElement.style.display = "none";
        }
    })
});

const fetchPokemons = async () => {
  for (let i = 1; i < pokemon_count; i++) {
    await getPokemon(i);
  }
};
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  /* console.log(data); */
  designCards(data);
};

const designCards = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const pokemonId = pokemon.id.toString().padStart(3, '0');
  const pokemonType = pokemon.types[0].type.name;
  pokemonBackground = bg_color[pokemonType];
  pokemonDiv.style.backgroundColor = pokemonBackground;
  const pokemonDivInner = `
            <div class="image-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="first-p">
            </div>
            <div class="info-container">
                <span class="poke-id">${pokemonId}</span>
                <h3 class="poke-name">${pokemon.name}</h3>
                <div class="small">
                    <small class="poke-exp">
                        <i class="fa-solid fa-flask"></i> ${pokemon.base_experience}
                    </small>
                    <small class="poke-exp">
                        <i class="fa-solid fa-flask"></i> ${pokemon.weight} kg
                    </small>
                </div>
                <div class="poke-type">
                    <i class="fa-brands fa-uncharted"></i> ${pokemonType}
                </div>
            </div>
        `
        pokemonDiv.innerHTML = pokemonDivInner;
        pokeContainer.appendChild(pokemonDiv);
};
fetchPokemons();
