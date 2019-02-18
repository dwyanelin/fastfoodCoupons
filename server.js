const express=require("express");
const bodyParser=require("body-parser");
const app=express();

const rp=require('request-promise');
const $=require('cheerio');
const url='https://www.ptt.cc/bbs/fastfood/M.1526277935.A.DA0.html';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/getKfcCoupons", async (req, res)=>{
	let coupons=await rp("https://kfc.2dim.space")
	.then(body=>{
		let coupons=[];
		$("#parent", body)[0].children.forEach(e=>{
			if(e.attribs&&e.attribs.class.includes("box")){
				let code, price, description, expireDate;
				e.children.forEach(e=>{
					if(e.name==="a"){
						e.children.forEach(e=>{
							if(e.name==="div"){
								price=e.children[0].data;
							}
							else{
								code=e.data;
							}
						});
					}
					else if(e.attribs&&e.attribs.class==="vldt"){
						expireDate=e.children[0].children[0].data;
					}
					else if(e.type==="text"){
						description=e.data;
					}
				});
				coupons.push({code, price, description, expireDate});
			}
		});
		return coupons;
	})
	.catch(error=>console.log("server.getKfcCoupons.rp", error));

	return res.json(coupons);
});

app.get("/getPizzahutCoupons", async (req, res)=>{
	let i=0;
	let coupons=await rp(url)
	.then(body=>{
		let coupons=[];
		$("#main-content", body)[0].children.some(e=>{
			if(e.attribs&&e.attribs.class==="f1 b7 hl"){
				i++;
			}
			if(i<3){
				return false;
			}
			if(i===4){
				return true;
			}
			if(e.type==="text"&&e.data.trim()!==""){
				if(!(e.data.includes("\n"))&&e.data.includes("$")){
					//console.log(e.prev);return true;
					coupons.push({
						"code":e.prev.children[0].data.trim(),
						"price":e.data.trim(),
						"description":e.next.children[0].data.trim(),
						"expireDate":e.next.next.data.split("\n")[0].trim(),
					});
				}
				else if(e.data.includes("$")){
					let t=e.data.split("\n");
					t=t[t.length-1];
					t=t.split("$");
					coupons.push({
						"code":t[0].trim(),
						"price":"$"+t[1].trim(),
						"description":e.next.children[0].data.trim(),
						"expireDate":e.next.next.data.split("\n")[0].trim(),
					});
				}
				else if(e.data.includes("限悠遊卡付款")){
					coupons.push({
						"code":e.data.trim(),
						"price":"$ ?",
						"description":e.next.children[0].data.trim(),
						"expireDate":e.next.next.data.split("\n")[0].trim(),
					});
				}
			}
			return false;
		});
		//console.log(coupons);
		return coupons;
	})
	.catch(error=>console.log("server.getPizzahutCoupons.rp", error));

	//let result=[{"code":"18205", "price":99, "description":"指定口味個人比薩/黃金起司餃1份+薯星星*10+330ml飲", "expireDate":"?"}];
	return res.json(coupons);
});

app.get("/getDominosCoupons", async (req, res)=>{
	let i=0;
	let coupons=await rp(url)
	.then(body=>{
		let coupons=[];
		$("#main-content", body)[0].children.some(e=>{
			if(e.attribs&&e.attribs.class==="f1 b7 hl"){
				i++;
			}
			if(i<4){
				return false;
			}
			if(i===5){
				return true;
			}
			if(e.type==="text"&&e.data.trim().includes("~")){
				if(e.prev.prev.type!=="text"){//無價格
					coupons.push({
						"code":e.prev.prev.children[0].data,
						"price":"$ ?",
						"description":e.prev.children[0].data,
						"expireDate":e.data.split("\n")[0].trim(),
					});
				}
				else{
					coupons.push({
						"code":e.prev.prev.prev.children[0].data,
						"price":e.prev.prev.data.trim(),
						"description":e.prev.children[0].data,
						"expireDate":e.data.split("\n")[0].trim(),
					});
				}
			}
			return false;
		});
		//console.log(coupons);
		return coupons;
	})
	.catch(error=>console.log("server.getDominosCoupons.rp", error));

	//let result=[{"code":"18205", "price":99, "description":"指定口味個人比薩/黃金起司餃1份+薯星星*10+330ml飲", "expireDate":"?"}];
	return res.json(coupons);
});

app.get("/getNapoliCoupons", async (req, res)=>{
	let i=0;
	let coupons=await rp(url)
	.then(body=>{
		let coupons=[];
		$("#main-content", body)[0].children.some(e=>{
			if(e.attribs&&e.attribs.class==="f1 b7 hl"){
				i++;
			}
			if(i<5){
				return false;
			}
			if(i===6){
				return true;
			}
			if(e.type==="text"&&e.data.trim()!==""){
				if(e.data.includes("$")){
					coupons.push({
						"code":"?",
						"price":e.data.trim(),
						"description":e.next.children[0].data.trim(),
						"expireDate":e.next.next.data.split("\n")[0].trim(),
					});
				}
			}
			return false;
		});
		//console.log(coupons);
		return coupons;
	})
	.catch(error=>console.log("server.getNapoliCoupons.rp", error));

	//let result=[{"code":"18205", "price":99, "description":"指定口味個人比薩/黃金起司餃1份+薯星星*10+330ml飲", "expireDate":"?"}];
	return res.json(coupons);
});

app.get("/getImg", async (req, res)=>{
	let img=await rp(url)
	.then(body=>{
		let flagPizzahut=false;
		let imgPizzahut={};
		$("#main-content", body)[0].children.forEach(e=>{
			if(e.children&&e.children[0].data&&e.children[0].data.includes("imgur")){//pivot=圖片網址
				if(e.prev.prev.name==="span"&&e.prev.prev.children[0].data.trim()==="必勝客 優惠代碼"){
					flagPizzahut=true;//開始抓必勝客圖片
				}
				if(e.prev.prev.name==="span"&&e.prev.prev.children[0].data.trim()==="MOS"){
					flagPizzahut=false;//停止抓必勝客圖片
				}
				let url=e.children[0].data.trim();//刪除前後空白換行
				if(!url.includes("i.imgur")){
					url=url.replace("imgur", "i.imgur");//img一致化
				}
				if(!url.includes(".jpg")&&!url.includes(".png")){
					url+=".jpg";//加了才是直接顯示圖片的網址
				}
				if(flagPizzahut&&e.prev.data.trim()!==""){
					imgPizzahut[e.prev.data.trim()]=url.replace("http:", "https:");
				}
			}
		});
		return {imgPizzahut};
	})
	.catch(error=>console.log("server.getImg.rp1", error));

	img.imgKfc=await rp("https://kfc.2dim.space/img.html")
	.then(body=>{
		let imgKfc={};
		$("#images", body)[0].children.forEach(e=>{
			if(e.name==="img"){
				let url=e.attribs.lnk.trim();//刪除前後空白換行
				if(!url.includes("i.imgur")){
					url=url.replace("imgur", "i.imgur");//img一致化
				}
				if(!url.includes(".jpg")&&!url.includes(".png")){
					url+=".jpg";//加了才是直接顯示圖片的網址
				}
				imgKfc[e.attribs.id.trim().replace("i", "")]=url.replace("http:", "https:");//統一https
			}
		});
		return imgKfc;
	})
	.catch(error=>console.log("server.getImg.rp2", error));

	return res.json(img);
});

//Serve static assets if in production
if (process.env.NODE_ENV==='production'){
	//Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res)=>res.sendFile('index.html', {root:__dirname+'/client/build/'}));
}

const port=process.env.PORT||5000;

app.listen(port, ()=>console.log(`LISTENING ON PORT ${port}`));
