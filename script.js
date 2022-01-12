// First lets create an Array of of object with the dishes at least 6 dishes
// let dishesList = [
//     {
//         dishName: "Jalapenos Poppers",
//         ingredients: 'Jalapenos, Cream Cheese, Bacon'
//     },
//     {
//         dishName: 'Chicken & Cheese-Broccoli',
//         ingredients: 'Chicken Tenders, Broccoli, Heavy Cream, Bacon, Shredded Mozzarella Cheese'
//     },
//     {
//         dishName: 'Salad With Choice of Meat(Chicken/Beef',
//         ingredients: ' Lettuce Mix, Canned Corn, Dressing(Ranch/Alfredo), Choice of Meat(Chicken/Beef)'
//     },
//     {
//         dishName: 'Steak & Green-beans/Asparagus',
//         ingredients: 'Steak, Green-bean/Asparagus, Butter, Choice of Sauce(bbq, steak etc.)'
//     },
//     {
//         dishName: 'Meatballs with Cauliflower Rice',
//         ingredients: 'Ground Beef, Your Choice of Seasoning, Riced Cauliflower, Almond flour, Eggs'
//     }, {
//         dishName: 'Salmon',
//         ingredients: 'Atlantic Herb Salmon Butter'
//     }, {
//         dishName: 'Chicken Wings Air-fried',
//         ingredients: 'Chicken Wings raw Choice of Seasoning(bbq,lemon pepper etc.), Choice of Sauce(bbq, Honey Mustard etc.'
//     }, {
//         dishName: 'Pork Ribs Air-fried',
//         ingredients: 'Short Ribs raw, BBQ Seasoning, BBQ Sauce'
//     }
// ]

// let listFromLocal = JSON.parse(localStorage.getItem('dishesList'));

// if (listFromLocal !== null) {
//     dishesList = listFromLocal;
//     console.log('List Loaded from local Storage into memory')
// };

// initializing DB

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpyXC9Ed0GLhI4jgiZEewEuA3l6jEP6QU",
  authDomain: "leaderboard-dbase.firebaseapp.com",
  databaseURL: "https://leaderboard-dbase-default-rtdb.firebaseio.com",
  projectId: "leaderboard-dbase",
  storageBucket: "leaderboard-dbase.appspot.com",
  messagingSenderId: "848023037020",
  appId: "1:848023037020:web:b1aeeae7b63275c8f0b299",
  measurementId: "G-JYN8W43RJC"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const dbref = ref(db);

// getting Data from DB
let dishesList = null;

function getData(){
    
    get(child(dbref, "dishesList/")).then((snapshot) =>{
        if(snapshot.exists()){
            dishesList = snapshot.val();
            console.log(dishesList);
            fullList();
        }else{
            console.log("no data Found");
        }
    }).catch((err) => {
        console.error(err);
    })
}

getData()
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
//selecting proper table body to work on. The full list table
let fullTableBody = document.querySelector('#fullTableBody');

//Function to create list in Accordion
function fullList () {
    fullTableBody.innerHTML = '';
    // for loop to iterate thru the full list array
    for (let i = 0; i < dishesList.length; i++) {
        fullTableBody.innerHTML += `<tr scope="row"><td>${dishesList[i].dishName}</td><td>${dishesList[i].ingredients}</td><td><button class="btn btn-outline-danger btn-sm" id="remove-btn">Remove</button></td></tr>`
    }

    console.log('Full list showing')

    // Array of all remove buttons on full list

    let allRemoveBtns = document.querySelectorAll("#remove-btn");

    removeBtns(allRemoveBtns);

}


// Showing Full list of items in Array
// fullList();

// // Reset Button to rest full list to original List

// document.querySelector('#reset').addEventListener('click', function(){

//     if (confirm("All of your custom Dishes will be lost, are you sure you want to reset?")) {
//         localStorage.removeItem('dishesList');

//         location.reload()

//       }
// })

 //Making a function to save the Updated Array in Local.
// function saveToLocal () {
//      localStorage.setItem('dishesList', JSON.stringify(dishesList));

// }

// Creating Remove Functionality


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
document.querySelector('#addingToList').addEventListener('click', addingToList);

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





// // Shuffle array
// const shuffled = array.sort(() => 0.5 - Math.random());

// // Get sub-array of first n elements after shuffled
// let selected = shuffled.slice(0, n);