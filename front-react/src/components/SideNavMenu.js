import React, {Component} from 'react'
import {Nav, NavText, SideNav} from "react-sidenav";
import Link from "react-router-dom/es/Link";
import FontAwesome from 'react-fontawesome'

export class SideNavMenu extends Component{
    render(){
        return(
            <SideNav highlightBgColor='#6e6e6e' defaultSelected="home">
                <Link to={"/"}>
                    <Nav id={"home"}>
                        <NavText><span>Home <FontAwesome name='home'/></span></NavText>
                    </Nav>
                </Link>
                <Link to="/about">
                    <Nav id={"about"}>
                        <NavText><span>About <FontAwesome name='info-circle'/></span></NavText>
                    </Nav>
                </Link>
                <Link to="/auth">
                    <Nav id={"auth"}>
                        <NavText><span>Profile <FontAwesome name='user'/></span></NavText>
                    </Nav>
                </Link>
            </SideNav>
        )
    }
}