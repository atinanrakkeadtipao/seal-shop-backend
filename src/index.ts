import { Server, Request, ResponseToolkit } from "hapi";
import { ProductPlugin } from "./product/index";
import { plugin } from "hapi-auth-basic";


const server = new Server({
    port: "5000"
});


// server.route([
//     {
//         path: "/product/{productId}",
//         method: "GET",
//         handler: (require: Request, h: ResponseToolkit) => {

//             return require.params;
//         }
//     }

// ]);

// server.route([
//     {
//         path: "/product/",
//         method: "GET",
//         handler: (require: Request, h: ResponseToolkit) => {

//             return require.query;
//         }
//     }

// ]);

////// promise ///////
// server.register(new ProductPlugin(), { routes: { prefix: "/product" } })
//     .then(() => {
//         server.start().then(
//             () => { console.log("Server Start ."); },
//             (err) => { console.log("Server Error . " + err); }
//         );
//     });


/////// async ////////
async function initServer() {
    await server.register(plugin);
    server.auth.strategy('simple', 'basic', { validate });


    server.route([
        {
            path: "/asd",
            method: "POST",
            handler: (require: Request, h: ResponseToolkit) => {
                return require.payload;
            }
        }
    ]);



    server.route([
        {
            path: "/asdasd",
            method: "GET",
            handler: (require: Request, h: ResponseToolkit) => {
                return "fsafsafsa";
            }
        }
    ]);


    server.route([
        {
            path: "/",
            method: "GET",
            handler: (require: Request, h: ResponseToolkit) => {
                return "Main";
            },
            options: {
                auth: 'simple'
            }
        }
    ]);
    await server.register(new ProductPlugin(), { routes: { prefix: "/product" } });
    await server.start();
    console.log("Server Start .");

}
try {
    initServer();
}
catch (err) {
    console.log("Server Error . " + err);
};

const validate = async (request, username, password) => {
    let isValid = false;
    let credentials = {};

    if (username == "admin" && password =="1234"){
        isValid = true;
        credentials = {userID: "u123", name: "Steve Hobkins"}
    }
    return { isValid, credentials};
}


