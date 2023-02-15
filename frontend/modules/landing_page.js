import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
try{
let res=await fetch(config.backendEndpoint + "/cities");
let data=await res.json();
console.log(data);

return data;
}
catch(err){
  return null;
}
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let div=document.createElement("div");
  div.className="col-6 col-lg-3 mb-4";
  

  let card=`<a href="pages/adventures/?city=${id}" id="${id}">
  <div class="tile">
  <img class="img-responsive" src="${image}" />
  <div class="tile-text text center">
  <h5>${city}</h5>
  <p>${description}</P>
  </div>
  </div></a>`;
  // image.height=200;
  // image.width=200;
  

  div.innerHTML=card;
  document.getElementById("data").appendChild(div);
}

export { init, fetchCities, addCityToDOM };
