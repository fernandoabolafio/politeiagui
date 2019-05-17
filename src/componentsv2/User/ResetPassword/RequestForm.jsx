import React, { useState } from "react";
import { TextInput, Button } from "pi-ui";
import FormWrapper from "src/componentsv2/UI/FormWrapper";
import EmailSentMessage from "src/componentsv2/UI/EmailSentMessage";
import { useRequestResetPassword } from "./hooks";

const RequestForm = () => {
  const {
    validationSchema,
    onRequestResetPassword
  } = useRequestResetPassword();
  const [email, setEmail] = useState(false);
  const success = !!email;
  return (
    <FormWrapper
      initialValues={{
        email: ""
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          await onRequestResetPassword(values);
          setSubmitting(false);
          setEmail(values.email);
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
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
            <Actions>
              <Button type="submit">Reset Password</Button>
            </Actions>
          </Form>
        ) : (
          <EmailSentMessage
            email={email}
            title={"Please check your mailbox to reset your password"}
          />
        )
      }
    </FormWrapper>
  );
};

export default RequestForm;
