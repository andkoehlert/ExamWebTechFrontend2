import { ref } from 'vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface SavedChat {
  id: number
  created_at: string
  messages: Message[]
}

export function useSavedChats() {
  const savedChats = ref<SavedChat[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchSavedChats = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('http://127.0.0.1:8000/saved-chats')
      if (!res.ok) throw new Error('Failed to fetch saved chats')
      savedChats.value = await res.json()
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { savedChats, loading, error, fetchSavedChats }
}
