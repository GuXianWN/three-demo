import Experience from "../Experience.js";
import Room from "./Room.js";
import Environment from "./Environment.js";
import * as THREE from "three";
import Controls from "./Controls.js";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.resources.on('ready', () => {
            console.log("to load scene")
            this.room = new Room()
            this.environment = new Environment()
            this.controls = new Controls()

            const size = 20
            const divisions = 20
            const gridHelp = new THREE.GridHelper(size, divisions)
            // 坐标轴
            const axesHelper = new THREE.AxesHelper(10);
            this.scene.add(axesHelper)
            this.scene.add(gridHelp)
        })
    }

    update() {
        this.room?.update()
        this.controls?.update()
    }
}