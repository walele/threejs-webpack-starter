import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import Stats from 'stats-js';
const dat  = require('dat.gui');

export default class CCWorld{

  constructor(){

    this.scene = null;
    this.capturer = null;
    this.capturerImage = false;
    this.capturerImageStart = false;
    this.capturerVideo = false;
    this.renderer
    this.guiControls;
    this.orbitControls;
    this.stats;
    this.camera;
    this.stats ;
    this.renderCallback;

  }

  init(){
    this.scene = new THREE.Scene();
    this.initRenderer();
    this.initCamera();
    this.initStats();
    //this.initAxesHelper();
    this.initOrbitControl();
    this.initResizeFix();
    this.initGuiControl();

    this.render();
  }

  initCamera(){
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 3000000 );
    this.camera.position.z = 1;
    this.camera.position.y = 1;
    this.camera.position.x = 1;
    //this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  initRenderer(){
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor(new THREE.Color(0x0a0a0a) );
    document.body.appendChild( this.renderer.domElement );
  }

  initStats(){
    this.stats = new Stats();
    this.stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom );
  }

  initLights(){

  }

  initAxesHelper(){
    this.axesHelper = new THREE.AxesHelper( 10 );
    this.scene.add( this.axesHelper );
  }


  initOrbitControl(){
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  initGuiControl(){
    var self = this;
    this.capturerImage = new CCapture( {
      format: 'png',
      display: true,
      timeLimit: 2,
      //	motionBlurFrames: ( 960 / framerate ) * ( document.querySelector('input[name="motion-blur"]').checked ? 1 : 0 ),
      quality: 99,
      framerate: 60
    } );

    var gui_obj = {
      color: "#1861b3",
       capture_image: function () {
         self.capturerImage.start();
         self.capturerImageStart = true;
       },
       capture_video: function () {
         alert('Start video capture');
       },
    };
    this.gui = new dat.gui.GUI();
    this.gui.addColor(gui_obj,'color');
    this.gui.add(gui_obj, 'capture_image').name("Capture image");
    this.gui.add(gui_obj, 'capture_video').name("Capture video");
  }

  initResizeFix(){
    window.addEventListener('resize', () => this.updateSize(), false);
  }

  updateSize(){
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.aspect = ( window.innerWidth / window.innerHeight );
    this.camera.updateProjectionMatrix();
  }

  setRenderCallback(rc){
    this.renderCallback = rc;
  }

  render() {
    this.stats.begin();

    this.renderer.render( this.scene, this.camera );
    if(typeof this.renderCallback === "function"){
      this.renderCallback();
    }

    this.stats.end();

    requestAnimationFrame( this.render.bind(this) );

    // Check for capturerImage
    if( this.capturerImageStart !== false){
      this.capturerImage.capture( this.renderer.domElement );
    }
  }

}
