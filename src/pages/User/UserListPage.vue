<template>
  <div
      class="user-list-page"
      v-loading="loading"
  >
    <div class="page-header">
      <div class="cookie-section">
        <el-input
            v-model="cookieStore.cookie"
            placeholder="请输入 cookie"
            @change="cookieStore.setCookie"
            style="width: 100%"
        >
          <template #prepend>Cookie:</template>
        </el-input>
      </div>

      <div class="filter-section">
        <el-form :model="filterForm" class="filter-form">
          <el-form-item label="博主ID">
            <el-input
                v-model="filterForm.userId"
                placeholder="请输入博主ID"
                style="width: 300px"
            />
          </el-form-item>
        </el-form>

        <div class="action-buttons">
          <el-button
              type="primary"
              :loading="loading"
              @click="handleFetch"
          >
            获取用户列表
          </el-button>
          <el-button type="success" @click="sendAll">
            全部发送
          </el-button>
          <el-button type="danger" @click="handleClearAll">
            清空所有
          </el-button>
        </div>
      </div>
    </div>

    <div class="loading-container">
      <el-empty
          v-if="!users.length"
          description="暂无用户数据"
          :image-size="200"
          style="width: 100%"
      >
        <el-button type="primary" @click="fetchUsers">获取用户列表</el-button>
      </el-empty>
      <div v-else class="user-list">
        <UserCard
            v-for="user in users"
            :key="user.id"
            :user="user"
            :sentIds="sentIds.map(e=>getIdInfo(e).id)"
            @view-details="showDetails(user)"
            @send="sendUser(user.id)"
            @delete="() => handleDelete(user.id)"
        />
      </div>
    </div>

    <UserDetailModal v-model="detailsVisible" :user="selectedUser"/>
    <div class="pagination-container">
      <el-pagination :page-size="20"  @change="handlePageChange"
          :total="total"  layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCookieStore } from "../../stores/cookieStore.ts";
import UserCard from "./components/UserCard.vue";
import UserDetailModal from "./components/UserDetailModal.vue";
import type {  User } from '../../types/user.ts'
import { fetchFromApi } from '../../utils/request.ts'
import { reactive } from "vue";
import { getLocalTime } from "../../utils";
import { getIdInfo, splitStr } from "../../constants";

// 状态变量
const users = ref<User[]>([])
const loading = ref(false)
const currentPage = ref(1)
const total = ref(0)
const cookieStore = useCookieStore();
const detailsVisible = ref(false);
const selectedUser = ref<User | null>(null);
const sentIds = ref<string[]>(JSON.parse(localStorage.getItem('sentIds') || '[]'))

function showDetails(user: User) {
  selectedUser.value = user;
  detailsVisible.value = true;
}


const handleDelete =  (userId: number) => {
   deleteUser(userId);
};

const handleClearAll = async () => {
  users.value = [];
  currentPage.value = 1
};

const filterForm = reactive({
  userId: "6005682439",
});

function handleFetch() {
  fetchUsers()
}


// 分页变更处理
const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchUsers()
}


const updateSentStatus = (id: number) => {
  sentIds.value = [...sentIds.value, `${ id }${ splitStr }${ getLocalTime() }`]
  localStorage.setItem('sentIds', JSON.stringify(sentIds.value))
}


// 修改后的fetchUsers方法
const fetchUsers = async () => {
  try {
    console.log('filterUserId.value',filterForm.userId)
    loading.value = true
    const response = await fetchFromApi('/friends',
        {
          userId:filterForm.userId,
          page: currentPage.value
        }
    )
    console.log('response',response.total)
    users.value = response.data
    total.value=response.total
  } catch (err) {
  } finally {
    loading.value = false
  }
}

function sendUser(userId: number) {
  updateSentStatus(userId)
}

function deleteUser(userId: number) {
  users.value = users.value.filter(user => user.id !== userId)
}

function sendAll() {
  users.value.forEach(user => {
    if (!sentIds.value.includes(user.id as any)) {
      sendUser(user.id)
    }
  })
}
</script>

<style scoped>
.user-list-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  overflow-y: auto; /* 启用滚动 */
}

.page-header {
  margin-bottom: 20px;
}

.cookie-section {
  margin-bottom: 20px;
  max-width: 1200px;
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
}

.filter-form {
  flex: 1;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-left: 20px;
}

.loading-container {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
}

:deep(.el-empty) {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pagination-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 2000; /* 提升层级 */
  width: auto; /* 移除固定宽度 */
}
</style>
