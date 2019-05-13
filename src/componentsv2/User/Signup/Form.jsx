import React, { useState } from "react";
import { TextInput, Button } from "pi-ui";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import ModalIdentityWarning from "src/componentsv2/UI/ModalIdentityWarning";
import FormWrapper from "src/componentsv2/UI/FormWrapper";
import { useSignup } from "./hooks";

const buildUsernameRegex = supportedChars => {
  let regex = supportedChars.reduce((str, v) => str + v, "/[");
  regex += "]*/";
  console.log(regex);
  console.log(typeof regex);
  return regex;
};

const signupValidationSchema = ({
  minpasswordlength,
  minusernamelength,
  maxusernamelength,
  usernamesupportedchars
}) =>
  Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("required"),
    username: Yup.string()
      .matches(
        /^[a-z0-9.,:;-@+()_]*$/,
        {
          excludeEmptyString: true
        },
        { message: "invalid username" }
      )
      .min(minusernamelength)
      .max(maxusernamelength)
      .required("required"),
    password: Yup.string()
      .min(minpasswordlength)
      .required("required"),
    verify_password: Yup.string()
      .min(minpasswordlength)
      .required("required")
  });

const SignupForm = () => {
  const { policy, onSignup } = useSignup();
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
          password_verify: ""
        }}
        loading={!policy}
        validationSchema={policy && signupValidationSchema(policy)}
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
          Title,
          Actions,
          Footer,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          ErrorMessage,
          errors
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
            />
            <ErrorMessage name="email" />
            <TextInput
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="username" />
            <TextInput
              id="password"
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="usename" />
            <TextInput
              id="verify_password"
              label="Verify Password"
              type="password"
              name="verify_password"
              value={values.password_verify}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="verify_password" />
            <Actions>
              <Link
                to="/user/resend-verification-email"
                className="auth-form_buttons_link"
              >
                Resend verification email
              </Link>
              <Button>Sign up</Button>
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
