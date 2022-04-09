import { AfterViewInit, Component} from '@angular/core';
import gsap from 'gsap';
import * as THREE from "three";

@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
  styleUrls: ['./sun.component.css']
})

export class SunComponent implements AfterViewInit {

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
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/assets/planets/sun/sun.png')
      }));

    const group = new THREE.Group();
    group.add(sphere);
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

    camera.position.z = 15;


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
