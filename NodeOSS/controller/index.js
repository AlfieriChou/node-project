import OSS from 'ali-oss';
import fs from 'fs';
import co from 'co';

import { config } from '../config';

const client = new OSS({
	region: config.region,
	accessKeyId: config.accessKeyId,
	accessKeySecret: config.accessKeySecret
})

const ali_oss = {
	bucket: config.bucket,
	endPoint: config.endPoint
}

const upload = (req, res) => {

	const imgData = req.body.imgData;
	const fileName = Date.now() + '.png';
	const filePath = './images/' + fileName;
	const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	const dataBuffer = new Buffer(base64Data, 'base64');

	fs.writeFile(filePath, dataBuffer, (err) => {
        if(err) res.send({status:'400',message:'文件写入失败'});        
        // 阿里云 上传文件         
        co(function* () {
            client.useBucket(ali_oss.bucket);
            const result = yield client.put(fileName, filePath);
            const imageSrc = 'http://image.alfierichou.com/' + result.name;
            res.send(JSON.stringify({status:'200',message:'上传成功',imageUrl:imageSrc})); 
        }).catch((err) => {
            res.send({status:'400',message:'上传失败',error:JSON.stringify(err)}); 
        });
       // 上传之后删除本地文件
       fs.unlinkSync(filePath);
    });

}

export {
	upload
}