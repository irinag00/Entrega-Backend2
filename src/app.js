import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import handlebars from "express-handlebars";
import { Server } from "http";
import mongoose from "mongoose";
import { ProductManagerDB } from "./dao/db/ProductManagerDB.js";
import productRouter from "./routers/productsDB.router.js";
import cartRouter from "./routers/cartsDB.router.js";
import viewsRouter from "./routers/viewsDB.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;
const mongoURL =
  "mongodb+srv://adminCoder:hola123@coderbackcluster.hvjmkso.mongodb.net/back-ecommerce?retryWrites=true&w=majority&appName=CoderBackCluster";

// const pathProducts = "./src/data/products.json";
// const pathCart = "./src/data/cart.json";
// export const productManager = new ProductManager(pathProducts);
// export const cartManager = new CartManager(pathCart);

const productManager = new ProductManagerDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

//config handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//connection socket.io
const httpServer = app.listen(PORT, () =>
  console.log("Servidor con express en puesto: ", PORT)
);
const io = new Server(httpServer);

//connection mongo
const environment = async () => {
  await mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("Conexión a base de datos inicializada!");
    })
    .catch((error) => {
      console.log("Database connection error", error);
    });
};

environment();
