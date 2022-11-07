import { StorageSerializers, useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";
import { computed } from "vue";
import { useOsTheme, darkTheme } from "naive-ui";
import type { GlobalThemeOverrides } from "naive-ui";
// import { useChrome } from "@takeover/shared-utils";

export type StorageType = 'local' | 'session'

type TabName = 'global' | 'local'
export function useTabChange(name: TabName) {
    // 获取当前页签数据
    if (name === 'local') {
        // 查看当前chrome预设 local | session
        // const currentState = useChrome()
    }
}

// 获取系统主题
export function useTheme() {
    const osThemeRef = useOsTheme();
    const theme = computed(() => (osThemeRef.value === "dark" ? darkTheme : null));
    return theme
}

// 覆盖默认ui样式
export function useThemeOverrides() {
    /**
   * js 文件下使用这个做类型提示
   * @type import('naive-ui').GlobalThemeOverrides
   */
    const themeOverrides: GlobalThemeOverrides = {
        common: {
            // primaryColor: '#0E4812FF',
            // primaryColorHover: '#0E6918FF',
            // errorColor: '#662211FF',
            // errorColorHover: '#9F2E12FF',
        },
    }
    return themeOverrides
}

export type StorageMapping<T extends StorageType = StorageType> = {
    [key in T]: { [key: string]: any }
}

// 初始化本地数据
export function useInitStorage() {
    const storeMapping: StorageMapping = {
        local: {},
        session: {}
    }
    Object.keys(localStorage).forEach(key => {
        storeMapping['local'][key] = useLocalStorage(key, localStorage.getItem(key), {
            serializer: StorageSerializers.any
        })
    })
    Object.keys(sessionStorage).forEach(key => {
        storeMapping['session'][key] = useSessionStorage(key, sessionStorage.getItem(key), {
            serializer: StorageSerializers.any
        })
    })
    return storeMapping
}

// 获取本地数据
export function useStorageKeys(type: StorageType = 'local') {
    const targetType = {
        local: localStorage,
        session: sessionStorage
    }
    const keys = Object.keys(targetType[type])
        .map(key => {
            return {
                key,
                label: key,
            }
        })
    return keys
}