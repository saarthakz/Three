import React, { useRef, useEffect } from 'react';
import * as Three from "three";
import { Vector3 } from "three";

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

    const planeGeometry = new Three.PlaneGeometry(50, 50);
    const planeMaterial = new Three.MeshBasicMaterial({
      side: Three.DoubleSide,
      color: new Three.Color("rgb(50, 50, 50)"),
    });
    const planeMesh = new Three.Mesh(planeGeometry, planeMaterial);

    const boxGeometry = new Three.BoxGeometry(2, 2, 2);
    const edgesGeometry = new Three.EdgesGeometry(boxGeometry);
    const linesMaterial = new Three.LineBasicMaterial({ color: new Three.Color("rgb(0, 0, 0)") });
    const edges = new Three.LineSegments(edgesGeometry, linesMaterial);
    const boxMaterial = new Three.MeshBasicMaterial({
      color: new Three.Color("rgb(200, 0, 0)")
    });
    const boxMesh = new Three.Mesh(boxGeometry, boxMaterial);

    const box = new Three.Group();
    box.add(boxMesh).add(edges);

    scene.add(planeMesh).add(box);

    planeMesh.rotateX(Pi / 2);
    box.translateY(1);
    camera.position.z = 15;
    camera.position.y = 5;

    const keys = {
      Up: false,
      Down: false,
      Left: false,
      Right: false,
      Space: false,
      M: false,
      R: false,
    };

    const mouse = {
      click: false,
      x: null,
      y: null,
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

      if (event.key == "v") {
        keys.V = true;
      }

      if (keys.Space && keys.Up) {
        camera.translateZ(0.2);
      } else if (keys.Up) {
        camera.translateY(0.2);
      };

      if (keys.Space && keys.Down) {
        camera.translateZ(-0.2);
      } else if (keys.Down) {
        camera.translateY(-0.2);
      };

      if (keys.Left) {
        camera.translateX(0.2);
      };

      if (keys.Right) {
        camera.translateX(-0.2);
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

      if (event.key == "v") {
        keys.V = false;
      };

      if (event.key == " ") {
        keys.Space = false;
      };
    });

    document.addEventListener("mousedown", (event) => {
      mouse.click = true;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    document.addEventListener("mousemove", (event) => {

      if (mouse.click == true && keys.V == true) {
        const verticalMovement = (mouse.y - event.clientY) / 500;

        camera.rotateX(verticalMovement);

        if (camera.rotation.x < 0) camera.rotation.x = 0;
        if (camera.rotation.y < 0 && camera.rotation.z < 0) camera.rotation.z = 0;
        if (camera.rotation.y > 0 && camera.rotation.z > 0) camera.rotation.z = 0;

        mouse.x = event.clientX;
        mouse.y = event.clientY;
      };

      if (mouse.click == true && keys.V != true) {
        const horizontalMovement = (mouse.x - event.clientX) / 500;

        camera.rotateY(horizontalMovement);

        mouse.x = event.clientX;
        mouse.y = event.clientY;

      };
    });

    document.addEventListener("mouseup", () => {
      mouse.click = false;
    });

    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

  }, []);


  return (
    <div ref={canvasDivRef}>

    </div>
  );
}
