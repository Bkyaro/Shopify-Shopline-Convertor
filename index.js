const express = require("express");
const app = express();
const converter = require("liquid-to-handlebars");

// 首页
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// 启动服务器
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
