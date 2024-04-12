'use strict';
document.addEventListener('DOMContentLoaded', function () {

    // БУРГЕР МЕНЮ
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


    // ТАБЫ 
    const cardsArray = document.querySelectorAll('.portfolio__card');
    const tabsContainer = document.getElementById('tabs');
    function tabsHanlder(e) {
        const target = e.target;
        const tabArray = tabsContainer.querySelectorAll('.portfolio__tab-btn');



        if (target && target.classList.contains('portfolio__tab-btn')) {
            tabArray.forEach(item => {
                item.classList.remove('active');
            });
            target.classList.add('active');
            const tabName = target.getAttribute("data-tab");
            filterBlocks(tabName);
        };

    };

    function filterBlocks(tabName) {
        cardsArray.forEach(block => {
            const blockTags = block.getAttribute("data-tags").split(",");
            if (tabName === "all" || blockTags.includes(tabName)) {
                block.style.display = "block";
            } else {
                block.style.display = "none";
            }
        });
    }
    tabsContainer.addEventListener('click', tabsHanlder);


    // ПЕЧАТАЮЩИЙСЯ ТЕКСТ
    const options = {
        strings: ['web-designer', 'front-end developer'],
        typeSpeed: 100,       // Установите желаемую скорость набора символов
        backSpeed: 75,       // Скорость стирания текста
        startDelay: 75,     // Задержка перед началом анимации

        loop: true,// Повторять анимацию
        // startDelay: 1,
    };
    const typed = new Typed('#typed', options);
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