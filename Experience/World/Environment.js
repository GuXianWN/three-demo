import * as THREE from 'three'
import Experience from "../Experience.js";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.setSunlight()
    }

    setSunlight() {
        // 创建一个平行光源
        const sunLight = new THREE.DirectionalLight("#ffffff", 3);
        //光投影相机
        const camera = sunLight.shadow.camera;
        camera.left = -10;
        camera.right = 10;
        camera.top = 10;
        camera.bottom = -10;

        // 开启阴影投射
        sunLight.castShadow = true;
        // 设置阴影相机的远裁剪面
        sunLight.shadow.camera.far = 150;
        sunLight.shadow.camera.near = 0.5
        // 设置阴影贴图的大小
        sunLight.shadow.mapSize.set(4096, 4096);
        // 设置阴影的法线偏移
        sunLight.shadow.normalBias = 0.05;
        // 设置光源的位置
        // sunLight.position.set(7, 10, 5);
        sunLight.position.set(4, 36, 19);
        // 将光源添加到场景中

        this.scene.add(sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientLight);


        const sunLightCameraHelper = new THREE.CameraHelper(camera);
        sunLightCameraHelper.visible = true;
        const lightHelper = new THREE.DirectionalLightHelper(sunLight, 1);
        lightHelper.visible = true
        // this.scene.add(sunLightCameraHelper);
        // this.scene.add(lightHelper);
    }
}