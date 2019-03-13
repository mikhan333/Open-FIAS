import React, { Component } from 'react'
import { Card } from "react-bootstrap";
import * as actionCreators from "../../store/actions/auth";
import { connect } from "react-redux";
import { authServer } from '../../store/serverURLs'

import classes from './index.module.css'


class LoginPage extends Component {
    authRedirect (event){
        window.location.replace(authServer)
    }

    componentDidMount() {
        this.props.auth();
    }

    render() {
        // if (this.props.redirect) {
        //     window.location.href = authServer;
        // }

        
        return (
            <div className={ classes.CardHolder }>
                <Card
                    style={{ width: '18rem' }}
                    onClick={ this.authRedirect }//this.props.auth
                    className={ classes.LoginCard }
                >
                    <Card.Body>
                        <Card.Title>Войти</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">используя аккаунт OpenStreetMaps</Card.Subtitle>
                        <Card.Text>
                            блаблабла
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card
                    style={{ width: '18rem' }}
                    onClick={ this.props.logout }
                    className={ classes.LoginCard }
                >
                    <Card.Body>
                        <Card.Title>Выйти</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">используя аккаунт OpenStreetMaps</Card.Subtitle>
                        <Card.Text>
                            блаблабла
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card
                    style={{ width: '18rem' }}
                    onClick={ () => this.props.history.push('/addlink') }
                    className={ classes.AnonCard }
                >
                    <Card.Body>
                        <Card.Title>Остаться анонимным пользователем</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Ваш вклад будет менее весомым</Card.Subtitle>
                        <Card.Text>
                            тут тоже важный текст
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        redirect: state.auth.loading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        auth: () => dispatch(actionCreators.auth()),
        logout: () => dispatch(actionCreators.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);