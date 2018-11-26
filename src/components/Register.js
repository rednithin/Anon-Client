import React from "react";
import {
  Button,
  Card,
  Elevation,
  H4,
  InputGroup,
  FormGroup,
  TextArea,
  Tag
} from "@blueprintjs/core";
import * as yup from "yup";

import { withFormik } from "formik";
import { inject, observer } from "mobx-react";

const Register = ({ values, handleChange, handleSubmit, errors, touched }) => (
  <Card elevation={Elevation.ONE} style={{ width: "500px" }}>
    <H4>Create a new account</H4>
    <form onSubmit={handleSubmit}>
      <FormGroup label="Name" labelFor="name" labelInfo="(required)">
        <InputGroup
          leftIcon="people"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {touched.name && errors.name && (
          <Tag intent="danger" minimal>
            {errors.name}
          </Tag>
        )}
      </FormGroup>
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
      <FormGroup
        label="Description"
        labelFor="description"
        labelInfo="(required)"
      >
        <TextArea
          id="description"
          name="description"
          placeholder="Description"
          fill
          rows="5"
          value={values.description}
          onChange={handleChange}
        />
        {touched.description && errors.description && (
          <Tag intent="danger" minimal>
            {errors.description}
          </Tag>
        )}
      </FormGroup>
      <Button type="submit">Submit</Button>
    </form>
  </Card>
);

const FormikRegister = withFormik({
  mapPropsToValues() {
    return {
      name: "",
      email: "",
      password: "",
      description: ""
    };
  },
  validationSchema: yup.object().shape({
    name: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .min(8)
      .required(),
    description: yup
      .string()
      .min(20)
      .required()
  }),
  async handleSubmit(values, { props }) {
    console.log(values);
    await props.store.signup(values);
    props.routing.push("/");
  }
})(Register);
export default inject("store", "routing")(observer(FormikRegister));
