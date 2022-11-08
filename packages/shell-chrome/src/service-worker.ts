import { NoticeKey } from "@takeover/shared-utils";

function createModal() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id)
            chrome.tabs.sendMessage(tabs[0].id, {
                to: "content",
                type: NoticeKey.COMMAND_TRIGGERING
            }).catch(err => { })
    })
}

// 监听图标点击事件
chrome.action.onClicked.addListener((tab) => {
    createModal();
});

// 监听快捷键
chrome.commands.onCommand.addListener((command) => {
    if (command === "open_modal") {
        createModal();
    }
});