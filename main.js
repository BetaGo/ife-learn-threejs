var scene, camera, renderer;

var myMaterial = (function () {
  var carPaint = new THREE.MeshPhongMaterial({
    color: 0xce2121,
    shininess: 85,
    specular: 0xac7575
  });

  var tire = new THREE.MeshLambertMaterial({
    color: 0x1e2325,
    emissive: 0x1a1e20
  });

  var floor = new THREE.MeshLambertMaterial({
    color: 0x12c314,
  });

  return {
    carPaint: carPaint,
    tire: tire,
    floor: floor
  };
})();

var myGeometry = (function () {
  var carBody = new THREE.BoxGeometry(200, 100, 100);
  var tire = new THREE.TorusGeometry(20, 8, 16, 100);
  var floor = new THREE.PlaneGeometry(500,500);

  return {
    carBody: carBody,
    tire: tire,
    floor: floor
  };
})();

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(300, 200, 500);
  camera.lookAt(new THREE.Vector3(0,0,0));


/**
 * mesh
 */
  var mesh = new THREE.Mesh(myGeometry.carBody,myMaterial.carPaint);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  var tire1 = new THREE.Mesh(myGeometry.tire,myMaterial.tire);
  tire1.position.set(50,-50,50);
  tire1.castShadow = true;
  tire1.receiveShadow = true;
  scene.add(tire1);

  var tire2 = new THREE.Mesh(myGeometry.tire,myMaterial.tire);
  tire2.position.set(-50,-50,50);
  tire2.castShadow = true;
  tire1.receiveShadow = true;
  scene.add(tire2);

  var floor = new THREE.Mesh(myGeometry.floor,myMaterial.floor);
  floor.position.set(0,-76,0);
  floor.rotation.set(Math.PI/2*3,0,0);
  floor.receiveShadow = true;
  scene.add(floor);


/**
 * light
 */
  var globalLight = new THREE.AmbientLight(0x606060);
  scene.add(globalLight);

  var light1 = new THREE.DirectionalLight(0xffffff);
  light1.position.set(-500,700,500);
  light1.castShadow = true;
  scene.add(light1);

  light1.shadow.mapSize.width = 512;
  light1.shadow.mapSize.heigh = 512;
  light1.shadow.camera.left = -500;
  light1.shadow.camera.right = 500;
  light1.shadow.camera.top = 500;
  light1.shadow.camera.bottom = -500;
  light1.shadow.camera.near = 0.5;
  light1.shadow.camera.far = 1500;


  var helper = new THREE.CameraHelper(light1.shadow.camera);
  scene.add(helper);

/**
 * render
 */

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    precision: 'highp'
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}