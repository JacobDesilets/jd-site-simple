
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

export function start_three_d() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    var canvas = document.querySelector("canvas");
    var renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});

    const alight = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( alight );

    const plight = new THREE.PointLight( 0x6155bd, 3, 100 );
    plight.position.set( 50, 50, 50 );
    scene.add( plight );

    var text;
    const loader = new GLTFLoader();
    loader.load( '/static/assets/jd.glb', function ( gltf ) {

        text = gltf.scene
        var newMaterial = new THREE.MeshStandardMaterial({color: 0x83abeb});
        text.traverse((o) => {
            if (o.isMesh) o.material = newMaterial
        });
        scene.add( text );
        init();

    }, undefined, function ( error ) {

        console.error( error );

    } );

    camera.position.z = 3;

    function resize() {
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        if (width != canvas.width || height != canvas.height) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        }
    }

    var clock = new THREE.Clock();
    var speed = 0.5;
    var delta = 0;
    function render() {
        resize();
        delta = clock.getDelta();
        var maxRotation = Math.PI * 2
        text.rotation.x += speed * delta;
        text.rotation.y += speed * delta;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function init() {
        text.position.x += 0.1
        render();
    }
}
