
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
    //let queryString=window.location.search;
    const params=new URLSearchParams(search);
    const city= params.get("city");
    return city

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  try{
    let res=await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    let data=await res.json();
    
    return data;
    }
    catch(err){
      return null;
    }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let container=document.getElementById("data");
  adventures.forEach(key=>{
    let div=document.createElement("div");
    div.className="col-6 col-lg-3 mb-4 position-relative";
    div.innerHTML=`<a href="detail/?adventure=${key.id}" id="${key.id}">
    <div class="category-banner">${key.category}</div>
    <div class="activity-card">
    <img src=${key.image} class="activity-card-image" alt="${key.name}"/>
    <div class="w-100 px-3 pt-3">
    <div class="d-block d-md-flex justify-content-between flex-wrap">
    <h6>Duration</h6>
    <h6>${key.duration}Hours</>
    </div>
    </div> </div></a>`
    container.append(div);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // // 1. Filter adventures based on Duration and return filtered list
  let ans= list.filter(key => low <= key.duration && key.duration <= high);
  console.log(ans);
  return ans;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let ans= list.filter(key => categoryList.includes(key.category));
  return ans;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
//let list=list.filterByDuration
  let durationArr=filters.duration.split('-')
  let low=durationArr[0];
  let high=durationArr[1];
  let newList=[];
  if(filters.duration && filters.category.length){
    let categoryList=filterByCategory(list,filters.category);
    let durationList=filterByDuration(list,low,high);
    newList=categoryList.filter(items=>durationList.includes(items));
    return newList;
  }
  else if(filters.category.length !==0){
    newList=filterByCategory(list,filters.category)
    return newList;
  }
  else if(filters.duration !==''){
    newList=filterByDuration(list,low,high);
    return newList;
  }
  else{
    newList=list;
  }
  // Place holder for functionality to work in the Stubs
  return newList;


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters=JSON.parse(localStorage.getItem("filters"));
  return filters;

  // Place holder for functionality to work in the Stubs
  //return null;


  // Place holder for functionality to work in the Stubs
  // yreturn null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
   document.getElementById("duration-select").value=filters["duration"];
   const categoryFilter=filters["category"];
   categoryFilter.forEach(element=>{
    let div=document.createElement("div");
    div.className="category-filter"
    div.innerHTML=`<div>${element}</div>`
    document.getElementById("category-list").append(div);
   })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
