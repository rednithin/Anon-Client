import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Elevation,
  H4,
  Icon,
  FormGroup,
  TextArea,
  Tag,
  UL
} from "@blueprintjs/core";
import { withFormik } from "formik";
import * as yup from "yup";
class GiveResponse extends Component {
  state = {
    question: null
  };

  async componentDidMount() {
    await this.fetchResponses();
  }
  fetchResponses = async () => {
    const { id } = this.props.match.params;
    // this.setState(await this.props.store.getQuestion({ questionID: id }));

    const response = await this.props.store.getQuestion({ questionID: id });
    if (response) {
      console.log({ response });
      this.setState(response);
    }
  };

  render() {
    const { handleSubmit, values, handleChange, touched, errors } = this.props;
    if (this.state.question !== null) {
      return (
        <div>
          <Card
            elevation={Elevation.ONE}
            style={{ width: "500px", margin: "5px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <H4>Respond to - {this.state.question.query}</H4>

              {this.state.question && this.state.question.isPublic ? (
                <Icon icon="refresh" onClick={this.fetchResponses} />
              ) : null}
            </div>

            <form onSubmit={handleSubmit}>
              <FormGroup
                label="Response"
                labelFor="response"
                labelInfo="(required)"
              >
                <TextArea
                  id="response"
                  name="response"
                  placeholder="Response"
                  fill
                  rows="5"
                  value={values.response}
                  onChange={handleChange}
                />
                {touched.response && errors.response && (
                  <Tag intent="danger" minimal>
                    {errors.response}
                  </Tag>
                )}
              </FormGroup>
              <Button type="submit">Submit</Button>
            </form>
          </Card>
          {this.state.question.responses.length !== 0 ? (
            <Card
              elevation={Elevation.ONE}
              style={{ width: "500px", margin: "5px" }}
            >
              <H4>Responses</H4>
              {this.state.question &&
              this.state.question.responses.length !== 0 ? (
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
          ) : null}
        </div>
      );
    } else {
      return <Card>Question...</Card>;
    }
  }
}

const FormikGiveResonse = withFormik({
  mapPropsToValues({ match }) {
    return {
      questionID: match.params.id,
      response: ""
    };
  },
  validationSchema: yup.object().shape({
    response: yup
      .string()
      .min(10)
      .required()
  }),
  async handleSubmit(values, { props }) {
    await props.store.addResponse(values);
  }
})(GiveResponse);

export default inject("store")(observer(FormikGiveResonse));
