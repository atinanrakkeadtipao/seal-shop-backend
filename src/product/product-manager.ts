import { Product } from "./product";

export class ProductManager {

    constructor(private products: Product[]){
        
    }

    // private products: Product[];

    getAll(): Product[] {
        return this.products;

    }

    get(id: string): Product {
        return this.products.find(product => {
            return product.id ==id;
        }) ;
    }

}