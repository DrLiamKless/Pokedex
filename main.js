/** @format */

// Defining global values
let searchButton = document.getElementById("searchButon");
let input = document.getElementById("search");
let results = document.getElementById("results");
let pokeDiv = document.createElement("div");
let errorDiv = document.getElementById("errorDiv")
let chainButton = document.getElementById("chainSearchButton");
let chainSearch = document.getElementById("chainSearch")
results.appendChild(pokeDiv);

// Defining the searchPokemon App:
// const searchPokemon = async (pokemonId = 3) => {
//   try {
//     const { data } = await axios.get(
//       `http://pokeapi.co/api/v2/pokemon/${pokemonId}`
//     );
//     let pokeName = data.name;
//     let pokeWeight = data.weight;
//     let pokeHeight = data.height;
//     let types = data.types;
//     let frontImgSrc = data.sprites.front_default;
//     let backImgSrc = data.sprites.back_default;

//     makeDiv(pokeName, pokeHeight, pokeWeight, types, frontImgSrc, backImgSrc);
//     input.value = "";
//     input.focus();
//   } catch (error) {
//     console.log(error);
//     pokError = document.createElement("div");
//     pokError.className = "Error";
//     pokError.innerHTML = "Pokemon not found";
//     pokeDiv.appendChild(pokError);
//     setTimeout(() => {
//       pokeDiv.innerHTML = "";
//     }, 2000);
//   }
// };

// bonus: change to fetch
const searchPokemon = (pokemonId = 3) => {
  fetch(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((res) => res.json())
    .then((data) => {
      let pokeName = data.name;
      let pokeWeight = data.weight;
      let pokeHeight = data.height;
      let types = data.types;
      let frontImgSrc = data.sprites.front_default;
      let backImgSrc = data.sprites.back_default;

      makeDiv(pokeName, pokeHeight, pokeWeight, types, frontImgSrc, backImgSrc);
      input.value = "";
      input.focus();
    })
    .catch(function (error) {
      console.log(error);
      pokError = document.createElement("div");
      pokError.className = "Error";
      pokError.innerHTML = "Pokemon not found";
      errorDiv.appendChild(pokError);
      setTimeout(() => {
        errorDiv.innerHTML = "";
      }, 2000);
    });

// Bounus 2 - defining the get evoloution chain function:
const getPokeChain = async (id) => {
  try{
    const pokeSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
    let chainUrl = pokeSpecies.data.evolution_chain.url
    const chainEvolutionData = await axios.get(chainUrl);
    let chainEvolution = chainEvolutionData.data.chain;
    let pokeInChain = []
   
    const getNamesInChain = function (object) {
      pokeInChain.push(object.species.name);
      if (object.evolves_to[0]) {
        getNamesInChain(object.evolves_to[0])
      } else {
        let chainList = document.getElementById("chainList");
        chainList.innerText = "Pokemon's evolve chain:"
        pokeInChain.forEach(element => {
          let chainItem = document.createElement("li");
          chainItem.className = "Evolver";
          chainList.appendChild(chainItem);
          chainItem.innerText = element;
        } )  
      }
      let chainItems = document.getElementsByClassName("Evolver");
      for (let i of chainItems) {
        i.addEventListener("click", () => searchPokemon(i.innerText));
      }
    };  
    getNamesInChain(chainEvolution);
  }
  catch(error){
    console.log(error)
  }
};
chainButton.onclick = () => getPokeChain(pokemonId);
  };



// defining the get by type function:
const pokemonByType = async (type) => {
  try {
    const sameTypeObject = await axios.get(
      `https://pokeapi.co/api/v2/type/${type}/`
    );
    let sameTypeDataObject = sameTypeObject.data;
    let sameTypePoke = sameTypeDataObject.pokemon;
    let pokeNamesInList = [];
    sameTypePoke.forEach((element) => {
      pokeNamesInList.push(element.pokemon.name);
    });
    makeTypeList(pokeNamesInList);
  } catch (error) {
    console.log(error);
  }
};
// defining the function that creates the type list
const makeTypeList = (nameList) => {
  let sameTypeList = document.getElementById("sameTypeList");
  sameTypeList.innerText = "";
  sameTypeList.innerText = "Pokemons with the same type:";
  for (let x of nameList) {
    const item = document.createElement("li");
    item.className = "sameTypePoke";
    sameTypeList.appendChild(item);
    item.innerText += x;
    // add the load new pokemon event
    item.addEventListener("click", () => searchPokemon(x));
  }
};

// defining the function that creates the div
const makeDiv = (name, height, weight, types, frontSrc, backSrc) => {
  let typesArr = [];
  types.forEach((element) => {
    typesArr.push(element.type.name);
  });
  pokeType = typesArr.join("</li> <li>");

  const htmlText = `
  <div class="pokemonContainer">
  <div>Name: ${name} </div> 
  <div>Height: ${height}</div>
  <div>Weight: ${weight}</div>
  <div> <ul> Types: <li> ${pokeType} </li> </ul> </div>
  <ul id="sameTypeList"></ul>
  <ul id="chainList"></ul>
  <div>picture: <img id="pokeImg" src="${frontSrc}" </div>`;
  pokeDiv.innerHTML = htmlText;

  // creating the flipping on hover
  let pokeImg = document.getElementById("pokeImg");
  pokeImg.addEventListener("mouseover", () => (pokeImg.src = backSrc));
  pokeImg.addEventListener("mouseout", () => (pokeImg.src = frontSrc));

  //  defininig the press on item event
  let typeItem = document.getElementsByTagName("li");
  for (let x of typeItem) {
    x.addEventListener("click", () => pokemonByType(x.innerText));
  }
};

// defining the click on search event
searchButton.addEventListener("click", () => searchPokemon(input.value));
