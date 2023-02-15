import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params=new URLSearchParams(search);
  const city= params.get("adventure");
  return city

  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let res=await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
    let data=await res.json();
    
    return data;
    }
    catch(err){
      return null;
    }
}


  // Place holder for functionality to work in the Stubs
  // return null;


//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let {name, subtitle, images,content}=adventure;
  //console.log(adventure)
  document.getElementById("adventure-name").textContent=name;
  document.getElementById("adventure-subtitle").textContent=subtitle;
  document.getElementById("adventure-content").textContent=content;
  images.forEach(src=>{
    document.getElementById("photo-gallery").innerHTML+=`<div>
    <img src=${src} class="activity-card-image" />
    </div>`
  })
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
document.getElementById("photo-gallery").innerHTML=`<div id="carouselExampleIndicators" class="carousel slide">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner" id="slides">
  
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`
  
images.forEach((src,i)=>{
  document.getElementById("slides").innerHTML +=`<div class="${"carousel-item" + (i===0 ? " active" : "")}">
  <img src=${src} class="d-block w-100" alt="..." >
</div>
`
//document.getElementById("slide-indicators").innerHTML +=
})

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display="none"
    document.getElementById("reservation-panel-available").style.display="block"
    document.getElementById("reservation-person-cost").textContent=adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display="block"
    document.getElementById("reservation-panel-available").style.display="none"
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
document.getElementById("reservation-cost").textContent=adventure.costPerHead*persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
document.getElementById("myForm").addEventListener("submit",async event=>{
  event.preventDefault();
  try{
  let form=document.getElementById("myForm");
  form.elements.name.value
  form.elements.date.value
  form.elements.person.value
  adventure.id
  await fetch(config.backendEndpoint + "/reservations/new",{
    method:"POST",
    body:JSON.stringify({
     name: form.elements.name.value,
     date: form.elements.date.value,
     person: form.elements.person.value,
      adventure:adventure.id
    }),
    headers:{
      "Content-Type":"application/json",
    },
  })
  
    alert("Success")
 
    
  
  }
  catch(e){
    alert("error")
  }
})


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if(adventure.reserved){
  document.getElementById("reserved-banner").style.display="block"
}
else{
  document.getElementById("reserved-banner").style.display="none"
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
