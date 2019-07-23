import React, { Component } from 'react'
import ReactMapboxGl, { Marker, Popup, ScaleControl } from 'react-mapbox-gl';
import { connect } from 'react-redux';
import * as mapActionCreators from '../../store/actions/mapActions';
import * as markerActionCreators from '../../store/actions/markerActions';
import { mapboxAccessToken } from '../../config';
import mapboxgl from 'mapbox-gl';
import './index.css'
import classes from './index.module.css'
import MarkerControl from './MarkerControl';
import TranslatableText from "../LanguageProvider/LanguageTranslater";
import { modeTypes } from "../../store/reducers/senderReducer";

const style = 'mapbox://styles/artem062/cjtvvluti12vs1fp8xf46ubk0'; //TODO change map language

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
            default: {
                center: {
                    lat: 55.75222,
                    lng: 37.61556
                },
                zoom: [ 9 ]
            },
            currentMarkerCoords: {
                lat: null,
                lng: null
            },
            markerControl: null,
            markerPutEnable: false,
            markerColors: {
                disabled: 'grey',
                enabled: null
            },
            popupOffset: {
                'left': [10, 0],
                'right': [-10, 0],
                'top': [0, 10],
                'top-left': [0, 10],
                'top-right': [0, 10],
                'bottom': [0, -10],
                'bottom-left': [0, -10],
                'bottom-right': [0, -10]
            },
            intervals: []
        };

        this.onMapLoad = this.onMapLoad.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.onMarkerControlClick = this.onMarkerControlClick.bind(this)
    }

    componentDidMount() {
        const interval = setInterval(() => {
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
                } //TODO marker fly
            }

            if (this.props.newCoords) {
                this.props.putCoords();
                if (this.state.map) {
                    this.state.map.flyTo(this.props.place);
                }
            }
        }, 200);
        this.state.intervals.push(interval);
    }

    componentWillUnmount() {
        this.state.intervals.forEach((interval) => {
            clearInterval(interval)
        })
    }

    onMapLoad(map) {
        this.setState({ map });
        map.addControl(new mapboxgl.NavigationControl(), 'top-left');
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }), 'top-left');
        const markerControl = new MarkerControl();
        map.addControl(markerControl, 'top-left');
        markerControl.button.onclick = this.onMarkerControlClick;
        this.setState({
            markerControl
        });

        //adding 3d buildings

        let isShow = false;
        let currentMode = null;

        if (this.props.mode === modeTypes.fias) {
            if (this.props.allowMarkerPut) {
                markerControl.container.style.visibility = 'visible';
            } else {
                markerControl.container.style.visibility = 'hidden';
            }
        }
        const interval = setInterval(() => {
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

            if (this.props.mode === modeTypes.fias) {
                if (this.props.allowMarkerPut) {
                    markerControl.container.style.visibility = 'visible';
                } else {
                    markerControl.container.style.visibility = 'hidden';
                }
            } else {
                markerControl.container.style.visibility = 'visible';
            }

            if (currentMode !== this.props.mode) {
                if (this.props.mode === modeTypes.fias) {
                    this.setState({
                        markerPutEnable: false
                    });
                    markerControl.marker.style.background = this.state.markerColors.disabled;
                } else {
                    this.setState({
                        markerPutEnable: true
                    });
                    markerControl.marker.style.background = this.state.markerColors.enabled;
                }
                currentMode = this.props.mode
            }
        }, 200);
        this.state.intervals.push(interval);
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
        const alreadyExists = {
            russian: 'Выбранный адрес здесь (выберете незанятый адрес)',
            english: 'This address is here (choose another address)'
        };

        let marker, popup;
        if (this.props.markerCoords.lat && this.props.markerCoords.lng) {
            let address, warning;
            if (this.props.loading) {
                warning =
                    <TranslatableText
                        dictionary={{
                            russian: "Подождите...",
                            english: "Wait..."
                        }}
                    />
            } else if (this.props.error) {
                warning =
                    <TranslatableText
                        dictionary={{
                            russian: `Ошибка: ${ this.props.error.message || this.props.error }`,
                            english: `Error: ${ this.props.error.message || this.props.error }`
                        }}
                    />
            } else {
                if (this.props.address) {
                    address = this.props.mode === modeTypes.fias && !this.props.allowMarkerPut ?
                        alreadyExists[ this.props.language ] : this.props.address
                } else {
                    warning =
                        <TranslatableText
                            dictionary={{
                                russian: "Неизвестный адрес",
                                english: "Unknown address"
                            }}
                        />
                }
            }
            let popupProps = {}, markerProps = {}, additionalWarning = '';
            if (address && this.props.mode === modeTypes.map && this.props.allowAddressInput) {
                popupProps = {
                    onClick: () => this.props.setAddress(address),
                    style: { cursor: 'pointer' }
                };
                markerProps = {
                    style: { background: 'green' }
                };
                additionalWarning = 'Возможный адрес: '
            }
            popup =
                <Popup
                    coordinates={ this.props.markerCoords }
                    offset={ this.state.popupOffset }
                    { ...popupProps }
                >
                    { address ? additionalWarning + address : warning }
                </Popup>;
            marker =
                <Marker
                    coordinates={ this.props.markerCoords }
                    anchor='bottom'
                >
                    <div className={ classes.Marker } { ...markerProps }/>
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
        },
        language: state.auth.language,
        mode: state.sender.mode,
        allowMarkerPut: state.sender.allowMarkerPut,
        allowAddressInput: state.sender.allowAddressInput
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
