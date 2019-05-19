import React, { Component } from 'react';
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import TranslatableText from '../LanguageProvider/LanguageTranslater';
import UserInfo from "./UserInfo"

import classes from './index.module.css'
import mapsMeLogo from '../../static/icon.png'
import * as senderActionCreators from "../../store/actions/senderActions";

class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect variant='light' expand="lg" className={ classes.Header }>
                <Navbar.Brand
                    onClick={ () => this.props.history.push('/') }
                >
                    <img src={ mapsMeLogo } alt="" className={ classes.Logo }/>
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={ () => this.props.history.push('/') }>
                            <TranslatableText
                                dictionary={{
                                    russian: "Главная",
                                    english: "Main"
                                }}
                            />
                        </Nav.Link>
                        <Nav.Link onClick={ () => this.props.history.push(`/add_point`) }>
                            <TranslatableText
                                dictionary={{
                                    russian: "Поставить точку",
                                    english: "Create point"
                                }}
                            />
                        </Nav.Link>
                         <Nav.Link onClick={ () => this.props.history.push('/') } href="#statistic">
                            <TranslatableText
                                dictionary={{
                                    russian: "Статистика",
                                    english: "Statistics"
                                }}
                            />
                        </Nav.Link>
                    </Nav>
                    
                    <UserInfo />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMode: (mode) => dispatch(senderActionCreators.setMode(mode)),
    }
};

export default connect(null, mapDispatchToProps)(withRouter(Header));