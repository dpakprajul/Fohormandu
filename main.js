import './style.css';
import { Map, View } from 'ol';

import { Control, defaults as defaultControls } from 'ol/control';
import Draw from 'ol/interaction/Draw';
import 'ol/ol.css';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';

class RotateNorthControl extends Control {
    /**
     * @param {Object} [opt_options] Control options.
     */
    constructor(opt_options) {
        const options = opt_options || {};

        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-map-pin"></i>';

        const element = document.createElement('div');
        element.className = 'rotate-north ol-unselectable ol-control';
        element.appendChild(button);

        super({
            element: element,
            target: options.target,
        });

        button.addEventListener('click', this.handleRotateNorth.bind(this), false);
    }

    handleRotateNorth() {
        // this.getMap().getView().setRotation(0);
        $('#exampleModal').modal('show');

    }
}

const raster = new TileLayer({
    source: new OSM(),
});

const source = new VectorSource({ wrapX: false });

const vector = new VectorLayer({
    source: source,
});

const map = new Map({
    controls: defaultControls().extend([new RotateNorthControl()]),
    layers: [raster, vector],
    target: 'map',
    view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
    }),
});

const typeSelect = $('#type')[0];

$(".card-link1").click(function() {
    if ((".card-link1")[0]) {
        const value = "Point";
        console.log(value);
    }
});
$(".card-link2").click(function() {
    if ((".card-link2")[0]) {
        const value = "Line";
        console.log(value);
    }
});

$(".card-link3").click(function() {
    if ((".card-link1")[0]) {
        const value = "Polygon";
        console.log(value);
    }
});


let draw; // global so we can remove it later
function addInteraction() {
    const value = typeSelect.value;
    if (value !== 'None') {
        draw = new Draw({
            source: source,
            type: typeSelect.value,
        });
        map.addInteraction(draw);
    }
}

/**
 * Handle change event.
 */
typeSelect.onchange = function() {
    map.removeInteraction(draw);
    addInteraction();
};

document.getElementById('undo').addEventListener('click', function() {
    draw.removeLastPoint();
});

addInteraction();




//control