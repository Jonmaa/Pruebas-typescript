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
Object.defineProperty(exports, "__esModule", { value: true });
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
//function type expressions
function greeter(fn) {
    fn("Jellow, Wolrd");
}
function printToConsole(s) {
    console.log(s);
}
greeter(printToConsole);
//call signatures, no funciona XDDD
// type DescribableFunction = {
//   description: string;
//   (someArg: number): boolean;
// };
// function doSomething(fn: DescribableFunction) {
//   console.log(fn.description + " returned " + fn(6));
// } 
// function myFunc(someArg: number) {
//   return someArg > 3;
// }
// myFunc.description = "default description";
// doSomething(myFunc);
function firstElement(arr) {
    if (arr[0] !== undefined) {
        return arr[0];
    }
}
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
console.log(s);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
console.log(n);
// u is of type undefined
const u = firstElement([]);
console.log(u);
//constraints
function longest(a, b) {
    if (a.length >= b.length) {
        return a;
    }
    else {
        return b;
    }
}
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
console.log(longerArray);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
console.log(longerString);
// Error Example! Numbers don't have a 'length' property
//const notOK = longest(10, 100);
//optional parameters
function f(n) {
    if (n != undefined) {
        console.log(n.toFixed()); // 0 arguments
        console.log(n.toFixed(3)); // 1 argument
    }
}
f();
f(10);
f(2.6546546);
function makeDate(mOrTimestamp, d, y) {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    }
    else {
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
console.log(d1, "\n" + d2);
function len(x) {
    return x.length;
}
//Good cuz both of them have the length property, not a callable function with a different type
console.log(len(""), len([0]));
// function len(x: any[] | string) {
//   return x.length;
// }
// this would be a much easier implementation
//rest parameters and arguments
function multiply(n, ...m) {
    return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
console.log(a);
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
console.log(arr1);
function visitForBirthday(home) {
    // We can read and update properties from 'home.resident'.
    console.log(`Happy birthday ${home.resident.name}!`);
    home.resident.age++;
}
let NYCityHome = { resident: { name: "Victor", age: 45 } };
console.log(NYCityHome.resident.age);
visitForBirthday(NYCityHome);
console.log(NYCityHome.resident.age);
let writablePerson = {
    name: "Person McPersonface",
    age: 42,
};
// works
let readonlyPerson = writablePerson;
//now the readonly atributtes are changeable
console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'
function createSquare(config) {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20,
    };
}
let mySquare = createSquare({ color: "red", width: 100 });
console.log(mySquare);
const cr = {
    color: "red",
    sideA: 42,
    sideB: 28
};
function draw(rectan) {
    console.log(`Color was ${rectan.color}`);
    console.log(`Sides where ${rectan.sideA} and ${rectan.sideB}`);
}
let aaa = draw({ color: "blue", sideA: 23, sideB: 11 });
console.log(aaa);
let boxString;
let boxNumber;
//ReadonlyArray<string> === readonly string[]
function doStuff(values) {
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);
    // values.push("hello") ERROR cuz you cant push values to a readonly array
}
function createLabel(nameOrId) {
    console.log("unimplemented");
    let a = { name: "a" };
    return a;
}
// function createLabel2<T extends number | string>(idOrName: T): NameOrId<T> {
//   throw "unimplemented"
// }
let aa = createLabel("typescript");
let b = createLabel(2.8);
let c = createLabel(Math.random() ? "hello" : 42);
//CLASSES
class Point {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    scale(n) {
        this.x *= n;
        this.y *= n;
    }
}
const pt = new Point();
pt.x = 0;
pt.y = 14;
console.log(`${pt.x}, ${pt.y}`);
class Greeter {
    constructor(otherName) {
        this.name = "world";
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }
}
const g = new Greeter();
//g.name = "also not ok"
// cannot assign this because its a readonly property
class Point2 {
    constructor(x, y = 0) {
        this.x = 0;
        this.y = 0;
        //code logic here
    }
}
//supercalls
class Base {
    constructor() {
        this.k = 4;
    }
}
class Derived extends Base {
    constructor() {
        super(); //el super tiene que estar por encima
        console.log(this.k);
    }
}
//getters and setters
class C {
    constructor() {
        this._length = 7;
    }
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = value;
    }
}
class Sonar {
    ping() {
        console.log("ping!");
    }
}
class Animal {
    move() {
        console.log("Moving along!");
    }
}
class Dog extends Animal {
    woof(times) {
        for (let i = 0; i < times; i++) {
            console.log("woof!");
        }
    }
}
const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);
class Base2 {
    greet() {
        console.log("Hello, world!");
    }
}
class Derived2 extends Base2 {
    greet(name) {
        if (name === undefined) {
            super.greet();
        }
        else {
            console.log(`Hello, ${name.toUpperCase()}`);
        }
    }
}
const d11 = new Derived2();
d11.greet();
d11.greet("reader");
class MySafe {
    constructor() {
        this.secretKey = 12345;
    }
}
let s1 = new MySafe();
// Not allowed during type checking
//console.log(s1.secretKey);
// OK
console.log(s1["secretKey"]);
function moveRight(point) {
    point.x += 5;
}
const point = new Point();
moveRight(point);
point.x; // => 8
console.log(point.x);
const math_js_1 = require("./math.js");
console.log(math_js_1.pi);
const absolutePhi = (0, math_js_1.absolute)(math_js_1.phi);
