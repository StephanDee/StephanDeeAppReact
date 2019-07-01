import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Label,
  Input,
  FormGroup
} from "reactstrap";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import ProductModal from "./productModal";
import ProductAccess from "../../api/productAccess";

/**
 * Handles the products.
 */
export default class Products extends React.Component {
  /**
   * Constructor of products.
   *
   * @param props The properties of products
   */
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      newProduct: {
        name: "",
        description: "",
        price: ""
      },
      modal: false,
      modalProduct: {
        id: "",
        name: "",
        description: "",
        price: ""
      }
    };

    // get access to the CRUD methods for products
    this.productAccess = new ProductAccess();

    // bind functions to access those via the Child Component productModal
    this.updateProductAndCloseModal = this.updateProductAndCloseModal.bind(
      this
    );
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * After the view has initialized.
   */
  componentDidMount() {
    this.productAccess.getProducts().then(res => {
      this.setState({ products: res.data });
    });
  }

  /**
   * Handles all inputs.
   *
   * @param element the input element
   */
  inputHandler(element) {
    let tempNewProduct = this.state.newProduct;
    const value = element.target.value;

    switch (element.target.id) {
      case "name": {
        tempNewProduct.name = value;
        this.setState({ newProduct: tempNewProduct });
        break;
      }
      case "description": {
        tempNewProduct.description = value;
        this.setState({ newProduct: tempNewProduct });
        break;
      }
      case "price": {
        tempNewProduct.price = value;
        this.setState({ newProduct: tempNewProduct });
        break;
      }
      default: {
        console.log("Das Inputfeld konnte nicht identifiziert werden.");
        break;
      }
    }
  }

  /**
   * Opens the Modal via setState modal: true.
   * Set props via modalProduct to send those to the Child Component productModal.
   *
   * @param id The product ID
   * @param name The product name
   * @param description The product description, optional
   * @param price The product price
   */
  toggleModal(id, name, description, price) {
    let tempModalProduct = this.state.modalProduct;

    tempModalProduct.id = id;
    tempModalProduct.name = name;
    tempModalProduct.description = description;
    tempModalProduct.price = price;

    this.setState({
      modal: true,
      modalProduct: tempModalProduct
    });
  }

  /**
   * Updates the updated product, resets the state of modalProduct and closes the modal.
   */
  async updateProductAndCloseModal() {
    await this.updateProduct(this.state.modalProduct);
    this.closeModal();
  }

  /**
   * Resets the state of modalProduct.
   */
  resetModalProduct() {
    let tempModalProduct = this.state.modalProduct;
    tempModalProduct.id = "";
    tempModalProduct.name = "";
    tempModalProduct.description = "";
    tempModalProduct.price = "";

    this.setState({
      modalProduct: tempModalProduct
    });
  }

  /**
   * Close modal via state modal: false and resets the state of modalProduct.
   */
  async closeModal() {
    await this.resetModalProduct();
    this.setState({
      modal: false
    });
  }

  /**
   * Creates a new product and pushes it to the products list.
   *
   * @param name The product name
   * @param price The product price
   * @param description The product description, optional
   */
  async createProduct(name, price, description) {
    if (name && price) {
      await this.productAccess
        .createProduct(name, price, description)
        .then(res => {
          let tempProducts = this.state.products;
          let tempNewProduct = this.state.newProduct;

          tempProducts.push(res.data);
          tempNewProduct.name = "";
          tempNewProduct.description = "";
          tempNewProduct.price = "";
          this.setState({
            products: tempProducts,
            newProduct: tempNewProduct
          });
        });
    } else {
      console.log("Name oder Preis fehlt.");
    }
  }

  /**
   * Updates the product, replaces the old product with the new product in the list.
   *
   * @param updatedProduct The updated product
   */
  async updateProduct(updatedProduct) {
    await this.productAccess.updateProduct(updatedProduct).then(res => {
      let index = this.state.products.findIndex(
        product => product._id === updatedProduct.id
      );

      if (index > -1) {
        let tempProducts = this.state.products;

        tempProducts.splice(index, 1, res.data);
        this.setState({ products: tempProducts });
      } else {
        console.log("Produkt existiert nicht.");
      }
    });
  }

  /**
   * Removes a product the specified ID.
   *
   * @param id The product ID
   */
  async removeProduct(id) {
    await this.productAccess.removeProduct(id);
    let index = this.state.products.findIndex(product => product._id === id);

    if (index > -1) {
      let tempProducts = this.state.products;

      tempProducts.splice(index, 1);
      this.setState({ products: tempProducts });
    } else {
      console.log("Produkt existiert nicht.");
    }
  }

  render() {
    let closeModal = this.closeModal;
    let updateProductAndCloseModal = this.updateProductAndCloseModal;
    let productList = this.state.products.map(product => {
      return (
        <Card key={product._id} className="padding_1 margin_top_bottom_1">
          <div className="content_space_between">
            <CardTitle>{product.name}</CardTitle>
            <div className="content_flex_end">
              <div className="margin_right_1">
                <Fab
                  color="primary"
                  size="small"
                  onClick={() => {
                    this.toggleModal(
                      product._id,
                      product.name,
                      product.description,
                      product.price
                    );
                  }}
                >
                  <Icon>edit</Icon>
                </Fab>
              </div>
              <Fab
                color="secondary"
                size="small"
                onClick={() => {
                  this.removeProduct(product._id);
                }}
              >
                <Icon>delete</Icon>
              </Fab>
            </div>
          </div>
          <CardBody>
            <CardSubtitle>Beschreibung</CardSubtitle>
            <CardText>{product.description}</CardText>
            <CardText className="content_flex_end">
              Preis: {product.price} €
            </CardText>
          </CardBody>
        </Card>
      );
    });
    return (
      <div className="Products">
        <Card className="padding_1 margin_top_bottom_1">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              type="text"
              required
              value={this.state.newProduct.name}
              maxLength="30"
              onChange={element => this.inputHandler(element)}
            />
            <p>{this.state.newProduct.name.length} / 30</p>
            <Label for="description">Beschreibung</Label>
            <Input
              id="description"
              type="textarea"
              value={this.state.newProduct.description}
              maxLength="255"
              rows="4"
              onChange={element => this.inputHandler(element)}
            />
            <p>{this.state.newProduct.description.length} / 255</p>
            <Label for="price">Preis</Label>
            <Input
              id="price"
              type="number"
              required
              value={this.state.newProduct.price}
              onChange={element => this.inputHandler(element)}
            />
          </FormGroup>
          <div className="content_flex_end">
            <Button
              color="success"
              size="sm"
              onClick={() => {
                this.createProduct(
                  this.state.newProduct.name,
                  this.state.newProduct.price,
                  this.state.newProduct.description
                );
              }}
            >
              Produkt hinzufügen
            </Button>
          </div>
        </Card>
        {productList}
        <ProductModal
          modal={this.state.modal}
          modalProduct={this.state.modalProduct}
          closeModal={() => closeModal()}
          updateProductAndCloseModal={() => updateProductAndCloseModal()}
        />
      </div>
    );
  }
}
