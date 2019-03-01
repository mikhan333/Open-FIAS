import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/coordinatesData";

import './index.css'

class SideMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinates: {
                lat: this.props.lat || 55.75222,
                lng: this.props.lng || 37.61556
            },
            markerCoordinates: null,
            zoom: this.props.zoom || 10,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onSaveCoords(event.latlng);
        this.setState({
            markerCoordinates: event.latlng,
        })
    }

    render() {
        let marker;
        if (this.state.markerCoordinates) {
            marker =
                <Marker position={ this.state.markerCoordinates }>
                    <Popup>Вы выбрали это место</Popup>
                </Marker>
        }

        return (
            <Map
                center={ this.state.coordinates }
                zoom={ this.state.zoom }
                onClick={ this.handleClick }
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { marker }
            </Map>
        )
    }
}

const mapStateToProps = state => {
    return {
        lat: state.coords.latitude,
        lng: state.coords.longitude
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveCoords: (coords) => dispatch(actionCreators.saveCoordinates(coords)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMap);
