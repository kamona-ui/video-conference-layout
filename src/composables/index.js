import { useDark, useToggle } from '@vueuse/core'
import { reactive } from 'vue'

export const isDark = useDark()
export const toggleDarkMode = useToggle(isDark)

export const chatBarState = reactive({
  isOpen: window.innerWidth > 1024,
  handleWindowResize() {
    if (window.innerWidth <= 1024) {
      chatBarState.isOpen = false
    } else {
      chatBarState.isOpen = true
    }
  },
})
