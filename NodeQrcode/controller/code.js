import qr from 'qr-image';

// 为了安全性 这个应该用头部传值
const exportCode = async (req, res) => {

	try{

		const text = req.body.text;
		const img = qr.image(text,{size :10});
        res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
		
	} catch(err) {

		res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>414二维码生成失败</h1>');

	}

}

export {
	exportCode
} 
