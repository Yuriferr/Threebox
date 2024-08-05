import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import * as THREE from 'three'; // Certifique-se de que esta é a única importação de THREE

import 'mapbox-gl/dist/mapbox-gl.css';

import './Map.css';

export default function Map() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwaWF0ZWNoIiwiYSI6ImNseGw5NDBscDA3dTEyaW9wcGpzNWh2a24ifQ.J3_X8omVDBHK-QAisBUP1w';

    if (mapRef.current) return; // Initialize map only once

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-73.97627, 40.75155],
      zoom: 15.4,
      pitch: 64.9,
      bearing: 172.5,
      antialias: true
    });

    mapRef.current.on('load', () => {
      mapRef.current.addLayer({
        id: 'custom-threebox-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, gl) {
          window.tb = new Threebox(
            map,
            gl, //get the context from Mapbox
            { defaultLights: true }
          );
          var geometry = new THREE.BoxGeometry(30, 60, 120);
          let cube = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0x660000 }));
          cube = tb.Object3D({ obj: cube, units: 'meters' });
          cube.setCoords([-3.460539968876, 40.4849214450]);
          tb.add(cube);
        },
        render: function (gl, matrix) {
          tb.update(); //update Threebox scene
        }
      });
    });
  }, []);

  return <div id="map" ref={mapContainerRef} className='mapContainer'></div>;
};