const express=require("express");
const bodyParser=require("body-parser");
const app=express();

const rp=require('request-promise');
const $=require('cheerio');
const url='https://www.ptt.cc/bbs/fastfood/M.1526277935.A.DA0.html';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static("./client/build/"));

app.get("/getKfcCoupons", async (req, res)=>{
	let i=0;
	let coupons=await rp(url)
	.then(body=>{
		let coupons=[];
		$("#main-content", body)[0].children.some(e=>{
			if(e.attribs&&e.attribs.class==="f1 b7 hl"){
				i++;
			}
			if(i===2){
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
			}
			return false;
		});
		//console.log(coupons);
		return coupons;
	})
	.catch(error=>console.log("server.getKfcCoupons.rp", error));

	//let result=[{"code":"40096", "price":59, "description":"雙色地瓜球+小飲", "expireDate":"2019/01/28"}];
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
			if(e.type==="text"&&e.data.trim()!==""){
				if(e.data.includes("悠遊卡")){
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

app.get("/*", (req, res)=>res.sendFile('index.html', {root: __dirname+'/client/build/'}));

const port=process.env.PORT||5000;

app.listen(port, ()=>console.log(`LISTENING ON PORT ${port}`));
