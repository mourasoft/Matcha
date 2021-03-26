import {
    validateStr,
    validateEmail,
    validateUser,
    validateBirthday,
    validateText
  
  } from "./validators";
  
  export default function validatProfileEdit({
    fname,
    lname,
    email,
    login,
    biography,
    birthday,
  }) {
    const errors = {};
  
    errors.fname = validateStr(fname, "First Name");
    errors.lname = validateStr(lname, "Last Name");
    errors.email = validateEmail(email, "Email");
    errors.login = validateUser(login, "Username");
    errors.birthday = validateBirthday(birthday);
    errors.biography = validateText(biography,"Biography");
    return errors;
  }
  