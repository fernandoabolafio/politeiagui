import React, { useState } from "react";
import { TextInput, Button } from "pi-ui";
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
          setTimeout(() => {
            setSubmitting(false);
            setModalOpen(true);
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
              <Title>Resend Verification Email</Title>
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
