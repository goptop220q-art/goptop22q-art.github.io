// Начальные значения
let generatedPassword = '';

// Получаем элементы DOM
const generateButton = document.getElementById('generate-button');
const copyButton = document.getElementById('copy-button');
const passwordDisplay = document.getElementById('generated-password');
const passwordLengthInput = document.getElementById('password-length');
const includeUppercase = document.getElementById('include-uppercase');
const includeLowercase = document.getElementById('include-lowercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');

// Обработчик генерации пароля
generateButton.addEventListener('click', function() {
    generatedPassword = generatePassword();
    passwordDisplay.textContent = generatedPassword;
});

// Обработчик копирования пароля в буфер обмена
copyButton.addEventListener('click', function() {
    if (generatedPassword) {
        navigator.clipboard.writeText(generatedPassword)
            .then(() => {
                alert('Пароль скопирован в буфер обмена!');
            })
            .catch(err => {
                console.error('Ошибка при копировании: ', err);
                alert('Не удалось скопировать пароль');
            });
    } else {
        alert('Сначала сгенерируйте пароль!');
    }
});

// Функция генерации пароля
function generatePassword() {
    const length = parseInt(passwordLengthInput.value);
    let charset = '';
    let password = '';

    // Формируем набор символов в зависимости от выбранных опций
    if (includeUppercase.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers.checked) charset += '0123456789';
    if (includeSymbols.checked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Если ни одна опция не выбрана, используем базовый набор
    if (!charset) charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Генерируем пароль
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}
