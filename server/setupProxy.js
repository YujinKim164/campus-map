const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1/search",
    createProxyMiddleware({
      target: "https://openapi.naver.com",
      changeOrigin: true,
      pathRewrite: {
        "^/v1/search": "/v1/search",
      },
      onProxyReq: (proxyReq, req, res) => {
        // 헤더에 클라이언트 ID와 시크릿 추가
        proxyReq.setHeader("X-Naver-Client-Id", process.env.REACT_APP_NAVER_ID);
        proxyReq.setHeader(
          "X-Naver-Client-Secret",
          process.env.REACT_APP_NAVER_SECRET_ID
        );
      },
    })
  );
};
