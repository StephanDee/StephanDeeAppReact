import React from "react";
import "./App.scss";
import Products from './components/product/products' ;

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
    this.state = {
      // something
    };
  }

  /**
   * After the Component output has been rendered to the DOM.
   */
  componentDidMount() {}

  /**
   * After the component is being removed from the DOM.
   */
  componentWillUnmount() {}

  render() {
    return (
      <div className="App container">
        <h1>Produkt</h1>
        <Products />
      </div>
    );
  }
}

/**
 * Define default props.
 */
App.defaultProps = {
  name: "test"
};

export default App;
