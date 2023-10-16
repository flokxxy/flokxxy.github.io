function calculatePrice() {
  var quantity = parseInt(document.getElementById("quantity").value);
  var serviceType = document.querySelector('input[name="serviceType"]:checked').value;
  var option = document.getElementById("option").value;
  var property = document.getElementById("property").checked;

  var price = 0;

  // Вычисление цены в зависимости от выбранных параметров
  if (serviceType === "type1") {
    price = 10 * quantity;
  } else if (serviceType === "type2") {
    price = 20 * quantity;
    price += option === "option1" ? 5 : 0;
  } else if (serviceType === "type3") {
    price = 30 * quantity;
    price += property ? 10 : 0;
  }

  // Вывод цены на страницу
  document.getElementById("price").innerHTML = "Цена: " + price + " руб.";
}
