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

/**
 * The modal to update products.
 */
export default class ProductModal extends React.Component {
  /**
   * The constructor of ProductModal.
   *
   * @param props Product properties
   */
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

  /**
   * Will receive the specific props/product data and set those to be the default values to be updated.
   *
   * @param nextProps The next props aka the product attributes to be updated
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      modal: nextProps.modal,
      name: nextProps.modalProduct.name,
      product: nextProps.modalProduct
    });
  }

  /**
   * Closes the modal without any changes.
   */
  toggle() {
    this.props.closeModal();
  }

  /**
   * Saves the update when name and price exists.
   *
   * @param name the product name
   * @param price The product price
   */
  onSaveButtonClicked(name, price) {
    if (name && price) {
      this.props.updateProductAndCloseModal();
    } else {
      console.log("Name oder Preis fehlt.");
    }
  }

  /**
   * Handles all inputs.
   *
   * @param element the input element
   */
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
                required
                maxLength="30"
                value={this.state.product.name}
                onChange={element => this.inputHandler(element)}
              />
              <p>{this.state.product.name.length} / 30</p>
              <Label for="description">Beschreibung</Label>
              <Input
                id="description"
                type="textarea"
                maxLength="255"
                rows="4"
                value={this.state.product.description}
                onChange={element => this.inputHandler(element)}
              />
              <p>{this.state.product.description.length} / 255</p>
              <Label for="price">Preis</Label>
              <Input
                id="price"
                type="number"
                required
                value={this.state.product.price}
                onChange={element => this.inputHandler(element)}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() =>
                this.onSaveButtonClicked(
                  this.state.product.name,
                  this.state.product.price
                )
              }
            >
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
