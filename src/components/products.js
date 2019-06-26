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
  ListGroupItem
} from "reactstrap";

export default class Products extends React.Component {
  state = {
    products: []
  };

  componentDidMount() {
    API.get("/products").then(res => {
      const products = res.data;
      this.setState({ products });
    });
  }

  render() {
    let productList = this.state.products.map((product) => {
      return (
        <ListGroupItem key={product._id}>
          <Card>
            <CardTitle>{product.name}</CardTitle>
            <Button color="success" size="sm">
              Editieren
            </Button>
            <Button color="danger" size="sm">
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
    return <ListGroup>{productList}</ListGroup>;
  }
}
