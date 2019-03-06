import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/coordinatesData";

import './index.css'

class SideMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMarkerCoords: {
                lat: null,
                lng: null
            },
            zoom: this.props.zoom || 10,
        };

        this.handleClick = this.handleClick.bind(this);

        setInterval(() => {
            if (JSON.stringify(this.props.markerCoordinates) !== JSON.stringify(this.state.currentMarkerCoords)) {
                this.props.askAddress(this.props.markerCoordinates);
                this.setState({
                    currentMarkerCoords: this.props.markerCoordinates,
                })
            }
        }, 200);
    }

    handleClick(event) {
        this.props.setMarkerCoords({
            lat: event.latlng.lat,
            lng: event.latlng.lng
        });
    }

    render() {
        let marker;
        if (this.props.markerCoordinates.lat && this.props.markerCoordinates.lng) {
            let popup;
            if (this.props.address) {
                if (this.props.address !== 'Подождите...') {
                    popup =
                        <Popup
                            onOpen={ () => this.props.setAddress(this.props.address) }
                        >{ this.props.address }</Popup>
                } else {
                    popup = <Popup>{ 'Подождите...' }</Popup>
                }
            } else {
                popup = <Popup>{ 'Неизвестный адрес' }</Popup>
            }
            marker =
                <Marker position={ this.props.markerCoordinates }>
                    { popup }
                </Marker>
        }

        return (
            <Map
                center={ this.props.coords }
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
        markerCoordinates: {
            lat: state.coordinatesData.markerCoords.lat,
            lng: state.coordinatesData.markerCoords.lng
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        askAddress: (coords) => dispatch(actionCreators.askAddress(coords)),
        setAddress: (address) => dispatch(actionCreators.setAddress(address)),
        setMarkerCoords: (coords) => dispatch(actionCreators.setMarkerCoords(coords))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMap);
