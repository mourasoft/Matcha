import { validatePassword, validateConfirm } from "./validators";

export default function validateReset({ passwd, rpasswd }) {
  const errors = {};

  errors.passwd = validatePassword(passwd, "password");
  errors.rpasswd = validateConfirm(rpasswd, passwd,"password");
  return errors;
}
