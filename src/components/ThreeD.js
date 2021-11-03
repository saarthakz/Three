import React, { useRef, useEffect } from 'react';
import * as Three from "three";

export default function ThreeD() {

  const scene = new Three.Scene();
  scene.background = new Three.Color("rgb(200, 200, 200)");
  const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new Three.WebGLRenderer({ antialias: true });
  const canvasDivRef = useRef(null);
  const Pi = Math.PI;

  renderer.setSize(window.innerWidth, window.innerHeight);

  const element = renderer.domElement;

  useEffect(() => {
    canvasDivRef.current.appendChild(element);

    const planeGeometry = new Three.PlaneGeometry(1000, 1000);
    const planeMaterial = new Three.MeshBasicMaterial({
      side: Three.DoubleSide,
      color: new Three.Color("rgb(50, 50, 50)")
    });
    const planeMesh = new Three.Mesh(planeGeometry, planeMaterial);

    const boxGeometry = new Three.BoxGeometry(2, 2, 2);
    const edgesGeometry = new Three.EdgesGeometry(boxGeometry);
    const edgesMaterial = new Three.LineBasicMaterial({ color: new Three.Color("rgb(0, 0, 0)") });
    const edges = new Three.LineSegments(edgesGeometry, edgesMaterial);
    const boxMaterial = new Three.MeshBasicMaterial({
      color: new Three.Color("rgb(200, 0, 0)")
    });
    const boxMesh = new Three.Mesh(boxGeometry, boxMaterial);

    const box = new Three.Group();
    box.add(boxMesh);
    box.add(edges);

    scene.add(planeMesh);
    scene.add(box);
    const axesHelper = new Three.AxesHelper(5);
    scene.add(axesHelper);

    planeMesh.rotateX(Pi / 2);
    box.translateY(1);
    camera.position.z = 15;
    camera.position.y = 5;
    camera.rotateY(Pi / 10);

    const keys = {
      Up: false,
      Down: false,
      Left: false,
      Right: false,
      Space: false,
      M: false,
    };

    const mouse = {
      click: false,
      x: null,
      y: null,
    };

    let cameraPosition = {
      x: null,
      y: null,
      z: null,
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
      };

      if (event.key == "ArrowRight") {
        keys.Right = true;
      };

      if (event.key == " ") {
        keys.Space = true;
      };

      if (event.key == "m") {
        keys.M = true;
      };

      if (keys.Space && keys.Up) {
        camera.translateZ(0.1);
      } else if (keys.M && keys.Up) {
        box.translateZ(-0.1);
      } else if (keys.Up) {
        camera.translateY(0.1);
      };

      if (keys.Space && keys.Down) {
        camera.translateZ(-0.1);
      } else if (keys.M && keys.Down) {
        box.translateZ(0.1);
      } else if (keys.Down) {
        camera.translateY(-0.1);
      };

      if (keys.M && keys.Left) {
        box.translateX(-0.1);
      } else if (keys.Left) {
        camera.translateX(0.1);
      };

      if (keys.M && keys.Right) {
        box.translateX(0.1);
      } else if (keys.Right) {
        camera.translateX(-0.1);
      };
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

      if (event.key == "m") {
        keys.M = false;
      };

      if (event.key == " ") {
        keys.Space = false;
      };

      if (event.key == "r") {
        console.log(camera.rotation);
      };
    });

    document.addEventListener("mousedown", (event) => {
      mouse.click = true;
      mouse.x = event.clientX;
      mouse.y = event.clientY;

      // const { x, y, z } = camera.position;
      // cameraPosition = { x, y, z };
    });

    document.addEventListener("mousemove", (event) => {
      if (mouse.click == true) {
        const horizontalMovement = (mouse.x - event.clientX) / 500;
        const verticalMovement = (mouse.y - event.clientY) / 500;
        camera.rotateY(horizontalMovement);
        // cameraPosition.x = camera.rotation.x;
        // camera.y = cameraPosition.y;
        camera.rotateX(verticalMovement);
        mouse.x = event.clientX;
        mouse.y = event.clientY;

        if (camera.rotation.x > 0) {
          camera.rotation.x = 0;
        };

        if (camera.rotation.z != 0) {
          camera.rotation.z = 0;
        };
      };
    });

    document.addEventListener("mouseup", () => {
      mouse.click = false;
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
