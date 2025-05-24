// Get input elements
const nameInp = document.querySelector("#proName");
const categoryInp = document.querySelector("#proCategory");
const brandInp = document.querySelector("#brand");
const imgInp = document.querySelector("#proImg");
const priceInp = document.querySelector("#proPrice");
const qtyInp = document.querySelector("#proQuantity");
const descInp = document.querySelector("#description");

// Function to add a product
function addProduct() {
    const file = imgInp.files[0];
    if (!file) return alert("Please select an image file.");

    const reader = new FileReader();
    reader.onload = function () {
        const newProduct = {
            name: nameInp.value,
            category: categoryInp.value,
            brand: brandInp.value,
            image: reader.result,
            price: Number(priceInp.value),
            quantity: Number(qtyInp.value),
            description: descInp.value
        };

        const products = JSON.parse(localStorage.getItem("products") || "[]");
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));

        // Clear form
        nameInp.value = "";
        categoryInp.value = "";
        brandInp.value = "";
        imgInp.value = "";
        priceInp.value = "";
        qtyInp.value = "";
        descInp.value = "";
    };
    reader.readAsDataURL(file);
}

// Display products on shop.html page
function displayProducts() {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const container = document.querySelector(".pro-container");
    if (!container) return;

    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "pro";

        card.innerHTML = `
            <img src="${p.image}" class="cardImg">
            <div class="des">
                <span class="brandName">${p.brand}</span>
                <h5 class="cardTitle">${p.name}</h5>
                <h4 class="cardPrice">Rs. ${p.price}</h4>
            </div>
        `;
        container.appendChild(card);
    });
}

// Only run on products.html
if (window.location.pathname.includes("shop.html")) {
    displayProducts();
}
