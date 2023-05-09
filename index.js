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

// 处理 POST 请求
app.post("/process", (req, res) => {
  // 获取请求体中的数据
  const inputData = req.body.data;

  // 替换字符串中的 var 为 let
  const processedData = converter.convert(inputData);

  // 解码字符串中的转义字符
  const decodedData = decodeURIComponent(processedData);

  // 发送处理后的字符串作为响应
  res.send(decodedData);
});

// 启动服务器
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
