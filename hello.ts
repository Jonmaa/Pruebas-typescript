function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
  }

greet("Maddison", new Date())

let message = "hello there"

/**Función asíncrona que devuelve una Promise**/
async function getFavouriteNumber(): Promise<number>{
    return 0
}

console.log(getFavouriteNumber())

const names = ["alice", "bob", "eneko", "jon"]

names.forEach(function(s){
    console.log(s.toUpperCase())
})

names.forEach((s) => {
    console.log(s.toLocaleUpperCase())
})

function printCoord(pt: {x:number, y:number}){
    console.log("The coordinate's x value is " + pt.x)
    console.log("The coordinate's y value is " + pt.y)
}

printCoord({x:3, y:7})

function printName(obj: { first: string; last?: string }) {
    console.log(obj.first)
    console.log(obj.last)
  }
  // Both OK
  printName({ first: "Bob" });
  printName({ first: "Alice", last: "Alisson" });

//Union types

function printId(id: number | string) {
    if (typeof id === "string") {
      // In this branch, id is of type 'string'
      console.log(id.toUpperCase());
    } else {
      // Here, id is of type 'number'
      console.log(id);
    }
  }

printId(1020)
printId("1")

function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
      // Here: 'x' is 'string[]'
      console.log("Hello, " + x.join(" and "));
    } else {
      // Here: 'x' is 'string'
      console.log("Welcome lone traveler " + x);
    }
}

welcomePeople(["eneko", "jon"])
welcomePeople("pepe")

function doSomething(x: string | null) {
    if (x === null) {
      // do nothing
    } else {
      console.log("Hello, " + x.toUpperCase());
    }
}

doSomething(null)
doSomething("ala")

//NARROWING
function padLeft(padding: number | string, input: string): string {
    if (typeof padding === "number") {
      return " ".repeat(padding) + input;
      //Con TypeScript se puede ir viendo el valor de la variable según vamos entrando en los ifs
    }
    return padding + input;
}

console.log(padLeft(20, "hola"))
console.log(padLeft("adios", "hola"))

//typeof no devuelve null

//check truthy to see if it's not null
function printAll(strs: string | string[] | null) {
    if (strs && typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
}

printAll(null)
printAll("hola")
printAll(["hola", "como", "estas"])

interface Container {
  value: number | null | undefined;
}
 
function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  // != null también chekea si es undefined
  if (container.value != null) {
    console.log(container.value)
 
    // Now we can safely multiply 'container.value'.
    container.value *= factor
    console.log(container.value)
  }
}
let container = {value: null}
multiplyValue(container, 12)
let container2 = {value: undefined}
multiplyValue(container2, 12)
let container3 = {value: 12}
multiplyValue(container3, 12)

//IN operator narrowing
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
 
function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) { 
    return animal
  }
 
  return animal
}

//Discriminated unions
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;


// interface Triangle{
//   kind: "triangle";
//   base: number;
//   height:number
// }


function getArea(shape:Shape){
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    
    //**la parte del default asigna never a shape, que no es asignable a menos que hayas cubierto todos los casos anteriormente en el switch, por lo que si metiesemos una nueva 
    //forma como el triangulo y no la tuviesemos en cuenta en el switch-case, la parte de default nos daría un error mencionando que no todos los casos están contemplados 
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }   
  //También se podría hacer con ifs
}

let x: Shape = {kind: "circle", radius: 3}
console.log(getArea(x))
let y: Shape = {kind:"square", sideLength: 4}
console.log(getArea(y))

//MORE ON FUNCTIONS
//function type expressions
function greeter(fn: (a:string) => void){
  fn("Jellow, Wolrd")
}

function printToConsole(s:string){
  console.log(s)
}

greeter(printToConsole)

