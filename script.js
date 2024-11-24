
// Функция для обновления активной ссылки
function setActiveLink() {
    const links = document.querySelectorAll('#nav-links a'); // Все ссылки в блоке навигации
    const currentHash = window.location.hash;

    let hasActiveLink = false;

    links.forEach(link => {
        // Убираем класс "active" у всех ссылок
        link.classList.remove('active');

        // Если текущий якорь соответствует ссылке, добавляем класс "active"
        if (link.getAttribute('href') === currentHash) {
            link.classList.add('active');
            hasActiveLink = true; // Нашли активную ссылку
        }
    });

    // Логика для "default-active"
    const defaultActiveLink = document.querySelector('#nav-links .default-active');
    if (defaultActiveLink) {
        if (hasActiveLink) {
            // Если есть другая активная ссылка, убираем подсветку default-active
            defaultActiveLink.classList.remove('active');
        } else {
            // Если других активных ссылок нет, включаем подсветку default-active
            defaultActiveLink.classList.add('active');
        }
    }
}


// Вешаем событие на изменение хеша URL (при прокрутке страницы)
window.addEventListener('hashchange', setActiveLink);

// Вызываем функцию при загрузке страницы
window.addEventListener('load', setActiveLink);

// Вешаем обработчик на клик по ссылкам (чтобы обновить активную ссылку)
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        setActiveLink();
    });
});

/* Плавный скролл для всех якорных ссылок */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (event) {
        // Отключаем стандартное поведение перехода по якорю
        event.preventDefault();

        // Получаем ID цели из атрибута href
        const targetId = this.getAttribute('href').substring(1); // Убираем #
        if (!targetId) return; // Игнорируем ссылки с href="#"

        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Вычисляем позицию секции с учетом отступа
            const headerHeight = document.querySelector('header')?.offsetHeight || 0; // Высота header, если он существует
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 50; // Отступ в 50px

            // Плавно прокручиваем страницу
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });

            // Обновляем URL-хэш без перезагрузки страницы
            history.pushState(null, null, `#${targetId}`);
        }
    });
});

/*scrollToTop*/
// Создаем функцию для плавного скролла вверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Показываем или скрываем кнопку на основе высоты страницы и прокрутки
function toggleScrollToTopButton() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    const header = document.querySelector('header'); // Верхнее меню
    const headerHeight = header.offsetHeight; // Высота верхнего меню
    const documentHeight = document.documentElement.scrollHeight; // Высота страницы
    const windowHeight = window.innerHeight; // Высота окна браузера

    // Проверяем, достаточно ли контента для прокрутки
    if (documentHeight <= windowHeight) {
        scrollToTopButton.style.display = 'none'; // Скрываем кнопку, если нет прокрутки
    } else if (window.scrollY > headerHeight) {
        scrollToTopButton.style.display = 'block'; // Показываем кнопку при прокрутке вниз
    } else {
        scrollToTopButton.style.display = 'none'; // Скрываем кнопку, если верхнее меню видно
    }
}

// Вешаем обработчик клика на кнопку
document.getElementById('scrollToTop').addEventListener('click', scrollToTop);

// Вешаем обработчик на прокрутку страницы
window.addEventListener('scroll', toggleScrollToTopButton);

// Выполняем проверку на наличие прокрутки при загрузке страницы
window.addEventListener('load', toggleScrollToTopButton);

// Tabs Switching
document.addEventListener('DOMContentLoaded', () => {
    // Получаем все элементы внешних вкладок и их панели
    const tabItems = document.querySelectorAll('.services-tab-item');
    const tabPanels = document.querySelectorAll('.services-tab-panel');

    // Получаем все элементы внутренних вкладок и их панели
    const innerTabs = document.querySelectorAll('.services-inner-tab');
    const innerContents = document.querySelectorAll('.services-inner-content');

    // Функция для активации внешней вкладки
    function activateTab(tabId) {
        // Деактивируем все внешние вкладки и их панели
        tabItems.forEach(item => item.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Активируем выбранную вкладку и ее панель
        const targetTab = document.querySelector(`.services-tab-item[data-tab="${tabId}"]`);
        const targetPanel = document.getElementById(tabId);

        if (targetTab) targetTab.classList.add('active');
        if (targetPanel) targetPanel.classList.add('active');

        // Сбрасываем внутренние вкладки к первой по умолчанию
        resetInnerTabs(targetPanel);
    }

    // Функция для сброса внутренних вкладок в указанной панели
    function resetInnerTabs(targetPanel) {
        // Находим внутренние вкладки внутри активной панели
        const innerTabsInPanel = targetPanel.querySelectorAll('.services-inner-tab');
        const innerContentsInPanel = targetPanel.querySelectorAll('.services-inner-content');

        // Деактивируем все внутренние вкладки и их контент
        innerTabsInPanel.forEach(tab => tab.classList.remove('active'));
        innerContentsInPanel.forEach(content => content.classList.remove('active'));

        // Активируем первую внутреннюю вкладку и ее контент
        if (innerTabsInPanel.length > 0 && innerContentsInPanel.length > 0) {
            innerTabsInPanel[0].classList.add('active');
            innerContentsInPanel[0].classList.add('active');
        }
    }

    // Функция для активации внутренней вкладки
    function activateInnerTab(tabId) {
        // Деактивируем все внутренние вкладки и их контент
        innerTabs.forEach(item => item.classList.remove('active'));
        innerContents.forEach(content => content.classList.remove('active'));

        // Активируем выбранную вкладку и ее контент
        const targetTab = document.querySelector(`.services-inner-tab[data-inner-tab="${tabId}"]`);
        const targetContent = document.getElementById(tabId);

        if (targetTab) targetTab.classList.add('active');
        if (targetContent) targetContent.classList.add('active');
    }

    // Обработчик кликов по внешним вкладкам
    tabItems.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;
            activateTab(targetId);

            // Обновляем URL-хэш для соответствующей вкладки
            history.pushState(null, null, `#${targetId}`);
        });
    });

    // Обработчик кликов по внутренним вкладкам
    innerTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.innerTab;
            activateInnerTab(targetId);

            // Обновляем URL-хэш для соответствующей внутренней вкладки (опционально)
            // history.pushState(null, null, `#${targetId}`);
        });
    });

    // Проверяем и активируем вкладку из URL-хэша при загрузке
    window.addEventListener('load', () => {
        const hash = window.location.hash.substring(1); // Убираем символ #
        if (hash) {
            activateTab(hash); // Активируем вкладку из хэша

            // Отключаем стандартную прокрутку к элементу
            setTimeout(() => window.scrollTo(0, 0), 0);
        } else {
            // Если хэша нет, активируем первую вкладку по умолчанию
            const defaultTab = document.querySelector('.services-tab-item.active');
            if (defaultTab) {
                const targetId = defaultTab.dataset.tab;
                activateTab(targetId);
            }
        }
    });

    // "More" button for gene panel
    document.querySelectorAll('.toggle-more').forEach(button => {
        button.addEventListener('click', function () {
            const geneList = this.closest('.gene-list'); // Найти ближайший родительский элемент .gene-list
            const hiddenContent = geneList.querySelector('.hidden-content');

            if (hiddenContent.style.display === 'none' || hiddenContent.style.display === '') {
                hiddenContent.style.display = 'inline';
                this.textContent = '...less';
            } else {
                hiddenContent.style.display = 'none';
                this.textContent = '...more';
            }
        });
    });

});

// Обработчик формы
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Отключаем стандартное поведение формы

    // Убираем предыдущие сообщения об ошибках
    resetErrors();

    // Проверяем поля формы
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const birthYear = document.getElementById('birth-year').value;
    const gender = document.getElementById('gender').value;
    const additionalInfo = document.getElementById('additional-info').value.trim();
    const isCaptchaChecked = document.querySelector('.recaptcha-placeholder').classList.contains('checked');

    let isValid = true;

    // Проверка имени
    if (!/^[a-zA-Z]+$/.test(name)) {
        setError('name', 'Please enter a valid name (only Latin letters).');
        isValid = false;
    }

    // Проверка e-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('email', 'Please enter a valid email address.');
        isValid = false;
    }

    // Проверка года рождения
    if (!birthYear) {
        setError('birth-year', 'Please select a valid year of birth.');
        isValid = false;
    }

    // Проверка пола
    if (!gender) {
        setError('gender', 'Please select your biological gender.');
        isValid = false;
    }

    // Проверка CAPTCHA
    if (!isCaptchaChecked) {
        setError('recaptcha-placeholder', 'Please complete the CAPTCHA.');
        isValid = false;
    }

    if (isValid) {
        // Показываем сообщение об успехе
        showSuccessMessage('Form submitted successfully!');

        // Сбрасываем форму
        document.getElementById('contact-form').reset();

        // Сбрасываем капчу
        const recaptchaPlaceholder = document.querySelector('.recaptcha-placeholder');
        recaptchaPlaceholder.classList.remove('checked');
        recaptchaPlaceholder.textContent = 'Complete CAPTCHA';
        recaptchaPlaceholder.style.color = '';
        recaptchaPlaceholder.style.borderColor = '#afdd61';

        // Сбрасываем ошибки
        resetErrors();
    }
});

// Функция для установки сообщения об ошибке
function setError(fieldId, message) {
    const field = document.getElementById(fieldId) || document.querySelector(`.${fieldId}`);
    if (!field) return; // Проверяем, существует ли элемент

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.innerHTML = message;

    // Если поле уже содержит ошибку, не добавляем повторно
    if (!field.parentNode.querySelector('.error')) {
        field.parentNode.appendChild(errorDiv);
    }

    // Устанавливаем красную рамку
    field.style.borderColor = 'red';
}

// Функция для показа сообщения об успехе
function showSuccessMessage(message) {
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    successMessage.style.color = 'green';
    successMessage.style.fontWeight = 'bold';
    successMessage.style.marginTop = '20px';
}

// Функция для сброса ошибок и стилей
function resetErrors() {
    // Удаляем сообщения об ошибках
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.remove());

    // Сбрасываем стили всех полей формы
    const inputFields = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    inputFields.forEach(field => {
        field.style.borderColor = ''; // Возвращаем стиль рамки
    });

    // Убираем ошибки у CAPTCHA
    const recaptchaPlaceholder = document.querySelector('.recaptcha-placeholder');
    if (recaptchaPlaceholder) {
        const error = recaptchaPlaceholder.parentNode.querySelector('.error');
        if (error) error.remove();
    }
}

// Имитируем работу CAPTCHA
document.querySelector('.recaptcha-placeholder').addEventListener('click', function () {
    this.classList.toggle('checked'); // Добавляем класс "checked"
    if (this.classList.contains('checked')) {
        this.textContent = '✔️ I\'m not a robot'; // Текст после успешной проверки
        this.style.color = 'green';
        this.style.borderColor = 'green';
    } else {
        this.textContent = 'Complete CAPTCHA'; // Исходный текст
        this.style.color = ''; // Убираем стиль
        this.style.borderColor = '#afdd61'; // Возвращаем исходный стиль
    }
});
