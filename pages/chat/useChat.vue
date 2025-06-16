<template>
  <div class="flex h-screen">
   <div class="md:w-1/3 w-full p-4 flex justify-center">
  <spline-viewer
    url="https://prod.spline.design/m1zskWWSib-BHFXp/scene.splinecode"
    style="width: 100%; max-width: 500px; height: 500px; border-radius: 12px;"
  ></spline-viewer>
</div>


    <div class="w-2/3 p-6 max-w-3xl mx-auto">
      <select v-model="mode" class="mb-4 p-2 border rounded w-full">
        <option value="friendly_ai">Friendly AI</option>
        <option value="math_tutor">Math Tutor</option>
        <option value="storyteller">Storyteller</option>
      </select>

      <input
        v-model="message"
        @keyup.enter="send"
        type="text"
        placeholder="Ask something..."
        class="w-full p-2 border rounded mb-2"
      />
      <button @click="send" class="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      <button @click="save" class="bg-green-600 text-white px-4 py-2 rounded ml-2">Save Chat</button>

      <div v-if="loading" class="mt-2 text-gray-500">Thinking...</div>
      <div v-if="error" class="mt-2 text-red-600">{{ error }}</div>

      <!-- Current chat messages -->
      <div v-for="(msg, index) in messages" :key="index" class="mb-2">
        <div
          :class="{
            'text-right text-blue-600': msg.role === 'user',
            'text-left text-green-700': msg.role === 'assistant',
          }"
        >
          {{ msg.content }}
        </div>
      </div>

      <!-- Saved chat toggle -->
      <div class="fixed bottom-4 right-4 z-50">
        <button
          @click="showSavedChats = !showSavedChats"
          class="bg-gray-800 text-white px-4 py-2 rounded shadow-lg hover:bg-gray-700 transition"
        >
          {{ showSavedChats ? 'Hide Saved Chats' : 'Show Saved Chats' }}
        </button>
      </div>

      <!-- Saved chats panel -->
      <transition name="fade">
        <div
          v-if="showSavedChats"
          class="fixed bottom-16 right-4 w-80 max-h-96 overflow-y-auto p-4 bg-white border border-gray-300 rounded shadow-lg z-50"
        >
          <h2 class="text-lg font-semibold mb-4">Saved Chats</h2>

          <div v-if="savedLoading" class="text-gray-500">Loading saved chats...</div>
          <div v-if="savedError" class="text-red-600 mb-4">{{ savedError }}</div>

          <div
            v-for="chat in savedChats"
            :key="chat.id"
            class="mb-4 p-3 border rounded bg-gray-50"
          >
            <div class="text-xs text-gray-600 mb-1">
              Chat ID: {{ chat.id }} | {{ new Date(chat.created_at).toLocaleString() }}
            </div>
            <div v-for="(msg, idx) in chat.messages" :key="idx" class="mb-1">
              <strong :class="msg.role === 'user' ? 'text-blue-600' : 'text-green-700'">
                {{ msg.role }}:
              </strong>
              {{ msg.content }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useChat } from '../../composable/useChat'
import { SaveTheChat } from '../../composable/saveTheChat'
import { useSavedChats } from '../../composable/useSavedCharts' 

const message = ref('')
const mode = ref('friendly_ai')

const { messages, loading, error, sendMessage } = useChat()
const { saveChat } = SaveTheChat()

// saved chats composable state
const { savedChats, loading: savedLoading, error: savedError, fetchSavedChats } = useSavedChats()

const showSavedChats = ref(false)


// Load saved chats when component mounts
onMounted(() => {
  fetchSavedChats()
})

// send message function
const send = () => {
  if (message.value.trim()) {
    sendMessage(message.value, mode.value)
    message.value = ''
  }
}

// save current chat
const save = async () => {
  const result = await saveChat(messages.value)
  if (result.success) {
    alert(`Chat saved with ID: ${result.id}`)
    fetchSavedChats() 
  } else {
    alert(`Failed to save chat: ${result.error}`)
  }
}

import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.type = 'module'
  script.src = 'https://unpkg.com/@splinetool/viewer@1.10.7/build/spline-viewer.js'
  document.head.appendChild(script)
})

</script>

<style scoped>




.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>