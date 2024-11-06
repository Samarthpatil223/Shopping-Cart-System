const itemDetails = {
    1:{name:"Eggs",price:7 },
    2:{name:"Milk",price:60},
    3:{name:"Biscuit",price:20},
    4:{name:"Bread",price:30},
    5:{name:"Tea Powder",price:100},
    6:{name:"Sugar",price:150},
    7:{name:"Hair oil",price:40},
    8:{name:"Face Powder",price:20},
    9:{name:"Face Cream",price:50},
    10:{name:"Cake",price:300},
};

let cartItems = []; // Array to hold items added to the cart

function populateItemDetails() {
    const itemCode = document.getElementById("itemCode").value;
    const itemNameInput = document.getElementById("itemName");
    const itemPriceInput = document.getElementById("itemPrice");
    const itemQuantity=document.getElementById("itemQuantity")

    if (itemDetails[itemCode]) {
        itemNameInput.value = itemDetails[itemCode].name;
        itemPriceInput.value = itemDetails[itemCode].price;
    } else {
        itemNameInput.value = ""; // Clear name if code doesn't match
        itemPriceInput.value = ""; // Clear price if code doesn't match
    }
}

function addItem() {
    const itemCode = document.getElementById("itemCode").value;
    const itemName = document.getElementById("itemName").value;
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);
    const itemQuantity = parseInt(document.getElementById("itemQuantity").value);

    if (itemCode && itemQuantity > 0) {
        cartItems.push({ name: itemName, price: itemPrice, quantity: itemQuantity });
        updateCart();
        clearInputs();
    } else {
        alert("Please enter a valid item code and quantity.");
    }
}

function updateCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = ""; // Clear previous items
    let total = 0;

    cartItems.forEach((item, index) => {
        total += item.price * item.quantity;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    document.getElementById("totalPrice").innerText = `Total: ₹${total.toFixed(2)}`;
}

function clearInputs() {
    document.getElementById("itemCode").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemQuantity").value = ""; 
}

function removeItem(index) {
    cartItems.splice(index, 1); // Remove item from cart
    updateCart(); // Update cart display
}

function toggleSortOrder() {
    const sortButton = document.querySelector('.sort');
    const isAscending = sortButton.innerText.includes('Low to High');
    
    cartItems.sort((a, b) => isAscending ? a.price - b.price : b.price - a.price);
    sortButton.innerText = isAscending ? 'Sort by Price: High to Low' : 'Sort by Price: Low to High';
    updateCart(); // Update cart display after sorting
}
