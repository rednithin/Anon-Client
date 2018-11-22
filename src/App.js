import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button } from "@blueprintjs/core";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Button icon="refresh"> Click me</Button>
        </div>
      </div>
    );
  }
}

export default inject("store", "routing")(observer(App));
