//import {test} from "./api";
import Calculator from "./calculator";

//test();
/* const calc = new Calculator();
console.log(calc.add(1,2)); */

const {add, multiply, divide} = new Calculator();
console.log(add(10,1), multiply(3,2), divide(9,3));
