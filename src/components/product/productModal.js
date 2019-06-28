import React, { Component } from "react";

class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      id: "",
      name: "",
      description: "",
      price: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.id,
      name: nextProps.name,
      description: nextProps.description,
      price: nextProps.price
    });
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

  handleSave() {
    const item = this.state;
    this.props.saveModalDetails(item);
  }

  render() {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Jewel
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <span className="modal-lable">Name:</span>
                <input
                  value={this.state.name}
                  onChange={element => this.inputHandler(element)}
                />
              </p>
              <p>
                <span className="modal-lable">Beschreibung:</span>
                <input
                  value={this.state.description}
                  onChange={element => this.inputHandler(element)}
                />
              </p>
              <p>
                <span className="modal-lable">Preis:</span>
                <input
                  type="number"
                  value={this.state.price}
                  onChange={element => this.inputHandler(element)}
                />
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  this.handleSave();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductModal;
