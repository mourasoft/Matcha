import { validatePassword, validateConfirm } from "./validators";

export default function validatEditPassword({ oldpasswd, npasswd ,rpasswd}) {
  const errors = {};

  errors.oldpasswd = validatePassword(oldpasswd, "password");
  errors.npasswd = validatePassword(npasswd, "password");
  errors.rpasswd = validateConfirm(rpasswd, npasswd,"password");
  return errors;
}