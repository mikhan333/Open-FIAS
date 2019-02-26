import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'

import './index.css'

class SideMap extends Component {
    state = {
        place: 'Moscow',
        lat: 55.75222,
        lng: 37.61556,
        zoom: 10,
    };

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </Map>
        )
    }
}

export default SideMap;