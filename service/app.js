const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 启用 CORS
app.use(cors());

// 解析 JSON 请求体
app.use(express.json());

// 路由
app.use('/api', userRoutes);

// 启动服务器
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});