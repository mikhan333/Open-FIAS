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
    }

    componentDidMount() {
        setInterval(() => {
            if (JSON.stringify(this.props.markerCoords) !== JSON.stringify(this.state.currentMarkerCoords)) {
                this.props.getAddress(this.props.markerCoords);
                this.setState({
                    currentMarkerCoords: this.props.markerCoords,
                })
            }
        }, 200);
    }

    render() {
        let marker;
        if (this.props.markerCoords.lat && this.props.markerCoords.lng) {
            let popup;
            if (this.props.loading) {
                popup = <Popup>Подождите...</Popup>
            } else if (this.props.error) {
                popup = <Popup>Ошибка: { this.props.error.message || this.props.error }</Popup>
            } else {
                if (this.props.address) { //TODO set address after loading finished
                    popup =
                        <Popup
                            onOpen={ () => this.props.setAddress(this.props.address) }
                        >
                            { this.props.address }
                        </Popup>
                } else {
                    popup = <Popup>Неизвестный адрес</Popup>
                }
            }
            marker =
                <Marker position={ this.props.markerCoords }>
                    { popup }
                </Marker>
        }

        return (
            <Map
                center={ this.props.coords }
                zoom={ this.state.zoom }
                onClick={ (event) => this.props.setMarkerCoords(event.latlng) }
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
            lat: state.coordinatesData.data.lat,
            lng: state.coordinatesData.data.lng
        },
        address: state.coordinatesData.markerData.address,
        loading: state.coordinatesData.markerData.loading,
        error: state.coordinatesData.markerData.error,
        markerCoords: {
            lat: state.coordinatesData.markerData.lat,
            lng: state.coordinatesData.markerData.lng
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAddress: (coords) => dispatch(actionCreators.getAddress(coords)),
        setAddress: (address) => dispatch(actionCreators.setAddress(address)),
        setMarkerCoords: (coords) => dispatch(actionCreators.setMarkerCoords(coords))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMap);
