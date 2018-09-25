export class Product {
    
    id: string
    title: string
    category: string
    price: number
    imgURL: string

    constructor(id, title, category, imgURL: string, price: number){
        this.id = id;
        this.title = title;
        this.category = category;
        this.imgURL = imgURL;
        this.price = price;
    }

}
