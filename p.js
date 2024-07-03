function decreaseQuantity(productId) {
    const quantityElement = document.getElementById(`quantity${productId}`);

    let quantity = parseInt(quantityElement.textContent);

    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }
}


function increaseQuantity(productId){
    const quantityElement=document.getElementById(`quantity${productId}`);
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent=quantity;
}


