import React, {Component} from 'react'
import ReactMapboxGl, {Marker, Popup, ScaleControl} from 'react-mapbox-gl';
import { connect } from 'react-redux';
import * as mapActionCreators from '../../store/actions/mapActions';
import * as markerActionCreators from '../../store/actions/markerActions';
import { mapboxAccessToken } from '../../config';
import mapboxgl from 'mapbox-gl';

import './index.css'
import classes from './index.module.css'
import MarkerControl from './MarkerControl';

const style = 'mapbox://styles/artem062/cjtvvluti12vs1fp8xf46ubk0';

const Map = ReactMapboxGl({
    accessToken: mapboxAccessToken,
    minZoom: 1,
    logoPosition: 'bottom-right'
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
            },
            markerControl: null,
            markerPutEnable: false,
            markerColors: {
                disabled: 'grey',
                enabled: null
            }
        };

        this.onMapLoad = this.onMapLoad.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.onMarkerControlClick = this.onMarkerControlClick.bind(this)
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

    onMapLoad(map) {
        this.setState({ map });
        map.addControl(new mapboxgl.NavigationControl());
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));
        const markerControl = new MarkerControl();
        map.addControl(markerControl);
        markerControl.button.onclick = this.onMarkerControlClick;
        this.setState({
            markerControl
        });
        if (this.state.markerPutEnable) {
            markerControl.marker.style.background = this.state.markerColors.enabled;
        } else {
            markerControl.marker.style.background = this.state.markerColors.disabled;
        }

        //adding 3d buildings

        let isShow = false;

        setInterval(() => {
            if (map.getPitch() !== 0) {
                if (!isShow) {
                    map.addLayer({
                        'id': '3d-buildings',
                        'source': 'composite',
                        'source-layer': 'building',
                        'filter': ['==', 'extrude', 'true'],
                        'type': 'fill-extrusion',
                        'minzoom': 15,
                        'paint': {
                            'fill-extrusion-color': '#aaa',
                            'fill-extrusion-height': [
                                'interpolate', ['linear'], ['zoom'],
                                15, 0,
                                15.05, ['get', 'height']
                            ],
                            'fill-extrusion-base': [
                                'interpolate', ['linear'], ['zoom'],
                                15, 0,
                                15.05, ['get', 'min_height']
                            ],
                            'fill-extrusion-opacity': .6
                        }
                    });
                    isShow = true
                }
            } else {
                if (isShow) {
                    map.removeLayer('3d-buildings');
                    isShow = false
                }
            }
        }, 200)
    }

    onMarkerControlClick() {
        const markerControl = this.state.markerControl;
        if (!this.state.markerPutEnable) {
            markerControl.marker.style.background = this.state.markerColors.enabled;
        } else {
            markerControl.marker.style.background = this.state.markerColors.disabled;
        }
        this.setState({
            markerPutEnable: !this.state.markerPutEnable
        });
    }

    onMapClick(event) {
        if (!this.props.loading && this.state.markerPutEnable) {
            this.props.setMarkerCoords(event.lngLat)
        }
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
                    style: { cursor: 'pointer' }
                }
            }
            popup =
                <Popup
                    coordinates={ this.props.markerCoords }
                    offset={{
                        'left': [10, 0],
                        'right': [-10, 0],
                        'top': [0, 10],
                        'top-left': [0, 10],
                        'top-right': [0, 10],
                        'bottom': [0, -10],
                        'bottom-left': [0, -10],
                        'bottom-right': [0, -10]
                    }}
                    { ...click }
                    className={ classes.Popup }
                >
                    { address || warning }
                </Popup>;
            marker =
                <Marker
                    coordinates={ this.props.markerCoords }
                    anchor='bottom'
                >
                    <div className={ classes.Marker } />
                </Marker>
        }

        const canvas = document.getElementsByClassName('mapboxgl-canvas')[0];
        if (canvas) {
            if (this.state.markerPutEnable) {
                canvas.className = `mapboxgl-canvas ${ classes.EnabledMarker }`
            } else {
                canvas.className = 'mapboxgl-canvas'
            }
        }

        return (
            // eslint-disable-next-line
            <Map style={ style }
                 { ...this.state.default }
                 onClick={ (map, event) => this.onMapClick(event) }
                 onStyleLoad={ (map) => this.onMapLoad(map) }
            >
                <ScaleControl position='bottom-left'/>
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
                lat: state.map.lat,
                lng: state.map.lng
            },
            zoom: [ state.map.zoom ]
        },
        newCoords: state.map.new,
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
