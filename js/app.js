
let employees = [];


const gridContainer = document.querySelector('.grid-container');

const overlay = document.querySelector('.overlay');
const profileContainerModal = document.querySelector('.profile-container-modal');
const modalClose = document.querySelector(".modal-close");


const url = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
// Proxy to enable cross-origin requests to anywhere.
const proxyurl = "https://cors-anywhere.herokuapp.com/";




fetch(proxyurl + url)
    .then(response => response.json())
    .then( data => data.results)
    .then( data => generateProfiles(data))
    .catch(err => console.log(err));



function generateProfiles(data) {

    employees = data;
    let output = '';
    employees.forEach( (profile, index) => {
        output += `
        <div class="profile-container" data-index="${index}">
            <img src="${profile.picture.large}" alt="avatar">
            <div class="profile-text-container">
                <h2>${profile.name.first} ${profile.name.last}</h2>
                <p>${profile.email}</p>
                <p>${profile.location.city}</p>
            </div>
        </div>

        `;
            
    });
    gridContainer.innerHTML = output;
    }


function displayModal (index){

    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];
    let date = new Date(dob.date);
    let output = '';
    output +=`
        <div class="profile-container-modal">
        <button class="modal-close">X</button>
            <img src="${picture.large}" alt="avatar">
            <div class="profile-text-container">
                <h2>${name.first} ${name.last}</h2>
                <a href="mailto:${email}">${email}</a>
                <p>${city}</p>
                <hr>
                <p>${phone}</p>
                <p class="address">${street.name}, ${state} ${postcode}</p>
                <p>Birthday: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}</p>
            </div>
        </div>
        
    `;
    overlay.classList.remove("hidden");
    overlay.innerHTML = output;
}



gridContainer.addEventListener('click', e => {
    
    if(e.target !== gridContainer){
    const currentTarget = e.target.closest(".profile-container");
    const index = currentTarget.getAttribute('data-index');
  
    displayModal(index)

    


    }
});



document.addEventListener('click', (e)=> {
    if(e.target && e.target.className == 'modal-close'){
    overlay.classList.add("hidden");
    }
});


const search = document.querySelector(".searchInput");

search.addEventListener('keyup', searchFilter);


function searchFilter() {

    const searchValue = search.value.toUpperCase();     
    const h2 = document.querySelectorAll('.profile-text-container h2');
    const profiles = document.querySelectorAll('.profile-container');

    for (let i=0; i < h2.length; i++){
        h2textContent = h2[i].textContent;
 
        if (h2textContent.toUpperCase().indexOf(searchValue) > -1)
        {
            profiles[i].style.display = "";
        } else {
            profiles[i].style.display = "none";
        }
    }
}



