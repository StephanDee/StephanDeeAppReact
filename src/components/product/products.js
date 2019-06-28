import React from "react";
import API from "../../api/api";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  ListGroup,
  ListGroupItem,
  Label,
  Input,
  FormGroup
} from "reactstrap";
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
      modalItemIndex: 0
    };

    this.updateProduct = this.updateProduct.bind(this);
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

  toggleModal() {
    this.setState({ modal: true });
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
        this.setState({ products: tempProducts });

        tempNewProduct.name = "";
        tempNewProduct.description = "";
        tempNewProduct.price = "";
        this.setState({ newProduct: tempNewProduct });
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

        tempProducts.splice(index, 0);
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
    let productList = this.state.products.map(product => {
      return (
        <ListGroupItem key={product._id}>
          <Card>
            <CardTitle>{product.name}</CardTitle>
            <Button
              color="success"
              size="sm"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                this.toggleModal();
              }}
            >
              Editieren
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                this.removeProduct(product._id);
              }}
            >
              Löschen
            </Button>
            <CardBody>
              <CardSubtitle>Beschreibung</CardSubtitle>
              <CardText>{product.description}</CardText>
              <CardText>Preis: {product.price} €</CardText>
            </CardBody>
          </Card>
        </ListGroupItem>
      );
    });
    return (
      <div className="Products">
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={this.state.newProduct.name}
            onChange={element => this.inputHandler(element)}
          />
          <Label for="description">Beschreibung</Label>
          <Input
            id="description"
            type="text"
            value={this.state.newProduct.description}
            onChange={element => this.inputHandler(element)}
          />
          <Label for="price">Preis</Label>
          <Input
            id="price"
            type="number"
            value={this.state.newProduct.price}
            onChange={element => this.inputHandler(element)}
          />
        </FormGroup>
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
        <ListGroup>{productList}</ListGroup>
        <ProductModal modal={this.state.modal} />
      </div>
    );
  }
}

Products.defaultProps = {
  productsRoute: "/products/"
};
