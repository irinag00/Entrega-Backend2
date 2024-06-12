import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { ProductManager } from "./ProductManager.js";
import { CartManager } from "./CartManager.js";
import routerProducts from "./routers/products.router.js";
import routerCart from "./routers/carts.router.js";
import handlebars from "express-handlebars";
import { initializeSocket } from "./socket.js";
import routerHome from "./routers/viewProduct.router.js";
import routerRealTime from "./routers/realTimeProducts.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

const pathProducts = "./src/data/products.json";
const pathCart = "./src/data/cart.json";
export const productManager = new ProductManager(pathProducts);
export const cartManager = new CartManager(pathCart);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

//routes
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);
app.use("/", routerHome);
app.use("/realTimeProducts", routerRealTime);

//config handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//connection socket.io
const httpServer = app.listen(PORT, () =>
  console.log("Servidor con express en puesto: ", PORT)
);

initializeSocket(httpServer);
