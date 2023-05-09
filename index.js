const express = require("express");
const app = express();
const converter = require("liquid-to-handlebars");
const bodyParser = require("body-parser");

// 使用 body-parser 中间件解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 首页
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// 启动服务器
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
