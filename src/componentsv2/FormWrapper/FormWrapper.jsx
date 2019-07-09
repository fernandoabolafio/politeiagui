import { Formik } from "formik";
import { classNames, H1, Message, Spinner } from "pi-ui";
import React from "react";
import Link from "../Link";
import styles from "./FormWrapper.module.css";

const Title = ({ className, ...props }) => (
  <H1 className={classNames(styles.title, className)} {...props} />
);

const Actions = ({ className, ...props }) => (
  <div className={classNames(props.children.length > 1 ? styles.actions : styles.singleAction, className)} {...props} />
);

const Footer = ({ className, ...props }) => (
  <div className={classNames(styles.footer, className)} {...props} />
);

const Form = ({ className, ...props }) => (
  <form className={classNames(styles.form, className)} {...props} />
);

const ErrorMessage = ({ ...props }) => <Message kind="error" {...props} />;

const Loader = ({ className, ...props }) => (
  <div className={classNames(styles.loader, className)} {...props}>
    <Spinner invert />
  </div>
);

const FormWrapper = ({ children, loading, ...props }) => {
  return loading ? (
    <Loader />
  ) : (
      <Formik {...props}>
        {props =>
          children({ ...props, Actions, Footer, Title, Form, ErrorMessage, Link })
        }
      </Formik>
    );
};

export default FormWrapper;