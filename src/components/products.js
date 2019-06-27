import React from "react";
import API from "../api/api";
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
      }
    };
  }

  /**
   * After the view has initialized.
   */
  componentDidMount() {
    API.get(`${this.props.productsRoute}`).then(res => {
      const products = res.data;
      this.setState({ products });
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
        let { products } = this.state;
        let { newProduct } = this.state;

        products.push(res.data);
        this.setState({ products });

        newProduct.name = "";
        newProduct.description = "";
        newProduct.price = "";
        this.setState({ newProduct });
      });
    } else {
      console.log("Name oder Preis fehlt.");
    }
  }

  async updateProduct(id) {
    let product = {
      name: "test 2",
      description: "test 2",
      price: "3"
    };
    await API.put(`${this.props.productsRoute}${id}`, product).then(res => {
      console.log(res);
      let index = this.state.products.findIndex(product => product._id === id);
      if (index > -1) {
        this.state.products.splice(index, 0);
      } else {
        console.log("Produkt existiert nicht.");
      }
    });
  }

  async removeProduct(id) {
    await API.delete(`${this.props.productsRoute}${id}`);
    let index = this.state.products.findIndex(product => product._id === id);
    if (index > -1) {
      let { products } = this.state;
      products.splice(index, 1);
      this.setState({ products });
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
            <Button color="success" size="sm">
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
            onChange={element => {
              let { newProduct } = this.state;
              newProduct.name = element.target.value;
              this.setState({ newProduct });
            }}
          />
          <Label for="description">Beschreibung</Label>
          <Input
            id="description"
            type="text"
            value={this.state.newProduct.description}
            onChange={element => {
              let { newProduct } = this.state;
              newProduct.description = element.target.value;
              this.setState({ newProduct });
            }}
          />
          <Label for="price">Preis</Label>
          <Input
            id="price"
            type="number"
            value={this.state.newProduct.price}
            onChange={element => {
              let { newProduct } = this.state;
              newProduct.price = element.target.value;
              this.setState({ newProduct });
            }}
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
      </div>
    );
  }
}

Products.defaultProps = {
  productsRoute: "/products/"
};
