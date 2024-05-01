"use strict";
document.addEventListener('DOMContentLoaded', function () {
    // const addProjectBtn = document.querySelector('[data-add-project]');
    const projectWrapper = document.getElementById('project-block');
    const projectsSubmitBtn = document.getElementById('projects-submit');
    const formProject = document.querySelector('[data-form="projects"]');
    const formDataProject = new FormData(formProject);
    const formElements = formProject.elements;
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        // Проверяем тип элемента
        if (element.type === 'file') {
            // Если элемент типа file, добавляем каждый выбранный файл в FormData
            const files = element.files;
            for (let j = 0; j < files.length; j++) {
                formDataProject.append(element.name, files[j]);
            }
        } else if (element.type === 'checkbox') {
            // Если элемент типа checkbox, добавляем его значение только если он отмечен
            if (element.checked) {
                formDataProject.append(element.name, element.value);
            }
        } else {
            // Добавляем другие элементы формы (не файлы и не чекбоксы) в FormData
            formDataProject.append(element.name, element.value);
        }
    };
    const URLS = {
        show: 'https://yanessa-dev.lol/api/projects',
        delete: 'https://yanessa-dev.lol/api/project/destroy/', // ${id}
        create: 'https://yanessa-dev.lol/api/project/create',
        showId: 'https://yanessa-dev.lol/api/project/',// ${id}
        update: 'https://yanessa-dev.lol/api//project/update/', //${id}
    }
    // projectsSubmitBtn.addEventListener('click', projectRequest);
    function requestDeterminant(request) {
        formProject.setAttribute('data-project-method', `${request}`);
    }
    function openFormProject(e) {
        const target = e.target;
        if (target && target.hasAttribute('data-request-project')) {
            requestDeterminant(target.dataset.requestProject);
        };
    };
    projectWrapper.addEventListener('click', openFormProject);
    projectsSubmitBtn.addEventListener('click', formProjectHandler);

    function formProjectHandler() {
      
        const method = formProject.dataset.projectMethod;  
        
        if (method === 'add') {
            postProject(URLS.create, formDataProject)
                .then(data => {
                    console.log('Response data:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };
    };

    fetch('https://yanessa-dev.lol/api/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Другие необходимые заголовки могут быть добавлены здесь
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Разбор JSON-данных
      })
      .then(data => {
        // Обработка полученных данных
        console.log(data);
      })
      .catch(error => {
        // Обработка ошибок
        console.error('There was a problem with the fetch operation:', error);
      });

    async function postProject(url, formData) {
        try {
            const response = await fetch('https://yanessa-dev.lol/api/project/create', {
                method: 'POST',
                body: formData, // Отправляем объект FormDat
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return null;
        }
    };


    const progressArea = document.querySelector('.panel-form__progress-area'),
        uploadedArea = document.querySelector('.panel-form__uploaded-area'),
        fileInput = document.getElementById('fileInput');
    function truncateFileName(name, maxLength) {
        if (name.length > maxLength) {
            return name.substring(0, maxLength - 3) + '...';
        }
        return name;
    }
    function fileInputHandler(e) {
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 2) {
                alert(`Файл "${file.name}" превышает максимально допустимый размер (2 МБ).`);
                fileInput.value = '';
                return;
            }

            // Создаем элементы для отображения информации о файле

            const truncatedFileName = truncateFileName(file.name, 20);
            // Добавляем элемент с информацией о файле в область прогресса
            uploadedArea.classList.add('active');
            uploadedArea.textContent = ` ${truncatedFileName}, ${fileSizeInMB.toFixed(2)} МБ`;

        }
    }

    fileInput.addEventListener('change', fileInputHandler);
});
// 'sort_order' => 'required|integer',
// 'title' => 'required|string|max:255',
// 'description' => 'required|string',
// 'period' => 'required|string|max:255',
// 'deadline' => 'required|string|max:255',
// 'file_cover' => 'required|file|max:10240',
// 'tags' => 'array', // Проверяем, что tags является массивом