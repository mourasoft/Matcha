import {
  validateStr,
  validateEmail,
  validateUser,
  validatePassword,
  validateConfirm,
} from "./validators";

export default function validateSignUp({
  fname,
  lname,
  email,
  login,
  passwd,
  rpasswd,
}) {
  const errors = {};

  errors.firstName = validateStr(fname, "First Name");
  errors.lastName = validateStr(lname, "Last Name");
  errors.email = validateEmail(email, "Email");
  errors.userName = validateUser(login, "Username");
  errors.password = validatePassword(passwd, "password");
  errors.confirm = validateConfirm(rpasswd, passwd, "confirm");
  return errors;
}
