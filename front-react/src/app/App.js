import React, { Component } from 'react';
import './App.css';
import Home from '../scenes/Home/Home'
import {Route, BrowserRouter as Router} from "react-router-dom";
import Auth from "../scenes/Auth/Auth";
import {Layout, Fixed, Flex} from 'react-layout-pane'
import {BaseFooter} from "../components/BaseFooter";

import {SideNavMenu} from '../components/SideNavMenu'
import {LoginInline} from "../components/Auth/LoginForm";

class App extends Component{
    openSideNav=true;
    render(){
        return(
            <Router>
                <Layout type="column">
                    <Fixed className="header">
                        <LoginInline/>
                    </Fixed>
                    <Flex>
                        <Layout type="row">
                            {this.openSideNav && <Fixed className="sidebar">
                                <Layout type="column">
                                    <Flex>
                                        <SideNavMenu/>
                                    </Flex>
                                </Layout>
                            </Fixed>
                            }
                            <Flex className="content">
                                <Route exact path="/" component={Home}/>
                                {/*<Route path="/about" component={}/>*/}
                                <Route path="/auth" component={Auth}/>
                            </Flex>
                        </Layout>
                    </Flex>
                    <Fixed className="footer">
                        <BaseFooter/>
                    </Fixed>
                </Layout>
            </Router>
        )
    }
}

export default App;
