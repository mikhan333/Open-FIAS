import React, { Component } from 'react';
import { Navbar, OverlayTrigger, Tooltip, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import classes from './index.module.css'
import { authServer } from "../../store/serverURLs";

class Header extends Component {
    static authRedirect () {
        window.location.href = authServer;
    }

    render() {
        let avatar;
        if(this.props.avatar) {
            avatar = <img className={ classes.Avatar } src={ this.props.avatar } alt=''/>
        }
        let name;
        if (this.props.username) {
            name =
                <OverlayTrigger
                    placement='bottom'
                    overlay={
                        <Tooltip>
                            Профиль
                        </Tooltip>
                    }
                >
                    <div
                        className={ classes.UserInfo }
                        onClick={ () => this.props.history.push('/profile') }
                    >
                        <Navbar.Text className={ classes.Name }>
                            Вы вошли как: { this.props.username }
                        </Navbar.Text>
                        { avatar }
                    </div>
                </OverlayTrigger>

        } else {
            name =
                <OverlayTrigger
                    placement='bottom'
                    overlay={
                        <Tooltip>
                            Войти
                        </Tooltip>
                    }
                >
                    <Navbar.Text
                        onClick={ Header.authRedirect }
                        className={ classes.UserInfo }
                    >
                        Вы не вошли
                    </Navbar.Text>
                </OverlayTrigger>
        }

        return (
            <Navbar variant='dark' expand="lg">
                <Navbar.Brand
                    onClick={ () => this.props.history.push('/') }
                    className={ classes.Header }
                >
                    Ручное геокодирование данных
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link onClick={ () => this.props.history.push('/add_point') }>Поставить точку</Nav.Link>
                    <Nav.Link onClick={ () => this.props.history.push('/statistics') }>Статистика</Nav.Link>
                </Nav>
                    { name }
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

export default connect(mapStateToProps)(withRouter(Header));