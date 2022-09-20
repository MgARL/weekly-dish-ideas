

// getting Data from DB
let dishesList = null;

async function getData(){
    try {
        const response = await fetch('https://proxy-server-prod.up.railway.app/dishes-db/get-db')
        if (response !== null){
            let parsedRes = await response.json()

            dishesList = Object.values(parsedRes)

        }
    } catch (error) {
        
    }
}

getData()

// Login Functionality
const btnLogin = document.querySelector('#login');
const inputEmail = document.querySelector('#email'); 
const inputPassword = document.querySelector('#password');
const btnLogout = document.createElement('button');
const btnLoginModal = document.querySelector('#login-modal-btn');
const loginModalCon = document.querySelector('#modal-container');
const btnCloseLoginModal = document.querySelector('#close-x')

const loginEmailPassword = async (e) => {
    e.preventDefault()

    try{
        const userCredentials = await fetch('https://proxy-server-prod.up.railway.app/dishes-db/auth',{
            method: 'POST',
            headers:{
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email: inputEmail.value,
                password: inputPassword.value
            })

        });

        inputEmail.value = '';
        inputPassword.value = '';

        if (userCredentials.ok){
            fullList();
            loggedInUI()
         } else{
            let parsedErrorCode = await userCredentials.json()
            loginError(parsedErrorCode)
        }
        
    }
    catch(err) {
        console.log(err)
    }
    


} 
btnLoginModal.addEventListener('click', showLoginModal);
btnLogin.addEventListener('click', loginEmailPassword);
btnLogout.addEventListener('click', loggingOut);
btnCloseLoginModal.addEventListener('click', () =>  loginModalCon.classList.add('d-none'));

// Array of the days of the week

let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

//Add event listener for the button createList to work

document.querySelector('#createList').addEventListener('click', (e) => {
    // Creating a function to get a new Array with 5 random items from Dishes List
    let shuffledDishesList = dishesList.sort(() => 0.5 - Math.random());
    let dishesForWeek = shuffledDishesList.slice(0, 5);

    // Selecting the table body for later use when updating the dom
    let table = document.querySelector('#table');
    // if there is something already in table-body lets clear it
    table.innerHTML = '<thead class="text-center"><tr><th scope="col-sm-4">Day of the week</th><th scope="col-sm-4">Meal Name</th><th scope="col-sm-4">Ingredients</th></tr></thead>';
    let tableBody = document.createElement('tbody');

    //for loop to iterate thru this new 5 dishes Array
    for (let i = 0; i < dishesForWeek.length; i++) {
        // now lets update the tables in the HTML Document
        tableBody.innerHTML += `<tr scope="row"><td>${daysOfWeek[i]}</td><td>${dishesForWeek[i].dishName}</td><td>${dishesForWeek[i].ingredients}</td></tr>`
    }
    table.appendChild(tableBody);
})

//removing Accordion on loading
const fullListAcc = document.querySelector('#accordionFlushExample');
fullListAcc.remove();

// Showing Full List Accordion
function showFullList(){
    // selecting the body and footer
    let body = document.querySelector('#body');
    let footer = document.querySelector('#footer');
    //appending accordion to body
    body.insertBefore(fullListAcc, footer);
    document.querySelector('#addingToList').addEventListener('click', addingToList);   
}
// show login Modal
function showLoginModal(){
    loginModalCon.classList.remove('d-none');
}

// Logged In UI Function
function loggedInUI(){
    // Replacing Login button for Log Out btn
    let loginDiv = document.querySelector('#login-div');
    
    btnLogout.textContent = 'Log Out';
    btnLogout.setAttribute('class', 'btn btn-outline-info');
    btnLogout.setAttribute('type', 'button');
    btnLogout.setAttribute('id', 'logout-btn');

    loginDiv.insertBefore(btnLogout, btnLoginModal);

    btnLoginModal.remove()
    loginModalCon.classList.add('d-none');
}

// logging Out Function
async function loggingOut(){
    try {
        let response = await fetch('https://proxy-server-prod.up.railway.app/dishes-db/auth')
        console.log(response)
    } catch (error) {
        
    }
    
    location.reload();
   
}
//Function to create list in Accordion
function fullList () {
    // showing FullList
    showFullList();

    //selecting proper table body to work on. The full list table
    let fullTableBody = document.querySelector('#fullTableBody');
    fullTableBody.innerHTML = ''
    // for loop to iterate thru the full list array
    for (let i = 0; i < dishesList.length; i++) {
        fullTableBody.innerHTML += `<tr scope="row"><td>${dishesList[i].dishName}</td><td>${dishesList[i].ingredients}</td><td><button class="btn btn-outline-danger btn-sm" id="remove-btn">Remove</button></td></tr>`
    }
    // Array of all remove buttons on full list

    let allRemoveBtns = document.querySelectorAll("#remove-btn");

    removeBtns(allRemoveBtns);
}


// for loop to iterate thru buttons
async function removeBtns(allRemoveBtns){


    for( let i = 0; i < allRemoveBtns.length; i++){
         //To get the actual Index number from the i variable make sure you actually declare it in the for loop parenthesis, for some reason if you do not express the let, it will give you the as I the next number of you Array length, example if it is 5 length i will be 6. 
    
        allRemoveBtns[i].addEventListener('click', async function (){
            if ( dishesList.length > 5){
                if (i > -1){
                    // save to db
                    let indexObject = {
                        index: i
                    }
                   try {
                    const response = await fetch('https://proxy-server-prod.up.railway.app/dishes-db/delete-db',{
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(indexObject)

                    })
                   } catch (err) {
                       console.error(err)
                   }
                    //  remove(child(dbref,`dishesList/${i}/`));
                    dishesList.splice(i, 1)
                    
                    fullList()
                }
            } else {
    
                let accordionBody = document.querySelector('.accordion-body')
                let childNode = document.querySelector('#accordion-child')
                let warningDiv = document.createElement('div');
                warningDiv.innerHTML = "You need more than 5 items to create a List"
                warningDiv.setAttribute('class','bg-dark text-center text-danger mb-2 fs-5')
                warningDiv.setAttribute('id', 'warning-div')
                accordionBody.insertBefore(warningDiv, childNode);
                // removing this alert after  2 seconds
    
                setTimeout( ()=> document.querySelector('#warning-div').remove(), 2000)
            }
        });
    }
}


// Adding New Object of Dish to the dishesList Array

// Creating the event that will call the adding to list function when  submit button  is clicked


async function addingToList(e){
    e.preventDefault();
    // Creating 2 vars to hold the 2 text areas values
    let addDish = document.querySelector('#addDish').value;
    document.querySelector('#addDish').value = '';
    let addIngredients = document.querySelector('#addIngredients').value;
    document.querySelector('#addIngredients').value = '';
    
    if (addDish !== '' && addIngredients !== '' && addDish !== ' ' && addIngredients !== ' ') {
        //creating new Ob with new values

        let lastItemIndex = dishesList.length;

    
        let newDish = {
            dishName: addDish,
            ingredients: addIngredients,
            newIndex: lastItemIndex
        }
    
        //adding newDish Ob to Array DishesList
    
        dishesList.push(newDish);
        
        //refreshing the full list in accordion, so new item shows
        fullList();
    
        // saving to db
        const response = await fetch('https://proxy-server-prod.up.railway.app/dishes-db/add-new', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newDish)
        })

    }
}

// Login error Function
// Auth Errors
// auth/invalid-email //Please Enter Valid Email
// aut/user-not-found //You are not Registered
// aut/wrong-password //You've entered a wrong password

function loginError(err){

    let modalContent = document.querySelector('#modal-content')
    let errorDiv = document.querySelector('#error-div');
    let errorP = document.createElement('p');
    errorP.setAttribute('class', 'text-danger text-center mb-3')

    switch(err.code){
        case 'auth/wrong-password':
            errorP.textContent = "You've entered a wrong password"
            modalContent.insertBefore(errorP, errorDiv);
            setTimeout(() =>{
                errorP.remove();
            },5000)
            break;
        case 'auth/user-not-found':
            errorP.textContent = "You are not Registered"
            modalContent.insertBefore(errorP, errorDiv);
            setTimeout(() =>{
                errorP.remove();
            },5000)
            break;
        case 'auth/invalid-email':
            errorP.textContent = "Please Enter Valid Email"
            modalContent.insertBefore(errorP, errorDiv);
            setTimeout(() =>{
                errorP.remove();
            },5000)
            break;
        case ' ':
            errorP.textContent = "Unknown Error"
            modalContent.insertBefore(errorP, errorDiv);
            setTimeout(() =>{
                errorP.remove();
            },5000)
    }

}





// // Shuffle array
// const shuffled = array.sort(() => 0.5 - Math.random());

// // Get sub-array of first n elements after shuffled
// let selected = shuffled.slice(0, n);