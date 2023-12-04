document.addEventListener('DOMContentLoaded', () => {
    showCart();
});

function showCart() {
    const cartContainer = document.querySelector('.nota');
    cartContainer.innerHTML = '';

    let totalPrecio = 0;

    if (localStorage.length === 0) {
        cartContainer.textContent = 'No hay artículos en la cesta';
    } else {
        for (let i = 0; i < localStorage.length; i++) {
            const productId = localStorage.key(i);
            const productInfo = JSON.parse(localStorage.getItem(productId));
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item'); 


            const precioNumerico = parseFloat(productInfo.price.replace(/[^\d.-]/g, ''));
            cartItem.innerHTML = `
                <div class="cart-header-Producto">
                <img src="${productInfo.image}" alt="">
                <h2>${productInfo.name}</h2>
                </div>
                <div class="cart-item-Precio">
                    <p>${productInfo.price}</p>
                </div>
                <div class="cart-item-Cantidad">
                    <button class="decrement-button" data-id="${productId}">-</button>
                    <span class="quantity">${productInfo.quantity || 1}</span>
                    <button class="increment-button" data-id="${productId}">+</button>
                </div>
                <div>${(precioNumerico * (productInfo.quantity || 1)).toFixed(2)}€</div>
                <button class="remove-button" data-id="${productId}">Eliminar</button>`;

            cartContainer.appendChild(cartItem);
            totalPrecio += precioNumerico * (productInfo.quantity || 1);
        }
    }

    const totalPagarElement = document.querySelector('.total-pagar h1');
    totalPagarElement.textContent = `Total: ${totalPrecio.toFixed(2)}€`;

    if (totalPrecio === 0) {
        cartContainer.textContent = 'No hay artículos en la cesta';
    }

    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    document.querySelectorAll('.increment-button').forEach(button => {
        button.addEventListener('click', incrementQuantity);
    });

    document.querySelectorAll('.decrement-button').forEach(button => {
        button.addEventListener('click', decrementQuantity);
    });
}

function removeFromCart(event) {
    const productId = event.currentTarget.dataset.id;
    localStorage.removeItem(productId);
    showCart();
}

function incrementQuantity(event) {
    const productId = event.currentTarget.dataset.id;
    const productInfo = JSON.parse(localStorage.getItem(productId)) || {};
    productInfo.quantity = (productInfo.quantity || 1) + 1;
    localStorage.setItem(productId, JSON.stringify(productInfo));
    showCart();
}

function decrementQuantity(event) {
    const productId = event.currentTarget.dataset.id;
    const productInfo = JSON.parse(localStorage.getItem(productId)) || {};
    if (productInfo.quantity && productInfo.quantity > 1) {
        productInfo.quantity -= 1;
        localStorage.setItem(productId, JSON.stringify(productInfo));
    } else {
        localStorage.removeItem(productId);
    }
    showCart();
}
