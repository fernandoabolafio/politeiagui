import React, { useState } from "react";
import { TextInput, Button, H1, H2, P } from "pi-ui";
import FormWrapper from "src/componentsv2/UI/FormWrapper";

const SuccessContent = ({ email = "example@gmail.com" }) => (
  <>
    <H2>Please check your mailbox to reset your password</H2>
    <P style={{ marginTop: "2rem", marginBottom: 0 }}>
      Note that, for privacy reasons, Politeia does not disclose whether an
      email address has already been registered. If you don’t receive an email:
    </P>
    <ul style={{ padding: "1rem 0" }}>
      <li>{`Check that ${email} is the correct address.`}</li>
      <li>Check your spam folder!</li>
    </ul>
    <P>
      If you’re sure you should have received an email, join the #support
      channel on our Slack to get assistance from Politeia administrators.
    </P>
  </>
);

const RequestForm = () => {
  const [success, setSuccess] = useState(false);
  return (
    <FormWrapper
      initialValues={{
        email: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("got here");
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
          setSuccess(true);
        }, 500);
      }}
    >
      {({ Form, Actions, values, handleChange, handleBlur, handleSubmit }) =>
        !success ? (
          <Form onSubmit={handleSubmit}>
            <H1>Reset Password</H1>
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
          <SuccessContent />
        )
      }
    </FormWrapper>
  );
};

export default RequestForm;
