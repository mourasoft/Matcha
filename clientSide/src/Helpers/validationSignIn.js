import {
	validateEmail,
	validatePassword,
} from "./validators";

export default function validateSignIn({
	email,
	password,
	
}) {
	const errors = {};

	errors.email = validateEmail(email, "Email");
	errors.password = validatePassword(password, "password");
	return errors;
}
