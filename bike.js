
document.querySelectorAll('.articulo-button').forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    const productId = event.currentTarget.dataset.id;
    const productInfo = {
        image: event.currentTarget.querySelector('img').src,
        name: event.currentTarget.querySelector('h2').textContent,
        price: event.currentTarget.querySelector('p').textContent
    };
    localStorage.setItem(productId, JSON.stringify(productInfo));
}

document.querySelectorAll('.articulo-button').forEach(button => {
    button.addEventListener('click', addToCart);
});
