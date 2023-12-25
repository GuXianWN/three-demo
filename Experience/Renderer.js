import Experience from "./Experience.js";
import * as THREE from 'three'
import {SRGBColorSpace} from "three";

export default class Renderer {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.setRenderer()
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });

        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);

        // 设置渲染器的属性，以实现更真实的光照效果
        this.renderer.physicallyCorrectLights = true;
        // 设置渲染器的颜色输出编码为sRGB，以获得更准确的颜色显示
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        // 设置渲染器的色调映射算法为CineonToneMapping，以实现电影级别的色调映射效果
        this.renderer.toneMapping = THREE.CineonToneMapping;
        // 设置渲染器的色调映射曝光值，用于控制场景的亮度
        this.renderer.toneMappingExposure = 1.75;
        // 启用渲染器的阴影贴图功能，以实现阴影效果
        this.renderer.shadowMap.enabled = true;
        // 设置渲染器的阴影贴图类型为PCFSoftShadowMap，以实现更柔和的阴影边缘
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.renderer.render(this.scene,this.camera.perspectiveCamera)
    }

    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }
}