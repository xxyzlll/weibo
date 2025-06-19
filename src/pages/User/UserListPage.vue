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
  userId: "6150456633",
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
          cookie: cookieStore.cookie,
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
  padding: 12px;
  max-width: 100%;
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    gap: 12px;
  }
  
  .action-buttons {
    flex-wrap: wrap;
    gap: 8px;
  }

  .user-list {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .el-pagination {
    --el-pagination-font-size: 12px;
  }
}

.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  padding: 8px 0;
}
</style>
