// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// // import { connect } from "react-redux";
// // import Header from "./Header";

// const Login = props => {
//   const [user, setUser] = useState({ username: "", password: "" });

//   const handleChange = event => {
//     setUser({ ...user, [event.target.name]: event.target.value });
//   };
//   const handleLoginSubmit = event => {
//     event.preventDefault();
//     props.login(user, status =>
//       status
//         ? props.history.push(props.location.state?.url || "/")
//         : props.history.push("/login")
//     );
//   };

//   useEffect(() => {
//     if (localStorage.getItem("token")) props.history.push("/");

//     return () => props.clearErrorMessages();
//   }, []);
//   console.log({ isLoading: props.isLoading });
//   return (
//     <div className="login-page-container">
//       <Login />
//       <div className="login-form-container">
//         <form className="login-form" onSubmit={handleLoginSubmit}>
//           <h1>
//             <span>Log in</span> <i className="fas fa-sign-in-alt"></i>
//           </h1>
//           {/* {props.isLoading ? (
//             <div style={{ display: "flex", justifyContent: "center" }}>
//               <CircularProgress />
//             </div>
//           ) : (
//             <>
//               {props.message && <div className="error">{props.message}</div>}
//               {props.location.state?.newSignedUpUser && ( */}
//                 <div className="signup_successful">
//                   You have successfully Register,{" "}
//                   <strong>{props.location.state?.newSignedUpUser}</strong>.
//                   <br />
//                   <br />
//                   Please log in using the form below.
//                 </div>
//               )}
//               <label>Username:</label>
//               <input
//                 type="text"
//                 name="username"
//                 id="name"
//                 onChange={event => handleChange(event)}
//                 value={user.userName}
//               />
//               <label>Password:</label>
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 onChange={event => handleChange(event)}
//                 value={user.password}
//               />
//               <button>Log In</button>
//               <div className="register_link">
//                 If you do not have an account with us,{" "}
//                 <Link to="/Register">Register up here</Link>.
//               </div>
//             {/* </> */}
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = state => {
//   return {
//     message: state.message,
//     isLoading: state.isLoading
//   };
// };

// export default Login;
