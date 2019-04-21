import React, { Component } from 'react'
import { connect } from "react-redux";
import { Container, Row, Col, Table, Card, Image, Pagination } from "react-bootstrap"
import { Redirect } from "react-router-dom";

import TranslatableText from '../../components/LanguageProvider/LanguageTranslater';
import classes from './index.module.css'
import * as actionCreators from "../../store/actions/auth";
import * as mapActionCreators from "../../store/actions/mapActions";
import * as markerActionCreators from "../../store/actions/markerActions";
import generateAddress from "../../store/generateAddress";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.handlePagination = this.handlePagination.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            startPoints: 0,
            activePagination: 1,
            diffPoints: 10,
        }
    }

    componentDidMount() {
        this.props.getProfileInfo();
    }

    handlePagination(number) {
        this.setState({ 
            startPoints: (number - 1) * this.state.diffPoints, 
            activePagination: number,
        });
    }

    handleClick(point) {
        this.props.setAddress(generateAddress(point.address));
        const coords = {
            lat: point.latitude,
            lng: point.longitude
        };
        this.props.setMarkerCoords(coords);
        this.props.setMapCoords(coords);
        this.props.history.push('/add_point')
    }

    render() {
        let diffPoints = this.state.diffPoints;
        if(!localStorage.getItem('username') || localStorage.getItem('username') === '') {
            return <Redirect to='/'/>
        }
        let avatar;
        if(this.props.avatar) {
            avatar = <Image src={ this.props.avatar } className={ classes.Avatar } rounded />
        }

        let pointInfo, myPoints, myPointsTable, lenPoints;
        if (!this.props.points || this.props.points.length === 0) {
            pointInfo =
                <TranslatableText
                    dictionary={{
                        russian: "У вас пока нет добавленных точек",
                        english: "You have no points added yet"
                    }}
                />
        } else {
            lenPoints = this.props.points.length;
            pointInfo =
                <TranslatableText
                    dictionary={{
                        russian: "Ваши точки:",
                        english: "Your points:"
                    }}
                />;
            myPoints = this.props.points.slice(this.state.startPoints, this.state.startPoints + diffPoints).map((point, index) => {
                index++;
                return (
                    <tr 
                        key={ index } 
                        onClick={ () => this.handleClick(point) } 
                        className={ classes.AddressRow }
                    >
                        <td>{ this.state.startPoints + index }</td>
                        <td>{ point.address.region || '-' }</td>
                        <td>{ point.address.locality || '-' }</td>
                        <td>{ point.address.street || '-' }</td>
                        <td>{ point.address.building || '-' }</td>
                        <td>
                            { point.latitude.toFixed(6) }; { point.longitude.toFixed(6) }
                        </td>
                    </tr>
                )});
            myPointsTable = [
                <thead key="0">
                    <tr className={ classes.AddressRow }>
                    <th>
                        <TranslatableText
                            dictionary={{
                                russian: "№",
                                english: "#"
                            }}
                        />
                    </th>
                    <th>
                        <TranslatableText
                            dictionary={{
                                russian: "Регион",
                                english: "Region"
                            }}
                        />
                    </th>
                    <th>
                        <TranslatableText
                            dictionary={{
                                russian: "Населенный пункт",
                                english: "Locality"
                            }}
                        />
                    </th>
                    <th>
                        <TranslatableText
                            dictionary={{
                                russian: "Улица",
                                english: "Street"
                            }}
                        />
                    </th>
                    <th>
                        <TranslatableText
                            dictionary={{
                                russian: "Дом",
                                english: "Building"
                            }}
                        />
                    </th>
                    <th>
                        <TranslatableText
                            dictionary={{
                                russian: "Координаты",
                                english: "Coordinates"
                            }}
                        />
                    </th>
                    </tr>
                </thead>,
                <tbody key="1">
                    { myPoints }
                </tbody>
            ]
        }

        let paginationItems = [];
        let paginationMax = Math.ceil(lenPoints / diffPoints);
        let paginationStart = 1, paginationEnd = paginationMax;
        if (paginationMax !== 1) {
            let paginationPrev = this.state.activePagination === 1 ? 1 : this.state.activePagination - 1;
            let paginationNext = this.state.activePagination === paginationMax ? paginationMax : this.state.activePagination + 1;
            if (paginationMax >= 6) {
                if (this.state.activePagination <= 3) {
                    paginationStart = 1;
                    paginationEnd = 5;
                } else if (this.state.activePagination >= paginationMax - 2) {
                    paginationStart = paginationMax - 4;
                    paginationEnd = paginationMax;
                } else {
                    paginationStart = this.state.activePagination - 2;
                    paginationEnd = this.state.activePagination + 2;
                }
            }
            paginationItems.push(
                <Pagination.Prev onClick={() => this.handlePagination(paginationPrev)} />
            );
            for (let number = paginationStart; number <= paginationEnd; number++) {
                paginationItems.push(
                    <Pagination.Item key={ number } active={ number === this.state.activePagination } onClick={() => this.handlePagination(number) }>
                        {number}
                    </Pagination.Item>,
                );
            }
            paginationItems.push(
                <Pagination.Next onClick={() => this.handlePagination(paginationNext)} />
            );
        }
        return(
            <Container fluid>
                <Row>
                    <Col 
                        xl={{ span: 8, offset: 2 }} 
                        lg={{ span: 10, offset: 1 }} 
                        md={12}
                        xs="auto" 
                    >
                    <Card className={ classes.ProfileCard }>
                        <div className={ classes.ProfileInfo }>
                            <h3>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Личное:",
                                        english: "Personal:"
                                    }}
                                />
                            </h3>
                            <div className={ classes.Username }>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Ваш логин ",
                                        english: "Your login "
                                    }}
                                />
                                &mdash; { this.props.username }
                                <br/>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Ваш аватар ",
                                        english: "Your avatar "
                                    }}
                                />
                                &mdash; { avatar }
                                <br/>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Вы создали точек ",
                                        english: "You created points "
                                    }}
                                />
                                &mdash; { lenPoints }
                            </div>
                            <br/>
                            <h4>{ pointInfo }</h4>
                        </div>
                        <Table striped bordered hover size="sm" responsive className={ classes.Table }> 
                            { myPointsTable }
                        </Table>
                        <Pagination className={ classes.Pagination }>
                            { paginationItems }
                        </Pagination>
                    </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        points: state.auth.points,
        avatar: state.auth.avatar
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getProfileInfo: () => dispatch(actionCreators.getProfileInfo()),
        setAddress: (address) => dispatch(mapActionCreators.setAddress(address)),
        setMarkerCoords: (coords) => dispatch(markerActionCreators.setMarkerCoords(coords)),
        setMapCoords: (coords) => dispatch(mapActionCreators.setMapCoords(coords))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);