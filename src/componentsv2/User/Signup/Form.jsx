import React, { useState } from "react";
import { TextInput, Button } from "pi-ui";
import { Link } from "react-router-dom";
import ModalIdentityWarning from "src/componentsv2/UI/ModalIdentityWarning";
import FormWrapper from "src/componentsv2/UI/FormWrapper";
import { useSignup } from "./hooks";

const SignupForm = () => {
  const { onSignup, validationSchema } = useSignup();
  const [onModalConfirm, setOnModalConfirm] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => setModalOpen(false);
  console.log(onModalConfirm);
  const handleUserConfirm = (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => async () => {
    setModalOpen(false);
    try {
      await onSignup(values);
      setSubmitting(false);
      resetForm();
    } catch (e) {
      setSubmitting(false);
      setFieldError("global", e);
    }
  };

  return (
    <>
      <ModalIdentityWarning
        show={modalOpen}
        title={"Before you sign up"}
        confirmMessage="I understand, sign me up"
        onClose={handleCloseModal}
        onConfirm={onModalConfirm}
      />
      <FormWrapper
        initialValues={{
          email: "",
          username: "",
          password: "",
          verify_password: ""
        }}
        loading={!validationSchema}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          setModalOpen(true);
          setOnModalConfirm(handleUserConfirm(values, actions));
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
          errors,
          touched,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Title>Create a new account</Title>
            {errors && errors.global && <span>{errors.global.toString()}</span>}
            <TextInput
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
            <TextInput
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && errors.username}
            />
            <TextInput
              id="password"
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
            />
            <TextInput
              id="verify_password"
              label="Verify Password"
              type="password"
              name="verify_password"
              value={values.verify_password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.verify_password && errors.verify_password}
            />
            <Actions>
              <Link
                to="/user/resend-verification-email"
                className="auth-form_buttons_link"
              >
                Resend verification email
              </Link>
              <Button loading={isSubmitting}>Sign up</Button>
            </Actions>
            <Footer>
              <div style={{ flex: 1, textAlign: "right" }}>
                Already have an account? <Link to="/user/login">Log in!</Link>
              </div>
            </Footer>
          </Form>
        )}
      </FormWrapper>
    </>
  );
};

export default SignupForm;
