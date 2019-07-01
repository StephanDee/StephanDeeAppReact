import React from "react";
import API from "../../api/api";
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

/**
 * Handles the products.
 */
export default class Products extends React.Component {
  /**
   * Constructor of products.
   *
   * @param props productsRoute
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

    this.updateProductAndCloseModal = this.updateProductAndCloseModal.bind(
      this
    );
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * After the view has initialized.
   */
  componentDidMount() {
    API.get(`${this.props.productsRoute}`).then(res => {
      this.setState({ products: res.data });
    });
  }

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

  async updateProductAndCloseModal() {
    await this.updateProduct(this.state.modalProduct);
    await this.resetModalProduct();
    this.closeModal();
  }

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

  closeModal() {
    this.setState({
      modal: false
    });
  }

  async createProduct(name, price, description) {
    if (name && price) {
      let product = {
        name: name,
        description: description,
        price: price
      };
      await API.post(`${this.props.productsRoute}`, product).then(res => {
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

  async updateProduct(updatedProduct) {
    await API.put(
      `${this.props.productsRoute}${updatedProduct.id}`,
      updatedProduct
    ).then(res => {
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

  async removeProduct(id) {
    await API.delete(`${this.props.productsRoute}${id}`);
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

Products.defaultProps = {
  productsRoute: "/products/"
};
