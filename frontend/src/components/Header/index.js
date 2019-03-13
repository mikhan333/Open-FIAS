import React, { Component } from 'react';
import { Navbar } from "react-bootstrap";
import { connect } from "react-redux";

class Header extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Brand href="/">Ручное геокодирование данных</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Вы вошли как: { this.props.username || 'Анонимный пользователь' }
                    </Navbar.Text>
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

export default connect(mapStateToProps)(Header);