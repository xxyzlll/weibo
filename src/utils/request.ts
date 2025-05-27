import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

let loadingInstance: LoadingInstance | null = null
let requestNum = 0

const addLoading = () => {
  requestNum++
  if (requestNum === 1) {
    loadingInstance = ElLoading.service({
      text: '正在加载中....',
      background: 'rgba(0, 0, 0, 0)'
    })
  }
}

const cancelLoading = () => {
  requestNum--
  if (requestNum === 0) loadingInstance?.close()
}

export const createAxiosInstance = (config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 1000,
    withCredentials: true,
    ...config
  })

  instance.interceptors.request.use(
    (config: any) => {
      const { loading = true } = config
      if (loading) addLoading()
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      const { loading = true } = response.config
      if (loading) cancelLoading()
      const { status, data, message } = response
      
      if (status === 200) return data
      
      ElMessage.error(message)
      return Promise.reject(response.data)
    },
    (error) => {
      const { loading = true } = error.config
      if (loading) cancelLoading()
      
      ElMessage.error(error?.response?.data?.message || '服务端异常')
      return Promise.reject(error)
    }
  )

  return instance
}

const request = createAxiosInstance()

export const fetchFromApi = async (url: string, data?: any, method: string = 'GET') => {
  try {
    const config: AxiosRequestConfig = {
      url:'/api' + url,
      method,
      ...(method.toUpperCase() === 'GET' ? { params: data } : { data })
    }
    
    return await request(config)
  } catch (error) {
    console.error('API请求错误:', error)
    throw error
  }
}
