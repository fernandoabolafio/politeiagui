import React from "react";
import PropTypes from "prop-types";
import { H2, P } from "pi-ui";

const EmailSentMessage = ({ email = "example@gmail.com", title }) => (
    <>
      <H2>{title}</H2>
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

EmailSentMessage.propTypes = {
    email: PropTypes.string,
    title: PropTypes.string
};

export default EmailSentMessage;