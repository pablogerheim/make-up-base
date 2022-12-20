let apiArray = []
let brands = [];
let product_types = [];
let brand = "";
let type = "";
let orderValue = 0;
let arrayFiltered = [];
const fun = [byRating, byPrice, byPrice, byAlfa, byAlfa];

//Função que vai percorer toda a API
function printsCards() {
	if (document.getElementById("catalog").children.length != 0) {
		document.getElementById("conteinerCards").remove();
	}
	fun[orderValue](orderValue);
	rideCard(arrayFiltered);
}

//Função que monta os filtros
function rideFilters(item) {
	let booleanoB = false;
	if (!brands.includes(item.brand)) {
		brands.push(item.brand), (booleanoB = true);
	}

	if (booleanoB === true) {
		let elementBrand = document.createElement("option");
		elementBrand.setAttribute("value", `${item.brand}`);
		elementBrand.innerHTML = `${item.brand}`;

		document.getElementById("filter-brand").appendChild(elementBrand);
	}
	let booleanoT = false;
	if (!product_types.includes(item.product_type)) {
		product_types.push(item.product_type), (booleanoT = true);
	}

	if (booleanoT === true) {
		let elementType = document.createElement("option");
		elementType.setAttribute("value", `${item.product_type}`);
		elementType.innerHTML = `${item.product_type}`;

		document.getElementById("filter-type").appendChild(elementType);
	}
}

//Função que monta os cards
function rideCard(arrayFiltered) {
	let elementCard = document.createElement("div");
	elementCard.setAttribute("id", "conteinerCards");
	let conteudo = arrayFiltered
		.map(
			(item) => `<div class="card" >
    <div class="product" data-name="${item.name}" 
    data-brand="${item.brand}" 
    data-type="${item.product_type}" tabindex="508">
    <figure class="product-figure">
      <img src="${item.api_featured_image}" class='img'>
    </figure>
    <section class="product-description">
      <h1 class="product-name">${item.name}</h1>
      <div class="product-brands"><span class="product-brand background-brand">${
				item.brand
			}</span>
     <span class="product-brand background-price"> RS: ${formatValue(
				item.price,
			)}</span></div>
    </section>
    <section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${item.brand}</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250"> ${formatValue(
						item.price,
					)}</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${item.rating}</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${item.category}</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${
						item.product_type
					}</div>
        </div>
      </div></section>
  </div>
  </div>
  `,
		)
		.join("");
	elementCard.innerHTML = conteudo;
	document.querySelector("section").appendChild(elementCard);
}

//Função que formata o valor
function formatValue(params) {
	return (params * 5.5).toFixed(2);
}

function searchName(params) {
	setTimeout(() => {
		document.getElementById("filter-brand").value = "";
		brand = "";
		document.getElementById("filter-type").value = "";
		type = "";
		arrayFiltered = [...apiArray];
		arrayFiltered = arrayFiltered.filter((item) =>
			item.name.toLowerCase().includes(params.toLowerCase()),
		);
		printsCards();
	}, 100);
}

let elemenSort = document.getElementById("sort-type");
elemenSort.addEventListener("change", function () {
	orderValue = this.value;
	printsCards();
});

let elementBrand = document.getElementById("filter-brand");
elementBrand.addEventListener("change", function () {
	brand = this.value;
	updateArray();
});

let elementType = document.getElementById("filter-type");
elementType.addEventListener("change", function () {
	type = this.value;
	updateArray();
});

function updateArray() {
	arrayFiltered = [...apiArray];
	if (brand != "") {
		arrayFiltered = arrayFiltered.filter((item) => item.brand === brand);
	}
	if (type != "") {
		arrayFiltered = arrayFiltered.filter((item) => item.product_type === type);
	}

	document.getElementById("filter-name").value = "";
	printsCards();
}

function byRating() {
	arrayFiltered = arrayFiltered.sort((a, b) => b.rating - a.rating);
}

function byPrice(orderValue) {
	arrayFiltered = arrayFiltered.sort((a, b) => a.price - b.price);
	if (orderValue === "2") {
		arrayFiltered = arrayFiltered.reverse();
	}
}

function byAlfa(orderValue) {
	arrayFiltered = arrayFiltered.sort(function (a, b) {
		if (a.name.trim() > b.name.trim()) {
			return 1;
		}
		if (a.name.trim() < b.name.trim()) {
			return -1;
		}
		return 0;
	});
	if (orderValue === "4") {
		arrayFiltered = arrayFiltered.reverse();
	}
}

async function start() {
	document.getElementById("sort-type").value = 0;
	apiArray = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json")
		.then((resp) => resp.json())
		.catch((rej) => console.error("erro na api  " + rej));

	arrayFiltered = [...apiArray];
	format();
}

function format() {
	arrayFiltered = arrayFiltered.sort((a, b) => b.rating - a.rating);
	arrayFiltered.forEach((item) => {
		rideFilters(item);
	});
	printsCards();
}

//chamada principal
start();
