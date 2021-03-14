// import { useState, useEffect } from "react";
// import validateSignUp from "./validationsignup";

const useForm = (validate, values, setValues, errors, setErrors) => {
	// validate => validateur for form
	// values => values of form
	// setValues
	// errors => errors input name
	// set error
	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const foundErrors = validate(values);
		setErrors(foundErrors);
	};
	return { handleChange, values, handleSubmit, errors };
};

export default useForm;
