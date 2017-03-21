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

  return {
    carPaint: carPaint,
    tire: tire
  };
})();

var myGeometry = (function () {
  var carBody = new THREE.BoxGeometry(200, 100, 100);
  var tire = new THREE.TorusGeometry(20, 8, 16, 100);

  return {
    carBody: carBody,
    tire: tire
  };
})();

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(300, 400, 500);
  camera.lookAt(new THREE.Vector3(0,0,0));

  var mesh = new THREE.Mesh(myGeometry.carBody,myMaterial.carPaint);
  scene.add(mesh);

  var tire1 = new THREE.Mesh(myGeometry.tire,myMaterial.tire);
  tire1.position.set(50,-50,50);
  scene.add(tire1);

  var tire2 = new THREE.Mesh(myGeometry.tire,myMaterial.tire);
  tire2.position.set(-50,-50,50);
  scene.add(tire2);

  var globalLight = new THREE.AmbientLight(0x606060);
  scene.add(globalLight);

  var light1 = new THREE.DirectionalLight(0xcccccc);
  light1.position.set(3,2,1);
  scene.add(light1);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}