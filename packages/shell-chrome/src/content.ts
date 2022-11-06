import { ShellComponentContainer } from "@takeover/shared-utils";

const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL("document.js"));
document.documentElement.appendChild(script);

// initStorage().then(() => {

//     script.addEventListener("load", () => {

//     });

// })

const componentContainer = document.createElement('div')
componentContainer.id = ShellComponentContainer

const componentLink = document.createElement('link')
componentLink.href = chrome.runtime.getURL("components/style.css")
document.documentElement.appendChild(componentLink);

document.documentElement.appendChild(componentContainer)
const components = document.createElement("script");
components.setAttribute("src", chrome.runtime.getURL("components/index.iife.js"));
document.documentElement.appendChild(components);

components.addEventListener('load', () => {
    console.log("[debug]window.__component__:", window.__component__)
})
