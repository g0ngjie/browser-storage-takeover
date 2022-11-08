// document.js
import { NoticeKey } from "@takeover/shared-utils";

window.addEventListener(
    NoticeKey.COMMAND_TRIGGERING,
    (event) => {
        const customEvent = event as CustomEvent
        if (customEvent.detail.to === "document") {
            if (window.__component__) window.__component__.register("modal")
        }
    },
    false
);