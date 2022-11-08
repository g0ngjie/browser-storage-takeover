import { StorageSerializers, useLocalStorage, useSessionStorage, useStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import { useOsTheme, darkTheme } from "naive-ui";
import type { GlobalThemeOverrides } from "naive-ui";
import { NoticeKey } from "@takeover/shared-utils";

export type StorageType = 'local' | 'session'

export const currentType = ref<StorageType>("local");

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

const typeMapping = {
    local: localStorage,
    session: sessionStorage
}

// 获取本地数据
export function useStorageKeys(type: StorageType = 'local') {
    const keys = Object.keys(typeMapping[type])
        .map(key => {
            return {
                key,
                label: key,
            }
        })
    return keys
}

export type GlobalData = {
    type: StorageType;
    key: string;
    value: any;
    createAt: string;
    hostname: string;
    title?: string;
};

function sendMsg(
    type: 'save' | 'get' | 'remove',
    target?: GlobalData
) {
    window.dispatchEvent(
        new CustomEvent(NoticeKey.CONTENT_DOCUMENT, {
            detail: { to: 'content', type, value: target },
        })
    );
}

export const currentGlobalData = ref<{ [key: string]: GlobalData }>({})

window.addEventListener(NoticeKey.CONTENT_DOCUMENT, function (event) {
    const customEvent = event as CustomEvent
    if (customEvent.detail.to !== 'modal') return
    const data = customEvent.detail
    currentGlobalData.value = data?.value
})

// 替换current 数据
export function replaceCurrentKV(data: GlobalData) {
    // 获取共享数据
    const getGlobalData = currentGlobalData.value[`${location.hostname}_${currentType.value}_${data.key}`]
    if (getGlobalData?.value) {
        const state = useStorage(data.key, getGlobalData.value, typeMapping[currentType.value])
        state.value = getGlobalData.value
    } else {
        const state = useStorage(data.key, data.value, typeMapping[currentType.value])
        state.value = data.value
    }
}

export const useGlobal = {
    // 缓存共享实例
    save(key: GlobalData['key'], value: GlobalData['value']) {
        sendMsg('save', {
            key,
            value,
            type: currentType.value,
            createAt: Date.now().toString(),
            hostname: location.hostname,
            title: document.title
        })
    },
    // 获取缓存共享实例
    get() {
        sendMsg('get')
    },
    // 删除共享实例
    remove(key: GlobalData['key']) {
        sendMsg('remove', { type: currentType.value, key, value: null, hostname: location.hostname, createAt: "" })
    }
}
