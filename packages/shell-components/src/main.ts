import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

// createApp(App).mount('#app')

export function register(container: Element) {
    createApp(App).mount(container)
}