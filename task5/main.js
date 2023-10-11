// Создаем массив с товарами и их ценами
var products = [
    { name: "котик 1", price: 10 },
    { name: "котик 2", price: 15 },
    { name: "котик 3", price: 20 },
    { name: "котик 4", price: 100 }
];

// Получаем элементы DOM
var quantityInput = document.getElementById("quantity");
var productSelect = document.getElementById("product");
var calculateButton = document.getElementById("calculate");
var resultOutput = document.getElementById("result");

// Функция для подсчета стоимости заказа
function calculateCost() {
    // Получаем выбранный товар и количество
    var selectedProduct = products[productSelect.selectedIndex];
    var quantity = quantityInput.value;

    // Проверка корректности ввода данных с помощью регулярного выражения
    var regex = /^[0-9]+$/;
    if (!regex.test(quantity)) {
        resultOutput.textContent = "Ошибка: Недопустимые символы в поле количества товара";
        return;
    }

    // Преобразуем количество в число
    quantity = parseInt(quantity);

    // Рассчитываем стоимость заказа
    var totalCost = selectedProduct.price * quantity;

    // Выводим результат
    resultOutput.textContent = "Стоимость: " + totalCost + " рублей";
}

// Назначаем обработчик события на кнопку подсчета стоимости
calculateButton.addEventListener("click", calculateCost);
