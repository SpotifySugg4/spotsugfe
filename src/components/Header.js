import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/Header.scss";
import { connect } from "react-redux";
function Header(props) {
    const {push} = useHistory();
    return (
        <header>
            <h1>SpotiFindYa</h1>
            <nav>
                {props.loggedIn ?
                    (<button>logout</button>)
                    :
                    (<>
                        <button onClick={() => push("/login")}>log in</button>
                        <button onClick={()=> push("/register")}>sign up</button>
                    </>)
                }
            </nav>
        </header>
    )
}
const mapStateToProps = state => {
    return {
      loggedIn: state.loggedIn,
    }
  }
  export default connect(mapStateToProps, {})(Header);
