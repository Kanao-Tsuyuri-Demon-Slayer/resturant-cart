function decreaseQuantity(productId) {
            const quantityElement = document.getElementById(`quantity${productId}`);
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
            }
        }

        function increaseQuantity(productId) {
            const quantityElement = document.getElementById(`quantity${productId}`);
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
        }

        function addToCart(productId) {
            const productName = document.querySelector(`#quantity${productId}`).closest('.card-body').querySelector('.card-title').textContent;
            const quantity = parseInt(document.getElementById(`quantity${productId}`).textContent);
            const price = parseInt(document.querySelector(`.product-card:nth-child(${productId}) .card-text`).textContent.replace("Price: ₹", ""));
            
            const totalPrice = quantity * price;
            
            const product = {
                id: productId,
                name: productName,
                quantity: quantity,
                price: price,
                totalPrice: totalPrice
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingProductIndex = cart.findIndex(item => item.id === productId);

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += quantity;
                cart[existingProductIndex].totalPrice += totalPrice;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            updateCartDisplay();
        }

        function updateCartDisplay() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '';
            let grandTotal = 0;

            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');

                const productImage = document.createElement('img');
                productImage.src = `product${item.id}.jpg`;
                productImage.alt = `Product ${item.id} Image`;
                cartItemDiv.appendChild(productImage);

                const itemDetails = document.createElement('span');
                itemDetails.textContent = `${item.name} - Qty: ${item.quantity} - ₹${item.totalPrice}`;
                cartItemDiv.appendChild(itemDetails);

                const removeButton = document.createElement('span');
                removeButton.classList.add('remove-btn');
                removeButton.textContent = 'Remove';
                removeButton.onclick = function () {
                    removeFromCart(item.id);
                };
                cartItemDiv.appendChild(removeButton);

                cartItemsContainer.appendChild(cartItemDiv);

                grandTotal += item.totalPrice;
            });

            document.getElementById('grand-total').textContent = grandTotal;
        }
        function removeAllItems() {
            localStorage.removeItem('cart');
            updateCartDisplay();
        }
        function removeFromCart(productId) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const productIndex = cart.findIndex(item => item.id === productId);

            if (productIndex !== -1) {
                cart.splice(productIndex, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            }
        }

        updateCartDisplay();
        function placeOrder() {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];

                if (cart.length === 0) {
                    alert("Your cart is empty. Add items before placing an order.");
                    return;
                }

                // You can perform additional actions here, such as sending the order to a server.
                // For now, let's clear the cart and display a confirmation message.

                localStorage.removeItem('cart');
                updateCartDisplay();

                const orderPlacedMessage = document.getElementById('order-placed-message');
                orderPlacedMessage.textContent = 'Order placed successfully!';
            }
    