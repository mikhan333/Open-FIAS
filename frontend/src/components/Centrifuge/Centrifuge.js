import Centrifuge from 'centrifuge';
import jwt from 'jsonwebtoken';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from "../../store/actions/statsActions";
import { centrifugeSecret } from "../../config";

class CentrifugeClass extends Component {

    componentDidMount() {
        const token = jwt.sign({ sub: null }, centrifugeSecret, { expiresIn: 86400 });
        const centrifuge = new Centrifuge('ws://172.17.0.1:8081/centrifugo/connection/websocket');
        centrifuge.setToken(token);
        centrifuge.subscribe('latest_points', message => {
            this.props.onAddPoint(message.data);
        });
        centrifuge.connect();
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPoint: (point) => dispatch(actionCreators.addPoint(point)),
    }
};

export default connect(null ,mapDispatchToProps)(CentrifugeClass);
