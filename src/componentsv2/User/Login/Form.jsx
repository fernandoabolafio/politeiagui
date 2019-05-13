import React from "react";
import { TextInput, Button } from "pi-ui";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormWrapper from "src/componentsv2/UI/FormWrapper";
import { useLogin } from "./hooks";

const loginValidationSchema = ({ minpasswordlength }) =>
  Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("required"),
    password: Yup.string()
      .min(minpasswordlength)
      .required("required")
  });

const LoginForm = () => {
  const { onLogin, policy } = useLogin();
  return (
    <FormWrapper
      initialValues={{
        email: "",
        password: ""
      }}
      loading={!policy}
      validationSchema={policy && loginValidationSchema(policy)}
      onSubmit={async (values, { resetForm, setSubmitting, setFieldError }) => {
        try {
          await onLogin(values);
          setSubmitting(false);
          resetForm();
        } catch (e) {
          setSubmitting(false);
          setFieldError("global", e);
        }
      }}
    >
      {({
        Form,
        Title,
        Actions,
        Footer,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        ErrorMessage,
        errors
      }) => (
        <Form onSubmit={handleSubmit}>
          <Title>Log in</Title>
          {errors && errors.global && <span>{errors.global.toString()}</span>}
          <TextInput
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="email" />
          <TextInput
            id="password"
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="password" />
          <Actions>
            <Link
              to="/user/request-reset-password"
              className="auth-form_buttons_link"
            >
              Reset Password
            </Link>
            <Button kind={isSubmitting ? "disabled" : "primary"} type="submit">
              Login
            </Button>
          </Actions>
          <Footer>
            <Link to="/privacypolicy">Privacy Policy</Link>
            <div>
              Don't have an account? <Link to="/user/signup">Create here!</Link>
            </div>
          </Footer>
        </Form>
      )}
    </FormWrapper>
  );
};

export default LoginForm;
