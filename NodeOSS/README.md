# NodeOSS

* 配置阿里云图片服务器

### 前言

* 这个demo是通过base64编码的形式，将图片上传到阿里云的OSS图片服务器。
* 本来打算采用multer和async/await来实现的，但是，async/await这种形式，可能是我的思路有问题。
* 最后采用了tj大神的co库。

### 接下来开发

* multer版本是肯定会开发的，什么时候有空，就开撸。
* 顺便还会整一波腾讯云（话说这个有点坑，还要用回调）COS