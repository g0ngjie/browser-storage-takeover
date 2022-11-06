import { createApp } from 'vue'
import type { Component } from 'vue'
import { ShellComponentContainer } from "@takeover/shared-utils";

export function registerEl(target: Component) {
    createApp(target).mount(`#${ShellComponentContainer}`)
}