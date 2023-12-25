import Experience from "../Experience.js";
import Room from "./Room.js";
import Environment from "./Environment.js";
import * as THREE from "three";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources
        this.scene=this.experience.scene

        this.resources.on('ready', () => {
            console.log("to load scene")
            this.room = new Room()
            this.environment = new Environment()


            const size = 20
            const divisions = 20
            const gridHelp = new THREE.GridHelper(size, divisions)
            this.scene.add(gridHelp)
            // 坐标轴
            const axesHelper = new THREE.AxesHelper(10);
            this.scene.add(axesHelper)

            // const spotLightHelper = new THREE.SpotLightHelper(this.experience.world.environment.sunLight,"#ff0000")
            // this.scene.add(spotLightHelper)
        })
    }

    update() {
        this.room?.update()
    }
}