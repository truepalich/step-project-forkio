//Ruslan js will be here

"use strict"
let btn_open = document.querySelector(".hamburger__btn_open");
let btn_close = document.querySelector(".hamburger__btn_close");
let menu = document.querySelector(".menu");

btn_open.addEventListener('click', function() {
    btn_open.style.display = "none";
    menu.classList.add('dropmenu');
    btn_close.style.display = "block";

})

btn_close.addEventListener("click", function() {
    menu.classList.remove('dropmenu');
    menu.classList.add('hidemenu');
    btn_open.style.display = "block";
    btn_close.style.display = "none";
});