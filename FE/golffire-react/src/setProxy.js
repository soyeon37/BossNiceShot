const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "https://i9a309.p.ssafy.io",
            changeOrigin: true,
        })
    );
};