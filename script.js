// Firs lets create an Array of of object with the dishes at least 6
let dishesList = [
    {
        dishName: "Jalapenos Poppers",
        ingredients: 'Jalapenos, Cream Cheese, Bacon'
    },
    {
        dishName: 'Chicken & Cheese-Broccoli',
        ingredients: 'Chicken Tenders, Broccolli, Heavy Cream, Bacon, Shreded Mozzarella Cheese'
    },
    {
        dishName: 'Salad With Choice of Meat(Chiken/Beef',
        ingredients: ' Lettuce Mix, Canned Corn, Dressing(Ranch/Alfredo), Choice of Meat(Chicken/Beef)'
    },
    {
        dishName: 'Steak & Greenbeans/Asparragus',
        ingredients: 'Steak, Green-bean/Asparragus, Butter, Coice of Sauce(bbq, steak etc.)'
    },
    {
        dishName: 'Meatballs with Cauliflower Rice',
        ingredients: 'Ground Beef, Your Choice of Sesoning, Riced Cauliflower, Almond flour, Eggs'
    }, {
        dishName: 'Salmon',
        ingredients: 'Atlantic Herb Salmon Butter'
    }, {
        dishName: 'Chicken Wings Airfried',
        ingredients: 'Chicken Wings raw Choice of Seasoning(bbq,lemon peppert etc.), Choice of Sauce(bbq, Honey Mustard etc.'
    }, {
        dishName: 'Pork Ribs Airfried',
        ingredients: 'Short Ribs raw, BBQ Seasoning, BBQ Sauce'
    }
]

let listFromLocal = JSON.parse(localStorage.getItem('dishesList'));

if (listFromLocal !== null) {
    dishesList = listFromLocal;
    console.log('List Loaded from local Storage into memory')
};

// Array of the days of the weeek

let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

//Add event listener for the button createList to work

document.querySelector('#createList').addEventListener('click', (e) => {
    // Creating a function to get a new Array with 5 random items from Dishes List
    let shuffledDishesList = dishesList.sort(() => 0.5 - Math.random());
    let dishesForWeek = shuffledDishesList.slice(0, 5);

    // Selecting the table body for later use when updating the dom
    let tableBody = document.querySelector('#tableBody');
    // if there is something already in tablebody lets clear it
    tableBody.innerHTML = '';

    //foor loop to iterate thru this new 5 dishes Array
    for (i = 0; i < dishesForWeek.length; i++) {
        // console.log(daysOfWeek[i], dishesForWeek[i].dishName)
        // now lets update the tables in the HTML Documnet
        tableBody.innerHTML += `<tr scope="row"><td>${daysOfWeek[i]}</td><td>${dishesForWeek[i].dishName}</td><td>${dishesForWeek[i].ingredients}</td></tr>`
    }
    console.log('List for the Week created!')
})
//slecting proper table body to work on. The full list table
let fullTableBody = document.querySelector('#fullTableBody');
// Creating Event to show Full list of items in Array
window.addEventListener('load', fullList())


function fullList () {
    // for loop to iterate thru the full list array
    for (i = 0; i < dishesList.length; i++) {
        fullTableBody.innerHTML += `<tr scope="row"><td>${dishesList[i].dishName}</td><td>${dishesList[i].ingredients}</td><td><button class="btn btn-outline-danger btn-sm">Remove</button></td></tr>`
    }

    console.log('Full list showing')
}

// Adding New Object of Dish to the dishesList Array

// Creating the event that will create the new dish by clicking sbumit button 

document.querySelector('#addingToList').addEventListener('click', (e) => {
    // Creating 2 vars to hold the 2 text areas values
    let addDish = document.querySelector('#addDish').value;
    document.querySelector('#addDish').value = '';
    let addIngredients = document.querySelector('#addIngredients').value;
    document.querySelector('#addIngredients').value = '';

    if (addDish !== '' && addIngredients !== '' && addDish !== ' ' && addIngredients !== ' ') {
        //creating new Ob with new values

        let newDish = {
            dishName: addDish,
            ingredients: addIngredients
        }

        //adding newDish Ob to Aray DishesList

        dishesList.push(newDish);
        
        //refreshing the full list in accordeon, so new item shows
        fullList();

        //Making The updated Array Persisitn by adding it to local Storage.

        localStorage.setItem('dishesList', JSON.stringify(dishesList));
    }
})




// // Shuffle array
// const shuffled = array.sort(() => 0.5 - Math.random());

// // Get sub-array of first n elements after shuffled
// let selected = shuffled.slice(0, n);
// aa