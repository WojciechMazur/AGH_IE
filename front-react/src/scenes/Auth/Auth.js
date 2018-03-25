import React, {Component} from "react";
import {Login} from '../../components/Auth/LoginForm'
class Auth extends Component{
    render(){
        return(
            <div>
                <h2>Login</h2>
                <Login/>
            </div>
        );
    }
}

export default Auth;