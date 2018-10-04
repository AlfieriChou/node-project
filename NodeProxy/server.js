import http from 'http';
import log from './log';
import reverseProxy from './proxy';

// 创建反向代理服务器
const startProxyServer = (port) => {
  return new Promise((resolve, reject) => {
    const server = http.createServer(
      reverseProxy({
        servers: ["127.0.0.1:3001", "127.0.0.1:3002", "127.0.0.1:3003"]
      })
    );
    server.listen(port, () => {
      log("反向代理服务器已启动: %s", port);
      resolve(server);
    });
    server.on("error", reject);
  });
}

// 创建演示服务器
const  startServer = (port) => {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const chunks = [];
      req.on("data", chunk => chunks.push(chunk));
      req.on("end", () => {
        const buf = Buffer.concat(chunks);
        res.end(`${port}: ${req.method} ${req.url} ${buf.toString()}`.trim());
      });
    });
    server.listen(port, () => {
      log("服务器已启动: %s", port);
      resolve(server);
    });
    server.on("error", reject);
  });
}

(async () => {
  await startServer(3001);
  await startServer(3002);
  await startServer(3003);
  await startProxyServer(3000);
})();