import React, {useState, useEffect } from 'react';
// import "../styles/Login.scss";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from 'axios';
import * as yup from 'yup'; 

const Register = () => {

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    loginErrors:''
  })


  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [users, setUsers] = useState([])

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

const formSchema = yup.object().shape({
  email: yup
    .string()
    .required('A valid email is required'),
  password: yup
    .string()
    .required('Please supply a password with a minumum of 8 characters'),
})

  const completeForm = () => {
    formSchema.isValid(formState)
      .then(isValid => {
        setButtonDisabled(!isValid)
      })
  }
  useEffect(completeForm, [formState])


  const validateChange = e => {

    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ''
        })
      })
      .catch(error => {
        setErrors({
          ...errors,
          [e.target.name]: error.errors[0]
        })
      })
  }


  const changeHandler = e => {

    e.persist()

    const FormData = {
      ...formState,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }

    validateChange(e)

    setFormState(FormData)

  }

  const formSubmit = e => {
    e.preventDefault()
    axios
      .post('https://tempbackend.herokuapp.com/users/login', formState)
      .then(res => {
        setUsers([...users, res.data])
        setFormState({
          email: '',
          password: '',
        })
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  return (
    <form onSubmit={formSubmit}>

      <label htmlFor='email'>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

        <h1>Email:</h1>
        <input 
        id='email'
        type='text'
        name='email'
        value={formState.email}
        onChange={changeHandler}
        required
        />

        {errors.email.length > 0 ? (<p className='error'>{errors.email}</p>): null}

      </label>
<br></br>
<br></br>

      <label htmlFor='password'>
         <h1>Password:</h1>
        <input 
        id='password'
        type='password'
        name='password'
        value={formState.password}
        onChange={changeHandler}
        required
        />

        {errors.password.length > 0 ? (<p className='error'>{errors.password}</p>): null}

      </label>
<br>
</br>
<br>
</br>
      <button disabled={buttonDisabled} type='signIn'>Login</button>

      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <br></br>
      <br></br>
      <Link exact to="/"><Button>Home</Button></Link>

    </form>
  )

}


export default Register
