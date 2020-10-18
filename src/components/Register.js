// import React, { useEffect, useState } from "react";
// import * as yup from "yup";

// import Header from "./Header";

// import CircularProgress from "@material-ui/core/CircularProgress";

// const initialStatus = { isLoading: false, token: "", username: "", error: "" };

// const SignUp = ({ touched, errors, status = initialStatus, ...props }) => {
//   useEffect(() => {
//     status?.token &&
//       props.history.push("/login", { newSignedUpUser: status.username });
//   }, [status.token]);

//   return (
//     <div className="sign-up-page">
//       <Header />
//       <div className="sign-up-form-container">
//         <Form className="sign-up-form">
//           <h1>
//             <span>Sign up</span> <i className="fas fa-user-plus"></i>
//           </h1>
//           {status?.error && <div className="error">{status.error}</div>}
//           {status?.isLoading ? (
//             <div style={{ display: "flex", justifyContent: "center" }}>
//               <CircularProgress />
//             </div>
//           ) : (
//             <>
//               <label>
//                 <span>Username:</span>
//               </label>
//               <Field type="text" name="username" />
//               {touched.username && errors.username && (
//                 <p className="input-error">{errors.username}</p>
//               )}

//               <label>
//                 <span>Password:</span>
//               </label>
//               <Field type="password" name="password" />
//               {touched.password && errors.password && (
//                 <p className="input-error">{errors.password}</p>
//               )}
//               <button type="submit"> Sign Up</button>
//             </>
//           )}
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default withFormik({
//   mapPropsToValues: props => ({
//     username: "",
//     password: ""
//   }),
//   validationSchema: yup.object().shape({
//     username: yup
//       .string()
//       .required("Please supply a username with a minumum of 4 characters.")
//       .min(4),
//     password: yup
//       .string()
//       .required("Please supply a password with a minumum of 8 characters.")
//       .min(8)
//   }),
//   handleSubmit: (values, { resetForm, setStatus }) => {
//     setStatus({ isLoading: true, token: "", username: "", error: "" });
//     axiosWithAuth()
//       .post("/register", values)
//       .then(res => {
//         setStatus({
//           token: res.data.token,
//           username: values.username,
//           error: "",
//           isLoading: false
//         });
//         resetForm();
//       })
//       .catch(err => {
//         setStatus({
//           token: "",
//           username: "",
//           error: "Error signing up with the credentials provided.",
//           isLoading: false
//         });
//       });
//   }
// })(SignUp);

import React, {useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup'; 

const Register = () => {

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    terms: false
  })


  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [users, setUsers] = useState([])

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  })

const formSchema = yup.object().shape({
  name: yup
    .string() 
    .required('Please supply a username with a minumum of 4 characters.'), 
  email: yup
    .string()
    .required('A valid email is required'),
  password: yup
    .string()
    .required('Please supply a password with a minumum of 8 characters'),
  terms: yup
    .boolean()
    .oneOf([true])
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
      .post('https://reqres.in/api/register', formState)
      .then(res => {
        setUsers([...users, res.data])
        setFormState({
          name: '',
          email: '',
          password: '',
          terms: true
        })
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  return (
    <form onSubmit={formSubmit}>


      <label htmlFor='name'>
        Name
        <input 
        id='name'
        type='text'
        name='name'
        value={formState.name}
        onChange={changeHandler}
        />

        {errors.name.length > 0 ? (<p className='error'>{errors.name}</p>): null}

      </label>


      <label htmlFor='email'>
        Email
        <input 
        id='email'
        type='text'
        name='email'
        value={formState.email}
        onChange={changeHandler}
        />

        {errors.email.length > 0 ? (<p className='error'>{errors.email}</p>): null}

      </label>


      <label htmlFor='password'>
        Create Password
        <input 
        id='password'
        type='password'
        name='password'
        value={formState.password}
        onChange={changeHandler}
        />

        {errors.password.length > 0 ? (<p className='error'>{errors.password}</p>): null}

      </label>


      <label htmlFor='terms' className='terms'>
        <input 
        id='terms'
        type='checkbox'
        name='terms'
        value={formState.terms}
        onChange={changeHandler}
        />
       Check box to agree to the Terms & Conditions

        {errors.terms.length > 0 ? (<p className='error'>{errors.terms}</p>): null}

      </label>

      <button disabled={buttonDisabled} type='submit'>Submit</button>

      <pre>{JSON.stringify(users, null, 2)}</pre>

    </form>
  )

}


export default Register