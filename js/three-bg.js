// ============================================
// THREE.JS ANIMATED BACKGROUND
// Matrix Rain + Particle Network
// ============================================

(function() {
  'use strict';

  let scene, camera, renderer, particles, matrixRain;
  let animationId;
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    createParticleNetwork();
    createFloatingGeometry();
    animate();

    window.addEventListener('resize', onResize);
    document.addEventListener('mousemove', onMouseMove);
  }

  let mouseX = 0, mouseY = 0;
  function onMouseMove(e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  }

  function createParticleNetwork() {
    const count = window.innerWidth < 768 ? 800 : 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      // Mix green, cyan, and dim particles
      const r = Math.random();
      if (r < 0.7) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 0.2;
      } else if (r < 0.85) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 0.8;
      } else {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.2; colors[i * 3 + 2] = 0.08;
      }

      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    particles = new THREE.Points(geo, mat);
    scene.add(particles);
  }

  function createFloatingGeometry() {
    // Wireframe icosahedra floating around
    const geoData = [
      { geo: new THREE.IcosahedronGeometry(3, 1), pos: [-15, 8, -10], speed: 0.003 },
      { geo: new THREE.OctahedronGeometry(2, 0), pos: [16, -6, -15], speed: 0.005 },
      { geo: new THREE.TetrahedronGeometry(2.5, 0), pos: [-18, -10, -5], speed: 0.004 },
      { geo: new THREE.IcosahedronGeometry(1.5, 0), pos: [12, 12, -8], speed: 0.006 },
    ];

    geoData.forEach(item => {
      const mat = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      });
      const mesh = new THREE.Mesh(item.geo, mat);
      mesh.position.set(...item.pos);
      mesh.userData.speed = item.speed;
      mesh.userData.floatOffset = Math.random() * Math.PI * 2;
      scene.add(mesh);
    });
  }

  let time = 0;
  function animate() {
    animationId = requestAnimationFrame(animate);
    time += 0.005;

    // Rotate particles slowly
    if (particles) {
      particles.rotation.y = time * 0.05;
      particles.rotation.x = mouseY * 0.3;
    }

    // Animate floating geometries
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        child.rotation.x += child.userData.speed || 0.003;
        child.rotation.y += (child.userData.speed || 0.003) * 1.3;
        child.position.y += Math.sin(time + child.userData.floatOffset) * 0.008;
      }
    });

    // Smooth camera sway
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 3 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Start when THREE is loaded
  if (typeof THREE !== 'undefined') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();
