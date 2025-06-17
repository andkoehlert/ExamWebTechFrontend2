import * as THREE from 'three'

export const createLights = (scene: THREE.Scene) => {
  // ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 2)
  scene.add(ambientLight)

  // directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
  directionalLight.position.set(5, 10, 5)
  directionalLight.castShadow = true

  scene.add(directionalLight)
}