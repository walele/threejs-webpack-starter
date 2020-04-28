import * as THREE from 'three';

/**
* A Generative tree based on a tube geometry and lathe geometry
*/
export default class PalmThree{

  constructor(height){

    this.height = height;
    this.heightLeaves = 50+Math.random()*20;
    this.r = Math.random();
    this.radiusExp = 1+ Math.random() * 10;
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
    var points = [],
      x=0,
      y=0;
    for (  y = 0; y < this.heightLeaves; y++ ) {
      //  x =  Math.cos( y * 0.2 ) * Math.cos(y*this.r) * this.radius+6;
      x = this.radius +  Math.cos( y * 0.2 ) * Math.sin( y * this.r ) * this.radiusExp ; //* Math.cos(y*this.r) * this.radius+6;
      x = Math.abs(x);
      points.push( new THREE.Vector2(x, y ) );
    }
    while(x>0){
      x =  x - (x/2) ;
      x = x-1;
      y++;
      if(x<0){
        x=0;
      }
      points.push( new THREE.Vector2(x, y ) );
    }
    var geometry = new THREE.LatheBufferGeometry( points );
    var material = new THREE.MeshPhongMaterial({color: 0x00aa00, side: THREE.DoubleSide});
    var lathe = new THREE.Mesh( geometry, material );
    lathe.position.y = this.height;
    this.meshesGroup.add( lathe );
  }


}
