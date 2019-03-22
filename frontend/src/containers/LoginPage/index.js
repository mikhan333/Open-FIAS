import React, { Component } from 'react'
import { Card } from "react-bootstrap";
import * as actionCreators from "../../store/actions/auth";
import { connect } from "react-redux";
import { authServer } from '../../store/serverURLs'

import AddAnonimPointsModal from './AddAnonimPointsModal'
import classes from './index.module.css'

import OSMLogo from '../../static/Openstreetmap_logo.svg.png'
import anonLogo from '../../static/anonim.png'
import workLogo from '../../static/goWork.png'
import logoutLogo from '../../static/logout.png'

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: true
        };

        this.modalClose = this.modalClose.bind(this)
    }


    static authRedirect () {
        window.location.href = authServer;
    }

    modalClose() {
        localStorage.setItem('justLogged', 'false');
        this.setState({
            modalShow: false
        })
    }

    render() {
        let modal;
        if (this.state.modalShow &&
            localStorage.getItem('justLogged') &&
            localStorage.getItem('justLogged') === 'true' &&
            localStorage.getItem('hasAddedPoints') &&
            localStorage.getItem('hasAddedPoints') === 'true') {
            modal =
                <AddAnonimPointsModal
                    onHide={ this.modalClose }
                />
        }

        let cards;
        if(!this.props.username) {
            cards =
                [
                    <Card
                        onClick={ LoginPage.authRedirect }
                        className={ classes.SuccessCard }
                        key='Login'
                    >
                        <Card.Body>
                            <Card.Title>Войти</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">используя аккаунт OpenStreetMaps</Card.Subtitle>
                            <img
                                src={ OSMLogo }
                                className={ classes.Image }
                                alt=''
                            />
                            <Card.Text>
                                Авторизовавшись через OSM, вы сможете смотреть добавленные объекты в своем профиле
                            </Card.Text>
                        </Card.Body>
                    </Card>,
                    <Card
                        onClick={ () => this.props.history.push('/addlink') }
                        className={ classes.AnonCard }
                        key='Anonim'
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
                ]
        } else {
            cards =
                [
                    <Card
                        onClick={ () => this.props.history.push('/addlink') }
                        className={ classes.SuccessCard }
                        key='Work'
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
                    </Card>,
                    <Card
                        onClick={ this.props.logout }
                        className={ classes.LogoutCard }
                        key='Logout'
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
            ]
        }
        return (
            <div className={ classes.CardHolder}>
                <div className={ classes.ActionCards }>
                    { cards }
                </div>
                <Card
                    className={ classes.InfoCard }
                    key='Info'
                >
                    <Card.Body>
                        <Card.Text>
                            Геокодирование - это процесс преобразования описания местоположения
                            (например, координат, адреса или названия места) в местоположение на поверхности Земли.
                            В результате геокодирования получаются географические объекты с атрибутами,
                            которые можно использовать для составления карт или пространственного анализа.
                            Посредством геокодирования вы можете быстро находить местоположения разных типов,
                            включая достопримечательности или названия из географического справочника.
                        </Card.Text>
                    </Card.Body>
                </Card>

                { modal }
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
        logout: () => dispatch(actionCreators.logout()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);