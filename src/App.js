import React, { useRef, useEffect } from 'react';
import * as Three from "three";

export default function App() {

  const scene = new Three.Scene();
  const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new Three.WebGLRenderer();
  const canvasDivRef = useRef(null);

  renderer.setSize(window.innerWidth, window.innerHeight);

  const element = renderer.domElement;

  useEffect(() => {
    canvasDivRef.current.appendChild(element);

    const geometry = new Three.BoxGeometry();
    const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Three.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

    }

    animate();

  }, []);


  return (
    <div ref={canvasDivRef}>

    </div>
  );
}
