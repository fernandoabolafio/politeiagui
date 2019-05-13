import React from "react";
import { H1 } from "pi-ui";
import { Formik, ErrorMessage } from "formik";
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
