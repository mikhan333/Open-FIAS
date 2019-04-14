import React, { Component } from 'react'
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap"
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

        let pointInfo, myPoints;
        if (!this.props.points || this.props.points.length === 0) {
            pointInfo =
                <div>
                    У вас пока нет добавленных точек
                </div>
        } else {
            myPoints = this.props.points.map((point, index) => {
                index++;
                return (
                    <Row
                        key={ index }
                        onClick={ () => this.handleClick(point) }
                        className={ classes.AddressRow }
                    >
                        <Col md="1" className="border border-info border-top-0">{ index }</Col>
                        <Col md="3" className="border border-info border-top-0 border-left-0">{ point.address.region || '-' }</Col>
                        <Col md="2" className="border border-info border-top-0 border-left-0">{ point.address.locality || '-' }</Col>
                        <Col md="2" className="border border-info border-top-0 border-left-0">{ point.address.street || '-' }</Col>
                        <Col md="2" className="border border-info border-top-0 border-left-0">{ point.address.building || '-' }</Col>
                        <Col md="2" className="border border-info border-top-0 border-left-0">
                            { point.latitude.toFixed(6) } { point.longitude.toFixed(6) }
                        </Col>
                    </Row>
                )});
            myPoints = [
                <Row key="0">
                    <Col md="1" className="border border-info">№</Col>
                    <Col md="3" className="border border-info border-left-0">Регион</Col>
                    <Col md="2" className="border border-info border-left-0">Населенный пункт</Col>
                    <Col md="2" className="border border-info border-left-0">Улица</Col>
                    <Col md="2" className="border border-info border-left-0">Дом</Col>
                    <Col md="2" className="border border-info border-left-0">Координаты</Col>
                </Row>,
                ...myPoints
            ]
        }

        return(
            <div className={ classes.Profile }>
                <div className={ classes.Username }>
                    { this.props.username }
                </div>
                { pointInfo }
                <Container>
                    { myPoints }
                </Container>
            </div>
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