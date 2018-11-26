import React from "react";
import {
  Button,
  Card,
  Elevation,
  H4,
  InputGroup,
  FormGroup,
  Tag
} from "@blueprintjs/core";
import * as yup from "yup";
import { withFormik } from "formik";
import { inject, observer } from "mobx-react";

const Login = ({ values, handleChange, handleSubmit, errors, touched }) => (
  <Card elevation={Elevation.ONE} style={{ width: "500px" }}>
    <H4>Login to your account</H4>
    <form onSubmit={handleSubmit}>
      <FormGroup label="Email" labelFor="email" labelInfo="(required)">
        <InputGroup
          leftIcon="envelope"
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {touched.email && errors.email && (
          <Tag intent="danger" minimal>
            {errors.email}
          </Tag>
        )}
      </FormGroup>
      <FormGroup label="Password" labelFor="password" labelInfo="(required)">
        <InputGroup
          leftIcon="key"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {touched.password && errors.password && (
          <Tag intent="danger" minimal>
            {errors.password}
          </Tag>
        )}
      </FormGroup>

      <Button type="submit">Submit</Button>
    </form>
  </Card>
);

const FormikLogin = withFormik({
  mapPropsToValues() {
    return {
      email: "",
      password: ""
    };
  },
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .min(8)
      .required()
  }),
  async handleSubmit(values, { props }) {
    await props.store.signin(values);
    props.routing.push("/");
  }
})(Login);
export default inject("store", "routing")(observer(FormikLogin));
