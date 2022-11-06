/**storage enums */
export enum StorageKey {
  /**主题 */
  THEME = 'browser-storage-takeover:storage:theme',
}

// 挂载DOM节点
export const ShellComponentContainer = '__browser-storage-takeover_shell_components_container__'

/**通知 */
export enum Notice {
  /**通知 content */
  TO_CONTENT = 'browser-storage-takeover:notice:content',
  /**通知 popup */
  TO_POPUP = 'browser-storage-takeover:notice:popup',
  /**通知 document */
  TO_DOCUMENT = 'browser-storage-takeover:notice:document',
  /**通知 background */
  TO_BACKGROUND = 'browser-storage-takeover:notice:background',
}

/**通知Key */
export enum NoticeKey {

}

/**主题 */
export const Theme = {
  /**黑色 */
  DARK: "dark",
  /**白色 */
  LIGHT: "light"
}