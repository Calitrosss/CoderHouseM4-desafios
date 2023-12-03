const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  static #configFile = "./desafio-c04/config.json";

  async #getLastId() {
    try {
      const configFile = await fs.promises.readFile(ProductManager.#configFile, "utf-8");
      const configFileObj = JSON.parse(configFile);
      return configFileObj.lastId;
    } catch (error) {
      console.error(`Error getLastId(): ${error}`);
      return 0;
    }
  }

  async getProducts() {
    try {
      const productsDb = await fs.promises.readFile(this.filePath, "utf-8");
      const productsDbObj = JSON.parse(productsDb);
      return productsDbObj;
    } catch (error) {
      console.error(`Error getProducts(): ${error}`);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id === id);

      if (!product) throw `Error: Id "${id}" Not found`;

      return product;
    } catch (error) {
      console.error(`Error getProductById(): ${error}`);
    }
  }

  async #getProductByCode(code) {
    try {
      const products = await this.getProducts();
      return products.find((p) => p.code === code);
    } catch (error) {
      console.error(`Error #getProductByCode(): ${error}`);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !title.trim()) return console.error("Title is required");
      if (!description || !description.trim()) return console.error("Description is required");
      if (!price || price < 0) return console.error("Price is required");
      if (!thumbnail || !thumbnail.trim()) return console.error("Thumbnail is required");
      if (!code || !code.trim()) return console.error("Code is required");
      if (!stock || stock < 0) return console.error("Stock is required");

      const product = await this.#getProductByCode(code);

      if (product) throw `Error: Code "${product.code}" already exist`;

      let lastId = await this.#getLastId();
      lastId++;

      const newProduct = {
        id: lastId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      const products = await this.getProducts();
      products.push(newProduct);

      const updateConfigFileObj = { lastId };

      await fs.promises.writeFile(
        ProductManager.#configFile,
        JSON.stringify(updateConfigFileObj),
        "utf-8"
      );
      await fs.promises.writeFile(this.filePath, JSON.stringify(products), "utf-8");

      console.log(`Success: Code "${newProduct.code}" added`);
    } catch (error) {
      console.error(`Error addProduct(): ${error}`);
    }
  }

  async updateProduct({ id, title, description, price, thumbnail, code, stock }) {
    try {
      if (!title || !title.trim()) return console.error("Title is required");
      if (!description || !description.trim()) return console.error("Description is required");
      if (!price || price < 0) return console.error("Price is required");
      if (!thumbnail || !thumbnail.trim()) return console.error("Thumbnail is required");
      if (!code || !code.trim()) return console.error("Code is required");
      if (!stock || stock < 0) return console.error("Stock is required");

      let product = await this.#getProductByCode(code);
      if (product) throw `Error: Code "${product.code}" already exist`;

      const products = await this.getProducts();
      product = products.find((p) => p.id === id);
      if (!product) throw `Product Id "${id}" Not found`;
      product.title = title;
      product.description = description;
      product.price = price;
      product.thumbnail = thumbnail;
      product.code = code;
      product.stock = stock;

      await fs.promises.writeFile(this.filePath, JSON.stringify(products), "utf-8");

      console.log(`Success: Product ID "${product.id}" updated`);
    } catch (error) {
      console.error(`Error updateProduct(): ${error}`);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await this.getProductById(id);
      if (!product) throw `Error: Id "${id}" Not found`;

      const products = await this.getProducts();
      const newProducts = products.filter((p) => p.id !== id);

      await fs.promises.writeFile(this.filePath, JSON.stringify(newProducts), "utf-8");

      console.log(`Success: Product ID "${id}" deleted`);
    } catch (error) {
      console.error(`Error deleteProduct(): ${error}`);
      return { error: error };
    }
  }
}

//* Pruebas */

const productMng = new ProductManager("./desafio-c04/productsDb.json");

// console.log(await productMng.getProducts());

// await productMng.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   "abc123",
//   25
// );

// console.log(await productMng.getProducts());

// await productMng.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   "abc123",
//   25
// );

// console.log(await productMng.getProducts());

// const productById = await productMng.getProductById(1);

// console.log(productById);

// await productMng.updateProduct({
//   id: 10,
//   title: "producto prueba",
//   description: "Este es un producto prueba",
//   price: 200,
//   thumbnail: "Sin imagen",
//   code: "abc123",
//   stock: 25,
// });

// console.log(await productMng.getProducts());

// await productMng.deleteProduct(1);

// console.log(await productMng.getProducts());
