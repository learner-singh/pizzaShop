import { API_CLIENT } from "../services/api-client.js"
import { CONFIG } from "../utils/config.js"
import Product from "../models/product.js";

export const PRODUCT_OPERATIONS = {
    pizzas : [],
    carts: [],

    search(id) {
        return this.pizzas.find(pizza => pizza.id == id);
    },

    addToCart(product) {
        this.carts.push(product);
    },

    removeFromCart(product) {
        this.carts = this.carts.filter(pizza => pizza.id!=product.id);
    },

    async getPizza() {
        try {
            const response = await API_CLIENT.getProduct(CONFIG.PIZZA_URL);
            const data = await response.json();
            const pizzaArray = data["Vegetarian"];
            console.log("pizza array",pizzaArray);
            //Conversion Code
            const pizzas = pizzaArray.map(pizza => {
                const product = new Product(pizza['id'], pizza['name'], pizza['price'],pizza['menu_description'], pizza['assets']['product_details_page'][0]['url']);
                return product;
            })
            this.pizzas = pizzas;
            return [...pizzas];
        }
        catch(err) {
            throw err;
        }

    },
    getDrinks (){

    },
    getBurger() {

    }
}