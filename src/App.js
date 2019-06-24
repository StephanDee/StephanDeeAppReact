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

/**
 * The App.
 */
class App extends React.Component {
  
  /**
   * Constructor of the App.
   *
   * @param props Has the attributes of the app tag
   */
  constructor(props) {
    super(props);
  }

  /**
   * After the Component output has been rendered to the DOM.
   */
  componentDidMount() {

  }

  /**
   * After the component is being removed from the DOM.
   */
  componentWillUnmount() {

  };

  render() {
    return (
      <div className="App container">
        <h1>Produkt - {this.props.name}</h1>
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
}

/**
 * Define default props.
 */
App.defaultProps = {
  name: "test"
}

export default App;
