window.addEventListener("DOMContentLoaded", init);

function init() {

  const width=document.getElementById('canvas4').clientWidth;
  const height=document.getElementById('canvas4').clientHeight;
  
  //「レンダラー」引数にはHTMLのid名を。
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas4")
    ,alpha:true
    ,antialias: true
  });
  //レンダラーサイズ
  renderer.setSize(width, height);
  //レンダラーサイズ(レスポンシブ)
  renderer.setPixelRatio(window.devicePixelRatio);


  //「シーン」
  const scene = new THREE.Scene();

  //「カメラ」上から画角, アスペクト比, 描画開始距離, 描画終了距離
  const camera = new THREE.PerspectiveCamera(
    50,
    width / height,
    0.1,
    100
  );
  //カメラ位置
  camera.position.set(0, 0, 8);

  //「ライト」
  const light = new THREE.PointLight(0xFFFFFF, 2, 50, 1.0); //光の種類と色
  light.position.set(0,0,0); //光の位置
  // ライトをシーンに追加
  scene.add(light);

  const dlight = new THREE.DirectionalLight(0xFFFFFF, 1);
    dlight.position.set(0, 2, 2);
      scene.add(dlight);

  //model
  const loader = new THREE.GLTFLoader();
  const url = 'https://raw.githubusercontent.com/kamuYasiro/model-test/main/light.gltf';
  loader.load(url, (data) => {
    const gltf = data;
    const object = gltf.scene;
    scene.add(object);
  });

  // OrbitControls の追加
  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;
  //カメラ初期位置
  controls.target.set(0, 1.5, 0);

  // レンダリング
  const animation = () => {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animation);
  };

  animation();
  

}