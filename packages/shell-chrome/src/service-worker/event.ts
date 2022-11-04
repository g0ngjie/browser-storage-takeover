

// 监听图标点击事件
function onIconClickListener() {
    chrome.action.onClicked.addListener(function (tab) {
        // createPanel();
    });
}

/**注册全部监听列表 */
export function injectEventListener() {
    // 监听图标点击事件
    onIconClickListener()
}