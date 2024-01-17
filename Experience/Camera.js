import Experience from "./Experience.js";
import * as THREE from 'three'
import {OrbitControls} from "three/addons";
import {GridHelper} from "three";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    // 透视摄像机 (createPerspectiveCamera)
    //
    // 作用: 透视摄像机模拟人眼或真实世界摄像机的视觉效果。它创建了一种深度感，使得物体根据距离的远近看起来更大或更小。
    // 应用场景: 在大多数3D游戏和模拟真实世界场景的应用程序中，透视摄像机被广泛使用。
    // 特点: 物体随着距离增加而看起来越来越小，近大远小的视觉效果。
    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000)
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.set(30, 30, 30)
    }

    // 正交摄像机 (createOrthographicCamera)
    //
    // 作用: 正交摄像机提供一种不具有透视的视图，即在这种视图中，物体的大小不会随着距离的变化而变化。
    // 应用场景: 它常用于工程和建筑视图、某些类型的2D游戏，以及任何需要从固定角度查看对象而无需深度感的情况。
    // 特点: 物体的大小不会因为远近而改变，没有深度感，适合需要平面和规模精确的场景。
    createOrthographicCamera() {
        const right = (this.sizes.frustrum * this.sizes.aspect) / 2
        const top = this.sizes.frustrum / 2

        this.orthographicCamera = new THREE.OrthographicCamera(-right, right, top, -top, 30, -30)
        this.scene.add(this.orthographicCamera)

        this.helper = new THREE.CameraHelper(this.orthographicCamera)
        this.scene.add(this.helper)
    }

    setOrbitControls() {
        let controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        // 默认值就为true
        controls.enableDamping = true
        controls.enableZoom = true
        this.controls = controls
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()

        const right = (this.sizes.frustrum * this.sizes.aspect) / 2
        const top = this.sizes.frustrum / 2

        this.orthographicCamera.left = -right
        this.orthographicCamera.right = -right
        this.orthographicCamera.top = top
        this.orthographicCamera.bottom = -top
        this.orthographicCamera.updateProjectionMatrix()
    }

    update() {
        // console.log(this.perspectiveCamera.position)
        this.helper.matrixWorldNeedsUpdate=true
        this.helper.update()
        this.helper.position.copy(this.orthographicCamera)
        this.controls.update()
    }
}