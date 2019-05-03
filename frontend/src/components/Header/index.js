import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import TranslatableText from '../LanguageProvider/LanguageTranslater';
import UserInfo from "./UserInfo"

import classes from './index.module.css'
import mapsMeLogo from '../../static/icon.png'
import { modeTypes } from "../../store/reducers/senderReducer";
import * as senderActionCreators from "../../store/actions/senderActions";

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLinkClick = this.handleLinkClick.bind(this)
    }

    handleLinkClick(mode) {
        this.props.setMode(mode);
        this.props.history.push(`/add_point`)
    }

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
                                    russian: "Главная", english: "Main"
                                }}
                            />
                        </Nav.Link>
                        <NavDropdown
                            title={
                                <TranslatableText
                                    dictionary={{
                                        russian: "Поставить точку",
                                        english: "Create point"
                                    }}
                                />
                            }
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item onClick={ () => this.handleLinkClick(modeTypes.fias) }>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Через адрес из ФИАС",
                                        english: "Using FIAS address"
                                    }}
                                />
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={ () => this.handleLinkClick(modeTypes.map) }>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Через точку на карте",
                                        english: "Using a map location"
                                    }}
                                />
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link onClick={ () => this.props.history.push('/statistics') }>
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