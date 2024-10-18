"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function greet(person, date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Maddison", new Date());
let message = "hello there";
/**Función asíncrona que devuelve una Promise**/
function getFavouriteNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        return 0;
    });
}
console.log(getFavouriteNumber());
const names = ["alice", "bob", "eneko", "jon"];
names.forEach(function (s) {
    console.log(s.toUpperCase());
});
names.forEach((s) => {
    console.log(s.toLocaleUpperCase());
});
function printCoord(pt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
function printName(obj) {
    console.log(obj.first);
    console.log(obj.last);
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
//Union types
function printId(id) {
    if (typeof id === "string") {
        // In this branch, id is of type 'string'
        console.log(id.toUpperCase());
    }
    else {
        // Here, id is of type 'number'
        console.log(id);
    }
}
printId(1020);
printId("1");
function welcomePeople(x) {
    if (Array.isArray(x)) {
        // Here: 'x' is 'string[]'
        console.log("Hello, " + x.join(" and "));
    }
    else {
        // Here: 'x' is 'string'
        console.log("Welcome lone traveler " + x);
    }
}
welcomePeople(["eneko", "jon"]);
welcomePeople("pepe");
function doSomething(x) {
    if (x === null) {
        // do nothing
    }
    else {
        console.log("Hello, " + x.toUpperCase());
    }
}
doSomething(null);
doSomething("ala");
//NARROWING
function padLeft(padding, input) {
    if (typeof padding === "number") {
        return " ".repeat(padding) + input;
        //Con TypeScript se puede ir viendo el valor de la variable según vamos entrando en los ifs
    }
    return padding + input;
}
console.log(padLeft(20, "hola"));
console.log(padLeft("adios", "hola"));
//typeof no devuelve null
//check truthy to see if it's not null
function printAll(strs) {
    if (strs && typeof strs === "object") {
        for (const s of strs) {
            console.log(s);
        }
    }
    else if (typeof strs === "string") {
        console.log(strs);
    }
}
printAll(null);
printAll("hola");
printAll(["hola", "como", "estas"]);
function multiplyValue(container, factor) {
    // Remove both 'null' and 'undefined' from the type.
    // != null también chekea si es undefined
    if (container.value != null) {
        console.log(container.value);
        // Now we can safely multiply 'container.value'.
        container.value *= factor;
        console.log(container.value);
    }
}
let container = { value: null };
multiplyValue(container, 12);
let container2 = { value: undefined };
multiplyValue(container2, 12);
let container3 = { value: 12 };
multiplyValue(container3, 12);
function move(animal) {
    if ("swim" in animal) {
        return animal;
    }
    return animal;
}
// interface Triangle{
//   kind: "triangle";
//   base: number;
//   height:number
// }
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        //**la parte del default asigna never a shape, que no es asignable a menos que hayas cubierto todos los casos anteriormente en el switch, por lo que si metiesemos una nueva 
        //forma como el triangulo y no la tuviesemos en cuenta en el switch-case, la parte de default nos daría un error mencionando que no todos los casos están contemplados 
        default:
            const _exhaustiveCheck = shape;
            return _exhaustiveCheck;
    }
    //También se podría hacer con ifs
}
let x = { kind: "circle", radius: 3 };
console.log(getArea(x));
let y = { kind: "square", sideLength: 4 };
console.log(getArea(y));
//MORE ON FUNCTIONS
function greeter(fn) {
    fn("Jellow, Wolrd");
}
function printToConsole(s) {
    console.log(s);
}
greeter(printToConsole);
