import React, { useState } from "react";
import { TextInput, Button, H1 } from "pi-ui";
import { Link } from "react-router-dom";
import ModalIdentityWarning from "src/componentsv2/UI/ModalIdentityWarning";
import FormWrapper from "src/componentsv2/UI/FormWrapper";
// import { useSignup } from "./hooks";

const SignupForm = () => {
  // const values = useSignup({});
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => setModalOpen(false);
  const handleUserConfirm = () => {
    setModalOpen(false);
    // keep signup process here
  };

  return (
    <>
      <ModalIdentityWarning
        show={modalOpen}
        title={"Before you sign up"}
        confirmMessage="I understand, sign me up"
        onClose={handleCloseModal}
        onConfirm={handleUserConfirm}
      />
      <FormWrapper
        initialValues={{
          email: "",
          username: "",
          password: "",
          password_verify: "",
          verificationtoken: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setModalOpen(true);
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
            <H1>Create a new account</H1>
            <TextInput
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextInput
              label="Username"
              name="username"
              value={values.username}
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
            <TextInput
              id="verify_password"
              label="Verify Password"
              type="password"
              name="verify_password"
              value={values.password_verify}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Actions>
              <Link to="/user/resend-verification-email" className="auth-form_buttons_link">
                Resend verification email
              </Link>
              <Button>Sign up</Button>
            </Actions>
            <Footer>
              <div style={{ flex: 1, textAlign: "right" }}>
                Already have an account? <Link to="/login">Log in!</Link>
              </div>
            </Footer>
          </Form>
        )}
      </FormWrapper>
    </>
  );
};

export default SignupForm;
