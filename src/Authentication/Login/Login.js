import React from "react";
import { TextInput, Button, H1 } from "pi-ui";
import { Link } from "react-router-dom";

const Login = ({ FormWrapper }) => {
  return (
    <FormWrapper
      initialValues={{
        email: "",
        password: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("got here");
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      {({
        Form,
        Actions,
        Footer,
        values,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <Form onSubmit={handleSubmit}>
          <H1>Log in</H1>
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
          />
          <Actions>
            <Link
              to="/request-reset-password"
              className="auth-form_buttons_link"
            >
              Reset Password
            </Link>
            <Button type="submit">Login</Button>
          </Actions>
          <Footer>
            <Link to="/privacypolicy">Privacy Policy</Link>
            <div>
              Don't have an account? <Link to="/signup">Create here!</Link>
            </div>
          </Footer>
        </Form>
      )}
    </FormWrapper>
  );
};

export default Login;
