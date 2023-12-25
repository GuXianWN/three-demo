import Experience from "../Experience.js";
import * as THREE from 'three'

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.room = this.experience.resources.items.room
        this.setModel()
    }

    setModel() {
        this.room.scene.rotation.y = Math.PI / 3.8
        this.room.scene.children.forEach((child, i) => {
            child.castShadow = true
            child.receiveShadow = true

            if (child instanceof THREE.Group) {
                child.children.forEach(v => {
                    v.castShadow = true
                    v.receiveShadow = true
                })
            }

            if (child.name === "Aquarium") {
                child.children.forEach(v => {
                    if (v.name === "Cube136") {
                        v.material = new THREE.MeshPhysicalMaterial();
                        v.material.roughness = 0;
                        v.material.ior = 3;
                        v.material.transmission = 1;
                        v.material.opacity = 1;
                        // todo set color
                    }
                })
            }
        })
        this.scene.add(this.room.scene)
    }

    update() {
        // this.room.scene.rotation.y += 0.01;
    }
}