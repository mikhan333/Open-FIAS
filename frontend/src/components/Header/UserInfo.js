import React, { Component } from 'react';
import { Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import * as authActionCreators from "../../store/actions/auth";
import LanguageHeader from "../LanguageProvider/LanguageHeader";
import TranslatableText from '../LanguageProvider/LanguageTranslater';
import { authServer } from "../../store/serverURLs";

import './index.css';
import classes from './index.module.css'

class UserInfo extends Component {
    static authRedirect () {
        window.location.href = authServer;
    }

    render() {
        let avatar;
        if(this.props.avatar) {
            avatar = <img src={ this.props.avatar } className={ classes.Avatar } alt='' />
        }
        let name, user_nav;
        if (this.props.username) {
            name =
                <span>
                    { this.props.withoutUsername ? '' : this.props.username }
                    { avatar }
                </span>;
            user_nav =
                <div>
                    <NavDropdown.Item onClick={ () => this.props.history.push('/profile') }>
                        <TranslatableText
                            dictionary={{
                                russian: "Профиль",
                                english: "Profile"
                            }}
                        />
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={ this.props.logout }>
                        <TranslatableText
                            dictionary={{
                                russian: "Выйти",
                                english: "Logout"
                            }}
                        />
                    </NavDropdown.Item>
                </div>;
        } else {
            name =
                <span>
                    <TranslatableText
                        dictionary={{
                            russian: "Вы не вошли",
                            english: "You are not auth"
                        }}
                    />
                </span>;
            user_nav =
                <div>
                    <NavDropdown.Item onClick={ UserInfo.authRedirect }>
                        <TranslatableText
                            dictionary={{
                                russian: "Войти",
                                english: "Login"
                            }}
                        />
                    </NavDropdown.Item>
                </div>;
        }

        return (
            <Nav>
                <NavDropdown title={ name } id="basic-nav-dropdown" expanded="true" alignRight>
                    { user_nav }
                    <NavDropdown.Divider/>
                     <NavDropdown.Item onClick={ () => this.props.history.push('/') } href='#about'>
                        <TranslatableText
                            dictionary={{
                                russian: "О проекте",
                                english: "About project"
                            }}
                        />
                    </NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Header>
                        <LanguageHeader/>
                    </NavDropdown.Header>
                </NavDropdown>
            </Nav>
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
        logout: () => dispatch(authActionCreators.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserInfo));