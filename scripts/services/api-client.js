// Pizza API call from here (AJAX)
// import { CONFIG } from "../utils/config.js"

export const API_CLIENT = {
    // getPizza() {
    //     const promise = fetch(CONFIG.URL)
    //     return promise;
    // }
    getProduct(URL) {
        const promise = fetch(URL)
        return promise;
    }
}