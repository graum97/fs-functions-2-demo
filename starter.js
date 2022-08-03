////////////////////////
////// CALCULATOR //////
////////////////////////

// CODE HERE

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const calculator = (num1, num2, callback) => {
    if (+num1 && +num2) {
        num1 = +num1;
        num2 = +num2;

        return callback(num1, num2)
    } else {
        console.log("You need to send in numbers");
    }
};

const result = calculator(3, 4, add);
const otherResult = calculator(3, 4, multiply);
// console.log(result, otherResult);

///////////////////////
////// PET STORE //////
///////////////////////

const dogProducts = [
    {
      name: 'leash',
      colors: ['red', 'blue', 'green'],
      category: 1,
      inventory: 30,
      basePrice: 13.99, 
      displayPrice: 13.99
    }, 
    {
      name: 'chew toy',
      colors: ['brown'],
      category: 2,
      inventory: 120,
      basePrice: 6.00, 
      displayPrice: 6.00
    }, 
    {
      name: 'rope',
      colors: ['blue & green', 'red & yellow'],
      category: 2,
      inventory: 75,
      basePrice: 4.99, 
      displayPrice: 4.99
    }
]

const catProducts = [
  {
    name: 'mouse toy', 
    colors: ['pink', 'grey', 'black'], 
    category: 2, 
    inventory: 125, 
    basePrice: 2.50, 
    displayPrice: 2.50
  },
  {
    name: 'cat sweater',
    colors: ['black'],
    category: 1,
    inventory: 15,
    basePrice: 10.00, 
    displayPrice: 10.00
  }, 
  {
    name: 'scratching post',
    colors: ['tan'],
    category: 2,
    inventory: 40,
    basePrice: 22.99, 
    displayPrice: 22.99
  }
]
// you’re given an array of dog products and one of cat products, we’ll be looping these and changing values
// the base price is the normal price that would be charged, display is how it should show up on the website
// we want to be able to loop over the arrays separately and apply discounts by percentage (25% off) or by rate ($5 off)
// we also want to be able to apply these to all products in an array, or according to category (sale on toys specifically), or according to inventory (trying to sell the last little bit to make room for more products, get it while it lasts type of start with the discount functions, these will eventually be called as callbacks, they’ll both take in a product to change and the size of  the discount the percent discount subtracts the discount from 1 to get the actual percentage, so make sure you’re entering percentages as decimals (.25 for 25%, then it will actually give you .75 of the basePrice) 
// so first we want to be able to loop over either array and apply a change to each product, this would be for a store-wide sale 
// let’s write a higher order function that will do this


// CODE HERE

const applyPercentDiscount = (product, discount) => {
    product.displayPrice = product.basePrice * (1 - discount);
};

const applyFlatRateDiscount = (product, discount) => {
    product.displayPrice = product.basePrice - discount;
};

// const applyDiscounts = (arr, callback, discount) => {
//     arr.forEach(product => {
//         callback(product, discount)
//     });
// };

// applyDiscounts(dogProducts, applyPercentDiscount, .1);
// console.log(dogProducts);

// applyDiscounts(catProducts, applyFlatRateDiscount, 2);
// console.log(catProducts);

// now let’s write a function that only applies discounts to products in a certain category, so we could have a sale on only toys or only food, etc
// the function will need to know the array, the category, which callback, and what the discount amount is

const applyDiscountsByCategory = (arr, category, callback, discount) => {
    arr.forEach(product => {
        if (product.category === category) {
        callback(product, discount)
        }
    });
};

// applyDiscountsByCategory(catProducts, 2, applyPercentDiscount, .15);
// // console.log(catProducts);

// applyDiscountsByCategory(dogProducts, 1, applyPercentDiscount, .3);
// // console.log(dogProducts);

const applyDiscountsByInventory = (arr, callback, amount, discount) => {
    arr.forEach(product => {
        if (product.inventory < amount) {
            callback(product, discount);
        }
    });
};

// applyDiscountsByInventory(dogProducts, applyFlatRateDiscount, 40, 5);
// console.log(dogProducts);

// applyDiscountsByInventory(catProducts, applyFlatRateDiscount, 40, .5);
// console.log(catProducts);

////////////////////////
////// SANDWICHES //////
////////////////////////
// this is somewhat of a silly example, but they’ll be able to practice another in the lab exercise
// arguably, every sandwich starts with bread, so let’s make a higher order function that returns functions that “make sandwiches” of bread one thing back to you
// the if statement makes the sentence look nice based on the number of ingredients and which iteration of the loop you’re on

// CODE HERE

function makeSandwich(bread) {
    return function(ingredients) {
        let order = `You order a ${bread} bread sandwich with `;

        for (let i = 0; i < ingredients.length; i++) {
            if (i === ingredients.length - 1 && 1 !== 0) {
                order += `and ${ingredients[i]}.`;
            } else if (ingredients.length === 1) {
                order += `${ingredients[i]}.`;
            } else {
                order += `${ingredients[i]}, `;
            }
        }

        return order;
    }
}

const makeWheatSandwich = makeSandwich("wheat");
const makeRyeSandwich = makeSandwich("rye")

const sandwich1 = makeWheatSandwich(["pickles", "cheese", "ham", "lettuce"]);
// console.log(sandwich1);

const sandwich2 = makeRyeSandwich(["turkey"]);
// console.log(sandwich2);

////////////////////////////////////
////// COPY AND CHANGE ARRAYS //////
////////////////////////////////////

//there are two provided functions that we’ll be parsing out into 3 functions so that the repeated parts can be taken care of in one function instead of being repeated

const lotr = ['biLbO BaGGINs', 'leGOlAs', 'Frodo bAGGINS', 'sAMwiSe GamGEe', 'gAndALF tHe GREY']

const copyArrToCamelCase = arr => {
    const newArr = []

    for (let i = 0; i < arr.length; i++) {
        const str = arr[i]
        const splitStr = str.split(' ')
        let camelCaseStr = ''
        
        for (let x = 0; x < splitStr.length; x++) {
            let word = splitStr[x]

            word = word.toLowerCase()

            if (x !== 0) {
                word = word.charAt(0).toUpperCase() + word.slice(1)
            }

            camelCaseStr += word
        }

        newArr.push(camelCaseStr)
    }

    return newArr
}

const copyArrToSnakeCase = arr => {
    const newArr = []

    for (let i = 0; i < arr.length; i++) {
        let str = arr[i]
        str = str.toLowerCase()
        const splitStr = str.split(' ')
        const snakeCaseStr = splitStr.join('_')
        newArr.push(snakeCaseStr)
    }

    return newArr
}
  
// CODE HERE

const copyArrAndChange = (arr, cb) => {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let newValue = cb(arr[i]);
        result.push(newValue);
    }
    return result;
}

const copyStrToCamelCase = str => {
    const splitStr = str.split(" ");
    let camelCaseStr = "";
    for (let x = 0; x < splitStr.length; x++) {
        let word = splitStr[x];
        word = word.toLowerCase();
        if (x !== 0) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
    }
    return camelCaseStr;
}

const copyStrToSnakeCase = str => {
    str = str.toLowerCase()
    const splitStr = str.split(' ')
    const snakeCaseStr = splitStr.join('_')
    return snakeCaseStr
}

console.log(copyArrAndChange(lotr, copyStrToCamelCase))

console.log(copyArrAndChange(lotr, copyStrToSnakeCase))
////////////////////////////////////////
////// HIGHER ORDER ARRAY METHODS //////
////////////////////////////////////////


//// MAP ////

/*
    Pass a callback to map that will return 'pink'
    for each color in the array.
*/

const colors = ['red', 'blue', 'yellow', 'green', 'orange']

// const mappedColors // = colors.map()

/*
    Edit the formalGreeting function and use the built in .map method 
    to map over the names parameter and return a new array with "Hello, " 
    appended to the beginning of each name
    
    Make sure to use arrow functions combined with the map method    
*/

const formalNames = ['Bernard', 'Elizabeth', 'Conrad', 'Mary Margaret']

const formalGreeting = names => {
    // CODE HERE
}

// Call formalGreeting passing in the formalNames array


//// FILTER ////

/*
    Pass a callback to filter that will return
    only strings that begin with the letter A
*/

const places = ['Binghampton', 'Albany', 'New York', 'Ithaca', 'Auburn', 'Rochester', 'Buffalo']

// const placesThatStartWithA // = places.filter()


/*
    Create a function called identifier that uses the filter higher order 
    array method to filter over the provided jobs array of objects

    The function should return the object of the person with a job as a programmer
    
    Make sure to use the arrow function in conjunction with the filter method
    
    Your returned value should be a single object, not an array with one object inside of it
    
    Use arrow functions and the filter method
*/

// Do not edit the code below.
let jobs = [
	{ receptionist: "James" },
	{ programmer: "Steve" },
	{ designer: "Alicia" },
];

// Do not edit the code above.

// CODE HERE

// call the function passing in the jobs array


//// REDUCE ////

/*
    Edit the productOfArray function and use 
    the built in .reduce method to loop over the numbers parameter
    and return the product of all the numbers in the array

    Make sure to use arrow functions combined with the reduce method    
*/

const numsToReduce = [43, 7, 24, 79, 290]

const productOfArray = numbers => {
    // Code here
}

// CODE HERE


// call productOfArray passing in numsToReduce


/*
    Pass a callback and an initial value to reduce 
    that will subtract all the expenses in the array
    from the initial budget

    This will allow us to see how much we have left
    in the budget after these expenses
*/

const budget = 2000

const expenses = [
    {
        title: 'rent', 
        amount: 1000
    }, 
    {
        title: 'car payment', 
        amount: 250
    }, 
    {
        title: 'food', 
        amount: 300
    }
]

// const remaining // = expenses.reduce(//callback, //initial value)