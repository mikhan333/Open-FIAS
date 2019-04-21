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
import TranslatableText from "../../components/LanguageProvider/LanguageTranslater";

class LoginPage extends Component {
    static authRedirect () {
        window.location.href = authServer;
    }

    render() {
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
                            <Card.Title>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Войти",
                                        english: "Login"
                                    }}
                                />
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                <TranslatableText
                                    dictionary={{
                                        russian: "используя аккаунт OpenStreetMaps",
                                        english: "via OpenStreetMaps"
                                    }}
                                />
                            </Card.Subtitle>
                            <img
                                src={ OSMLogo }
                                className={ classes.Image }
                                alt=''
                            />
                            <Card.Text>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Авторизовавшись через OSM, вы сможете смотреть добавленные объекты в своем профиле",
                                        english: "By logging in via OSM, you can view added points in your profile."
                                    }}
                                />
                            </Card.Text>
                        </Card.Body>
                    </Card>,
                    <Card
                        onClick={ () => this.props.history.push('/add_point') }
                        className={ classes.AnonCard }
                        key='Anonim'
                    >
                        <Card.Body>
                            <Card.Title>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Остаться анонимным пользователем",
                                        english: "Stay Anonymous"
                                    }}
                                />
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                <TranslatableText
                                    dictionary={{
                                        russian: "Ваш вклад останется без автора",
                                        english: "Your contribution will remain without the author"
                                    }}
                                />
                            </Card.Subtitle>
                            <img
                                src={ anonLogo }
                                className={ classes.Image }
                                alt=''
                            />
                            <Card.Text>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Ваши отметки также будут сохранены, но вы не сможете увидеть их в своем профиле",
                                        english: "Your points will also be saved, but you will not be able to see them in your profile."
                                    }}
                                />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ]
        } else {
            cards =
                [
                    <Card
                        onClick={ () => this.props.history.push('/add_point') }
                        className={ classes.SuccessCard }
                        key='Work'
                    >
                        <Card.Body>
                            <Card.Title>
                                <TranslatableText
                                    dictionary={{
                                        russian: "За работу",
                                        english: "Work"
                                    }}
                                />
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                <TranslatableText
                                    dictionary={{
                                        russian: "Для геокодирования все готово",
                                        english: "Ready for geocoding"
                                    }}
                                />
                            </Card.Subtitle>
                            <img
                                src={ workLogo }
                                className={ classes.Image }
                                alt=''
                            />
                            <Card.Text>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Добавляйте метку на карте, заполняйте адрес и отправляйте",
                                        english: "Put a marker on the map, fill in the address and send"
                                    }}
                                />
                            </Card.Text>
                        </Card.Body>
                    </Card>,
                    <Card
                        onClick={ this.props.logout }
                        className={ classes.LogoutCard }
                        key='Logout'
                    >
                        <Card.Body>
                            <Card.Title>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Выйти",
                                        english: "Logout"
                                    }}
                                />
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                <TranslatableText
                                    dictionary={{
                                        russian: "из аккаунта OpenStreetMaps",
                                        english: "of your OpenStreetMaps account"
                                    }}
                                />
                            </Card.Subtitle>
                            <img
                                src={ logoutLogo }
                                className={ classes.Image }
                                alt=''
                            />
                            <Card.Text>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Вы сможете сменить аккаунт или геокодировать анонимно",
                                        english: "You can change account or geocode anonymously."
                                    }}
                                />
                            </Card.Text>
                        </Card.Body>
                    </Card>
            ]
        }
        return (
            <div>
                <div className={ classes.ActionCards }>
                    { cards }
                </div>
                <Card
                    className={ classes.InfoCard }
                    key='Info'
                >
                    <Card.Body>
                        <Card.Text>
                            <TranslatableText
                                dictionary={{
                                    russian: "Геокодирование - это процесс преобразования описания местоположения (например, координат, адреса или названия места) в местоположение на поверхности Земли. В результате геокодирования получаются географические объекты с атрибутами, которые можно использовать для составления карт или пространственного анализа. Посредством геокодирования вы можете быстро находить местоположения разных типов, включая достопримечательности или названия из географического справочника.",
                                    english: "Geocoding is the process of transforming a physical address to a location on the Earth's surface. Geocoding relies on a computer representation of address points, the street / road network, together with postal and administrative boundaries."
                                }}
                            />
                        </Card.Text>
                    </Card.Body>
                </Card>

                <AddAnonimPointsModal/>
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