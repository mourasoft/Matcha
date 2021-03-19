import {
	validatePassword,
	validateUser,
} from "./validators";

export default function validateSignIn({
	login,
	passwd,
	
}) {
	const errors = {};

	errors.login = validateUser(login, "Login");
	errors.password = validatePassword(passwd, "password");
	return errors;
}
