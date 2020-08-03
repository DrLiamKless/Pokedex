let serachButton = document.getElementById("searchButon");
let input = document.getElementById("search");
let results = document.getElementById("results")


const searchPokemon = async (pokemonId = 3) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  let name = data.name;
  let weight = data.weight;
  let height = data.height;
  let frontImg = data.sprites.front_default;
  let pokeDiv = document.createElement("div")

  pokeDiv.innerHTML = "<img src =" + frontImg + ">" + name + "'s Height is " + height + " and weight is " + weight
  results.appendChild(pokeDiv)


};

serachButton.addEventListener("click", () => searchPokemon(input.value))

