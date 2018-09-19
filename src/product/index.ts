import { PluginBase, Server, PluginNameVersion, Request, ResponseToolkit } from "hapi";
import { ProductManager } from "./product-manager";
import { Product } from "./product";
import * as Joi from "joi";

export class ProductPlugin implements PluginBase<object>, PluginNameVersion {
    name= "Product";
    version= "1";

    register(server: Server, options: object) {
        const productManager = new ProductManager([
            
                new Product("1","รองเท้า",2900),
                new Product("2","กระเป๋า",7200),
                new Product("1","เสื้อ",150)
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
