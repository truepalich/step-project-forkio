//Ruslan js will be here

"use strict"
let btn_open = document.querySelector(".hamburger__btn_open");
let btn_close = document.querySelector(".hamburger__btn_close");
let menu = document.querySelector("menu");
btn_open.addEventListener('click', function() {
    btn_open.style.display = "none";
    btn_close.style.display = "block";
    menu.style.display = "block";
})

btn_close.addEventListener("click", function() {
    btn_open.style.display = "block";
    btn_close.style.display = "none";
    menu.style.display = "none";

});