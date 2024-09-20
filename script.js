var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var categoryApi = "https://66cea54d901aab24841f1040.mockapi.io/category";
var productApi = "https://66cea54d901aab24841f1040.mockapi.io/product";
var cart = JSON.parse(localStorage.getItem("cart")) || [];
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
function fetchProductsByCategory(categoryName) {
    return __awaiter(this, void 0, void 0, function () {
        var response, products, filteredProducts, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(productApi)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    products = _a.sent();
                    filteredProducts = products.filter(function (product) { return product.nameCategory === categoryName; });
                    displayProducts(filteredProducts);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Lỗi khi lấy danh sách sản phẩm:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function displayProducts(products) {
    var popup = document.getElementById("popup");
    var popupBody = document.getElementById("popup-body");
    var popupClose = document.getElementById("popup-close");
    if (popupBody) {
        popupBody.innerHTML = "";
    }
    var productContainer = document.createElement("div");
    productContainer.className = "product-container-popup";
    if (products.length === 0) {
        if (popupBody) {
            popupBody.innerHTML = "<p>Không có sản phẩm nào trong danh mục này.</p>";
        }
    }
    else {
        products.forEach(function (product) {
            var productDiv = document.createElement("div");
            productDiv.className = "product";
            productDiv.innerHTML = "\n                <span class=\"cart-icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z\"/></svg></span>\n                <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\">\n                <h3>").concat(product.name, "</h3>\n                <p class=\"price\">").concat(product.price, "</p>\n            ");
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
        popupClose.addEventListener("click", function () {
            if (popup) {
                popup.style.display = "none";
            }
        });
    }
    document.querySelectorAll(".cart-icon").forEach(function (icon) {
        icon.addEventListener("click", function (event) {
            var _a, _b;
            var productDiv = event.target.closest(".product");
            var productName = ((_a = productDiv === null || productDiv === void 0 ? void 0 : productDiv.querySelector("h3")) === null || _a === void 0 ? void 0 : _a.innerText) || "";
            var productPrice = ((_b = productDiv === null || productDiv === void 0 ? void 0 : productDiv.querySelector(".price")) === null || _b === void 0 ? void 0 : _b.innerText) || "";
            addToCart({
                name: productName,
                price: parseFloat(productPrice.replace(/[^0-9.-]+/g, "")),
            });
        });
    });
}
function addToCart(product) {
    var existingProduct = cart.find(function (item) { return item.name === product.name; });
    if (existingProduct) {
        existingProduct.quantity += 1;
    }
    else {
        cart.push(__assign(__assign({}, product), { quantity: 1 }));
    }
    alert("Đã thêm");
    saveCart();
}
function updateCartPopup() {
    var _a;
    var cartPopup = document.getElementById("cart-popup");
    var cartTableBody = (_a = document.getElementById("cart-table")) === null || _a === void 0 ? void 0 : _a.querySelector("tbody");
    var cartPopupClose = document.getElementById("cart-popup-close");
    var cartTotalElement = document.getElementById("cart-total");
    if (cartTableBody) {
        cartTableBody.innerHTML = "";
    }
    var total = 0;
    if (cart.length === 0) {
        if (cartTableBody) {
            cartTableBody.innerHTML = "<tr><td colspan='5'>Giỏ hàng trống.</td></tr>";
        }
    }
    else {
        cart.forEach(function (item, index) {
            var row = document.createElement("tr");
            var itemTotal = (item.quantity * item.price).toFixed(3);
            total += parseFloat(itemTotal);
            row.innerHTML = "\n                <td>".concat(item.name, "</td>\n                <td>\n                    <input type=\"number\" value=\"").concat(item.quantity, "\" min=\"1\" class=\"quantity-input\" data-index=\"").concat(index, "\">\n                </td>\n                <td>").concat(item.price.toFixed(3), "</td>\n                <td>").concat(itemTotal, "</td>\n                <td>\n                    <button class=\"remove-btn\" data-index=\"").concat(index, "\">X\u00F3a</button>\n                </td>\n            ");
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
        cartPopupClose.addEventListener("click", function () {
            if (cartPopup) {
                cartPopup.style.display = "none";
            }
        });
    }
    document.querySelectorAll(".quantity-input").forEach(function (input) {
        input.addEventListener("change", function (event) {
            var index = event.target.dataset.index || "0";
            cart[parseInt(index)].quantity = parseInt(event.target.value);
            saveCart();
            updateCartPopup();
        });
    });
    document.querySelectorAll(".remove-btn").forEach(function (button) {
        button.addEventListener("click", function (event) {
            var index = event.target.dataset.index || "0";
            cart.splice(parseInt(index), 1);
            saveCart();
            updateCartPopup();
        });
    });
}
function handleCheckout() {
    localStorage.removeItem('cart');
    cart = [];
    updateCartPopup();
    alert('Cảm ơn bạn đã thanh toán!');
}
function showPopup() {
    document.querySelectorAll(".card").forEach(function (card) {
        card.addEventListener("click", function () {
            var categoryName = card.getAttribute("data-category");
            if (categoryName) {
                fetchProductsByCategory(categoryName);
            }
        });
    });
    document.getElementById('cart-popup').style.display = 'none';
    document.getElementById('cart-popup-close').addEventListener('click', function () {
        document.getElementById('cart-popup').style.display = 'none';
    });
    document.getElementById("cart-button").addEventListener("click", function () {
        updateCartPopup();
    });
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
}
document.addEventListener('DOMContentLoaded', showPopup);
