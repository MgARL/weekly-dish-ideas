

// initializing DB

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js"
import{ API_KEY, AUTH_DOMAIN, DB_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from "/config.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const dbref = ref(db);
const auth = getAuth(firebaseApp);

// getting Data from DB
let dishesList = null;

function getData(){
    
    get(child(dbref, "dishesList/")).then((snapshot) =>{
        if(snapshot.exists()){
            dishesList = snapshot.val();
        }else{
            console.log("no data Found");
        }
    }).catch((err) => {
        console.error(err);
    })
}

getData()

// Login Functionality
const btnLogin = document.querySelector('#login');
const inputEmail = document.querySelector('#email'); 
const inputPassword = document.querySelector('#password');
const btnLogout = document.createElement('button');

const loginEmailPassword = async (e) => {
    e.preventDefault()
    const loginEmail = inputEmail.value;
    const loginPassword = inputPassword.value;

    inputEmail.value = '';
    inputPassword.value = '';

    try{
        const userCredentials = await signInWithEmailAndPassword(auth, loginEmail,loginPassword);
        if (userCredentials !== null){
            fullList();
            loggedInUI()
        }
        
    }
    catch(err) {
        loginError(err)
    }
    


} 

btnLogin.addEventListener('click', loginEmailPassword);
btnLogout.addEventListener('click', loggingOut);

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
    table.innerHTML = '<thead class="text-center"><tr><th scope="col-sm-4">Day of the week</th><th scope="col-sm-4">Dish Name</th><th scope="col-sm-4">Ingredients</th></tr></thead>';
    let tableBody = document.createElement('tbody');

    //for loop to iterate thru this new 5 dishes Array
    for (let i = 0; i < dishesForWeek.length; i++) {
        // console.log(daysOfWeek[i], dishesForWeek[i].dishName)
        // now lets update the tables in the HTML Document
        tableBody.innerHTML += `<tr scope="row"><td>${daysOfWeek[i]}</td><td>${dishesForWeek[i].dishName}</td><td>${dishesForWeek[i].ingredients}</td></tr>`
    }
    table.appendChild(tableBody);

    console.log('List for the Week created!')
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

// Logged In UI Function
function loggedInUI(){
    // Replacing Login button for Log Out btn
    let btnLoginModal = document.querySelector('#login-modal-btn');
    let loginDiv = document.querySelector('#login-div');
    
    btnLogout.textContent = 'Log Out';
    btnLogout.setAttribute('class', 'btn btn-outline-info');
    btnLogout.setAttribute('type', 'button');
    btnLogout.setAttribute('id', 'logout-btn');

    loginDiv.insertBefore(btnLogout, btnLoginModal);

    btnLoginModal.remove()
}

// logging Out Function
async function loggingOut(){
    await signOut(auth)
    location.reload();
   
}
//Function to create list in Accordion
function fullList () {
    // showing FullList
    showFullList();

    console.log(dishesList);
    //selecting proper table body to work on. The full list table
    let fullTableBody = document.querySelector('#fullTableBody');
    // for loop to iterate thru the full list array
    for (let i = 0; i < dishesList.length; i++) {
        fullTableBody.innerHTML += `<tr scope="row"><td>${dishesList[i].dishName}</td><td>${dishesList[i].ingredients}</td><td><button class="btn btn-outline-danger btn-sm" id="remove-btn">Remove</button></td></tr>`
    }

    console.log('Full list showing')

    // Array of all remove buttons on full list

    let allRemoveBtns = document.querySelectorAll("#remove-btn");

    removeBtns(allRemoveBtns);
}


// for loop to iterate thru buttons
function removeBtns(allRemoveBtns){


    for( let i = 0; i < allRemoveBtns.length; i++){
         //To get the actual Index number from the i variable make sure you actually declare it in the for loop parenthesis, for some reason if you do not express the let, it will give you the as I the next number of you Array length, example if it is 5 length i will be 6. 
    
        allRemoveBtns[i].addEventListener('click', function (){
            console.log(i);
            if ( dishesList.length > 5){
                if (i > -1){
                    // save to db
                     remove(child(dbref,`dishesList/${i}/`));
                    dishesList.splice(i, 1)
                    
                    fullList()
                }
            } else {
                console.log('You need more than 5 items to create a List!')
    
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


function addingToList(e){
    e.preventDefault();
    // Creating 2 vars to hold the 2 text areas values
    let addDish = document.querySelector('#addDish').value;
    document.querySelector('#addDish').value = '';
    let addIngredients = document.querySelector('#addIngredients').value;
    document.querySelector('#addIngredients').value = '';
    
    if (addDish !== '' && addIngredients !== '' && addDish !== ' ' && addIngredients !== ' ') {
        //creating new Ob with new values

        let lastItemIndex = dishesList.length;
        console.log(lastItemIndex)

    
        let newDish = {
            dishName: addDish,
            ingredients: addIngredients
        }
    
        //adding newDish Ob to Array DishesList
    
        dishesList.push(newDish);
        
        //refreshing the full list in accordion, so new item shows
        fullList();
    
        // saving to db
        update(ref(db, `dishesList/${lastItemIndex}`),{
            dishName: addDish,
            ingredients: addIngredients
        });

    }
}

// Login error Function
// Auth Errors
// auth/invalid-email //Please Enter Valid Email
// aut/user-not-found //You are not Registered
// aut/wrong-password //You've entered a wrong password

function loginError(err){

    let modalBody = document.querySelector('#modal-body')
    let errorDiv = document.querySelector('#error-div');
    let errorP = document.createElement('p');
    errorP.setAttribute('class', 'text-danger text-center mb-3')

    switch(err.code){
        case 'auth/wrong-password':
            errorP.textContent = "You've entered a wrong password"
            modalBody.insertBefore(errorP, errorDiv);
            setTimeout(() =>{
                errorP.remove();
            },5000)
            break;
        case 'auth/user-not-found':
            errorP.textContent = "You are not Registered"
            modalBody.insertBefore(errorP, errorDiv);
            setTimeout(() =>{
                errorP.remove();
            },5000)
            break;
        case 'auth/invalid-email':
            errorP.textContent = "Please Enter Valid Email"
            modalBody.insertBefore(errorP, errorDiv);
            setTimeout(() =>{
                errorP.remove();
            },5000)
            break;
        case ' ':
            errorP.textContent = "Unknown Error"
            modalBody.insertBefore(errorP, errorDiv);
            setTimeout(() =>{
                errorP.remove();
            },5000)
    }

}





// // Shuffle array
// const shuffled = array.sort(() => 0.5 - Math.random());

// // Get sub-array of first n elements after shuffled
// let selected = shuffled.slice(0, n);