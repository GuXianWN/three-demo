import {DRACOLoader, GLTFLoader} from "three/addons";
import {EventEmitter} from "events";
import * as THREE from 'three'

export default class Resources extends EventEmitter {
    constructor(assets) {
        super();
        this.assets = assets
        this.items = {}
        this.loaded = 0
        this.queue = assets.length
        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {}
        // 创建一个DRACOLoader实例，用于加载Draco压缩的模型
        // 设置解码器路径为"/draco"，以便加载器找到解码器文件
        this.loaders.dracoLoader = new DRACOLoader()
            .setDecoderPath("/draco/")
            .setDecoderConfig({type: 'js'});
        this.loaders.gltfLoader = new GLTFLoader()
            .setDRACOLoader(this.loaders.dracoLoader);
    }

    startLoading() {
        this.loadMap = {
            "glbModel": (asset) => {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                });
            },
            "videoTexture": (asset) => {
                let video = document.createElement("video");
                video.src = asset.path
                video.muted = true
                video.playsInline = true
                video.autoplay = true
                video.loop = true
                video.play()

                let videoTexture = new THREE.VideoTexture(video)
                videoTexture.flipY = true
                videoTexture.minFilter = THREE.NearestFilter
                videoTexture.magFilter = THREE.NearestFilter
                videoTexture.generateMipmaps = false
                videoTexture.colorSpace = THREE.SRGBColorSpace;

                this.singleAssetLoaded(asset, videoTexture)
            }
        }

        // todo 判断同名资产
        this.assets.forEach(asset => {
            if (this.loadMap[asset.type]) {
                this.loadMap[asset.type](asset)
            } else {
                console.error(`unknown type ${asset.type}`)
            }
        })
    }

    singleAssetLoaded(asset, file) {
        this.loaded++
        this.items[asset.name] = file
        console.log(`load ${asset.name}`)

        if (this.loaded === this.queue) {
            console.log("all model ready")
            console.log(this.items)
            this.emit("ready")
        }
    }
}