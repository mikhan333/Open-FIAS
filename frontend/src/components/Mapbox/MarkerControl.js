import classes from "./index.module.css";

export class MarkerControl {
    onAdd(map) {
        this.map = map;

        this.container = document.createElement('div');
        this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

        this.button = document.createElement('button');
        this.button.className = 'mapboxgl-ctrl-icon';
        this.container.appendChild(this.button);

        this.marker = document.createElement('div');
        this.marker.className = classes.Marker;
        this.button.appendChild(this.marker);

        return this.container;
    }

    onRemove() {
        this.container.parentNode.removeChild(this.container);
        this.map = undefined;
    }
}