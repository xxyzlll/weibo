<template>
  <el-card class="user-card">
    <div class="user-info">
      <div class="user-header">
        <el-avatar :src="user.profile_image_url"/>
        <div class="user-basic">
          <div class="user-name-row">
            <span class="user-name">{{ user.screen_name }}</span>
            <el-tag :type="user.gender === 'f' ? 'danger' : 'primary'" size="small">
              {{ user.gender === 'f' ? '女' : '男' }}
            </el-tag>
            <el-tag :type="hasSent ? 'success' : 'info'" size="small">
              {{ hasSent ? '已发送' : '未发送' }}
            </el-tag>
          </div>
          <div class="user-location">IP: {{ user.location }}</div>
        </div>
      </div>
      <div class="user-stats">
        <div class="stat-item">
          <div class="stat-value">{{ user.followers_count }}</div>
          <div class="stat-label">粉丝</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ user.friends_count }}</div>
          <div class="stat-label">关注</div>
        </div>
      </div>
      <div class="user-description">{{ user.description }}</div>
      <div class="user-actions">
        <el-button size="small" @click="$emit('view-details')">详情</el-button>
        <el-button
            size="small"
            type="primary"
            :disabled="user.isSent"
            @click="$emit('send')"
        >
          发送
        </el-button>
        <el-button
            size="small"
            type="danger" @click="$emit('delete')">删除
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { User } from '../types/user'
import { computed } from 'vue'

const props = defineProps<{
  user: User
  sentIds: number[]
}>()

defineEmits<{
  'view-details': []
  'send': []
  'delete': []
}>()

const hasSent = computed(() => props.sentIds.includes(props.user.id+''))

</script>


<style scoped>
.user-card {
  margin-bottom: 1rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.user-basic {
  flex: 1;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.user-name {
  font-weight: 500;
  font-size: 1.1em;
}

.user-location {
  color: #666;
  font-size: 0.9em;
}

.user-stats {
  display: flex;
  gap: 2rem;
  padding: 0.5rem 0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-weight: 500;
  color: #409EFF;
}

.stat-label {
  font-size: 0.9em;
  color: #666;
}

.user-description {
  color: #333;
  font-size: 0.95em;
  line-height: 1.4;
}

.user-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
