
export const useRuntime = typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined";

export const useStorage = typeof chrome !== 'undefined' && typeof chrome.storage !== 'undefined'
