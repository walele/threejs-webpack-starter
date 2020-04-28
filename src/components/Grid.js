import * as THREE from 'three';

/**
* A Generative tree based on a tube geometry and lathe geometry
*/
export default class Grid{

  constructor(size){

    this.size = size;
    this.heightLeaves = 20+Math.random()*20;
    this.radius = 2;
    this.meshesGroup = new THREE.Group();
    this.init();

  }

  init(){
    this.createTree();
    this.creareLeaves();
  }

  getMesh(){
    return this.meshesGroup
  }


  createTree(){

    function CustomSinCurve( scale ) {

    	THREE.Curve.call( this );

    	this.scale = ( scale === undefined ) ? 1 : scale;

    }

    CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
    CustomSinCurve.prototype.constructor = CustomSinCurve;

    CustomSinCurve.prototype.getPoint = function ( t ) {
      var tx = 0; //t * 3 - 1.5;
      var ty = t ;
    	var tz = 0; //Math.sin(t*Math.PI*10);

    	return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
    };

    var path = new CustomSinCurve( this.height );
    var geometry = new THREE.TubeGeometry( path, 2, this.radius, 8, false );
    var material = new THREE.MeshPhongMaterial({color: 0xdd7c72, side: THREE.DoubleSide});
    var mesh = new THREE.Mesh( geometry, material );
    this.meshesGroup.add( mesh );

  }

  creareLeaves(){
    var points = [];
    for ( var i = 0; i < this.heightLeaves; i ++ ) {
    	points.push( new THREE.Vector2( Math.cos( i * 0.2 ) * this.radius+6, i ) );
    }
    var geometry = new THREE.LatheBufferGeometry( points );
    var material = new THREE.MeshPhongMaterial({color: 0x00aa00, side: THREE.DoubleSide});
    var lathe = new THREE.Mesh( geometry, material );
    lathe.position.y = this.height;
    this.meshesGroup.add( lathe );
  }


}
