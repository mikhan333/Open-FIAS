import React, { Component } from 'react'
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap"

import classes from './index.module.css'
import * as actionCreators from "../../store/actions/auth";

class Profile extends Component {
    componentDidMount() {
        this.props.getProfileInfo()
    }

    render() {
        let pointInfo, myPoints;
        if (!this.props.points || this.props.points.length === 0) {
            pointInfo =
                <div>
                    У вас пока нет добавленных точек
                </div>
        } else {
            myPoints = this.props.points.map((point, index) => {
                let info = point.fields;
                index++;
                return (
                    <Row
                        key={ index }
                    >
                        <Col md="1" className="border border-info border-top-0">{ index }</Col>
                        <Col md="3" className="border border-info border-top-0 border-left-0">{ info.region || '-' }</Col>
                        <Col md="3" className="border border-info border-top-0 border-left-0">{ info.locality || '-' }</Col>
                        <Col md="2" className="border border-info border-top-0 border-left-0">{ info.street || '-' }</Col>
                        <Col md="1" className="border border-info border-top-0 border-left-0">{ info.building || '-' }</Col>
                        <Col md="1" className="border border-info border-top-0 border-left-0">{ info.latitude.toFixed(3) }</Col>
                        <Col md="1" className="border border-info border-top-0 border-left-0">{ info.longitude.toFixed(3) }</Col>
                    </Row>
                )});
            myPoints.unshift(
                <Row key="0">
                    <Col md="1" className="border border-info">№</Col>
                    <Col md="3" className="border border-info border-left-0">Регион</Col>
                    <Col md="3" className="border border-info border-left-0">Населенный пункт</Col>
                    <Col md="2" className="border border-info border-left-0">Улица</Col>
                    <Col md="1" className="border border-info border-left-0">Дом</Col>
                    <Col md="1" className="border border-info border-left-0">Широта</Col>
                    <Col md="1" className="border border-info border-left-0">Долгота</Col>
                </Row>
            )
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);