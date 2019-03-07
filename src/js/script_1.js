//Ruslan js will be here
let btn = document.querySelector('.hamburger');
let menu = document.querySelector('.menu');
let active = false;
btn.addEventListener('click', () => {

    active = !active;

    if (active) {
        menu.style.display = 'block';
        btn.classList.remove('fa-bars');
        btn.classList.add('fa-sleigh');
    } else {
        menu.style.display = 'none';
        btn.classList.remove('fa-sleigh');
        btn.classList.add('fa-bars');
    }

})