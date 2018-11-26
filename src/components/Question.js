import React from "react";
import {
  Button,
  Card,
  Elevation,
  H4,
  TextArea,
  FormGroup,
  Switch,
  Tag
} from "@blueprintjs/core";
import * as yup from "yup";

import { withFormik } from "formik";
import { inject, observer } from "mobx-react";

const Register = ({ values, handleChange, handleSubmit, errors, touched }) => (
  <Card elevation={Elevation.ONE} style={{ width: "500px" }}>
    <H4>Ask a Question?</H4>
    <form onSubmit={handleSubmit}>
      <FormGroup label="Query" labelFor="query" labelInfo="(required)">
        <TextArea
          id="query"
          name="query"
          placeholder="Query"
          fill
          rows="5"
          value={values.query}
          onChange={handleChange}
        />
        {touched.query && errors.query && (
          <Tag intent="danger" minimal>
            {errors.query}
          </Tag>
        )}
      </FormGroup>
      <FormGroup
        label="Should responses be public?"
        labelFor="isPublic"
        labelInfo="(required)"
      >
        <Switch
          id="isPublic"
          name="isPublic"
          checked={values.isPublic}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </form>
  </Card>
);

const FormikRegister = withFormik({
  mapPropsToValues() {
    return {
      query: "",
      isPublic: true
    };
  },
  validationSchema: yup.object().shape({
    query: yup
      .string()
      .min(20)
      .required(),
    isPublic: yup.boolean().required()
  }),
  async handleSubmit(values, { props }) {
    console.log(values);
    await props.store.addQuestion(values);
  }
})(Register);
export default inject("store")(observer(FormikRegister));
