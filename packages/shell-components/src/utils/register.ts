import { createApp } from 'vue'
import type { App, Component } from 'vue'
import { ShellComponentContainer } from "@takeover/shared-utils";

let swapApp: App | null = null

export function registerEl(target: Component) {
    if (swapApp) swapApp.unmount()
    swapApp = createApp(target)
    swapApp.mount(`#${ShellComponentContainer}`)
}