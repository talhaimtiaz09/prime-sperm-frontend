function saveValue(key, value) {
  localStorage.setItem(key, value);
}

function saveFilters() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((inp) => {
    saveValue(inp.id, inp.value);
  });

  alert("All of the filters Saved");
}

function createGammaFilter() {
  const saturationeElement = document.getElementById("saturationRange");
  const grandParent = saturationeElement.parentElement.parentElement;

  // Create and configure the number input
  const numberInput = document.createElement("input");
  numberInput.type = "range";
  numberInput.min = "0.1";
  numberInput.max = "7";
  numberInput.step = "0.05";
  numberInput.value = "0.3";
  numberInput.id = "gammaRange";

  const label = document.createElement("label");
  label.for = "gammaRange";
  label.innerText = "Gamma :";

  const div = document.createElement("div");
  div.classList.add("range-container");

  div.appendChild(label);
  div.appendChild(numberInput);

  grandParent.appendChild(div);

  // const saveFilterButton = document.createElement("button");
  // saveFilterButton.classList.add("py-2");
  // saveFilterButton.classList.add("px-4");
  // saveFilterButton.classList.add("bg-yellow-400");
  // saveFilterButton.classList.add("hover:bg-yellow-500");
  // saveFilterButton.classList.add("text-white");
  // saveFilterButton.classList.add("rounded-md");
  // saveFilterButton.classList.add("font-bold");
  // saveFilterButton.classList.add("mt-8");

  // saveFilterButton.addEventListener("click", saveFilters);

  // saveFilterButton.innerText = "Save Filters";

  // grandParent.appendChild(saveFilterButton);

  // const imgSperm = document.getElementById("imgSperm");
  // let imgSpermCopy = document.createElement("img");
  // imgSpermCopy = imgSperm.cloneNode();
  // imgSpermCopy.id = "imgSpermCopy";
  // imgSpermCopy.classList.add("hidde");

  // imgSperm.parentElement.appendChild(imgSpermCopy);
}

function createLoader() {
  const loader = document.createElement("div");
  loader.classList.add("rounded-md");
  loader.classList.add("h-12");
  loader.classList.add("w-12");
  loader.classList.add("border-4");
  loader.classList.add("border-t-4");
  loader.classList.add("border-blue-500");
  loader.classList.add("animate-spin");
  loader.classList.add("mx-auto");
  loader.classList.add("my-52");

  loader.id = "imgLoader";

  const imgSperm = document.getElementById("imgSperm");
  imgSperm.parentElement.appendChild(loader);
}

function createTime_msFilter() {
  const saturationeElement = document.getElementById("saturationRange");
  const grandParent = saturationeElement.parentElement.parentElement;

  // Create and configure the number input
  const numberInput = document.createElement("input");
  numberInput.type = "range";
  numberInput.min = "0.1";
  numberInput.max = "7";
  numberInput.step = "0.05";
  numberInput.value = "0.3";
  numberInput.id = "time_msRange";

  const label = document.createElement("label");
  label.for = "time_msRange";
  label.innerText = "Time_ms :";

  const div = document.createElement("div");
  div.classList.add("range-container");

  div.appendChild(label);
  div.appendChild(numberInput);

  grandParent.appendChild(div);
}

function saveFilterButton() {
  const saturationeElement = document.getElementById("saturationRange");
  const grandParent = saturationeElement.parentElement.parentElement;

  const saveFilterButton = document.createElement("button");
  saveFilterButton.classList.add("py-2");
  saveFilterButton.classList.add("px-4");
  saveFilterButton.classList.add("bg-yellow-400");
  saveFilterButton.classList.add("hover:bg-yellow-500");
  saveFilterButton.classList.add("text-white");
  saveFilterButton.classList.add("rounded-md");
  saveFilterButton.classList.add("font-bold");
  saveFilterButton.classList.add("mt-8");

  saveFilterButton.addEventListener("click", saveFilters);

  saveFilterButton.innerText = "Save Filters";

  grandParent.appendChild(saveFilterButton);
}

createLoader();

createGammaFilter();

createTime_msFilter();

saveFilterButton();
