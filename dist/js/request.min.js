"use strict";
document.addEventListener('DOMContentLoaded', function () {


    
    // const mixContainer = document.getElementById("mixitup");

    // function mixInit(elem) {
    //     mixitup(elem);
    // }
    // function mixDestroy(elem) {
    //     elem.destroy();
    // }
    // // Сначала получаем данные из полей формы
    // fetch('http://127.0.0.1:8000/api/projects/')
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json(); // Возвращает ответ в формате JSON
    //     })
    //     .then(data => {
    //         // Обрабатываем полученные данные
    //         console.log(data);
    //         data.forEach((project, i) => {
    //             const { order, title, descr, period, deadline, file_cover } = project;
    //             const markup = `
    //             <figure class="portfolio__card mix layout design" data-order="${i + 1}">
    //                 <div class="portfolio__card-picture">
    //                     <div class="portfolio__tags">
    //                         <span class="portfolio__card-tag">Веб-Дизайн</span>
    //                         <span class="portfolio__card-tag">HTML / CSS верстка</span>
    //                     </div>
    //                     <img src="images/${file_cover}.jpg" alt="project" class="portfolio__card-img"/>
    //                 </div>
    //                 <figcaption class="portfolio__description">${title}</figcaption>
    //             </figure>
    //         `;

    //             // Добавляем разметку в DOM
    //             document.querySelector('.portfolio__cards').insertAdjacentHTML('beforeend', markup);


    //             mixitup(mixContainer);
    //         });

    //     })
    //     .catch(error => {
    //         console.error('There has been a problem with your fetch operation:', error);
    //     });


});