import { defineCustomElement } from 'vue'
import App from './App.ce.vue'

// Vue generates a new HTML element class from the component definition.
export const Modal = defineCustomElement(App)

customElements.define('browser-storage-takeover-modal', Modal)