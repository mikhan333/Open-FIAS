import React, { Component } from 'react'
import { Card } from "react-bootstrap";
import * as actionCreators from "../../store/actions/auth";
import { connect } from "react-redux";
import { authServer } from '../../store/serverURLs'

import classes from './index.module.css'

import OSMlogo from '../../static/Openstreetmap_logo.svg.png'
import anonLogo from '../../static/anonim.png'
import workLogo from '../../static/goWork.png'
import logoutLogo from '../../static/logout.png'

class LoginPage extends Component {
    static authRedirect () {
        window.location.href = authServer;
    }

    componentDidMount() {
        this.props.auth();
    }

    render() {
        if(!this.props.username) {
            return (
                <div className={ classes.CardHolder }>
                    <Card
                        onClick={ LoginPage.authRedirect }
                        className={ classes.SuccessCard }
                    >
                        <Card.Body>
                            <Card.Title>Войти</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">используя аккаунт OpenStreetMaps</Card.Subtitle>
                            <img
                                src={ OSMlogo }
                                className={ classes.Image }
                                alt=''
                            />
                            <Card.Text>
                                Авторизовавшись через OSM, вы сможете смотреть довабленные объекты в своем профиле #TODO
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
                            <Card.Subtitle className="mb-2 text-muted">Ваш вклад останется без автора</Card.Subtitle>
                            <img
                                src={ anonLogo }
                                className={ classes.Image }
                                alt=''
                            />
                            <Card.Text>
                                Ваши отметки также будут сохранены, но вы не сможете увидеть их в своем профиле
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
        return (
            <div className={ classes.CardHolder }>
                <Card
                    style={{ width: '18rem' }}
                    onClick={ () => this.props.history.push('/addlink') }
                    className={ classes.SuccessCard }
                >
                    <Card.Body>
                        <Card.Title>За работу</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Для геокодирования все готово</Card.Subtitle>
                        <img
                            src={ workLogo }
                            className={ classes.Image }
                            alt=''
                        />
                        <Card.Text>
                            Добавляйте метку на карте, заполняйте адрес и отправляйте
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card
                    style={{ width: '18rem' }}
                    onClick={ this.props.logout }
                    className={ classes.LogoutCard }
                >
                    <Card.Body>
                        <Card.Title>Выйти</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">из аккаунта OpenStreetMaps</Card.Subtitle>
                        <img
                            src={ logoutLogo }
                            className={ classes.Image }
                            alt=''
                        />
                        <Card.Text>
                            Вы сможете сменить аккаунт или геокодировать анонимно
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        auth: () => dispatch(actionCreators.auth()),
        logout: () => dispatch(actionCreators.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);