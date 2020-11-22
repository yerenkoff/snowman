// Массив со словами
let words = ["солнце", "снег", "радость", "ветер", "энциклопедия"];
// Секретное слово
let secretWord = words[Math.floor(Math.random() * words.length)];
// Кнопка проверки буквы
let checkButton = document.querySelector("#checkButton");
// Поле для ввода буквы
let userInput = document.querySelector("#userInput");
// Шифр с загаданным словом
let cypher = document.querySelector("#cypher");
// Заполнение шифра звездочками
cypher.innerHTML = "*".repeat(secretWord.length);
// Заголовок с названием игры
let gameName = document.querySelector("#gameName");
// Номер текущей картинки со снеговиком
let imageNumber = 0;
// Тег картинки
let image = document.querySelector("img");
// Перечень использованных букв
let usedLetters = "";
// Тег параграфа для отображения правил игры или перечня использованных букв
let p = document.querySelector("p");
// Кнопка "Новая игра"
let newButton = document.querySelector("#newButton");
// Фокусировка на поле ввода при загрузке страницы
userInput.select();

// Событие клика по кнопке "Проверить букву"
checkButton.onclick = function (event) {
    // Предотвращение обновления страницы
    event.preventDefault();
    // Переменная с введённой буквой
    let letter = userInput.value;
    // Если секретное слово включает в себя букву игрока
    if (secretWord.includes(letter) == true) {
        // Переменная с новым будущим шифром, который заполняется угаданными буквами
        let newCypher = '';
        // Цикл для перебора всех букв секретного слова
        for (let i = 0; i < secretWord.length; i++) {
            // Если секретная буква совпала с буквой игрока
            if (secretWord[i] == letter) {
                // Приписать её к новому шифру
                newCypher = newCypher + letter;
            } else {
                // Иначе приписать к новому шифру то, что уже стояло в шифре до этого - звездочка или уже отгаданная буква
                newCypher = newCypher + cypher.innerHTML[i];
            }
        }
        // Вставить в тег шифра новый обновленный шифр
        cypher.innerHTML = newCypher;
        // Если игрок полностью отгадал слово
        if (cypher.innerHTML == secretWord) {
            gameName.innerHTML = "Снеговик. Ты победил!";
            // Кнопка становится недоступна и прозрачна
            checkButton.disabled = true;
            checkButton.style.opacity = 0.5;
        }
    } else {
        // Если человек ввел неверную букву, то увеличивается номер картинки - чем он больше, тем ближе игрок к проигрышу. Когда снеговик окажется уже в шляпе, человек проиграет.
        imageNumber++;
        image.src = "snowman" + imageNumber + ".jpg";

        // Проигрыш
        if (imageNumber == 7) {
            gameName.innerHTML = "Снеговик. Ты проиграл! Загаданное слово - " + secretWord;
            checkButton.disabled = true;
            checkButton.style.opacity = 0.5;
        }
    }

    // Если введённая буква не входит в перечень использованных букв - вписать её туда и отобразить на экране
    if (!usedLetters.includes(letter)) {
        usedLetters += " " + letter;
        p.innerHTML = "Использованные буквы: " + usedLetters;
    }

    // Очистить поле для ввода и сфокусироваться на нем
    userInput.value = '';
    userInput.select();
}

newButton.onclick = function (event) {
    event.preventDefault();
    // Обновляется заголовок с названием игры
    gameName.innerHTML = "Снеговик";
    // Обновляется счетчик картинок
    imageNumber = 0;
    // Заменяется картинка на изначальную
    image.src = "snowman" + imageNumber + ".jpg";
    // Задается новое секретное слово
    secretWord = words[Math.floor(Math.random() * words.length)];
    // В зависимости от нового секретного слова заполняется шифр звездочками
    cypher.innerHTML = "*".repeat(secretWord.length);
    // Поле для ввода буквы становится пустым
    userInput.value = '';
    // Фокусировка переходит на поле для ввода
    userInput.select();
    // Кнопка проверки буквы снова становится доступна и непрозрачна
    checkButton.disabled = false;
    checkButton.style.opacity = 1;
    // Обновляется перечень использованных букв
    usedLetters = "";
    // Обновляется параграф с правилами
    p.innerHTML = "Вводи букву и проверяй.<br> Тебе нужно угадать секретное слово!";
}