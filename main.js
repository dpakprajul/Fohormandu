import './style.css';
import { Map, View } from 'ol';

import { ZoomToExtent, Control, defaults as defaultControls, Zoom } from 'ol/control';
import Draw from 'ol/interaction/Draw';
import 'ol/ol.css';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import TileJSON from 'ol/source/TileJSON';


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

const rasterLayer = new TileLayer({
    source: new TileJSON({
        url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1',
        crossOrigin: '',
    }),
});

const map = new Map({
    controls: defaultControls().extend([new ZoomToExtent({
            extent: [
                813079.7791264898, 5929220.284081122, 848966.9639063801,
                5936863.986909639,
            ],
        }

    )]).extend([new RotateNorthControl()]),

    layers: [raster, rasterLayer, vector],
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

const opacityInput = document.getElementById('opacity-input');
const opacityOutput = document.getElementById('opacity-output');
const check = document.getElementById('check');

function update() {
    const opacity = parseFloat(opacityInput.value);
    rasterLayer.setOpacity(opacity);
    opacityOutput.innerText = opacity.toFixed(2);
    $("#check").click(function() {
        if (this.checked) { rasterLayer.setVisible(0); } else {
            rasterLayer.setVisible(1);
        }
    });

}
opacityInput.addEventListener('input', update);
opacityInput.addEventListener('change', update);


update();






//control