import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { CSVDownload, CSVLink } from "react-csv";

import {
  Button,
  Card,
  Elevation,
  H4,
  Icon,
  Label,
  Text,
  UL
} from "@blueprintjs/core";

class DisplayResponses extends Component {
  state = {
    question: null
  };

  async componentDidMount() {
    await this.fetchResponses();
  }
  fetchResponses = async () => {
    const { id } = this.props.match.params;
    const response = await this.props.store.getQuestion({ questionID: id });
    console.log({ response });
    if (response) {
      this.setState(response);
    }
  };

  render() {
    const { id } = this.props.match.params;
    return (
      <Card elevation={Elevation.ONE} style={{ width: "800px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <H4>
            Responses
            {this.state.question !== null
              ? ` - ${this.state.question.query}`
              : null}
          </H4>
          <div style={{ width: "50px" }}>
            <Icon
              icon="refresh"
              intent="primary"
              onClick={this.fetchResponses}
              style={{ margin: "0px 5px" }}
            />
            <CSVLink
              data={this.state.question ? this.state.question.responses : []}
              separator={";"}
            >
              <Icon icon="download" />
            </CSVLink>
          </div>
        </div>
        {this.state.question && this.state.question.responses.length !== 0 ? (
          <UL style={{ margin: "0px", padding: "0px" }}>
            {this.state.question.responses.map(({ id, response }) => (
              <li
                style={{
                  listStyle: "none",
                  margin: "5px 0px",
                  padding: "0px"
                }}
                key={id}
              >
                <div style={{ margin: "0 5px" }}>{response}</div>
                <hr />
              </li>
            ))}
          </UL>
        ) : (
          <div>No responses currently</div>
        )}
      </Card>
    );
  }
}

export default inject("store")(observer(DisplayResponses));
