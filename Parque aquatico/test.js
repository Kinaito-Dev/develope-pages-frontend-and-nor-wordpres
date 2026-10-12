const recipe = {
  name: "Chocolate Cake",
  ingredients: {
    flour: "2 cups",
    sugar: "1 cup"
  }
};

// Extract `flour` from `ingredients`
const { ingredients: { flour } } = recipe;

console.log(flour); // "2 cups"





let name = "Bob";
let age = 25;

let person = { name, age };

console.log(person); // { name: "Bob", age: 25 }





function createPerson(name, age) {
  return { name, age };
}

let person = createPerson("Charlie", 35);
console.log(person); // { name: "Charlie", age: 35 }