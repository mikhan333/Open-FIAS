import React, { Component } from 'react'
import ReactMapboxGl, { Marker, ZoomControl, Popup } from "react-mapbox-gl";
import { connect } from "react-redux";
import * as mapActionCreators from "../../store/actions/mapActions";
import * as markerActionCreators from "../../store/actions/markerActions";
import { mapboxAccessToken } from "../../config";

import './index.css'
import classes from './index.module.css'

const style = "mapbox://styles/artem062/cjtvvluti12vs1fp8xf46ubk0";

const Map = ReactMapboxGl({ accessToken: mapboxAccessToken });

class SideMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: this.props.coords,
            currentCoords: this.props.coords,
            currentMarkerCoords: {
                lat: null,
                lng: null
            } //TODO zoom changing
        };
    }

    componentDidMount() {
        setInterval(() => {
            if (JSON.stringify(this.props.markerCoords) !== JSON.stringify(this.state.currentMarkerCoords)) {
                this.props.getAddress(this.props.markerCoords);
                this.setState({
                    currentMarkerCoords: this.props.markerCoords,
                    coords: this.props.markerCoords.lat ? this.props.markerCoords : this.props.coords
                })
            }
            if (JSON.stringify(this.props.coords) !== JSON.stringify(this.state.currentCoords)) {
                this.setState({
                    coords: this.props.coords,
                    currentCoords: this.state.coords
                });
            }
        }, 200);
    }

    render() {
        let marker, popup;
        if (this.props.markerCoords.lat && this.props.markerCoords.lng) {
            let address;
            if (this.props.loading) {
                address = 'Подождите...'
            } else if (this.props.error) {
                address = `Ошибка: ${ this.props.error.message || this.props.error }`
            } else {
                if (this.props.address) {
                    address = this.props.address
                } else {
                    address = 'Неизвестный адрес'
                }
            }
            popup =
                <Popup
                    coordinates={ this.props.markerCoords }
                    offset={{
                        'bottom-left': [0, -20],
                        'bottom': [0, -20],
                        'bottom-right': [0, -20],
                        'left': [10, -10],
                        'right': [-10, -10]
                    }}
                    onClick={ () => this.props.setAddress(address) }
                    className={ classes.Popup }
                >
                    { address }
                </Popup>;
            marker =
                <Marker
                    coordinates={ this.props.markerCoords }
                >
                    <div className={ classes.Marker } />
                </Marker>
        }

        return (
            <Map
                center={ this.state.coords }
                style={ style }
                onClick={ (map, event) => this.props.setMarkerCoords(event.lngLat) }
            >
                <ZoomControl/>

                { marker }
                { popup }
            </Map>
        )
    }
}

const mapStateToProps = state => {
    return {
        coords: {
            lat: state.map.data.lat,
            lng: state.map.data.lng
        },
        zoom: state.map.data.zoom,
        address: state.marker.address,
        loading: state.marker.loading,
        error: state.marker.error,
        markerCoords: {
            lat: state.marker.lat,
            lng: state.marker.lng
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAddress: (coords) => dispatch(markerActionCreators.getAddress(coords)),
        setAddress: (address) => dispatch(mapActionCreators.setAddress(address)),
        setMarkerCoords: (coords) => dispatch(markerActionCreators.setMarkerCoords(coords))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMap);
