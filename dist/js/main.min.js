"use strict";
document.addEventListener("DOMContentLoaded", function () {
    // БУРГЕР МЕНЮ
    const header = document.getElementById("header"),
        menuOpenBtn = document.getElementById("header__burger"),
        menuCloseBtn = document.getElementById("menu__burger"),
        menu = document.getElementById("menu"),
        overlay = document.getElementById("overlay");
    function openMenuHandler(e) {
        menu.classList.add("active");
        overlay.classList.add("active");
        document.body.classList.add("menu-active");
    }
    function closeMenuHandler(e) {
        modal.classList.remove('active');
        menu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-active");
    }
    overlay.addEventListener("click", closeMenuHandler);
    menuCloseBtn.addEventListener("click", closeMenuHandler);
    menuOpenBtn.addEventListener("click", openMenuHandler);



    const tabsContainer = document.getElementById("tabs");
    function tabsHanlder(e) {
        const target = e.target;
        const tabArray = tabsContainer.querySelectorAll(".portfolio__tab-btn");
        if (target && target.classList.contains("portfolio__tab-btn")) {
            tabArray.forEach((item) => {
                item.classList.remove("active");
            });
            target.classList.add("active");

            if (target.classList.contains("all")) {
                qwe.filter("all").then(function (state) {
                    qwe.sort("order:asc").then(function () {
                        console.log("Sorting completed");
                    });
                });
            }
        }
    }

    tabsContainer.addEventListener("click", tabsHanlder);

    // ПЕЧАТАЮЩИЙСЯ ТЕКСТ
    const options = {
        strings: ["web-designer", "front-end developer"],
        typeSpeed: 100, // Установите желаемую скорость набора символов
        backSpeed: 75, // Скорость стирания текста
        startDelay: 75, // Задержка перед началом анимации

        loop: true, // Повторять анимацию
        // startDelay: 1,
    };
    const typed = new Typed("#typed", options);

    // HOVER CARDS
    const servicesBox = document.getElementById("services__content");
    const servicesCards = servicesBox.querySelectorAll(".services__item");
    function servicesCardsHandler(e) {
        const target = e.target;
        if (target && target.classList.contains("services__item")) {
            target.classList.add("active");
        } else if (target && target.classList.contains("services__item-prev")) {
            target.closest(".services__item").classList.remove("active");
        }
    }
    servicesBox.addEventListener("click", servicesCardsHandler);

    const portfolioWrapper = document.querySelector('.portfolio__cards');
    const modal = document.getElementById('modal');
    const closeBtnModal = document.getElementById('modal__close');
    function modalCardHandler(e) {
        const target = e.target;

        console.log(target);
        openModal();
    }

    function openModal() {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
    function closeModal() {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
    closeBtnModal.addEventListener('click', closeModal);
    portfolioWrapper.addEventListener('click', modalCardHandler);


    // fetch('http://127.0.0.1:8000/api/test')
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Полученные данные:', data);
    //     })
    //     .catch(error => {
    //         console.error('Произошла ошибка при выполнении запроса:', error);
    //     });

});



