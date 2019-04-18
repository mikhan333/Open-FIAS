import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Image, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import * as authActionCreators from "../../store/actions/auth";
import LanguageHeader from "../LanguageProvider/LanguageHeader";
import TranslatableText from '../LanguageProvider/LanguageTranslater';
import { authServer } from "../../store/serverURLs";

import classes from './index.module.css'
import mapsMeLogo from '../../static/icon.png'
import { modeTypes } from "../../store/reducers/senderReducer";
import * as senderActionCreators from "../../store/actions/senderActions";

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLinkClick = this.handleLinkClick.bind(this)
    }

    static authRedirect () {
        window.location.href = authServer;
    }

    handleLinkClick(mode) {
        this.props.setMode(mode);
        this.props.history.push('/add_point')
    }

    render() {
        let avatar;
        if(this.props.avatar) {
            avatar = <Image src={ this.props.avatar } className={ classes.Avatar } rounded />
        }
        let name, user_nav;
        if (this.props.username) {
            name =
                <Button variant="" className={ classes.NameButton }>
                    <div className={ classes.UserInfo }>
                        <Navbar.Text variant="light" className={ classes.Name }>
                            { this.props.username }
                        </Navbar.Text>
                        { avatar }
                    </div>
                </Button>;
            user_nav = 
                <div>
                    <NavDropdown.Item onClick={ () => this.props.history.push('/profile') }>
                        <TranslatableText dictionary={{russian: "Профиль", english: "Profile"}}/>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={ this.props.logout }>
                        <TranslatableText dictionary={{russian: "Выйти", english: "Logout"}}/>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={ () => this.props.history.push('/') }>
                        <TranslatableText dictionary={{russian: "Настройки", english: "Settings"}}/>
                    </NavDropdown.Item>
                </div>
        } else {     
            name =
                <Button variant="" className={ classes.NameButton }>
                    <div className={ classes.UserInfo }>
                        <Navbar.Text variant="light" className={ classes.Name }>
                            <TranslatableText dictionary={{russian: "Вы не вошли", english: "You are not auth"}}/>
                        </Navbar.Text>
                    </div>
                </Button>;
            user_nav = 
                <div>
                    <NavDropdown.Item onClick={ Header.authRedirect }>
                        <TranslatableText dictionary={{russian: "Войти", english: "Login"}}/>
                    </NavDropdown.Item>
                </div>
        }
        return (
            
            <Navbar collapseOnSelect variant='dark' expand="lg">
                <Navbar.Brand
                    onClick={ () => this.props.history.push('/') }
                    className={ classes.Header }
                >
                    <img src={ mapsMeLogo } alt="" className={ classes.Logo }/>
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={ () => this.props.history.push('/') }>
                            <TranslatableText dictionary={{russian: "Главная", english: "Main"}}/>
                        </Nav.Link>
                        <NavDropdown 
                            title={<TranslatableText dictionary={{russian: "Поставить точку", english: "Put a point"}}/>}
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item onClick={ () => this.handleLinkClick(modeTypes.fias) }>
                                <TranslatableText dictionary={{russian: "Через адрес из ФИАС", english: "Via the address from FIAS"}}/>
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={ () => this.handleLinkClick(modeTypes.map) }>
                                <TranslatableText dictionary={{russian: "Через точку на карте", english: "Via the point on the map"}}/>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link onClick={ () => this.props.history.push('/statistics') }>
                            <TranslatableText dictionary={{russian: "Статистика", english: "Statistics"}}/>
                        </Nav.Link>
                    </Nav>
                    
                    <Nav>
                        <NavDropdown title={ name } id="basic-nav-dropdown" expanded="true" alignRight>
                            { user_nav }
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={ () => this.props.history.push('/info_project') }>
                                <TranslatableText dictionary={{russian: "О проекте", english: "About project"}}/>
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Header><LanguageHeader/></NavDropdown.Header>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        avatar: state.auth.avatar
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setMode: (mode) => dispatch(senderActionCreators.setMode(mode)),
        logout: () => dispatch(authActionCreators.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));