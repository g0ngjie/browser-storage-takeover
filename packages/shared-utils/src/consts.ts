/**storage enums */
export enum StorageKey {
  /**共享实例 */
  GLOBAL_KEY = 'browser-storage-takeover:storage:global:data',
}

// 挂载DOM节点
export const ShellComponentContainer = '__browser-storage-takeover_shell_components_container__'

/**通知Key */
export enum NoticeKey {
  /**modal信息传递 */
  CONTENT_DOCUMENT = "browser-storage-takeover:event:message",
  /**指令触发 */
  COMMAND_TRIGGERING = "browser-storage-takeover:event:command:triggering"
}
