import { Router } from "express";
import { CartManagerDB } from "../dao/db/CartManagerDB.js";

const cartRouter = Router();
const cartManager = new CartManagerDB();

cartRouter.get("/", async (req, res) => {
  try {
    let result = await cartManager.getCarts();
    res.status(200).send({ result: "success", payload: result });
  } catch (error) {
    res
      .status(400)
      .send({ result: "Error al cargar los carritos", message: error });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    let result = await cartManager.getCartById(cid);
    res.status(200).send({ result: "success", payload: result });
  } catch (error) {
    res.status(400).send({ result: "Error al consultar el carrito", error });
  }
});

//para crear un carrito vacío
cartRouter.post("/", async (req, res) => {
  try {
    let result = await cartManager.addCart();
    res.status(200).send({ result: "success", payload: result });
  } catch (error) {
    res.status(400).send({ result: "Error al crear un nuevo carrito", error });
  }
});

//añado productos al carrito, según id de producto (agrega de a 1 quantity)
cartRouter.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    let result = await cartManager.addToCart(cid, pid);
    res.status(200).send({ result: "success", payload: result });
  } catch (error) {
    res
      .status(400)
      .send({ result: "Error al cargar productos al carrito", error });
  }
});

//elimina segun id de producto y según el id de carrito, elimina de a 1 quantity
cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    let result = await cartManager.deleteProductToCart(cid, pid);
    res.status(200).send({ result: "success", payload: result });
  } catch (error) {
    res
      .status(400)
      .send({ result: "Error al eliminar productos al carrito", error });
  }
});

//elimina el carrito completo
cartRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    let result = await cartManager.deleteCart(cid);
    res.status(200).send({ result: "success", payload: result });
  } catch (error) {
    res
      .status(400)
      .send({ result: "Error al eliminar productos al carrito", error });
  }
});
export default cartRouter;
