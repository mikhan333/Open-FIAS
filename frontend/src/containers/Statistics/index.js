import React, { Component } from 'react'
import { Carousel } from "react-bootstrap";
import * as actionCreators from "../../store/actions/statsActions";
import { connect } from "react-redux";

import classes from './index.module.css'

class Statistics extends Component {
    componentDidMount() {
        this.props.getStats();
    }

    render() {
        return (
            <Carousel
                className={ classes.Carousel }
                interval={ null }
            >
                <Carousel.Item className={ classes.Item }>
                    1 item
                </Carousel.Item>
                <Carousel.Item className={ classes.Item }>
                    2 item
                </Carousel.Item>
            </Carousel>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        getStats: () => dispatch(actionCreators.getStatistics()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);