import React, { useState } from "react";
import { TextInput, Button, H1, H2, P } from "pi-ui";

const SuccessContent = () => (
  <>
    <H2>Password reset completed</H2>
    <P style={{ marginTop: "2rem", marginBottom: 0 }}>
      Your password has been changed. You can now login with your new password.
    </P>
  </>
);

const RequestReset = ({ FormWrapper }) => {
  const [success, setSuccess] = useState(false);
  return (
    <FormWrapper
      initialValues={{
        password: "",
        password_verify: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
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
              id="password"
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextInput
              id="verify_password"
              label="Confirm Password"
              type="password"
              name="verify_password"
              value={values.password_verify}
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

export default RequestReset;
