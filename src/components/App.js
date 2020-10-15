import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../styles/App.scss';
import Header from "./Header";
import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";


function App() {
  return (
    <>
    <Header />
      <Router>
        {/* <PrivateRoute /> */}
    </Router>
    </>
  );
}
const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
  }
}
export default connect(mapStateToProps, {})(App);
