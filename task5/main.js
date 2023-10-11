// Создаем массив с товарами и их ценами
var products = [
  { name: "котик 1", price: 10 },
  { name: "котик 2", price: 15 },
  { name: "котик 3", price: 20 }
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
    resultOutput.textContent = "Введите корректное количество котиков";
    return;
  }

  // Рассчитываем стоимость заказа
  var totalCost = selectedProduct.price * quantity;

  // Выводим результат
  resultOutput.textContent = "Количество поглаживаний: " + totalCost + " гладинья";
}

// Назначаем обработчик события на кнопку подсчета стоимости
calculateButton.addEventListener("click", calculateCost);
