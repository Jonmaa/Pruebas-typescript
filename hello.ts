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

function firstElement<Type>(arr: Type[]): Type | undefined {
  if (arr[0] !== undefined){
    return arr[0]
  }  
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
console.log(s)
// n is of type 'number'
const n = firstElement([1, 2, 3]);
console.log(n)
// u is of type undefined
const u = firstElement([]);
console.log(u)

//constraints
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
 
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
console.log(longerArray)
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
console.log(longerString)
// Error Example! Numbers don't have a 'length' property
//const notOK = longest(10, 100);

//optional parameters
function f(n?: number) {
  if (n != undefined){
    console.log(n.toFixed()); // 0 arguments
    console.log(n.toFixed(3)); // 1 argument
  }  
}

f()
f(10)
f(2.6546546)

//function overloads
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
console.log(d1,"\n" + d2)

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

//Good cuz both of them have the length property, not a callable function with a different type

console.log(len(""), len([0]) )

// function len(x: any[] | string) {
//   return x.length;
// }
// this would be a much easier implementation

//rest parameters and arguments
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
console.log(a)

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

console.log(arr1)

//OBJECT TYPES
//readonly properties
interface Home {
  readonly resident: { name: string; age: number };
}
 
function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}

let NYCityHome:Home = {resident:{name: "Victor", age:45}}
console.log(NYCityHome.resident.age)
visitForBirthday(NYCityHome)
console.log(NYCityHome.resident.age)

//Cannot change resident cuz its a readonly property, but we can change the values within it

interface Person {
  name: string;
  age: number;
}
 
interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}
 
let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};
 
// works
let readonlyPerson: ReadonlyPerson = writablePerson;
//now the readonly atributtes are changeable
 
console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'

//excess property checks
interface SquareConfig {
  color?: string;
  width?: number;
}
 
function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
 
let mySquare = createSquare({ color: "red", width: 100 });
console.log(mySquare)

//extending types
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
 
interface AddressWithNumber extends BasicAddress {
  Number: string;
}

interface Colorful {
  color: string;
}
 
interface Rectangle {
  sideA: number;
  sideB: number
}
 
interface ColorfulRectangle extends Colorful, Rectangle {}
 
const cr: ColorfulRectangle = {
  color: "red",
  sideA: 42,
  sideB: 28
};

type ColorfulRectangle2 = Colorful & Rectangle

function draw(rectan: Colorful & Rectangle){
  console.log(`Color was ${rectan.color}`)
  console.log(`Sides where ${rectan.sideA} and ${rectan.sideB}`)
}

let aaa = draw({color: "blue", sideA: 23, sideB:11})
console.log(aaa)

//generic object types
interface Box<Type> {
  contents: Type;
}

let boxString: Box<string>
let boxNumber: Box<number> 


//ReadonlyArray<string> === readonly string[]
function doStuff(values: ReadonlyArray<string>){
  const copy = values.slice()
  console.log(`The first value is ${values[0]}`)

  // values.push("hello") ERROR cuz you cant push values to a readonly array
}

//You can assign an array to a readonly array but not otherwise, they cannot be assigned to the usual ones


//tuples
// type StringNumberBooleans = [string, number, ...boolean[]];
// type StringBooleansNumber = [string, ...boolean[], number];
// type BooleansStringNumber = [...boolean[], string, number];

// StringNumberBooleans describes a tuple whose first two elements are string and number respectively, but which may have any number of booleans following.
// StringBooleansNumber describes a tuple whose first element is string and then any number of booleans and ending with a number.
// BooleansStringNumber describes a tuple whose starting elements are any number of booleans and ending with a string then a number.

//CONDITIONAL TYPING

interface Mammal {
  live():void
}

interface Dog extends Mammal{
  woof_woof():void
}

type Prueba1 = Dog extends Mammal ? "yes" : "no"

type Prueba2 = RegExp extends Mammal ? "yes" : "no"

//we can simplify this into -->
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
 
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
   console.log("unimplemented")
   let a : NameLabel = {name:"a"}
   return a
}

//this
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel

// function createLabel2<T extends number | string>(idOrName: T): NameOrId<T> {
//   throw "unimplemented"
// }

let aa = createLabel("typescript")
let b = createLabel(2.8)
let c = createLabel(Math.random() ? "hello" : 42)

type Flatten<T> = T extends any[] ? T[number] : T;
 
// Extracts out the element type.
type Str = Flatten<string[]>;
 
// Leaves the type alone.
type Num = Flatten<number>;

//same as above but in a single line
type Flatten2<Type> = Type extends Array<infer Item> ? Item : Type

//CLASSES
class Point {
   x:number
   y:number

   constructor(){
     this.x = 0
     this.y = 0
   }

   scale(n:number): void{
     this.x *= n
     this.y *= n
   }
}

const pt = new Point()
pt.x = 0
pt.y = 14

console.log(`${pt.x}, ${pt.y}`)


class Greeter {
  readonly name: string = "world"

  constructor(otherName?:string){
    if (otherName !== undefined){
      this.name = otherName
    }
  }

  // err(){
  //   this.name = "not ok"
  // }
  // cannot assign this because its a readonly property
}

const g = new Greeter()
//g.name = "also not ok"
// cannot assign this because its a readonly property

class Point2 {
  x:number = 0
  y:number = 0

  constructor(x:number, y:number);
  constructor(xy: string);
  constructor(x:string | number, y:number = 0){
    //code logic here
  }
}


//supercalls
class Base{
  k=4
}

class Derived extends Base{
  constructor(){
    super() //el super tiene que estar por encima
    console.log(this.k)
  }
}

//getters and setters
class C {
  _length = 7
  
  get length() {
    return this._length
  }

  set length(value){
    this._length = value
  }
}

//si solo hay get y no set, la propiedad es automaticamente readonly



//a partir de la -v 4.3, problemas instalando la última versión
// class Thing {
//   _size = 0;
 
//   get size(): number {
//     return this._size;
//   }
 
//   set size(value: string | number | boolean) {
//     let num = Number(value);
 
//     // Don't allow NaN, Infinity, etc
 
//     if (!Number.isFinite(num)) {
//       this._size = 0;
//       return;
//     }
 
//     this._size = num;
//   }
// }



interface Pingable {
  ping():void
}

class Sonar implements Pingable{
  ping(){
    console.log("ping!")
  }
}


class Animal {
  move() {
    console.log("Moving along!");
  }
}
 
class Dog extends Animal {
  woof(times: number) {
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
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}
 
const d11 = new Derived2();
d11.greet();
d11.greet("reader");


class MySafe {
  private secretKey = 12345;
}
 
let s1 = new MySafe();
 
// Not allowed during type checking
//console.log(s1.secretKey);
 
// OK
console.log(s1["secretKey"])


// class FileSystemObject {
//   isFile(): this is FileRep {
//     return this instanceof FileRep;
//   }
//   isDirectory(): this is Directory {
//     return this instanceof Directory;
//   }
//   isNetworked(): this is Networked & this {
//     return this.networked;
//   }
//   constructor(public path: string, private networked: boolean) {}
// }
 
// class FileRep extends FileSystemObject {
//   constructor(path: string, public content: string) {
//     super(path, false);
//   }
// }
 
// class Directory extends FileSystemObject {
//   children: FileSystemObject[];
// }
 
// interface Networked {
//   host: string;
// }
 
// const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");
 
// if (fso.isFile()) {
//   fso.content;
  
// } else if (fso.isDirectory()) {
//   fso.children;

// } else if (fso.isNetworked()) {
//   fso.host;
// }

//constructor signatures
type PointInstance = InstanceType<typeof Point>
 
function moveRight(point: PointInstance) {
  point.x += 5;
}

const point = new Point();
moveRight(point);
point.x; // => 8
console.log(point.x)


//MODULES
import type {Cat, Dog as Doggie} from "./animal.js"
type Animals = Cat | Doggie

import {phi, pi, absolute} from "./math.js"
console.log(pi)
const absolutePhi = absolute(phi)