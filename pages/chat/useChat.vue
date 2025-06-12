<template>
  <div class="p-6 max-w-xl mx-auto">
    <input
      v-model="message"
      @keyup.enter="send"
      type="text"
      placeholder="Ask something..."
      class="w-full p-2 border rounded mb-2"
    />
    <button @click="send" class="bg-blue-600 text-white px-4 py-2 rounded">Send</button>

    <div v-if="loading" class="mt-2 text-gray-500">Thinking...</div>
    <div v-if="response" class="mt-2 text-green-700"> {{ response }}</div>
    <div v-if="error" class="mt-2 text-red-600"> {{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { useChat } from '../../composable/useChat'
const message = ref('')
const { response, loading, error, sendMessage } = useChat()

const send = () => {
  if (message.value.trim()) {
    sendMessage(message.value)
    message.value = ''
  }
}
</script>
