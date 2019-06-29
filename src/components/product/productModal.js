import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormGroup
} from "reactstrap";

export default class ProductModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      name: "",
      product: {
        id: "",
        name: "",
        description: "",
        price: ""
      }
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modal: nextProps.modal,
      name: nextProps.modalProduct.name,
      product: nextProps.modalProduct
    });
  }

  async toggle() {
    console.log("i've been looking for freedom");
    await this.setState(prevState => ({
      modal: !prevState.modal
    }));

    this.props.afterModalClosed();
  }

  inputHandler(element) {
    let tempProduct = this.state.product;
    let value = element.target.value;

    switch (element.target.id) {
      case "name": {
        tempProduct.name = value;
        this.setState({ product: tempProduct });
        break;
      }
      case "description": {
        tempProduct.description = value;
        this.setState({ product: tempProduct });
        break;
      }
      case "price": {
        tempProduct.price = value;
        this.setState({ product: tempProduct });
        break;
      }
      default: {
        console.log("Das Inputfeld konnte nicht identifiziert werden.");
        break;
      }
    }
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{this.state.name}</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={this.state.product.name}
                onChange={element => this.inputHandler(element)}
              />
              <Label for="description">Beschreibung</Label>
              <Input
                id="description"
                type="text"
                value={this.state.product.description}
                onChange={element => this.inputHandler(element)}
              />
              <Label for="price">Preis</Label>
              <Input
                id="price"
                type="number"
                value={this.state.product.price}
                onChange={element => this.inputHandler(element)}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Speichern
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Abbrechen
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
