import {
	validateEmail,
} from "./validators";

export default function validateForgot({
	email,	
}) {
	const errors = {};

	errors.email = validateEmail(email, "Email");
	return errors;
}