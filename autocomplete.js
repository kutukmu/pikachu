const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  fetchData
}) => {
  root.innerHTML = `
            <label><b>Find Your Pokemon</b></label>
            <input class="input"/>
            <div class="dropdown">
                <div class="dropdown-menu">
                    <div class="dropdown-content results">
                    
                    </div>
                </div>
            </div>
    
    `;
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const result = root.querySelector(".results");

  const onInput = async event => {
    const response = await fetchData(event.target.value);
    if (!response.abilities) {
      dropdown.classList.remove("is-active");
      return;
    }
    result.innerHTML = "";

    dropdown.classList.add("is-active");
    const option = document.createElement("a");
    option.classList.add("dropdown-item");
    option.innerHTML = renderOption(response);

    option.addEventListener("click", () => {
      document.querySelector(".tutorial").classList.add("is-hidden");
      dropdown.classList.remove("is-active");
      onOptionSelect(response);
    });

    result.appendChild(option);
  };

  input.addEventListener("input", debounce(onInput));

  document.addEventListener("click", e => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
