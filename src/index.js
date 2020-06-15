// setTimeout(() =>{
//   document.querySelector('.music').innerHTML = '<div class="song">Chocolate Rain</div>'
//   setTimeout(() =>{
//     document.querySelectorAll('.music')[1].insertAdjacentHTML('beforeend', '<div class="artist">Tayzon Day</div>')
//   }, 5000)
// }, 1000)
import { css } from "./css/main.css";
import { css2 } from "./css/output.css";
import { cityTime } from "./citytime.js";

document.querySelector('#city-form').addEventListener('submit', cityTime)