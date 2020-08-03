
// Defining global values
let searchButton = document.getElementById("searchButon");
let input = document.getElementById("search");
let results = document.getElementById("results");
let pokeDiv = document.createElement("div");
results.appendChild(pokeDiv);

//Defining the searchPokemon App
const searchPokemon = async (pokemonId = 3) => {
  try {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    console.log(data)
    let pokeName = data.name;
    let pokeWeight = data.weight;
    let pokeHeight = data.height;
    let types = data.types
    let frontImgSrc = data.sprites.front_default;
    let backImgSrc = data.sprites.back_default;

    makeDiv(pokeName, pokeHeight, pokeWeight, types, frontImgSrc, backImgSrc);
  }
  catch (error) {
    console.log(error)
    pokError = document.createElement("div")
    pokError.id = "Error"
    pokError.innerHTML = "Pokemon not found"
    pokeDiv.appendChild(pokError);
    setTimeout(() => {
      document.getElementById("Error").innerHTML = '';
    }, 2000);

  }
}

const makeDiv = (name, height, weight, types, frontSrc, backSrc) => {

  let typesArr = []
  types.forEach(element => {
    typesArr.push(element.type.name)
  });
  pokeType = typesArr.join(", ")

  const htmlText = `
  <div class="pokemonContainer">
  <div>Name: ${name} </div> 
  <div>Height: ${height}</div>
  <div>Weight: ${weight}</div>
  <div>Types: ${pokeType}</div>
  <div>picture: <img id="pokeImg" src="${frontSrc}" </div>`;
  pokeDiv.innerHTML = htmlText;

  let pokeImg = document.getElementById("pokeImg")
  pokeImg.addEventListener("mouseover", () => pokeImg.src = backSrc)
  pokeImg.addEventListener("mouseout", () => pokeImg.src = frontSrc)
}


searchButton.addEventListener("click", () => searchPokemon(input.value))
