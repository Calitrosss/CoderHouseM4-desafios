import express from "express";

import ProductManager from "./ProductManager.js";
const productMng = new ProductManager("./desafio-c06/src", "productsDb.json");
const products = await productMng.getProducts();

const PORT = 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, async () => {
  console.log(`Listening to port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Challenge 6th class");
});
