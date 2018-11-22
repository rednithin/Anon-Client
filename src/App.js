import React, { Component } from "react";
import { inject, observer } from "mobx-react";

class App extends Component {
  render() {
    return <div className="App">Bare bones</div>;
  }
}

export default inject("store", "routing")(observer(App));
