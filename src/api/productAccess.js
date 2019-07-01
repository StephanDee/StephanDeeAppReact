import API from "./api";

/**
 * Access to the products via REST API.
 */
export default class ProductAccess {
  /**
   * The constructor of ProductAccess.
   */
  constructor() {
    this.productsRoute = "/products/";
  }

  /**
   * Get all products.
   *
   *  @returns all products
   */
  getProducts() {
    return API.get(this.productsRoute);
  }

  /**
   * Post new product.
   *
   * @param name The name
   * @param price The price
   * @param description The description
   * @returns New product with generated id: _id, date and version: __v
   */
  createProduct(name, price, description) {
    let product = {
      name: name,
      description: description,
      price: price
    };
    return API.post(`${this.productsRoute}`, product);
  }

  /**
   * Updates the product.
   *
   * @param updatedProduct The updated product
   * @returns The updated product with new date and incremented version: __v
   */
  updateProduct(updatedProduct) {
    return API.put(`${this.productsRoute}${updatedProduct.id}`, updatedProduct);
  }

  /**
   * Removes a specific product.
   *
   * @param id the product ID
   */
  removeProduct(id) {
    API.delete(`${this.productsRoute}${id}`);
  }
}
