import './style.css';
import * as THREE from 'three';
import CCWorld from './CCWorld.js';

//
// CC World
//
let ccWorld = new CCWorld();
ccWorld.init();
ccWorld.initAxesHelper();
ccWorld.camera.position.set(50,50,50);
const scene = ccWorld.scene;


// Light
let light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
let spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );
spotLight.castShadow = true;
scene.add( spotLight );


// Geometry example
let geometry = new THREE.TorusBufferGeometry( 10, 3, 16, 100 );
let material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
let torus = new THREE.Mesh( geometry, material );
scene.add( torus );

ccWorld.setRenderCallback(function(){
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;
})