// Sample product data
const products = [
    { id: 1, name: "Product 1", price: 100, image: "product1.jpg" },
    { id: 2, name: "Product 2", price: 200, image: "product2.jpg" },
    { id: 3, name: "Product 3", price: 300, image: "product3.jpg" },
    // Add more products here...
];

// Generate product grid
const productShowcase = document.querySelector(".product-showcase");
products.forEach((product) => {
    const productHTML = `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>₹${product.price}</p>
        </div>
    `;
    productShowcase.innerHTML += productHTML;
});