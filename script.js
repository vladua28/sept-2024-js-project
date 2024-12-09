let pairs = JSON.parse(localStorage.getItem('pairs')) || [];

let form = document.forms['f1'];
let formInput = document.getElementById('formInput');
let pairList = document.getElementById('pairList');
let addItemButton = document.getElementById('addItem');
let sortByNameButton = document.getElementById('sortByName');
let sortByValueButton = document.getElementById('sortByValue');
let deleteButton = document.getElementById('delete');

/*Створюю функцію renderList, яка буде відображати список пар.*/
const renderList = () => {
    /*Спочатку очищаю список перед додаванням нових пар*/
    pairList.innerHTML = '';
    /*Перебираю масив пар і створюю елемент option для кожної пари. Наповнюю його ключем і значенням пари через тімплейт стрінгу.
    Зберігаю індекси пар у властивість value елемента option. Так як pairs.indexOf(pair) повертає number, додав '' + щоб перетворити у стрінгу*/
    for (const pair of pairs) {
        const option = document.createElement('option');
        option.textContent = `${pair.name}=${pair.value}`;
        option.value = '' + pairs.indexOf(pair);
        pairList.appendChild(option);
    }
}

/*Створюю функцію saveToLocalStorage. При виклику цієї функції, вона збереже введені пари до local storage.
* Ключем буде pairs, а значенням - JSON стрінга*/
const saveToLocalStorage = () => {
    localStorage.setItem('pairs', JSON.stringify(pairs));
}

/*Створюю функцію updateList. При виклику цієї функції, вона викличе 2 інші, які оновлять UI та
збережуть введені пари до local storage*/
const updateList = () => {
    renderList();
    saveToLocalStorage();
}

/*Вішаю на кнопку слухач подій */
addItemButton.addEventListener('click', (ev) => {

    /*Звертаюсь до івента і скасовую стандартну поведінку кнопки, наприклад перезавантаження сторінки при відправці форми*/
    ev.preventDefault();

    /*Створюю змінну input для отримання введених даних, видаляю пробіли з початку і кінця*/
    let input = formInput.value.trim();

    /*Створюю регулярний вираз для перевірки введених даних. Дані можуть містити латиницю, кирилицю, українські літери та цифри.
     Введені дані мають бути у форматі Name=Value, тобто розділені знаком "=". Можуть містити пробіли до і після знака "="*/
    let inputRegex = /^[a-zA-Zа-яА-ЯїЇіІєЄґҐ0-9]+\s*=\s*[a-zA-Zа-яА-ЯїЇіІєЄґҐ0-9]+$/;
    /*Якщо при натисканні Add дані не будуть задовільняти регулярний вираз, вискочить алерт і повідомить про помилку
     з підказкою формату як у плейсхолдері. Також зупиниться відпрацювання подальшого коду завдяки return*/
    if (!inputRegex.test(input)) {
        alert('Введіть пару значень у форматі Name=Value');
        return;
    }

    /*Деструктуризую масив на змінні name та value. Методом split() розділюю рядок на підмасиви
    з двома рядками, використовуючи знак "=" як роздільник.*/
    let [name, value] = input.split('=').map(item => item.trim());

    /*Методом push() додаю нову пару до масиву, зберігаю в local storage, оновлюю UI та очищаю форму*/
    pairs.push({name, value});
    updateList();
    form.reset();
});

/*Вішаю на кнопку слухач подій. Коли юзер клікає на кнопку, виконується сортування масиву пар через метод sort.
 Властивості name порівнюються методом localeCompare. Далі оновлений масив зберігається в local storage, після чого renderList()
 оновлює UI і відображає новий список після сортування*/
sortByNameButton.addEventListener('click', () => {
    pairs.sort((a, b) => a.name.localeCompare(b.name));
});

/*Все теж саме, але порівнюються властивості value*/
sortByValueButton.addEventListener('click', () => {
    pairs.sort((a, b) => a.value.localeCompare(b.value));
    updateList();
});

/*Вішаю на кнопку слухач подій.*/
deleteButton.addEventListener('click', () => {
    /*Створюю змінну selectedOptions, в якій зберігаються вибрані пари зі списку.*/
    let selectedOptions = pairList.selectedOptions;

    /*Якщо нічого не вибрано, вискочить алерт і попросить вибрати що видаляти*/
    if (selectedOptions.length === 0) {
        alert('Виберіть хоча б одну пару для видалення');
        return;
    }

    /*Використовую цикл for of щоб перебирати всі вибрані пари. Створюю змінну index, в якій зберігаються індекси вибраних пар.
    *Методом splice() видаляю обрані пари по їх індексах*/
    for (let option of selectedOptions) {
        let index = parseInt(option.value);
        pairs.splice(index, 1);
    }

    updateList();
});

renderList();