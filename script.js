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
    },{
        dishName: 'Salmon',
        ingredients: 'Atlantic Herb Salmon Butter'
    },{
        dishName: 'Chicken Wings Airfried',
        ingredients: 'Chicken Wings raw Choice of Seasoning(bbq,lemon peppert etc.), Choice of Sauce(bbq, Honey Mustard etc.'
    },{
        dishName: 'Pork Ribs Airfried',
        ingredients: 'Short Ribs raw, BBQ Seasoning, BBQ Sauce'
    }
]

let listFromLocal = JSON.parse(localStorage.getItem('dishesList'));

if (listFromLocal !== null){
    dishesList = listFromLocal;
    console.log(dishesList)
};

// Now and Array of the days of the weeek

let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

//Add event listener for the button to work

document.querySelector('#createList').addEventListener('click', (e) => {
    // Creating a function to get a new Array with 5 random items from Dishes List
    let shuffledDishesList = dishesList.sort(() => 0.5 - Math.random());
    let dishesForWeek = shuffledDishesList.slice(0, 5);

    // Selecting the table body for later use when updating the dom
    let tableBody = document.querySelector('#tableBody');
    // if there is something already in tablebody lets clear it
    tableBody.innerHTML = '';

    //foor loop to iterate thru this new 5 dishes Array
    for (i=0; i < dishesForWeek.length; i++) {
        // console.log(daysOfWeek[i], dishesForWeek[i].dishName)
        // now lets update the tables in the HTML Documnet
        tableBody.innerHTML += `<tr><td>${daysOfWeek[i]}</td><td>${dishesForWeek[i].dishName}</td><td>${dishesForWeek[i].ingredients}</td></tr>`
    }
})
// Adding New Object of Dish to the dishesList Array

// Creating the event that will create the new dish by clicking sbumit button 

document.querySelector('#addingToList').addEventListener('click', (e) => {
   // Creating 2 vars to hold the 2 text areas values
let addDish = document.querySelector('#addDish').value;
document.querySelector('#addDish').value = '';

let addIngredients = document.querySelector('#addIngredients').value;
document.querySelector('#addIngredients').value = '';
//creating new Ob with new values
 let newDish = {
     dishName: addDish,
     ingredients: addIngredients
 }
 
 console.log(dishesList);

 //adding newDish Ob to Aray DishesList

 dishesList.push(newDish);



console.log(dishesList); 

})




// // Shuffle array
// const shuffled = array.sort(() => 0.5 - Math.random());

// // Get sub-array of first n elements after shuffled
// let selected = shuffled.slice(0, n);