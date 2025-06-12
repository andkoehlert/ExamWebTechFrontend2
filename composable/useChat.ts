import { ref } from 'vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatResponse {
  response: string
}

export function useChat() {
  const messages = ref<Message[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const sendMessage = async (message: string) => {
    loading.value = true
    error.value = null

    // user message push
    messages.value.push({ role: 'user', content: message })

    try {
      const { data, error: fetchError } = await useFetch<ChatResponse>(
        'http://127.0.0.1:8000/chat',
        {
          method: 'POST',
          body: { messages: messages.value },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (fetchError.value) {
        error.value = fetchError.value.message
      } else if (data.value?.response) {
        // assistant message push
        messages.value.push({ role: 'assistant', content: data.value.response })
      }
    } catch (err: unknown) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
  }
}
