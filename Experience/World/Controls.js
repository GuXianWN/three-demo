import Experience from "../Experience.js";
import * as THREE from "three";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.position = new THREE.Vector3(0, 0, 0);

        // Linear Interpolation" 的缩写，意为线性插值
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        }

        this.setPath()
        this.onWheel()
    }

    // 鼠标滚轮滚动监听 调整轨道进度
    onWheel() {
        let speed = 0.05
        window.addEventListener("wheel", (e) => {
            this.lerp.target = this.lerp.target + (e.deltaY > 0 ? speed : -speed)
        })
    }

    setPath() {
        this.curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-10, 0, 10),
            new THREE.Vector3(-5, 5, 5),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(5, -5, 5),
            new THREE.Vector3(10, 0, 10)
        ], true);
        // closed 轨道循环

        const points = this.curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({color: 0xff0000});

        const curveObject = new THREE.Line(geometry, material);
        this.scene.add(curveObject)
    }

    update() {
        this.lerp.target += 0.0005
        if (this.lerp.target < 0) {
            this.lerp.target += 1
            this.lerp.current += 1
        }
        this.lerp.current += (this.lerp.target - this.lerp.current) * this.lerp.ease

        this.curve.getPointAt(this.lerp.current % 1, this.position)
        this.camera.orthographicCamera.position.copy(this.position)
    }
}