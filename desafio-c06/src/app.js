import express from "express";

import ProductManager from "./ProductManager.js";
const productMng = new ProductManager("./desafio-c06/src", "productsDb.json");

const PORT = 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, async () => {
  console.log(`Listening to port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Challenge 6th class");
});

app.get("/products", async (req, res) => {
  try {
    const products = await productMng.getProducts();

    const { limit } = req.query;
    if (!+limit) return res.send({ products: products });

    res.send({ products: products.slice(0, +limit) });
  } catch (error) {
    res.send({ error: error });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await productMng.getProductById(+id);
    res.send(product);
  } catch (error) {
    res.send({ error: error });
  }
});
