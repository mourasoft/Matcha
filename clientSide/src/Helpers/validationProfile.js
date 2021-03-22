import {
    validateBirthday,
    validateText
  } from "./validators";
  
  export default function validateProfile({
    birthday,biography
  }) {
    const errors = {};
  
    errors.birthday = validateBirthday(birthday, "First Name");
    errors.bio = validateText(biography, "Last Name");
  
    return errors;
  }