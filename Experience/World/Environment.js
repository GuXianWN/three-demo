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
        // 开启阴影投射
        sunLight.castShadow = true;
        // 设置阴影相机的远裁剪面
        sunLight.shadow.camera.far = 20;
        // 设置阴影贴图的大小
        sunLight.shadow.mapSize.set(1024, 1024);
        // 设置阴影的法线偏移
        sunLight.shadow.normalBias = 0.05;
        // 设置光源的位置
        sunLight.position.set(1.5, 7, 3);
        // 将光源添加到场景中
        this.scene.add(sunLight);

        const ambientLight=new THREE.AmbientLight("#ffffff",1)
        this.scene.add(ambientLight);
    }
}