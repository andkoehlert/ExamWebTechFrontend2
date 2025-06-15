interface Message {
  role: 'user' | 'assistant'
  content: string
}
export function SaveTheChat() {
  const saveChat = async (messages: Message[]) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/save-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      })

      if (!response.ok) {
        throw new Error('Failed to save chat')
      }

      const data = await response.json()
      return { success: true, id: data.id }
    } catch (error) {
      console.error('Error saving chat:', error)
      return { success: false, error: (error as Error).message }
    }
  }

  return { saveChat }
}
