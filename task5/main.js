// Создаем массив с товарами и их ценами
var products = [
  { name: "Товар 1", price: 100 },
  { name: "Товар 2", price: 200 },
  { name: "Товар 3", price: 300 }
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
  var quantity = parseInt(quantityInput.value);

  // Проверяем, что количество введено корректно
  if (isNaN(quantity) || quantity <= 0) {
    resultOutput.textContent = "Введите корректное количество товара";
    return;
  }

  // Рассчитываем стоимость заказа
  var totalCost = selectedProduct.price * quantity;

  // Выводим результат
  resultOutput.textContent = "Стоимость заказа: " + totalCost + " рублей";
}

// Назначаем обработчик события на кнопку подсчета стоимости
calculateButton.addEventListener("click", calculateCost);
