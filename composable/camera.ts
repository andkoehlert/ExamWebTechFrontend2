import * as THREE from 'three'

export const createCamera = (container: HTMLDivElement) => {
    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    )

    // position of the camera
    camera.position.set(15, 0, 0) 

    camera.lookAt(0, 0, 0)

    return camera
    }