export interface User {
  id: number
  screen_name: string
  profile_image_url: string
  location: string
  description: string
  gender: 'f' | 'm'
  followers_count: number
  friends_count: number
  isSent: boolean
  createdAt: number
  sentAt?: number // 添加可选的发送时间字段
}
