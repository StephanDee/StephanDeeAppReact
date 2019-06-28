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
      id: "",
      name: "",
      description: "",
      price: ""
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ modal: nextProps.modal });
  }

  async toggle() {
    console.log("i've been looking for freedom");
    await this.setState(prevState => ({
      modal: !prevState.modal
    }));

    this.props.handleToUpdate();
  }

  inputHandler(element) {
    let value = element.target.value;

    switch (element.target.id) {
      case "name": {
        this.setState({ name: value });
        break;
      }
      case "description": {
        this.setState({ description: value });
        break;
      }
      case "price": {
        this.setState({ price: value });
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
          <ModalHeader toggle={this.toggle}>Name</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                type="text"
                onChange={element => this.inputHandler(element)}
              />
              <Label for="description">Beschreibung</Label>
              <Input
                id="description"
                type="text"
                onChange={element => this.inputHandler(element)}
              />
              <Label for="price">Preis</Label>
              <Input
                id="price"
                type="number"
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
