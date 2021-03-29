// string validation\
export function validateStr(str, label) {
  // name=> {label}
  // isReq
  // isStr [a-zA-Z-]
  if (!str || str.trim() === "") {
    return `${label} is required field.`;
  } else if (!/^([a-zA-Z ])+$/.test(str)) {
    return `${label} is not valid.`;
  } else if (str.length < 3) {
    return `${label} must be at least 4 characters.`;
  } else if (str.length > 12) {
    return `${label} must be less than 13 characters.`;
  }
  return "";
}
// UserName Validation
export function validateUser(str, label) {
  if (!str || str.trim() === "") {
    return `${label} is required field.`;
  } else if (!/^\w+$/.test(str)) {
    return `${label} is not valid.`;
  } else if (str.length < 5) {
    return `${label} must be at least 4 characters.`;
  } else if (str.length > 12) {
    return `${label} must be less than 13 characters.`;
  }
  return "";
}
// email validation
export function validateEmail(str, label) {
  if (!str || str.trim() === "") {
    return `${label} is required field.`;
  } else if (
    !/^([a-zA-Z._0-9-]+)@([a-zA-Z0-9]+[.]?)*([a-zA-Z0-9])(\.[a-zA-Z]{2,4})$/.test(
      str
    )
  ) {
    return `${label} is not valid.`;
  }
  return "";
}
// password validation
export function validatePassword(str, label) {
  //
  if (!str || str.trim() === "") {
    return `${label} is required field.`;
  } else if (
    !/(?=.{8,32})(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*\d).*$/.test(
      str
    )
  ) {
    return `${label} is not valid .`;
  }
  return "";
}

// text validation
export function validateText(str, label) {
  if (!str || str.trim() === "") {
    return `${label} is required field.`;
  } else if (!/^[a-zA-Z\s.0-9]+$/.test(str)) {
    return `Use only Alpha numeric characters.`;
  } else if (str.length > 250) {
    return `${label} must be less than 250 characters.`;
  }
  return "";
}
// confirm Password validation
export function validateConfirm(confirm, pass, label) {
  if (!confirm || confirm.trim() === "") {
    return `${label} is required field.`;
  } else if (confirm !== pass) {
    return `Passwords not match.`;
  }
  return "";
}

// birth day validator
export function validateBirthday(birthday) {
  const age = getAge(birthday);
  if (!birthday || birthday.trim() === "") {
    return "is required field.";
  }
  if (
    birthday &&
    !/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(birthday)
  ) {
    return "Invalid date !";
  } else if (age < 18) {
    return "Come back when you're 18";
  } else if (age > 120) {
    return "Invalid age !";
  }
  return "";
}
function getAge(birthday) {
  const today = new Date();
  const birthDate = new Date(birthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  return age;
}
