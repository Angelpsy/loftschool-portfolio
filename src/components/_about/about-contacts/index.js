/* eslint-disable no-undef */
import './index.scss';
import marker from './assets/map_marker.svg';
import $script from 'scriptjs';
import {client} from '../../../common/scripts/helpers/media';

const KEY = 'AIzaSyBUvfOvtLO2nH98qf4mX5vL-8d2JEelMkY';
const ADDRESS = 'Челябинск, Россия';
const MAPS_OFFSET = {
    lat: 0,
    lng: -0.02, // magic numbers, for offset of maker in page
};

if (client.isMax) {
    MAPS_OFFSET.lat = 0.1; // magic numbers
} else if (client.isMedium) {
    MAPS_OFFSET.lat = 0.075; // magic numbers
} else if (client.isIpad) {
    MAPS_OFFSET.lat = 0.05; // magic numbers
}

// eslint-disable-next-line no-unused-vars,require-jsdoc
function initMap() {
    const styledMapType = new google.maps.StyledMapType(
        [
            {
                featureType: 'landscape.man_made',
                elementType: 'geometry',
                stylers: [{color: '#f2f2f2'}],
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#d6d6d6'}],
            },
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#6c9c5b'}],
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ffffff'}],
            },
        ],
        {name: 'Styled Map'});

    // let uluru = {lat: 55.21, lng: 61.40};

    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': ADDRESS}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            const center = {
                lat: results[0].geometry.location.lat() + MAPS_OFFSET.lat,
                lng: results[0].geometry.location.lng() + MAPS_OFFSET.lng,
            };
            let map = new google.maps.Map(document.querySelector('.js-map'), {
                zoom: 11,
                center,
            });
            map.mapTypes.set('styled_map', styledMapType);
            map.setMapTypeId('styled_map');

            const icon = {
                url: marker,
            };
            new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                icon,
            });
        }
    });
}

window.initMap = initMap;

$script(`https://maps.googleapis.com/maps/api/js?key=${KEY}&callback=initMap`);


// eslint-disable-next-line max-len
// `https://maps.googleapis.com/maps/api/geocode/json?address=%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA,%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&key=${KEY}`
