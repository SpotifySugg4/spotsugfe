import React, { useState, useEffect } from "react";
// import axios from 'axios';
import * as yup from "yup";
import { connect } from "react-redux";
import { register } from "../actions/actions";

const Register = (props) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    // terms: false
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    // terms: ''
  });

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Please supply a username with a minumum of 4 characters."),
    email: yup.string().required("A valid email is required"),
    password: yup
      .string()
      .required("Please supply a password with a minumum of 8 characters"),
    terms: yup.boolean().oneOf([true]),
  });

  const completeForm = () => {
    formSchema.isValid(formState).then((isValid) => {
      setButtonDisabled(!isValid);
    });
  };
  useEffect(completeForm, [formState]);

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((error) => {
        setErrors({
          ...errors,
          [e.target.name]: error.errors[0],
        });
      });
  };

  const changeHandler = (e) => {
    e.persist();

    const FormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    validateChange(e);

    setFormState(FormData);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    props.register({
      name: formState.name,
      email: formState.email,
      password: formState.password,
    });
    // axios
    //   .post('https://reqres.in/api/register', formState)
    //   .then(res => {
    //     setUsers([...users, res.data])
    //     setFormState({
    //       name: '',
    //       email: '',
    //       password: '',
    //       terms: true
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error.response)
    //   })
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        <h1>Name:</h1>
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={changeHandler}
        />

        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <br></br>
      <br></br>

      <label htmlFor="email">
        <h1>Email:</h1>
        <input
          id="email"
          type="text"
          name="email"
          value={formState.email}
          onChange={changeHandler}
        />

        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <br></br>
      <br></br>

      <label htmlFor="password">
        <h1>Create Password</h1>
        <input
          id="password"
          type="password"
          name="password"
          value={formState.password}
          onChange={changeHandler}
        />

        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </label>

      {/* <label htmlFor='terms' className='terms'>
        <input 
        id='terms'
        type='checkbox'
        name='terms'
        value={formState.terms}
        onChange={changeHandler}
        />
       Check box to agree to the Terms & Conditions

        {errors.terms.length > 0 ? (<p className='error'>{errors.terms}</p>): null}

      </label> */}
      <br></br>
      <br></br>
      <button disabled={buttonDisabled} type="submit">
        Create My Account
      </button>

      <p>{props.apiStatus}</p>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    apiStatus: state.apiStatus,
  };
};

export default connect(mapStateToProps, { register })(Register);
