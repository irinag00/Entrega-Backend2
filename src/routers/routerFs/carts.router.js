import express from "express";
import { cartManager } from "../app.js";

const router = express.Router();

//agrego un carrito
router.post("/", async (req, res) => {
  try {
    const addCart = await cartManager.addToCart();
    res.json({ status: "success", payload: { addCart } });
  } catch (error) {
    res.status(500).send({ error: "Error interno en el servidor." });
  }
});

//muestro el carrito segun id
router.get("/:cid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(idCart);
    if (cart) {
      res.json({ status: "success", payload: { cart } });
    } else {
      res.status(404).send({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error interno en el servidor." });
  }
});

//agrego productos a un carrito segun id
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const cart = await cartManager.addProductToCart(cartId, productId);
    res.json({ status: "success", payload: { cart } });
  } catch (error) {
    res.status(500).send({ error: "Error interno en el servidor." });
  }
});

//elimino un producto de un carrito segun id
router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const cart = await cartManager.deleteProductToCart(cartId, productId);
    if (cart) {
      res.json({ status: "success", payload: { cart } });
    } else {
      res.status(404).send({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error interno en el servidor." });
  }
});
export default router;
