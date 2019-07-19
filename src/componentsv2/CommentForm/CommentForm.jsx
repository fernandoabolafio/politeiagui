import React from "react";
import { Formik } from "formik";
import { Button, Message } from "pi-ui";
import { Row } from "../layout";
import MarkdownEditor from "src/componentsv2/MarkdownEditor";
import validationSchema from "./validation";

const CommentForm = ({ onSubmit, onCommentSubmitted }) => {
  async function handleSubmit(
    values,
    { resetForm, setSubmitting, setFieldError }
  ) {
    try {
      await onSubmit(values.comment);
      setSubmitting(false);
      resetForm();
      onCommentSubmitted && onCommentSubmitted();
    } catch (e) {
      setSubmitting(false);
      setFieldError("global", e);
    }
  }
  return (
    <Formik
      initialValues={{
        comment: ""
      }}
      loading={!validationSchema}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {props => {
        const {
          values,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          errors,
          isValid
        } = props;
        function handleCommentChange(v) {
          setFieldValue("comment", v);
        }
        return (
          <form onSubmit={handleSubmit}>
            {errors && errors.global && (
              <Message kind="error">{errors.global.toString()}</Message>
            )}
            <MarkdownEditor
              name="comment"
              className="margin-top-s"
              value={values.comment}
              onChange={handleCommentChange}
              onBlur={handleBlur}
              placeholder={"Write a comment"}
            />
            <Row justify="right" topMarginSize="s">
              <Button
                type="submit"
                kind={!isValid ? "disabled" : "primary"}
                loading={isSubmitting}
              >
                Add comment
              </Button>
            </Row>
          </form>
        );
      }}
    </Formik>
  );
};

export default CommentForm;
