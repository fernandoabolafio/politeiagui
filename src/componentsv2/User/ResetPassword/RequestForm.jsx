import React, { useState } from "react";
import { TextInput, Button } from "pi-ui";
import FormWrapper from "src/componentsv2/UI/FormWrapper";
import EmailSentMessage from "src/componentsv2/UI/EmailSentMessage";

const RequestForm = () => {
  const [success, setSuccess] = useState(false);
  return (
    <FormWrapper
      initialValues={{
        email: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
          setSuccess(true);
        }, 500);
      }}
    >
      {({
        Form,
        Title,
        Actions,
        values,
        handleChange,
        handleBlur,
        handleSubmit
      }) =>
        !success ? (
          <Form onSubmit={handleSubmit}>
            <Title>Reset Password</Title>
            <TextInput
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Actions>
              <Button type="submit">Reset Password</Button>
            </Actions>
          </Form>
        ) : (
          <EmailSentMessage
            title={"Please check your mailbox to reset your password"}
          />
        )
      }
    </FormWrapper>
  );
};

export default RequestForm;
