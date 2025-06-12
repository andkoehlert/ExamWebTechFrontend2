import { ref } from 'vue'

interface ChatResponse {
  response: string
}

export function useChat() {
  const response = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const sendMessage = async (message: string) => {
    loading.value = true
    response.value = null
    error.value = null

    try {
const { data, error: fetchError } = await useFetch<ChatResponse>('http://127.0.0.1:8000/chat', {
        method: 'POST',
        body: { message },
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (fetchError.value) {
        error.value = fetchError.value.message
      } else {
        response.value = data.value?.response ?? ''
      }
    } catch (err: unknown) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  return {
    response,
    loading,
    error,
    sendMessage,
  }
}
