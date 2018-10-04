# NodeKnexJoi

### 添加功能

* 添加了swagger UI线上API文档功能
* 添加了db-migrate数据库迁移文件功能（最主要的一个原因就是，太懒了不想再MySQL里边去建表，不过还是需要去检查一下）
* docker部署配置文件
* 日志模块
* 添加查询功能和排序方式（参考mongo查询排序方法）
* 数据导出功能
* travis自动化测试（没有完成测试，现在可以保证框架是没问题的）
* makefile部署命令集成化（webhooks不再考虑放弃（不需要））
	
### 未完成的事情

* API文档配置文件应该写到相对应的models里边去
* webpack打包	（可见其他项目，这里就不做处理了）
* webhooks自动化构建	（已放弃该想法）
* 将common里边的公用方法，按功能来模块化。

### 已知问题

* knex长连接问题，没有解决，服务器8小时自动断开。（knex不能维持连接）（可以考虑采用计时器先解决这个问题）
	```javascript
	setInterval(function () {
		Promise.resolve(app.knex.raw('select 1'))
	}, 10 * 60000)
### 添加新成员	
