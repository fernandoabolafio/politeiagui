import { useEffect, useState } from "react";
import * as sel from "src/selectors";
import * as act from "src/actions";
import { useRedux } from "src/redux";
import { signupValidationSchema } from "./validation";
import { useConfig } from "src/Config";
import { getQueryStringValues } from "src/lib/queryString";

const mapStateToProps = {
  policy: sel.policy,
  loadingPolicy: sel.isApiRequestingPolicy,
  signupResponse: sel.newUserResponse
};

const mapDispatchToProps = {
  onGetPolicy: act.onGetPolicy,
  onCreateNewUser: act.onCreateNewUser,
  onCreateNewUseFromAdminInvitation: act.onCreateNewUserCMS,
  onResetSignup: act.onResetSignup
};

export function useSignup(ownProps) {
  const [validationSchema, setValidationSchema] = useState(null);
  const fromRedux = useRedux(ownProps, mapStateToProps, mapDispatchToProps);

  const { enableAdminInvite } = useConfig();

  // Switch between signup methods accordingly to the config 'enableAdminInvite'
  const onSignup = enableAdminInvite
    ? fromRedux.onCreateNewUseFromAdminInvitation
    : fromRedux.onCreateNewUser;

  // Fetch policy
  useEffect(() => {
    if (!fromRedux.policy) {
      fromRedux.onGetPolicy();
    }
  }, []);

  // Set the validation shcema once the policy has been fetched
  useEffect(() => {
    if (fromRedux.policy) {
      const schema = signupValidationSchema(
        fromRedux.policy,
        enableAdminInvite
      );
      setValidationSchema(schema);
    }
  }, [fromRedux.policy]);

  // Set intial values
  const { email, verificationtoken } = getQueryStringValues();
  const initialValues = {
    email: email || "",
    verificationtoken: verificationtoken || "",
    password: "",
    verify_password: ""
  };

  return {
    ...fromRedux,
    validationSchema,
    onSignup,
    enableAdminInvite,
    initialValues
  };
}
