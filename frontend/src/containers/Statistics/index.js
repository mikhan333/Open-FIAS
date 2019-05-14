import React, { Component } from 'react'
import {Card, Col, Container, Modal, Row} from "react-bootstrap";
import { connect } from "react-redux";
import { Line } from 'react-chartjs-2';
import * as actionCreators from "../../store/actions/statsActions";
import CentrifugeClass from "../../components/Centrifuge/Centrifuge";
import generateAddress from "../../store/generateAddress"

import classes from './index.module.css'
import TranslatableText from "../../components/LanguageProvider/LanguageTranslater";

class Statistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            xLabels: {
                russian: 'дней назад',
                english: 'days ago'
            },
            yLabels: {
                russian: 'точек загеокодировано',
                english: 'points were putted'
            },
            pointsLimit: 5,
            usersLimit: 5,
            modalsShow: {
                pointsList: false,
                usersTop: false,
                graph: false
            }
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
        this.props.getStats();
    }

    handleOpen(modal) {
        this.setState({
            modalsShow: {
                ...this.state.modalShow,
                [modal]: true
            }
        })
    }

    handleClose() {
        this.setState({
            modalsShow: {
                pointsList: false,
                usersTop: false,
                graph: false
            }
        })
    }

    render() {
        const unauthorized = (
            <TranslatableText
                dictionary={{
                    russian: "Неавторизованный",
                    english: "Unauthorized"
                }}
            />
        );

        const latestPoints = this.props.latestPoints.map( (point, index) =>
            <li key={ index }>
                { point.author || unauthorized } : { generateAddress(point.address) }
            </li>
        );

        const usersTop = this.props.usersTop.map((user, index) =>
            <li key={ index }>
                { user.username } (
                <TranslatableText
                    dictionary={{
                        russian: "загеокодировал точек: ",
                        english: "put points: "
                    }}
                /> { user.count_points })
            </li>
        );

        let graphData = [];
        let labels = [];

        this.props.pointsPerDay.forEach((day) => {
            graphData.push(day.count);
            labels.push(day.days)
        });

        const data = {
            labels: labels.reverse(),
            datasets: [
                {
                    lineTension: 0.1,
                    borderColor: 'rgba(75,192,192,1)',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: graphData.reverse()
                }
            ]
        };

        const options = {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: this.state.yLabels[ this.props.language ]
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: this.state.xLabels[ this.props.language ]
                    }
                }],
            },
            tooltips : {
                displayColors: false,
                callbacks: {
                    title: () => ''
                }
            }
        };

        const pointsListHeader = (
            <>
                <TranslatableText
                    dictionary={{
                        russian: "Всего точек загеокодированно: ",
                        english: "Total points were putted:"
                    }}
                /> { this.props.pointsCount }
            </>
        );

        const pointsListCard = (
            <Card className={ classes.ListCard } onClick={ () => this.handleOpen('pointsList') }>
                <Card.Header><h6>{ pointsListHeader }</h6></Card.Header>
                <Card.Body className={ classes.List }>
                    <ol>
                        { latestPoints.slice(0, this.state.pointsLimit) }
                    </ol>
                </Card.Body>
            </Card>
        );

        const graphHeader = (
            <TranslatableText
                dictionary={{
                    russian: "График загеокодированых точек",
                    english: "Chart of logged points"
                }}
            />
        );

        const graphCard = (
            <Card className={ classes.GraphCard } onClick={ () => this.handleOpen('graph') }>
                <Card.Header><h6>{ graphHeader }</h6></Card.Header>
                <Card.Body>
                    <Line
                        data={ data }
                        options={ options }
                        width={ window.innerWidth }
                        height={ (window.innerHeight - 56) / 2 - 49 }
                    />
                </Card.Body>
            </Card>
        );

        const usersTopHeader = (
            <>
                <TranslatableText
                    dictionary={{
                        russian: "Всего зарегистрированно пользователей: ",
                        english: "Total registered users: "
                    }}
                /> { this.props.usersCount }
            </>
        );

        const usersTopCard = (
            <Card className={ classes.ListCard } onClick={ () => this.handleOpen('usersTop') }>
                <Card.Header><h6>{ usersTopHeader }</h6></Card.Header>
                <Card.Body className={ classes.List }>
                    <ol>
                        { usersTop.slice(0, this.state.usersLimit) }
                    </ol>
                </Card.Body>
            </Card>
        );

        return (
            <>
                <Container className={ classes.Container }>
                    {/* <Row className={ classes.ListsRow }>
                        <Col className={ classes.ListCol }>
                            { pointsListCard }
                        </Col>
                        <Col className={ classes.ListCol }>
                            { usersTopCard }
                        </Col>
                    </Row> */}
                    <Row className={ classes.GraphRow }>
                        { graphCard }
                    </Row>
                </Container>

                <Modal
                    size="lg"
                    show={ this.state.modalsShow.pointsList }
                    onHide={ this.handleClose }
                >
                    <Modal.Header closeButton>
                        <h3>
                            { pointsListHeader }
                        </h3>
                    </Modal.Header>
                    <Modal.Body>
                        <ol className={ classes.List }>
                            { latestPoints }
                        </ol>
                    </Modal.Body>
                </Modal>

                <Modal
                    size="lg"
                    show={ this.state.modalsShow.usersTop }
                    onHide={ this.handleClose }
                >
                    <Modal.Header closeButton>
                        <h3>
                            { usersTopHeader }
                        </h3>
                    </Modal.Header>
                    <Modal.Body>
                        <ol className={ classes.List }>
                            { usersTop }
                        </ol>
                    </Modal.Body>
                </Modal>

                <Modal
                    show={ this.state.modalsShow.graph }
                    onHide={ this.handleClose }
                    dialogClassName={ classes.GraphModal }
                >
                    <Modal.Header closeButton>
                        <h3>
                            { graphHeader }
                        </h3>
                    </Modal.Header>
                    <Modal.Body>
                        <Line
                            data={ data }
                            options={ options }
                        />
                    </Modal.Body>
                </Modal>

                <CentrifugeClass />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        latestPoints: state.stats.latestPoints,
        usersTop: state.stats.usersTop,
        pointsPerDay: state.stats.pointsPerDay,
        usersCount: state.stats.usersCount,
        pointsCount: state.stats.pointsCount,
        language: state.auth.language
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getStats: () => dispatch(actionCreators.getStatistics()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);