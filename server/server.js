const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // .env 파일 로드

const app = express();
const port = 3000;

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_ID;
const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_SECRET_ID;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트 주소
    credentials: true, // CORS 정책 허용
  })
);

// 환경 변수 확인 로그 추가
console.log("NAVER_CLIENT_ID:", NAVER_CLIENT_ID);
console.log("NAVER_CLIENT_SECRET:", NAVER_CLIENT_SECRET);

// Naver 검색 API 호출을 처리하는 라우트
app.get("/searchLocal", async (req, res) => {
  const { query, display, start, sort } = req.query;

  // 요청 파라미터 로그 추가
  console.log("Request parameters:", { query, display, start, sort });

  try {
    console.log("서버 요청 start");
    const response = await axios.get(
      "https://openapi.naver.com/v1/search/local.json",
      {
        params: {
          query,
          display,
          start,
          sort,
        },
        headers: {
          "X-Naver-Client-Id": NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
        },
      }
    );
    const items = response.data.items;
    res.json({ items });
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "검색 실패" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
