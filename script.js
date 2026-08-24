let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ====================
// PRODUCT DATA
// ====================

const products = {

    smartphone: {
        name: "Smartphone",
        price: "₹20,000",
        image: "image/smartphone.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description:
            "Latest smartphone with modern features."
    },

    headphones: {
        name: "Headphones",
        price: "₹2,000",
        image: "image/headphones.jpg",
        rating: "⭐⭐⭐⭐☆",
        description:
            "Wireless headphones with clear sound."
    },

    laptop: {
        name: "Laptop",
        price: "₹50,000",
        image: "image/laptop.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description:
            "Powerful laptop for study and work."
    },

    smartwatch: {
        name: "Smart Watch",
        price: "₹3,000",
        image: "image/smartwatch.jpg",
        rating: "⭐⭐⭐⭐☆",
        description:
            "Smart watch with fitness features."
    }

};


// ====================
// CART COUNT
// ====================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    let count = 0;

    cart.forEach(function(product) {
        count += product.quantity;
    });

    cartCount.textContent = count;
}


// ====================
// ADD PRODUCT TO CART
// ====================

function addProductToCart(
    productName,
    productPrice
) {

    const existingProduct =
        cart.find(function(product) {
            return product.name === productName;
        });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


// ====================
// ADD TO CART BUTTON
// ====================

const addCartButtons =
    document.querySelectorAll(".add-cart-btn");

addCartButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const productCard =
                button.parentElement;

            const productName =
                productCard.querySelector(
                    "h3"
                ).textContent;

            const productPrice =
                productCard.querySelector(
                    "h4"
                ).textContent;

            addProductToCart(
                productName,
                productPrice
            );

            alert(
                productName +
                " added to cart!"
            );
        }
    );
});


// ====================
// BUY NOW
// ====================

const buyNowButtons =
    document.querySelectorAll(".buy-now-btn");

buyNowButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const productCard =
                button.parentElement;

            const productName =
                productCard.querySelector(
                    "h3"
                ).textContent;

            const productPrice =
                productCard.querySelector(
                    "h4"
                ).textContent;

            addProductToCart(
                productName,
                productPrice
            );

            window.location.href =
                "checkout.html";
        }
    );
});


// ====================
// PRODUCT DETAILS PAGE
// ====================

const detailName =
    document.getElementById(
        "detail-name"
    );

if (detailName) {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const productId =
        params.get("product");

    const product =
    products[productId] ||
    products.smartphone;


// Display product details

document.getElementById(
    "detail-image"
).src = product.image;

document.getElementById(
    "detail-image"
).alt = product.name;

document.getElementById(
    "detail-name"
).textContent = product.name;

document.getElementById(
    "detail-rating"
).textContent = product.rating;

document.getElementById(
    "detail-description"
).textContent = product.description;

document.getElementById(
    "detail-price"
).textContent = product.price;


// Add to Cart

const detailAddCart =
    document.getElementById(
        "detail-add-cart"
    );

detailAddCart.addEventListener(
    "click",
    function () {

        addProductToCart(
            product.name,
            product.price
        );

        alert(
            product.name +
            " added to cart! 🛒"
        );
    }
);


// Buy Now

const detailBuyNow =
    document.getElementById(
        "detail-buy-now"
    );

detailBuyNow.addEventListener(
    "click",
    function () {

        addProductToCart(
            product.name,
            product.price
        );

        window.location.href =
            "checkout.html";
    }
);

}