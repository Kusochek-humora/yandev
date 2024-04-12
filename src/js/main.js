'use strict';
document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header'),
        menuOpenBtn = document.getElementById('header__burger'),
        menuCloseBtn = document.getElementById('menu__burger'),
        menu = document.getElementById('menu'),
        overlay = document.getElementById('overlay');

    function openMenuHandler(e) {
        menu.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('menu-active');
    };
    function closeMenuHandler(e) {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-active');
    }
    overlay.addEventListener('click', closeMenuHandler);
    menuCloseBtn.addEventListener('click', closeMenuHandler);
    menuOpenBtn.addEventListener('click', openMenuHandler);

})


// function stickyHeaderModify() {
//     headerHeight = header.clientHeight;
//     if (window.scrollY >= 1) {
//         header.classList.add('scroll');
//     }
//     else {
//         header.classList.remove('scroll');
//     }
// }


// window.addEventListener('scroll', stickyHeaderModify);