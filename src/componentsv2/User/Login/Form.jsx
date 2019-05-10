import React from "react";
import { TextInput, Button } from "pi-ui";
import { Link } from "react-router-dom";
import FormWrapper from "src/componentsv2/UI/FormWrapper";
import { useLogin } from "./hooks";

const LoginForm = ( ) => {
  const { onLogin, loading, error } = useLogin();
  return (
    <FormWrapper
      initialValues={{
        email: "",
        password: ""
      }}
      onSubmit={(values) => {
        onLogin(values);
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
        handleSubmit
      }) => (
        <Form onSubmit={handleSubmit}>
          <Title>Log in</Title>
          <TextInput
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextInput
            id="password"
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Actions>
            <Link
              to="/user/request-reset-password"
              className="auth-form_buttons_link"
            >
              Reset Password
            </Link>
            <Button kind={loading? "disabled" : "primary"} type="submit">Login</Button>
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
