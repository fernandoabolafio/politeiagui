import React, { useState } from "react";
import { TextInput, Button, H2, P } from "pi-ui";
import FormWrapper from "src/componentsv2/UI/FormWrapper";
import { useResetPassword } from "./hooks";
import { Message } from "pi-ui";

const SuccessContent = () => (
  <>
    <H2>Password reset completed</H2>
    <P style={{ marginTop: "2rem", marginBottom: 0 }}>
      Your password has been changed. You can now login with your new password.
    </P>
  </>
);

const ResetForm = () => {
  const [success, setSuccess] = useState(false);
  const {
    onResetPassword,
    validationSchema,
    initialValues,
    invalidParamsError
  } = useResetPassword();

  if (invalidParamsError) {
    return <Message kind="error">{invalidParamsError}</Message>;
  }

  return (
    <FormWrapper
      initialValues={initialValues}
      validationSchema={validationSchema}
      loading={!validationSchema}
      onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
        try {
          await onResetPassword(values);
          setSubmitting(false);
          setSuccess(true);
          resetForm();
        } catch (e) {
          setFieldError("global", e);
        }
      }}
    >
      {({
        Form,
        Title,
        Actions,
        ErrorMessage,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched
      }) =>
        !success ? (
          <Form onSubmit={handleSubmit}>
            <Title>Reset Password</Title>
            {errors && errors.global && (
              <ErrorMessage>{errors.global.toString()}</ErrorMessage>
            )}
            <TextInput
              id="password"
              label="Password"
              type="password"
              name="password"
              value={values.newpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.newpassword && errors.newpassword}
            />
            <TextInput
              id="verify_password"
              label="Confirm Password"
              type="password"
              name="verify_password"
              value={values.verify_password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.verify_password && errors.verify_password}
            />
            <Actions>
              <Button type="submit">Reset Password</Button>
            </Actions>
          </Form>
        ) : (
          <SuccessContent />
        )
      }
    </FormWrapper>
  );
};

export default ResetForm;
