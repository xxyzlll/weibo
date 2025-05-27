// src/types/axios.d.ts
import 'axios'

declare module 'axios' {
    interface AxiosRequestConfig {
        /**
         * 是否显示全局加载提示
         * @default true
         */
        loading?: boolean

        /**
         * 自定义加载提示ID（用于并行请求）
         */
        loadingKey?: string
    }

    interface AxiosResponse<T = any> {
        /** 业务扩展字段 */
        customData?: {
            elapsed?: number
            fromCache?: boolean
        }
        message:string
        total:number
        page:number
    }
}
