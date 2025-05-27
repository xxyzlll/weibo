<template>
  <el-dialog
      v-model="visible"
      :title="user?.screen_name + ' 的详细信息'"
      width="50%"
  >
    <div class="user-details">
      <div class="user-header">
        <el-avatar
            :size="64"
            :src="user?.profile_image_url"
            class="clickable-avatar"
            @click="openWeiboProfile"
        />
        <div class="user-basic-info">
          <h3>{{ user?.screen_name }}</h3>
          <el-tag :type="user?.gender === 'm' ? 'primary' : 'danger'" size="small">
            {{ user?.gender === 'm' ? '男' : '女' }}
          </el-tag>
        </div>
      </div>

      <div class="user-stats">
        <div class="stat-item">
          <span class="label">粉丝数</span>
          <span class="value">{{ user?.followers_count }}</span>
        </div>
        <div class="stat-item">
          <span class="label">关注数</span>
          <span class="value">{{ user?.friends_count }}</span>
        </div>
      </div>

      <div class="info-section">
        <div class="info-item">
          <span class="info-label">用户 ID：</span>
          <span class="info-value">{{ user?.id }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">IP 地址：</span>
          <span class="info-value">{{ user?.location }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">发送状态：</span>
          <span class="info-value">{{ sendData?.id ? '已发送' : '未发送' }}</span>
        </div>
        <div class="info-item" v-if="sendData?.id ">
          <span class="info-label">发送时间：</span>
          <span class="info-value">{{ sendData?.time }}</span>
        </div>
      </div>

      <div class="description-section">
        <h4>个人简介</h4>
        <p>{{ user?.description || '暂无简介' }}</p>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { User } from '../../../types/user.ts'
import { getIdInfo } from "../../../constants";
import { openWeiboUrl } from "../index.ts";

const props = defineProps<{
  modelValue: boolean
  user: User | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const sendData = ref<any>(
    null
)

const visible = computed({
  get: () => {
    if (props.modelValue) {
      const data = JSON.parse(localStorage.getItem('sentIds') || '[]')
      const findData = data.find((item: string) => item.startsWith(props.user?.id as any)) || ''
      sendData.value = getIdInfo(findData)
    }
    return props.modelValue
  },
  set: (value) => {
    emit('update:modelValue', value)
  }
})

function openWeiboProfile() {
  openWeiboUrl(props.user?.id)
}
</script>

<style scoped>
.user-details {
  padding: 1rem;
}

.user-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.user-basic-info {
  margin-left: 1rem;
}

.user-basic-info h3 {
  margin: 0 0 0.5rem 0;
}

.user-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-item .label {
  font-size: 0.9rem;
  color: #666;
}

.stat-item .value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #409EFF;
}

.info-section {
  margin-bottom: 1.5rem;
}

.info-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  color: #666;
  margin-right: 1rem;
}

.info-value {
  color: #333;
  font-weight: 500;
}

.description-section {
  margin-top: 1.5rem;
}

.description-section h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.description-section p {
  margin: 0;
  padding: 1rem;
  background-color: #f5f7fa;
  border-radius: 4px;
  line-height: 1.5;
}

.clickable-avatar {
  cursor: pointer;
}

.clickable-avatar:hover {
  opacity: 0.8;
}
</style>
