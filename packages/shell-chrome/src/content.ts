import {
    ShellComponentContainer,
    initStorage,
    NoticeKey,
    setStorage,
    StorageKey,
    getStorage,
} from "@takeover/shared-utils";

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

initStorage().then(() => {

    // 接收lib 传来的信息 转发给 popup
    window.addEventListener(
        NoticeKey.CONTENT_DOCUMENT,
        function (event) {
            const customEvent = event as CustomEvent
            console.log("[debug]customEvent:", customEvent.detail)
            const maps = getStorage(StorageKey.GLOBAL_KEY, {})
            switch (customEvent.detail.type) {
                case "save":
                    const target = customEvent.detail.value
                    maps[`${target.type}_${target.key}`] = target
                    setStorage(StorageKey.GLOBAL_KEY, maps)
                    break;
                case "get":
                    if (customEvent.detail.fn) customEvent.detail.fn(maps)
                    break;
                case "remove":
                    delete maps[`${target.type}_${target.key}`]
                    setStorage(StorageKey.GLOBAL_KEY, maps)
                    break;
            }
        },
        false
    );
})