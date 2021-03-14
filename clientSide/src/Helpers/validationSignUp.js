import {
	validateStr,
	validateEmail,
	validateUser,
	validatePassword,
	validateConfirm,
} from "./validators";

export default function validateSignUp({
	firstName,
	lastName,
	email,
	userName,
	password,
	confirm,
}) {
	const errors = {};

	errors.firstName = validateStr(firstName, "First Name");
	errors.lastName = validateStr(lastName, "Last Name");
	errors.email = validateEmail(email, "Email");
	errors.userName = validateUser(userName, "Username");
	errors.password = validatePassword(password, "password");
	errors.confirm = validateConfirm(
		confirm,
		password,
		"confirm"
	);
	return errors;
}
