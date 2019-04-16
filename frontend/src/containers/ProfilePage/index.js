import React, { Component } from 'react'
import { connect } from "react-redux";
import { Container, Row, Col, Table, Card } from "react-bootstrap"
import { Redirect } from "react-router-dom";

import classes from './index.module.css'
import * as actionCreators from "../../store/actions/auth";
import * as mapActionCreators from "../../store/actions/mapActions";
import * as markerActionCreators from "../../store/actions/markerActions";
import generateAddress from "../../store/generateAddress";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.props.getProfileInfo()
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
        if(!localStorage.getItem('username') || localStorage.getItem('username') === '') {
            return <Redirect to='/'/>
        }

        let pointInfo, myPoints, myPointsTable, lenPoints;
        if (!this.props.points || this.props.points.length === 0) {
            pointInfo =
                <div>
                    У вас пока нет добавленных точек
                </div>
        } else { 
            lenPoints = this.props.points.length;
            pointInfo =
                <div>
                    Ваши точки:
                </div>
            myPoints = this.props.points.map((point, index) => {
                index++;
                return (
                    <tr 
                        key={ index } 
                        onClick={ () => this.handleClick(point) } 
                        className={ classes.AddressRow }
                    >
                        <td>{ index }</td>
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
                    <th>№</th>
                    <th>Регион</th>
                    <th>Населенный пункт</th>
                    <th>Улица</th>
                    <th>Дом</th>
                    <th>Координаты</th>
                    </tr>
                </thead>,
                <tbody key="1">
                    { myPoints }
                </tbody>
            ]
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
                            <h3>Личное: </h3>
                            <div className={ classes.Username }>
                                Ваш логин &mdash; { this.props.username }
                                <br/>
                                Вы создали точек &mdash; { lenPoints }
                            </div>
                            <br/>
                            <h4>{ pointInfo }</h4>
                        </div>
                        <Table striped bordered hover size="sm" responsive>
                            { myPointsTable }
                        </Table>
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
        points: state.auth.points
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