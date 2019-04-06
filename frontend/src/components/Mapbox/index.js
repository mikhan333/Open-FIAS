import React, { Component } from 'react'
import ReactMapboxGl, { Marker, ZoomControl, Popup } from "react-mapbox-gl";
import { connect } from "react-redux";
import * as mapActionCreators from "../../store/actions/mapActions";
import * as markerActionCreators from "../../store/actions/markerActions";
import { mapboxAccessToken } from "../../config";

import './index.css'
import classes from './index.module.css'

const style = "mapbox://styles/artem062/cjtvvluti12vs1fp8xf46ubk0";

const Map = ReactMapboxGl({
    accessToken: mapboxAccessToken,
    minZoom: 1
});

class SideMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            default: this.props.place,
            currentMarkerCoords: {
                lat: null,
                lng: null
            }
        };
    }

    componentDidMount() {
        setInterval(() => {
            if (JSON.stringify(this.props.markerCoords) !== JSON.stringify(this.state.currentMarkerCoords)) {
                this.setState({
                    currentMarkerCoords: this.props.markerCoords
                });
                if (JSON.stringify(this.props.markerCoords) !== JSON.stringify({ lat: null, lng: null })) {
                    this.props.getAddress(this.props.markerCoords);
                    if (this.state.map) {
                        this.state.map.flyTo({
                            center: this.props.markerCoords
                        })
                    }
                }
            }

            if (this.props.newCoords) {
                this.props.putCoords();
                if (this.state.map) {
                    this.state.map.flyTo(this.props.place);
                }
            }
        }, 200);
    }

    render() {
        let marker, popup;
        if (this.props.markerCoords.lat && this.props.markerCoords.lng) {
            let address, warning;
            if (this.props.loading) {
                warning = 'Подождите...'
            } else if (this.props.error) {
                warning = `Ошибка: ${ this.props.error.message || this.props.error }`
            } else {
                if (this.props.address) {
                    address = this.props.address
                } else {
                    warning = 'Неизвестный адрес'
                }
            }
            let click = {};
            if (address) {
                click = {
                    onClick: () => this.props.setAddress(address),
                    style: { cursor: "pointer" }
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
                    { ...click }
                    className={ classes.Popup }
                >
                    { address || warning }
                </Popup>;
            marker =
                <Marker
                    coordinates={ this.props.markerCoords }
                >
                    <div className={ classes.Marker } />
                </Marker>
        }

        return (
            // eslint-disable-next-line
            <Map style={ style }
                { ...this.state.default }
                onClick={ (map, event) => this.props.setMarkerCoords(event.lngLat) }
                onStyleLoad={ (map) => { this.setState({ map }) } }
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
        place: {
            center: {
                lat: state.map.data.lat,
                lng: state.map.data.lng
            },
            zoom: [ state.map.data.zoom ]
        },
        newCoords: state.map.data.new,
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
        setMarkerCoords: (coords) => dispatch(markerActionCreators.setMarkerCoords(coords)),
        putCoords: () => dispatch(mapActionCreators.putCoords())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMap);
