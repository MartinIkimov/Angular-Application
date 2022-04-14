import { AfterViewInit, Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import * as THREE from "three";

@Component({
  selector: 'app-saturn',
  templateUrl: './saturn.component.html',
  styleUrls: ['./saturn.component.css']
})
export class SaturnComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    this.renderPlanet();
  }

  private renderPlanet() {
    const canvasContainer = document.querySelector('#canvasContainer') as HTMLCanvasElement;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000);


    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.querySelector('canvas') as HTMLCanvasElement
    });

    renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);

    renderer.setPixelRatio(window.devicePixelRatio);


    const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 50, 100),
      new THREE.MeshBasicMaterial({

        map: new THREE.TextureLoader().load('/assets/planets/saturn/8k_saturn.jpg')
      }));



    const texture = new THREE.TextureLoader().load(
      "/assets/planets/saturn/8k_saturn_ring_alpha.png"
    );
    const geometry = new THREE.RingBufferGeometry(3, 5, 100);
    var pos = geometry.attributes['position'];
    var v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      geometry.attributes['uv'].setXY(i, v3.length() < 4 ? 0 : 1, 1);
    }

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true
    });
    const ringMesh = new THREE.Mesh(geometry, material);


    ringMesh.rotation.x = Math.PI / 2;

    const group = new THREE.Group();
    group.add(sphere);
    group.add(ringMesh);
    group.rotation.z = 0.5;

    scene.add(group);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 10000;
      starVertices.push(x, y, z)
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);


    camera.position.z = 9;
    group.position.y = -0.6;


    const mouse = {
      x: 0,
      y: 0
    }

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      sphere.rotation.y += 0.003;
      gsap.to(group.rotation, {
        x: -mouse.y * 0.3,
        y: mouse.x * 0.5,
        duration: 2
      })
    }

    animate();


    addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / innerHeight) * 2 + 1;
    })
  }

}
