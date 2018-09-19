export class Product {
    name: string;
    id: string;
    price: number;

    constructor(id, name: string, price: number){
        this.id = id;
        this.name = name;
        this.price = price;
    }

}
