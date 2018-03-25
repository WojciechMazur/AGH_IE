import React, {Component} from 'react'
import {Config} from '../../app/config'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {MuiThemeProvider} from "material-ui";
import FontAwesome from 'react-fontawesome'
import './LoginForm.css'
import * as $ from 'ajax'

export class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        }
    }
    //Todo Implement logging process
    handleClick(event){
        $.postJSON(`${Config.backendURL}/api/auth/sign_in`, {
            email: this.state.username,
            password: this.state.password
        }, (data, status)=>{
           console.log(status);
           console.log(data);
        });
    }


    render() {
        return (
            <div style={{width: "100%", position: "relative", left:"35%"}}>
                <MuiThemeProvider>
                    <div>
                        <TextField type={"email"} hintText={"Enter your email"} floatingLabelText={"Email"} onChange={
                            (event, newValue) => this.setState({username: newValue})}/>
                        <br/>
                        <TextField type={"password"} hintText={"Enter your password"} floatingLabelText={"Password"}
                                   onChange={
                                       (event, newValue) => this.setState({password: newValue})}/>
                        <br/>

                        <RaisedButton label={"Login"} primary={true}
                                      buttonStyle={{
                                          margin: '0 auto',
                                          border: '1px solid #414141',
                                          background: '#414141',
                                      }}
                                      style={{width: "25%"}}
                                      onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }

}

export class LoginInline extends Login{
    render(){
        return (
            <form className={"inline-login"}>
                <input type="email" name="email" placeholder="Email" onChange={  (event, newValue) => this.setState({username: newValue})}/>
                <input type="password" name="password" placeholder="Password" onChange={ (event, newValue) => this.setState({password: newValue})}/>
                <button type="reset" onClick={this.handleClick}><FontAwesome name={"sign-in"}/></button>
            </form>
        )
    }

}