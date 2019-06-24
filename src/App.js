import React from "react";
import "./App.scss";
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

function App() {
  return (
    <div className="App container">
      <h1>Produkt</h1>
      <ListGroup>
        <ListGroupItem>
          <Card>
            <CardTitle>Produkt Name</CardTitle>
            <Button>Editieren</Button>
            <Button>Löschen</Button>
            <CardBody>
              <CardSubtitle>Beschreibung</CardSubtitle>
              <CardText>
                Das ist die Produktbeschreibung des Produktes.
              </CardText>
              <CardText>Preis: 1 €</CardText>
            </CardBody>
          </Card>
        </ListGroupItem>
        <ListGroupItem>
          <Card>
            <CardTitle>Produkt Name 2</CardTitle>
            <Button>Editieren</Button>
            <Button>Löschen</Button>
            <CardBody>
              <CardSubtitle>Beschreibung</CardSubtitle>
              <CardText>
                Das ist die Produktbeschreibung des Produktes.
              </CardText>
              <CardText>Preis: 2 €</CardText>
            </CardBody>
          </Card>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

export default App;
