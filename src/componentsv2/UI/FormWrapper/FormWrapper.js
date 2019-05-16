import React from "react";
import { H1, Message } from "pi-ui";
import { Formik } from "formik";
import "./styles.css";

const Title = ({ children, ...props }) => (
  <H1 className="auth-form_title" {...props}>
    {children}
  </H1>
);

const Actions = ({ children, ...props }) => (
  <div className="auth-form_buttons" {...props}>
    {children}
  </div>
);
const Footer = ({ children, ...props }) => (
  <div className="auth-form_footer" {...props}>
    {children}
  </div>
);

const Form = ({ children, ...props }) => (
  <form className="auth-form" {...props}>
    {children}
  </form>
);

const ErrorMessage = ({ children, ...props }) => (
  <Message kind="error" {...props}>
    {children}
  </Message>
);

const FormWrapper = ({ children, loading, ...props }) => {
  return loading ? (
    <span>Loading...</span>
  ) : (
    <Formik {...props}>
      {props =>
        children({ ...props, Actions, Footer, Title, Form, ErrorMessage })
      }
    </Formik>
  );
};

export default FormWrapper;
