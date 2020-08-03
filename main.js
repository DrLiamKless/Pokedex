let searchButton = document.getElementById("searchButon");
let input = document.getElementById("search");
let results = document.getElementById("results");
let pokeDiv = document.createElement("div");
results.appendChild(pokeDiv);


const searchPokemon = async (pokemonId = 3) => {
  try {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    let pokeName = data.name;
    let pokeWeight = data.weight;
    let pokeHeight = data.height;
    let frontImgSrc = data.sprites.front_default;
    let backImgSrc = data.sprites.back_default;
    makeDiv(pokeName, pokeHeight, pokeWeight, frontImgSrc, backImgSrc);
  }
  catch (error) {
    ErrorDiv = document.createElement("div");
    results.appendChild(ErrorDiv)
    ErrorDiv.innerHTML = "Pokemon not found"
  }
}


const makeDiv = (name, height, weight, frontSrc, backSrc) => {
  const htmlText = `
  <div class="pokemonContainer">
  <div>Name: ${name} </div> 
  <div>height: ${height}</div>
  <div>weight: ${weight}</div>
  <div>picture: <img id="pokeImg" src="${frontSrc}" </div>`;
  pokeDiv.innerHTML = htmlText;

  let pokeImg = document.getElementById("pokeImg")
  pokeImg.addEventListener("mouseover", () => pokeImg.src = backSrc)
  pokeImg.addEventListener("mouseout", () => pokeImg.src = frontSrc)


}


searchButton.addEventListener("click", () => searchPokemon(input.value))


