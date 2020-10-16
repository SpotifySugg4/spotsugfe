import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../styles/App.scss';
import Header from "./Header";
import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";
import axiosWithAuth from '../api/axiosWithAuth';


function App() {
  const [test, setTest] = useState("");
  useEffect(() => {
    axiosWithAuth().get("/authorize?client_id=1142cddf758a475d93a724ae8ee26742&response_type=code&redirect_uri=http://localhost:3000/" ).then(r => console.log(r));
  }, [])
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
