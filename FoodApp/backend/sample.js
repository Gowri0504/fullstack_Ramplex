var c=6+6
const age=20
var country="India";

console.log(c);
console.log(c===age)  //check both value and datatype  
console.log(c==12) //check only value

function checkAge(age){
    if(age>=18){
        return "You are eligible to vote"
    }else{
        return "You are not eligible to vote"
    }
}
// a=prompt("Enter your age:")
// console.log(checkAge(a))
console.log(checkAge(20))
for (let i = 0; i < 5; i++)  {
    console.log(i)
}   

let fruits = ["Apple", "Banana", "Mango"];
for (let fruit of fruits) {
    console.log(fruit);
}
let car={
    brand:"BMW",
    model:"X5",
    year:2020
};
console.log(car.brand);
for (let key in car){
    console.log(key + ": " + car[key]);
}
console.log(z)
var z=50; // undefined due to hoisting (if let,const used, it will give reference error)

let x=10;
let y;
console.log(x) // 10
console.log(y) // undefined

fruit = "Mango";

switch (fruit) {
    case "Apple":
        console.log("You Selected Apple fruit");
        break;
    case "Banana":
        console.log("You Selected Banana fruit");
        break;  
    case "Mango":
        console.log("You Selected Mango fruit");
        break; 
    default:
        console.log("No fruit selected");
}

ageGroup = (age < 18) ? "Not Access" : (age >= 18 && age < 20) ? "Allowed" : "Allowed Adult";
console.log("You are a " + ageGroup);

const greet = (name="Gowri") => {
    return "Hello, " + name + "!";
}
console.log(greet("Prasad"));
console.log(greet()); 

const numbers = [1, 2, 3, 4, 5];  
const squaredNumbers = numbers.map(num => num * num);
const all =[...numbers,...squaredNumbers]
console.log(squaredNumbers);
console.log(all)

const person = {
    name: "Gowri",
    age: 20
};
const updatedPerson = { ...person, age: 21, city: "Chennai" };
console.log(updatedPerson)




const num=[1,2,3,4,5,6,7,8,9,10]
const num1=num.map(n=>n*2)
console.log(num1)


const even=num.filter(n=>n%2==0)
console.log(even)



const [ab, bc] = numbers;
console.log(ab);
console.log(bc);

const ans=numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
console.log(ans);

function sum(...args){
    console.log(args)
}
sum(1,2,3,4,5,6,7)

arr=[1,2,3,4]
console.log(arr.push(5,6,7))
console.log(arr)
console.log(arr.pop())
console.log(arr)//last element removed

console.log(arr.shift())
console.log(arr)
console.log(arr.unshift(0))
console.log(arr)//first element removed and added


let str="Hello World"
console.log(str.length)
console.log(str.toUpperCase())
console.log(str.toLowerCase())
console.log(str.includes("World"))
console.log(str.split(" "))
console.log(str.charAt(0))
let str1="   Hello  "
let str2="World   "
console.log(str1.concat("!",str2,"*"))
console.log(str.indexOf("World"))
console.log(str.trim())

