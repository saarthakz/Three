import React, { useRef, useEffect } from 'react';
import * as Three from "three";

export default function App() {

  const scene = new Three.Scene();
  scene.background = new Three.Color("rgb(255, 255, 255)");
  const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new Three.WebGLRenderer();
  const canvasDivRef = useRef(null);
  const Pi = Math.PI;

  renderer.setSize(window.innerWidth, window.innerHeight);

  const element = renderer.domElement;

  useEffect(() => {
    canvasDivRef.current.appendChild(element);

    const planeGeometry = new Three.PlaneGeometry(10, 10);
    const planeMaterial = new Three.MeshBasicMaterial({
      side: Three.DoubleSide,
      color: new Three.Color("rgb(0, 0, 0)")
    });
    const planeMesh = new Three.Mesh(planeGeometry, planeMaterial);

    const boxGeometry = new Three.BoxGeometry(2, 2, 2);
    const boxMaterial = new Three.MeshBasicMaterial({
      color: new Three.Color("rgb(200, 0, 0)")
    });
    const boxMesh = new Three.Mesh(boxGeometry, boxMaterial);

    scene.add(planeMesh);
    scene.add(boxMesh);

    planeMesh.rotateX(Pi / 2);
    boxMesh.translateY(1);
    camera.position.z = 10;

    const keys = {
      Up: false,
      Down: false,
      Left: false,
      Right: false,
      Space: false,
      R: false
    };

    document.addEventListener("keydown", (event) => {
      if (event.key == "ArrowUp") {
        keys.Up = true;
      };

      if (event.key == "ArrowDown") {
        keys.Down = true;
      };

      if (event.key == "ArrowLeft") {
        keys.Left = true;
        // camera.translateX(0.1);
      };

      if (event.key == "ArrowRight") {
        keys.Right = true;
        // camera.translateX(-0.1);
      };

      if (event.key == " ") {
        keys.Space = true;
      };

      if (event.key == "r") {
        keys.R = true;
      }

      if (keys.Space && keys.Up) {
        camera.translateZ(0.1);
      } else if (keys.R && keys.Up) {
        camera.rotateX(Pi / 180);
      } else if (keys.Up) {
        camera.translateY(0.1);
      }

      if (keys.Space && keys.Down) {
        camera.translateZ(-0.1);
      } else if (keys.R && keys.Down) {
        camera.rotateX(- Pi / 180);
      } else if (keys.Down) {
        camera.translateY(-0.1);
      }

      if (keys.R && keys.Left) {
        camera.rotateY(Pi / 180);
      } else if (keys.Left) {
        camera.translateX(0.1);
      }

      if (keys.R && keys.Right) {
        camera.rotateY(- Pi / 180);
      } else if (keys.Right) {
        camera.translateX(-0.1);
      }

    });

    document.addEventListener("keyup", (event) => {
      if (event.key == "ArrowUp") {
        keys.Up = false;
      };

      if (event.key == "ArrowDown") {
        keys.Down = false;
      };

      if (event.key == "ArrowLeft") {
        keys.Left = false;
      };
      if (event.key == "ArrowRight") {
        keys.Right = false;
      };

      if (event.key == "r") {
        keys.R = false;
      }

      if (event.key == " ") {
        keys.Space = false;
      };
    });

    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

  }, []);


  return (
    <div ref={canvasDivRef}>

    </div>
  );
}
