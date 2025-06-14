import { ref } from 'vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
}
export function useChat() {
  const messages = ref<Message[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const sendMessage = async (message: string, mode: string) => {
    loading.value = true
    error.value = null

    messages.value.push({ role: 'user', content: message })

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages.value, mode }), 
      })

      if (!response.body) {
        throw new Error('No response body')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let assistantMessage = ''

      messages.value.push({ role: 'assistant', content: '' })

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        if (value) {
          assistantMessage += decoder.decode(value)
          messages.value[messages.value.length - 1].content = assistantMessage
        }
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

