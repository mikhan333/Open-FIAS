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
                lat: 55.75222,
                lng: 37.61556
            },
            markerCoordinates: null,
            zoom: this.props.zoom || 10,
            address: ''
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.askAddress(event.latlng);
        this.setState({
            markerCoordinates: event.latlng,
        })
    }

    render() {
        let marker;
        if (this.state.markerCoordinates) {
            marker =
                <Marker position={ this.state.markerCoordinates }>
                    <Popup>{ this.props.address || 'Неизвестный адрес'}</Popup>
                </Marker>
        }

        let coords = {
            lat: 55.75222,
            lng: 37.61556
        };

        if (this.props.coords.lat) {
            coords = this.props.coords
        }

        return (
            <Map
                center={ coords }
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
        coords: {
            lat: state.coordinatesData.coords.lat,
            lng: state.coordinatesData.coords.lng
        },
        address: state.coordinatesData.markerCoords.address,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        askAddress: (coords) => dispatch(actionCreators.askAddress(coords)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMap);
