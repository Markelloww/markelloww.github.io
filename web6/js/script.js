const products = {
    "p1": {
        "name": "Уборка помещения",
        "price": 249,
        "subproducts": [],
        "subproperties": []
    },
    "p2": {
        "name": "Поклейка обоев",
        "price": 109,
        "subproducts": [
            {
                "name": "Тонкие обои",
                "price": 249
            },
            {
                "name": "Толстые обои",
                "price": 199
            }
        ],
        "subproperties": []
    },
    "p3": {
        "name": "Укладка плитки",
        "price": 499,
        "subproducts": [],
        "subproperties": [
            {
                "multiplier": 1.25,
                "name": "Керамо-гранитная"
            },
            {
                "multiplier": 3.75,
                "name": "Мозаичная"
            }
        ]
    },
    "p4": {
        "name": "Покраска стен",
        "subproducts": [
            {
                "name": "Краска 1",
                "price": 129
            },
            {
                "name": "Краска 2",
                "price": 159
            }
        ],
        "subproperties": [
            {
                "multiplier": 1.45,
                "name": "С системой быстрой вентиляции воздуха"
            }
        ]
    }
};
function loadSubproductsOptions(subproducts, subproductsSelectEl) {
    if (subproducts.length > 0) {
        subproductsSelectEl.removeAttribute("disabled");
    }
    else {
        subproductsSelectEl.setAttribute("disabled", "");
    }
    subproducts.forEach(subproduct => {
        let option = document.createElement("option");
        let name = document.createTextNode(subproduct["name"]);
        option.setAttribute("value", subproduct["price"]);
        option.appendChild(name);
        subproductsSelectEl.appendChild(option);
    });
}
function changeProductType() {
    let subproductsEl = document.getElementById("subproducts");
    let typeSelectEls = document.getElementsByName("product-type");
    let selectedType;
    typeSelectEls.forEach(typeSelectEl => {
        if (typeSelectEl.checked === true) {
            selectedType = typeSelectEl.value;
        }
    });
    let product = products[selectedType];
    let subproductsSelectEl = document.getElementById("subproducts-select");
    let subproductsCheckboxes =
        document.getElementById("subproduct-properties");
    subproductsSelectEl.innerHTML = " ";
    let option = document.createElement("option");
    let name = document.createTextNode("Выбрать");
    option.setAttribute("value", "");
    option.appendChild(name);
    subproductsSelectEl.appendChild(option);
    let subproducts = product["subproducts"];
    loadSubproductsOptions(subproducts, subproductsSelectEl);
    let subproductProperties = product["subproperties"];
    subproductsCheckboxes.innerHTML = " ";
    if (Object.keys(subproductProperties).length > 0) {
        let index = 0;
        subproductProperties.forEach(sProperty => {
            let checkboxDiv = document.createElement("div");
            checkboxDiv.id = "product-property-div-" + index;
            let cbInputEl = document.createElement("input");
            cbInputEl.type = "checkbox";
            cbInputEl.name = "product-property-" + index;
            cbInputEl.id = "product-property-" + index;
            cbInputEl.value = sProperty.multiplier;
            checkboxDiv.appendChild(cbInputEl);
            let cbLabel = document.createElement("label");
            cbLabel.setAttribute("for", "product-property-" + index);
            cbLabel.id = "product-property-label-" + index;
            cbLabel.innerText = sProperty.name;
            checkboxDiv.appendChild(cbLabel);
            subproductsCheckboxes.appendChild(checkboxDiv);
            index++;
        });
    }
}
function calculate() {
    let quantityEl = document.getElementById("quantity-input");
    let typeSelectEls = document.getElementsByName("product-type");
    let selectedType;
    typeSelectEls.forEach(typeSelectEl => {
        if (typeSelectEl.checked === true) {
            selectedType = typeSelectEl.value;
        }
    });
    if (!selectedType) {
        alert("Пожалуйста, выберите товар из списка.");
        return;
    }
    let product = products[selectedType];
    let subproductTypeEl =
        document.getElementById("subproducts-select");
    if (subproductTypeEl &&
        product.subproducts &&
        product.subproducts.length > 0) {
        if (subproductTypeEl.value === "") {
            alert("Пожалуйста, выберите уточнение из списка.");
            return;
        }
    }
    let quantity = parseInt(quantityEl.value);
    if (isNaN(quantity) || quantity <= 0) {
        alert("Пожалуйста, введите корректное количество.");
        return;
    }
    let productPrice = product.price;
    if (subproductTypeEl && subproductTypeEl.value) {
        productPrice = subproductTypeEl.value;
    }
    let result = quantity * productPrice;
    let subproductProperties = product.subproperties;
    if (Object.keys(subproductProperties).length > 0) {
        let index = 0;
        subproductProperties.forEach(sProperty => {
            let sPropertyId = "product-property-" + index;
            let cbInputEl = document.getElementById(sPropertyId);
            if (cbInputEl && cbInputEl.checked) {
                result *= cbInputEl.value;
            }
            index++;
        });
    }
    let resultEl = document.getElementById("result");
    resultEl.innerHTML = result.toFixed(0); // Без дробной части выводим
}
document.addEventListener("DOMContentLoaded", (event) => {
    let productsEl = document.getElementById("calc-radio-group");
    for (let i = 1; i <= Object.keys(products).length; i++) {
        let productDivEl = document.createElement("div");
        let productRadioEl = document.createElement("input");
        productRadioEl.setAttribute("type", "radio");
        productRadioEl.setAttribute("id", `radio-${i}`);
        productRadioEl.setAttribute("value", `p${i}`);
        productRadioEl.setAttribute("name", "product-type");
        productDivEl.appendChild(productRadioEl);
        let productRadioLabelEl = document.createElement("label");
        productRadioLabelEl.setAttribute("for", `radio-${i}`);
        productRadioLabelEl.innerText = products[`p${i}`]["name"];
        productDivEl.appendChild(productRadioLabelEl);
        productsEl.appendChild(productDivEl);
    }
    let selectEl = document.getElementById("calc-radio-group");
    selectEl.addEventListener("change", changeProductType);
    let buttonEl = document.getElementById("calc-button");
    buttonEl.addEventListener("click", calculate);
});
