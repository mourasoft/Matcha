// import { useState, useEffect } from "react";
// import validateSignUp from "./validationsignup";

const useForm = (callback, validate, values, setValues, errors, setErrors) => {
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
    const filteredByValue = Object.fromEntries(
      Object.entries(foundErrors).filter(([key, value]) => value !== "")
    );
    const errorsLen = Object.keys(filteredByValue).length;
    if (!errorsLen) {
      callback();
    }
  };
  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
