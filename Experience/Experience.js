import * as THREE from 'three'
import Sizes from "./Utils/Size.js";
import Camera from "./Camera.js";
import Time from "./Utils/Time.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

export default class Experience {
    static instance

    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this
        this.canvas = canvas
        this.sizes = new Sizes()
        this.scene = new THREE.Scene()
        this.resources = new Resources(assets)
        this.time = new Time()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        this.time.on("update", () => {
            this.update()
        })
        this.sizes.on("resize", () => {
            this.resize()
        })
    }

    update() {
        // console.log(`${1000 / this.time.delta} FPS`)
        this.camera.update()
        this.renderer.update()
        this.world.update()
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }
}