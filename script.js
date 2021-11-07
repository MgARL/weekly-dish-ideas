// Firs lets create an Array of of object with the dishes at least 6
let dishesList = [
    {
        dishName: "Jalapenos Poppers",
        ingredients: 'Jalapenos, Cream Cheese, Bacon'
    },
    {
        dishName: 'Chicken & Cheese-Broccoli',
        ingredients: 'Chicken Tenders, Broccoli, Heavy Cream, Bacon, Shredded Mozzarella Cheese'
    },
    {
        dishName: 'Salad With Choice of Meat(Chicken/Beef',
        ingredients: ' Lettuce Mix, Canned Corn, Dressing(Ranch/Alfredo), Choice of Meat(Chicken/Beef)'
    },
    {
        dishName: 'Steak & Green-beans/Asparagus',
        ingredients: 'Steak, Green-bean/Asparagus, Butter, Choice of Sauce(bbq, steak etc.)'
    },
    {
        dishName: 'Meatballs with Cauliflower Rice',
        ingredients: 'Ground Beef, Your Choice of Seasoning, Riced Cauliflower, Almond flour, Eggs'
    }, {
        dishName: 'Salmon',
        ingredients: 'Atlantic Herb Salmon Butter'
    }, {
        dishName: 'Chicken Wings Air-fried',
        ingredients: 'Chicken Wings raw Choice of Seasoning(bbq,lemon pepper etc.), Choice of Sauce(bbq, Honey Mustard etc.'
    }, {
        dishName: 'Pork Ribs Air-fried',
        ingredients: 'Short Ribs raw, BBQ Seasoning, BBQ Sauce'
    }
]

let listFromLocal = JSON.parse(localStorage.getItem('dishesList'));

if (listFromLocal !== null) {
    dishesList = listFromLocal;
    console.log('List Loaded from local Storage into memory')
};

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
    for (i = 0; i < dishesForWeek.length; i++) {
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
}

// Showing Full list of items in Array
fullList();

// Reset Button to rest full list to original List

document.querySelector('#reset').addEventListener('click', function(){

    if (confirm("All of your custom Dishes will be lost, are you sure you want to reset?")) {
        localStorage.removeItem('dishesList');

        location.reload()

      }
})

 //Making a function to save the Updated Array in Local.
function saveToLocal () {
     localStorage.setItem('dishesList', JSON.stringify(dishesList));

}

// Creating Remove Functionality

// Array of all remove buttons on full list

let allRemoveBtns = document.querySelectorAll("#remove-btn");

// for loop to iterate thru buttons

for( let i = 0; i < allRemoveBtns.length; i++){
     //To get the actual Index number from the i variable make sure you actually declare it in the for loop parenthesis, for some reason if you do not express the let, it will give you the as I the next number of you Array length, example if it is 5 length i will be 6. 

    allRemoveBtns[i].addEventListener('click', function (e){
        console.log(i);
        if ( dishesList.length > 5){
            if (i > -1){
                dishesList.splice(i, 1)
                //removed full list function redundant with refresh page
                saveToLocal();
    
                location.reload(); //Added this because of a bug that after first item removed no more items could be removed.
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


// Adding New Object of Dish to the dishesList Array

// Creating the event that will create the new dish by clicking submit button 

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

        //adding newDish Ob to Array DishesList

        dishesList.push(newDish);
        
        //refreshing the full list in accordion, so new item shows
        fullList();

        // calling save to storage function
        saveToLocal();
    }
})





// // Shuffle array
// const shuffled = array.sort(() => 0.5 - Math.random());

// // Get sub-array of first n elements after shuffled
// let selected = shuffled.slice(0, n);