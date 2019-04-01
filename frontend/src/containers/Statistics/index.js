import React, { Component } from 'react'
import { Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import { Line } from 'react-chartjs-2';
import * as actionCreators from "../../store/actions/statsActions";
import CentrifugeClass from "../../components/Centrifuge/Centrifuge";
import generateAddress from "../../store/generateAddress"

import classes from './index.module.css'

class Statistics extends Component {
    componentDidMount() {
        this.props.getStats();
    }

    render() {
        const latestPoints = this.props.latestPoints.map( (point, index) =>
            <li key={ index }>
                { point.author || 'Неавторизованный' } : { generateAddress(point.address) }
            </li>
        );

        const usersTop = this.props.usersTop.map((user, index) =>
            <li key={ index }>
                { user.username } (загеокодировал точек: { user.count_points })
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
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
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
                        labelString: 'точек загеокодированно'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'дней назад',
                    }
                }],
            }
        };

        return (
            <div className={ classes.CarouselDiv }>
                <Carousel
                    className={ classes.Carousel }
                    interval={ null }
                >
                    <Carousel.Item className={ classes.Item }>
                        <h3>Всего точек загеокодированно: { this.props.pointsCount }</h3>
                        <ol>
                            { latestPoints }
                        </ol>
                    </Carousel.Item>
                    <Carousel.Item className={ classes.Item }>
                        <div className={ classes.Graph }>
                            <h3>График загеокодированных точек</h3>
                            <Line
                                data={ data }
                                options={ options }
                            />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item className={ classes.Item }>
                        <h3>Всего зарегистрированно пользователей: { this.props.usersCount }</h3>
                        <ol>
                            { usersTop }
                        </ol>
                    </Carousel.Item>
                </Carousel>
                <CentrifugeClass/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        latestPoints: state.stats.latestPoints,
        usersTop: state.stats.usersTop,
        pointsPerDay: state.stats.pointsPerDay,
        usersCount: state.stats.usersCount,
        pointsCount: state.stats.pointsCount
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getStats: () => dispatch(actionCreators.getStatistics()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);