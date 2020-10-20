import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../styles/App.scss';
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";
import Main from "./Main";
import { connect } from "react-redux";
function App(props) {
  return (
<>
      <Router>
      <Header />
         <Route exact path="/">
           <PrivateRoute component={Main} loggedIn={props.loggedIn}/>
         </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
    </Router>
</>
  );
}
const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
  }
}
<<<<<<< HEAD
export default connect(mapStateToProps, {})(App);
=======
export default connect(mapStateToProps, {})(App);
>>>>>>> 8b1fc50e5ea52f971f258be72071ba95eca28337
