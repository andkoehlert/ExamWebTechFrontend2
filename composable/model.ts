import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function loadModelAndAnimation(scene: THREE.Scene): Promise<{
  model: THREE.Object3D
  mixer: THREE.AnimationMixer
}> {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()

    // load model
loader.load('/models/fox.glb',
      (gltf: GLTF) => {
        const model = gltf.scene
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        // model position og skalering
        model.position.set(10.5, -8.3, 2.5)
        model.scale.set(1000, 1000, 1000)

        // rotate the model to face the camera
        model.rotation.y = Math.PI / 1.8  
        scene.add(model)

        // animation
        const mixer = new THREE.AnimationMixer(model)
        const idleClip = gltf.animations.find((clip) => clip.name === 'Take 001')

        // error handling if animation is not found
        if (!idleClip) {
          return reject(new Error('Animation "Take 001" not found'))
        }

        mixer.clipAction(idleClip).play()

        resolve({ model, mixer })
      },
      undefined,
      (error) => reject(error)
    )
  })
}

// hoppe funktion
export function jump(model: THREE.Object3D) {
  let up = true
  const startY = model.position.y
  const interval = setInterval(() => {
    model.position.y += up ? 0.02 : -0.02
    if (model.position.y > startY + 0.2) up = false
    if (!up && model.position.y <= startY) {
      model.position.y = startY
      clearInterval(interval)
    }
  }, 30)
}