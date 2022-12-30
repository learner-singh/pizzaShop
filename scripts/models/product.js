// Id, name, price, description, url, isVeg

class Product {
    constructor(id, name, price, desc='', url, isVeg=true) {
        //Member Variable acces (this) = Local Variable
        this.id = id;
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.url = url;
        this.isVeg = isVeg;
        this.isAddedToCart = false;
    }
}

export default Product;