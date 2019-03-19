import React, { Component } from 'react';
import { Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import classes from './index.module.css'

class Header extends Component {
    render() {
        let name;
        if (this.props.username) {
            name =
                <Navbar.Text
                    onClick={ () => this.props.history.push('/profile') }
                    className={ classes.UserInfo }
                >
                    Вы вошли как: { this.props.username }
                </Navbar.Text>
        } else {
            name =
                <OverlayTrigger
                    placement='bottom'
                    overlay={
                        <Tooltip>
                            Войдите, чтобы просмотреть профиль
                        </Tooltip>
                    }
                >
                    <Navbar.Text>
                        Вы вошли как: АНОНИМ
                    </Navbar.Text>
                </OverlayTrigger>
        }

        return (
            <Navbar variant='dark'>
                <Navbar.Brand
                    onClick={ () => this.props.history.push('/') }
                    className={ classes.Header }
                >
                    Ручное геокодирование данных
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    { name }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
    }
};

export default connect(mapStateToProps)(withRouter(Header));