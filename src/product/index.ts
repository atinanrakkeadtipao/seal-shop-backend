import { PluginBase, Server, PluginNameVersion, Request, ResponseToolkit } from "hapi";
import { ProductManager } from "./product-manager";
import { Product } from "./product";
import * as Joi from "joi";

export class ProductPlugin implements PluginBase<object>, PluginNameVersion {
    name= "Product";
    version= "1";

    register(server: Server, options: object) {
        const productManager = new ProductManager([
            
                new Product("1","Nike Airmax 97","รองเท้า", 
                "https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/mmx1zgznck7gm20glnvz/รองเท้าผู้-air-max-97-ultra-17-MkTmpwxD.jpg",2900),
                new Product("2","Minion","เสื้อ","http://d126drxy0lew0u.cloudfront.net/catalog/product/large_image/69_404931.jpg",150),
                new Product("3","Nike Bag","กระเป๋า",
                "https://c.static-nike.com/a/images/t_PDP_1728_v1/f_auto/ty560nqkjj97iabpt7ne/%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%8B%E0%B8%B2-duffel-alpha-adapt-cross-body-7DXw78.jpg"
                ,7200
              )
        ]);
        this.registerRoute(server, productManager);
    }

    registerRoute(server: Server, productManager: ProductManager) {
        server.route([
            {
                path: "/",
                method: "GET",
                handler: (require: Request, h: ResponseToolkit) => {
                    return productManager.getAll();
                }
            },

            {
                path: "/{productId}",
                method: "GET",
                handler: (require: Request, h: ResponseToolkit) => {
                    const product = productManager.get(require.params["productId"]);
                    return product || "not found ไอ้โง่ ถ้าโง่มากก็ไม่ต้องใช้ ."

                },
                options: {
                    validate: {
                        params: {
                            productId: Joi.number().min(0)
                            
                        }
                    }
                }
            }



        ]);

    }
}
