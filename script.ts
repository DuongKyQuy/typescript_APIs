const categoryApi: string = "https://66cea54d901aab24841f1040.mockapi.io/category";
const productApi: string = "https://66cea54d901aab24841f1040.mockapi.io/product";

let cart: { name: string; price: number; quantity: number }[] = JSON.parse(localStorage.getItem("cart") as string) || [];

function saveCart(): void {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Hàm lấy sản phẩm theo danh mục (category)
async function fetchProductsByCategory(categoryName: string): Promise<void> {
    try {
        const response: Response = await fetch(productApi);
        const products: { nameCategory: string; image: string; name: string; price: number }[] = await response.json();
        const filteredProducts: { nameCategory: string; image: string; name: string; price: number }[] = products.filter(
            (product) => product.nameCategory === categoryName
        );
        displayProducts(filteredProducts);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
}

// Hàm hiển thị danh sách sản phẩm trong popup
function displayProducts(products: { nameCategory: string; image: string; name: string; price: number }[]): void {
    const popup: HTMLElement | null = document.getElementById("popup");
    const popupBody: HTMLElement | null = document.getElementById("popup-body");
    const popupClose: HTMLElement | null = document.getElementById("popup-close");

    if (popupBody) {
        popupBody.innerHTML = "";
    }

    const productContainer: HTMLDivElement = document.createElement("div");
    productContainer.className = "product-container-popup";

    if (products.length === 0) {
        if (popupBody) {
            popupBody.innerHTML = "<p>Không có sản phẩm nào trong danh mục này.</p>";
        }
    } else {
        products.forEach((product) => {
            const productDiv: HTMLDivElement = document.createElement("div");
            productDiv.className = "product";
            productDiv.innerHTML = `
                <span class="cart-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"/></svg></span>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
            `;
            productContainer.appendChild(productDiv);
        });
        if (popupBody) {
            popupBody.appendChild(productContainer);
        }
    }

    if (popup) {
        popup.style.display = "flex";
    }

    if (popupClose) {
        popupClose.addEventListener("click", () => {
            if (popup) {
                popup.style.display = "none";
            }
        });
    }

    // Thêm sản phẩm vào giỏ hàng khi nhấn vào icon giỏ hàng
    document.querySelectorAll(".cart-icon").forEach((icon) => {
        icon.addEventListener("click", (event) => {
            const productDiv = (event.target as HTMLElement).closest(".product");
            const productName: string = productDiv?.querySelector("h3")?.innerText || "";
            const productPrice = (productDiv?.querySelector(".price") as HTMLElement)?.innerText || "";
            addToCart({
                name: productName,
                price: parseFloat(productPrice.replace(/[^0-9.-]+/g, "")),
            });
        });
    });
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product: { name: string; price: number }): void {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingProduct: { name: string; price: number; quantity: number } | undefined = cart.find((item) => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    alert("Đã thêm");
    saveCart();
}

function updateCartPopup(): void {
    const cartPopup: HTMLElement | null = document.getElementById("cart-popup");
    const cartTableBody: HTMLElement | null = document.getElementById("cart-table")?.querySelector("tbody") as HTMLElement | null;
    const cartPopupClose: HTMLElement | null = document.getElementById("cart-popup-close");
    const cartTotalElement: HTMLElement | null = document.getElementById("cart-total");

    if (cartTableBody) {
        cartTableBody.innerHTML = "";
    }

    let total: number = 0;

    if (cart.length === 0) {
        if (cartTableBody) {
            cartTableBody.innerHTML = "<tr><td colspan='5'>Giỏ hàng trống.</td></tr>";
        }
    } else {
        cart.forEach((item, index) => {
            const row: HTMLTableRowElement = document.createElement("tr");
            const itemTotal: string = (item.quantity * item.price).toFixed(3);
            total += parseFloat(itemTotal);
            row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}">
                </td>
                <td>${item.price.toFixed(3)}</td>
                <td>${itemTotal}</td>
                <td>
                    <button class="remove-btn" data-index="${index}">Xóa</button>
                </td>
            `;
            if (cartTableBody) {
                cartTableBody.appendChild(row);
            }
        });
    }

    if (cartTotalElement) {
        cartTotalElement.textContent = total.toFixed(3);
    }

    if (cartPopup) {
        cartPopup.style.display = "flex";
    }

    if (cartPopupClose) {
        cartPopupClose.addEventListener("click", () => {
            if (cartPopup) {
                cartPopup.style.display = "none";
            }
        });
    }

    document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("change", (event) => {
            const index = (event.target as HTMLElement).dataset.index || "0";
            cart[parseInt(index)].quantity = parseInt((event.target as HTMLInputElement).value);

            saveCart();
            updateCartPopup();
        });
    });

    document.querySelectorAll(".remove-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = (event.target as HTMLElement).dataset.index || "0";
            cart.splice(parseInt(index), 1);
            saveCart();
            updateCartPopup();
        });
    });
}

// Hàm xử lý thanh toán, làm trống giỏ hàng và hiển thị thông báo
function handleCheckout(): void {
    localStorage.removeItem('cart');
    cart = [];
    updateCartPopup();
    alert('Cảm ơn bạn đã thanh toán!');
}

function showPopup(): void {
    document.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("click", () => {
            const categoryName: string | null = card.getAttribute("data-category");
            if (categoryName) {
                fetchProductsByCategory(categoryName);
            }
        });
    });

    document.getElementById('cart-popup')!.style.display = 'none';
    document.getElementById('cart-popup-close')!.addEventListener('click', () => {
        document.getElementById('cart-popup')!.style.display = 'none';
    });

    document.getElementById("cart-button")!.addEventListener("click", () => {
        updateCartPopup();
    });

    document.getElementById('checkout-btn')!.addEventListener('click', handleCheckout);
}

document.addEventListener('DOMContentLoaded', showPopup);