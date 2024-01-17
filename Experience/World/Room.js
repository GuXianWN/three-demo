import Experience from "../Experience.js";
import * as THREE from 'three'

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.room = this.experience.resources.items.room
        this.setModel()
        this.setAnimation()
    }

    setModel() {
        this.room.scene.rotation.y = Math.PI / 3.8
        this.room.scene.scale.set(0.2, 0.2, 0.2)

        this.room.scene.traverse((v) => {
            v.castShadow = true
            v.receiveShadow = true
        })
        this.room.scene.children.forEach((child, i) => {
            if (child.name === "Aquarium") {
                child.children.forEach(v => {
                    if (v.name === "Cube136") {
                        v.material = new THREE.MeshPhysicalMaterial();
                        v.material.color.setRGB(1, 3, 5)
                        v.material.roughness = 0;
                        v.material.ior = 3;
                        v.material.transmission = 1;
                        v.material.opacity = 1;
                        // todo set color
                    }
                })
            }

            if (child.name === "Computer") {
                child.children.forEach(v => {
                    if (v.name === "Cube021_1") {
                        v.material = new THREE.MeshBasicMaterial({
                            map: this.experience.resources.items.screen
                        })
                    }
                })
            }
        })
        this.scene.add(this.room.scene)
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.room.scene);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play()
    }

    update() {
        // this.room.scene.rotation.y += 0.01;
        this.mixer.update(this.time.delta*0.0009)
    }
}


