import React from "react";
import { Link } from "react-router-dom";
import { H2 } from "pi-ui";
import PageWithSingleContent from "src/componentsv2/UI/PageWithSingleContent";

const PageUserPrivacyPolicy = () => (
  <PageWithSingleContent>
    <H2 style={{ marginBottom: "1.7rem" }}>Privacy Policy</H2>
    <ul>
      <li>
        The <Link to="/">proposals.decred.org</Link> database stores your
        account email address, username, cryptographic identity public key(s),
        IP addresses and payment transaction details - and associates this data
        with all of your proposals, comments and up/down votes.
      </li>
      <li>
        Your email address will be kept private and will not be shared with any
        third parties.
      </li>
    </ul>
  </PageWithSingleContent>
);

export default PageUserPrivacyPolicy;