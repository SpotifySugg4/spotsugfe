import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
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
          {props.loggedIn && <Redirect to="/" />}
          <Login />
        </Route>
        <Route path="/register">
          {props.loggedIn && <Redirect to="/" />}
          <Register />
        </Route>
    </Router>
</>
  );
}
const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    token: state.token
  }
}
export default connect(mapStateToProps, {})(App);
