class ProductManager {
  constructor() {
    this.products = [];
  }

  static #id = 0;

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);

    if (!product) return `Error: Id "${id}" Not found`;

    return product;
  }

  #getProductByCode(code) {
    return this.products.find((p) => p.code === code);
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !title.trim()) return console.error("Title is required");
    if (!description || !description.trim()) return console.error("Description is required");
    if (!price || price < 0) return console.error("Price is required");
    if (!thumbnail || !thumbnail.trim()) return console.error("Thumbnail is required");
    if (!code || !code.trim()) return console.error("Code is required");
    if (!stock || stock < 0) return console.error("Stock is required");

    const product = this.#getProductByCode(code);

    if (product) return console.error(`Error: Code "${product.code}" already exist`);

    ProductManager.#id++;

    const newProduct = {
      id: ProductManager.#id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);

    console.log(`Success: Code "${newProduct.code}" added`);
  }
}

//* Pruebas */

const productMng = new ProductManager();

console.log(productMng.getProducts());

productMng.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(productMng.getProducts());

productMng.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(productMng.getProducts());

const productById = productMng.getProductById(3);

console.log(productById);
