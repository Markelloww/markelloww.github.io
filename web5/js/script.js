const products = {
	"RedBull Classic 0,433л": 229,
	"Burn Classic 0,45л": 119,
	"Flash Classic 0,49л": 73,
	"Хлеб нарезанный": 54,
	"Хлеб обычный": 49,
	"Молоко 0,993л": 59,
	"Гречка пакетизированная 1кг": 93,
	"Грезка рассыпная 0,9кг": 73,
	"Чебупели с сыром": 129,
	"Огурцы": 83,
	"Помидоры": 120,
}
function getResult() {
	let f1 = document.getElementsByName("products");
	let f2 = document.getElementsByName("count");
	let r = document.getElementById("result");
	if (f1[0].value === "") {
	  alert("Выберете товар из списка");
	  r.innerHTML = " ";
	  return false;
	}
	if (!Number(f2[0].value)) {
	  alert("Поле 2 не является числом");
	  r.innerHTML = " ";
	  return false;
	}
	if (f2[0].value < 0) {
	  alert("Поле 2 не может быть отрицательным!");
	  r.innerHTML = " ";
	  return false;
	}
	r.innerHTML = parseInt(f1[0].value) * f2[0].value;
	return false;
}
document.addEventListener("DOMContentLoaded", function () {
	let productsSelect = document.getElementById("products-select");
  
	for (const [product, price] of Object.entries(products)) {
	  const option = document.createElement("option");
	  const name = document.createTextNode(product);
	  option.setAttribute("value", price);
	  option.appendChild(name);
	  productsSelect.appendChild(option);
	}
  
	let button = document.getElementById("button");
	button.addEventListener("click", getResult);
});