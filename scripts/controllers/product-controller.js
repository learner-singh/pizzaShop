import { PRODUCT_OPERATIONS } from "../helpers/product-operations.js";
import { loginWithGoogle } from "../services/oAuth.js";

window.addEventListener('load', init);

function init() {
    document.querySelector('#login').addEventListener('click', doLogin);

    const promise = PRODUCT_OPERATIONS.getPizza();
    //    promise.then(result => {
    //     printProduct(result);
    //    }).catch(err => {
    //     printError(err);
    //    });
    promise.then(printProduct).catch(printError);

}

function printProduct(pizzas) {
    console.log('Pizza is', pizzas);
    let rows = Math.ceil(pizzas.length/3);
    const productDiv = document.querySelector("#products");
    for(let i=1; i<=rows; i++) {
        const row = createRow(pizzas);
        productDiv.appendChild(row);
    }
}

function printError(err) {
    const h1 = document.createElement('h1');
    h1.className = 'alert-danger text-center mt-4';
    h1.innerText = 'Something Went Wrong...';
    console.log('Error While Pizza Data ', err);
    document.querySelector('#error').appendChild(h1);
}

function createCard(pizza) {

    //     <div class="card" style="width: 18rem;">
    //      <img src="..." class="card-img-top" alt="...">
    //       <div class="card-body">
    //          <h5 class="card-title">Card title</h5>
    //          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //          <a href="#" class="btn btn-primary">Go somewhere</a>
    //         </div>
    //       </div>

    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '16rem';
    const image = document.createElement('img');
    // image.className = 'w-100';
    image.src = pizza.url;
    card.appendChild(image);
    
    //CardBody
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    //Pizza Name
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;

    //Pizza Price
    const h6 = document.createElement('h6');
    h6.className = 'card-title';
    h6.innerText = `$${pizza.price}`;

    //Pizza Description
    const pTag = document.createElement('p');
    pTag.innerText = `"${pizza.desc}"`;
    // pTag.className = 'text-evenly';

    const addToCart = document.createElement('button');
    addToCart.className = 'btn btn-outline-success';
    addToCart.innerText = 'Add to Cart';
    addToCart.setAttribute('product-id', pizza.id);
    addToCart.addEventListener('click', addPizzaToCart)
    cardBody.appendChild(h5);
    cardBody.appendChild(h6);
    cardBody.appendChild(pTag);
    cardBody.appendChild(addToCart);
    card.appendChild(cardBody);

    return card;

}

function createRow(pizzas) {
    const MAX_COL = 3;
    const row = document.createElement('div');
    row.className = 'row justify-content-between';
    for(let j = 1; j<=MAX_COL; j++){
        if(pizzas.length>0) {
            const column = createCol();
            const currentPizza = pizzas[0];
            console.log('Current Pizza..', currentPizza);
            const card  = createCard(currentPizza);
            pizzas.shift();
            column.appendChild(card);
            row.appendChild(column);
        }
        
    }
    return row;
}

function createCol() {
    const div = document.createElement('div');
    div.className = 'col-4';
    return div;
}

function addPizzaToCart() {
    console.log('Current button Clicked', this.getAttribute('product-id'));
    const pizzaId = this.getAttribute('product-id');
    console.log("Pizza id ", pizzaId)    
    const pizza = PRODUCT_OPERATIONS.search(pizzaId);
    console.log('pizza ', pizza);
    pizza.isAddedToCart = !pizza.isAddedToCart;
    if(pizza.isAddedToCart) {
        this.className = 'btn btn-outline-danger';
        this.innerText = 'Remove from Cart';
        PRODUCT_OPERATIONS.addToCart(pizza);
    }
    else {
        this.className = 'btn btn-outline-success';
        this.innerText = 'Add to Cart';
        PRODUCT_OPERATIONS.removeFromCart(pizza);
    }
    printCart();
}

function printCart() {
    const carts = document.querySelector('#carts');
    carts.innerText = '';
    PRODUCT_OPERATIONS.carts.forEach(product => {
        const pTag = document.createElement('p');
        pTag.innerText = `${product.name} - $${product.price}`;
        carts.appendChild(pTag);
    })
    carts.appendChild(document.createElement('hr'));
    if(PRODUCT_OPERATIONS.carts.length>0) {
        totalSummary();    
        const placeOrder = document.createElement('button');
        placeOrder.className = 'btn btn-outline-primary';
        placeOrder.innerText = 'Place Order';  
        carts.appendChild(placeOrder);
    }
}

function totalSummary() {
    
    const total = PRODUCT_OPERATIONS.carts.reduce((acc,product) => acc+ parseFloat(product.price),0).toFixed(2);
    const carts = document.querySelector('#carts');
    const pTag = document.createElement('p');
    pTag.innerText = `Base Total : $${total}`;
    carts.appendChild(pTag);
    computeTax(total);
}

function computeTax(total) {
    const carts = document.querySelector('#carts');
    const pTag = document.createElement('p');
    const tax = (total*0.18).toFixed(2);
    pTag.style.color = "red";
    pTag.innerText = `Tax (18% GST) :  $${tax}`;
    carts.appendChild(pTag);
    grandTotal(total, tax);
}

function grandTotal(total, tax) {
    const carts = document.querySelector('#carts');
    const pTag = document.createElement('p');
    pTag.style.color = "green";
    console.log("total",typeof total,parseFloat(total), typeof tax)
    // const grandTotal = (total+tax).toFixed(2);
    let grandTotal = (parseFloat(total)+parseFloat(tax));
    grandTotal = grandTotal.toFixed(2)
    console.log("grandtotal ", grandTotal)
    pTag.innerText = `Grand Total : $${grandTotal}`
    pTag.style.borderTop = '2px solid green';
    pTag.style.borderBottom = '2px solid green';
    carts.appendChild(pTag);
}

function doLogin() {
    loginWithGoogle();
}