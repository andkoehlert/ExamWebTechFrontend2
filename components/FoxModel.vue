<template>
  <!-- model loading -->
  <div ref="sceneContainer" class="model-container"></div>

  <!-- text bubble -->
  <div class="speech-bubble">{{ displayedText }}</div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import * as THREE from 'three'
import { createCamera } from '../composable/camera'
import { createLights } from '../composable/light'
import { loadModelAndAnimation, jump } from '../composable/model'

const sceneContainer = ref<HTMLDivElement | null>(null)

// text inside bubble
const phrases = [
  "Hej med dig!",
  "Er du klar på et matematik eventyr?",
  "Jeg hedder Foxika, hvad med dig?"
]

const displayedText = ref('')
let currentPhraseIndex = 0
let typewriterInterval: number
let phraseTimer: number

// typewriter-funktion
function typePhrase(phrase: string) {
  displayedText.value = ''
  let charIndex = 0

  clearInterval(typewriterInterval)
  typewriterInterval = setInterval(() => {
    if (charIndex < phrase.length) {
      displayedText.value += phrase[charIndex]
      charIndex++
    } else {
      clearInterval(typewriterInterval)
    }
  }, 50)
}

onMounted(async () => {
  if (!sceneContainer.value) return
  const container = sceneContainer.value

  const scene = new THREE.Scene()
  const clock = new THREE.Clock()

  // kamera
  const camera = createCamera(container)

  // renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.appendChild(renderer.domElement)

  // lys
  createLights(scene)

  // model + animation
  const { mixer, model } = await loadModelAndAnimation(scene)
  jump(model)

  // animation loop
  const animate = () => {
    requestAnimationFrame(animate)
    const delta = clock.getDelta()
    mixer.update(delta)
    renderer.render(scene, camera)
  }
  animate()

  // ✅ KUN browser: start typewriter
  typePhrase(phrases[currentPhraseIndex])
  phraseTimer = setInterval(() => {
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length
    typePhrase(phrases[currentPhraseIndex])
  }, 5000)
})

onUnmounted(() => {
  clearInterval(typewriterInterval)
  clearInterval(phraseTimer)
})
</script>

<style scoped>
.model-container {
  width: 100%;
  height: 700px;
  box-sizing: border-box;
}

/* bubble styling */
.speech-bubble {
  position: absolute;
  top: 420px;
  left: 20%;
  transform: translateX(-50%);
  max-width: 190px;
  padding: 12px 16px;
  background-color: white;
  border: 2px solid black;
  border-radius: 20px;
  font-family: 'Open Sans', cursive, sans-serif;
  font-size: 16px;
  box-shadow: 3px 3px 0 black;
  z-index: 10;
}

/* arrow under bubble */
.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 40px;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: white;
  border-bottom: 0;
  margin-left: -10px;
  filter: drop-shadow(2px 2px 0 black);
}
</style>
