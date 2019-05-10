import React, { useState } from "react";
import { TextInput, Button, H1 } from "pi-ui";
import FormWrapper from "src/componentsv2/UI/FormWrapper";
import EmailSentMessage from "src/componentsv2/UI/EmailSentMessage";
import ModalIdentityWarning from "src/componentsv2/UI/ModalIdentityWarning";

const RequestVerificationEmailForm = () => {
  const [success, setSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => setModalOpen(false);
  const handleUserConfirm = () => {
    setModalOpen(false);
    setSuccess(true);
    // keep the submission process here
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
        email: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("got here");
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
          setModalOpen(true);
        }, 500);
      }}
    >
      {({ Form, Actions, values, handleChange, handleBlur, handleSubmit }) =>
        !success ? (
          <Form onSubmit={handleSubmit}>
            <H1>Resend Verification Email</H1>
            <TextInput
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Actions>
              <Button type="submit">Resend</Button>
            </Actions>
          </Form>
        ) : (
          <EmailSentMessage title="Please check your inbox for your verification email" />
        )
      }
    </FormWrapper>
    </>
  );
};

export default RequestVerificationEmailForm;
