document.addEventListener('DOMContentLoaded', function () {
    const selectWrapper = document.querySelector('.contacts__select');
    const selectTitle = document.querySelector('.contacts__select-title');
    const optionsList = document.querySelector('.contacts__options');
    const select = document.getElementById('mySelect');
    const selectTitleSpan = document.querySelector('.contacts__select-title>span')
    selectTitle.addEventListener('click', function (e) {
        e.target.classList.toggle('active');
        optionsList.classList.toggle('show');
        selectWrapper.classList.toggle('active'); // Переключаем класс для показа/скрытия списка опций
    });

    // Закрываем список опций, если пользователь кликает за его пределами
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.contacts__select')) {
            removeActivities();
        }
    });
    function removeActivities() {
        selectTitle.classList.remove('active');
        optionsList.classList.remove('show');
    }
    function selectHandler(e) {
        const target = e.target;
        if (target && target.classList.contains('contacts__options-item')) {
            document.querySelectorAll('.contacts__options>li').forEach(item => item.classList.remove('active'));
            target.classList.add('active');
            selectTitleSpan.textContent = e.target.dataset.value;
            select.value = e.target.dataset.value;
            console.log(select)

            removeActivities();
        };
    }
    optionsList.addEventListener('click', selectHandler);



    const fileTypes = [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
        "image/x-icon",
    ];
    const progressArea = document.querySelector('.contacts__progress-area'),
        uploadedArea = document.querySelector('.contacts__uploaded-area'),
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

    const messageTextarea = document.getElementById('message');
    const maxlengthDisplay = document.querySelector('.contacts__maxlength');

    messageTextarea.addEventListener('input', function () {
        const maxLength = 300;
        const currentLength = this.value.length;

        // Если количество символов превышает максимальную длину, обрезаем текст
        if (currentLength >= maxLength) {
            this.value = this.value.substring(0, maxLength);
        }

        // Обновляем отображение количества символов
        maxlengthDisplay.textContent = `${currentLength}/${maxLength}`;
    });

    messageTextarea.addEventListener('paste', function (event) {
        const maxLength = 300;
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedText = clipboardData.getData('text');
        const currentLength = this.value.length;

        // Вычисляем длину текста после вставки и обрезаем, если необходимо
        const newTextLength = currentLength + pastedText.length;
        if (newTextLength > maxLength) {
            const remainingSpace = maxLength - currentLength;
            const newText = pastedText.substring(0, remainingSpace);
            this.value += newText;
            event.preventDefault(); // Предотвращаем стандартное поведение вставки
        }

        // Обновляем отображение количества символов
        maxlengthDisplay.textContent = `${this.value.length}/${maxLength}`;
    });

    // const currentYear = new Date().getFullYear();
    // console.log(typeof (currentYear));
    // const timeInput = document.getElementById('time');
    // new Cleave(timeInput, {
    //     time: true,
    //     timePattern: ['h', 'm']
    // });

    // // Настройка поля ввода даты (год:месяц)
    // const dateInput = document.getElementById('date');
    // new Cleave(dateInput, {
    //     numericOnly: true,
    //     delimiter: '-',
    //     date: true,
    //     datePattern: ['d', 'm'],
    //     prefix: `${currentYear}`,
    //     tailPrefix: true,
    // });
    // cleaveDate.properties.prefix = currentYear;
    const phoneInput = document.getElementById('tel');
    new Cleave(phoneInput, {
        //   phone: true,
        //   phoneRegionCode: false, // Отключаем указание региона
        numericOnly: true,
        prefix: '+7',
        delimiter: ' ',
        blocks: [2, 3, 3, 2, 2], // Определяем, как должны разбиваться блоки цифр (по умолчанию)
    });
    const telegramInput = document.getElementById('telegram');
    new Cleave(telegramInput, {
        //   phone: true,
        //   phoneRegionCode: false, // Отключаем указание региона
        prefix: '@'
        // blocks: [2, 3, 3, 2, 2], // Определяем, как должны разбиваться блоки цифр (по умолчанию)
    });











    const form = document.getElementById('form');
    const nameInput = document.getElementById('name');
    const telInput = document.getElementById('tel');
    const emailInput = document.getElementById('email');
    const mySelect = document.getElementById('mySelect');
    const submit = document.getElementById('submit');
    submit.addEventListener('click', function () {
        sendData();

    })
    function sendData() {
        const formData = new FormData(form);


        // Добавляем URL, на который будет отправлен запрос
        const url = 'http://127.0.0.1:8000/api/application/create';

        // Опции запроса
        const options = {
            method: 'POST',
            body: formData // В теле запроса передаем данные формы
        };

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Успешный ответ от сервера:', data);
            })
            .catch(error => {
                console.error('Произошла ошибка при выполнении запроса:', error);
            });
    }


    function showTooltip(element, text) {
        tippy(element, {
            content: text,

        }).show();
    }
    function hideTooltip(element) {
        tippy(element, {

        }).hide();
    }

});