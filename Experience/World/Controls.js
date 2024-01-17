import Experience from "../Experience.js";
import * as THREE from "three";
import

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.progress = 0
        this.dummyCurve = new THREE.Vector3(0, 0, 0);
        this.setPath()
        this.onWheel()
    }

    onWheel(){
        window.addEventListener("wheel",(e)=>{
            console.log(e)
        })
    }

    setPath() {
        this.curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-10, 0, 10),
            new THREE.Vector3(-5, 5, 5),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(5, -5, 5),
            new THREE.Vector3(10, 0, 10)
        ],true);
        // closed 轨道循环

        const points = this.curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({color: 0xff0000});

        const curveObject = new THREE.Line(geometry, material);
        this.scene.add(curveObject)
    }

    update() {
        this.dummyCurve = new THREE.Vector3(0, 0, 0);
        this.curve.getPointAt(this.progress%1, this.dummyCurve)
        this.progress += 0.001
        this.camera.orthographicCamera.position.copy(this.dummyCurve)
    }
}