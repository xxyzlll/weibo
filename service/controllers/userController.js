const axios = require("axios");
const config = require("../config/config");

const headers = {
  accept: "application/json, text/plain, */*",
  "accept-language": "en-US,en;q=0.9",
  "client-version": "v2.47.67",
  cookie: config.cookie,
  referer: "https://weibo.com/u/page/follow/6005682439?relate=fans",
  "sec-ch-ua":
    '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
  "sec-ch-ua-platform": "macOS",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
};

exports.getFriends = async (req, res) => {
  const { userId, page = 1 } = req.query; // 从查询参数获取
  try {
    console.log("getFriends",req.query);
    
    const response = await axios.get(
      "https://weibo.com/ajax/friendships/friends",
      {
        headers,
        params: {
          relate: "fans",
          page: page || 1,
          uid: userId || "6005682439",
          type: "all",
          newFollowerCount: 0,
        },
      }
    );
    res.json({
      data: response.data.users,
      page: isNaN(Number(page)) ? 1 : Number(page),
      total: response.data.total_number,
    });
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ error: "Failed to fetch friends" });
  }
};
