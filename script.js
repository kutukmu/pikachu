let leftPoke;
let rightPoke;
const onPokeSelect = async (pokemon, target, side) => {
  if (side === "left") {
    leftPoke = pokemon;
  } else {
    rightPoke = pokemon;
  }

  const div = document.createElement("div");
  div.innerHTML = pokeTemplate(pokemon);
  statFunc(pokemon.stats, div);
  target.innerHTML = div.innerHTML;

  if (leftPoke && rightPoke) {
    runCompare();
  }
};
const pokeTemplate = pokemon => {
  return `  <article class="media">
        <figure class="media-left">
            
                <img src="${pokemon.sprites.front_default}" class="pokeimg"/>
            
        </figure>
        <div class="media-content">
            <h1 class="title">${pokemon.name.toUpperCase()} </h1>
            <h4 class="subtitle">Weight:${pokemon.weight} </h1>
            
        </div>
    </article>
    <article data-value =${pokemon.height} class="notification is-primary">
      <p class="title"> ${pokemon.height}  </p>
      <p class="subtitle">Height</p>
    </article>`;
};

const statFunc = (stats, target) => {
  for (let stat of stats) {
    const div = document.createElement("article");
    div.classList.add("notification", "is-primary");
    div.setAttribute("data-value", `${stat.base_stat}`);
    div.innerHTML = `
        <p class="title"> ${stat.base_stat}  </p>
        <p class="subtitle">${stat.stat.name}</p>
        `;

    target.appendChild(div);
  }
};

const autocomplete1 = document.querySelector(".left-autocomplete");
const autocomplete2 = document.querySelector(".right-autocomplete");

const autoCOmpleteConfig = {
  renderOption(response) {
    return `<img src= "${response.sprites.front_default}"/>
        ${response.name.toUpperCase()}`;
  },
  async fetchData(pokemon) {
    const searchTerm = pokemon;
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );

      if (response.data.count) {
        console.log(response);
        return [];
      }
      console.log(response);
      return response.data;
    } catch {
      console.log("Error");
    }
  }
};

createAutoComplete({
  ...autoCOmpleteConfig,
  root: autocomplete1,
  onOptionSelect(response) {
    onPokeSelect(response, document.querySelector(".left-summary"), "left");
  }
});
createAutoComplete({
  ...autoCOmpleteConfig,
  root: autocomplete2,
  onOptionSelect(res) {
    onPokeSelect(res, document.querySelector(".right-summary"), "right");
  }
});

const runCompare = () => {
  const leftSide = document.querySelector(".left-summary");
  const leftSideAll = leftSide.querySelectorAll(".notification");
  console.log(leftSideAll);
  const rightSide = document.querySelector(".right-summary");
  console.log(rightSide);
  const rightSideAll = rightSide.querySelectorAll(".notification");
  console.log(rightSideAll);
  leftSideAll.forEach((leftStat, index) => {
    const rightStat = rightSideAll[index];
    console.log(rightStat);
    const leftSideVal = leftStat.dataset.value;
    console.log(leftSideVal);
    const rightSideVal = rightStat.dataset.value;
    if (rightSideVal > leftSideVal) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    } else {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    }
  });
  console.log("asdasd");
};
