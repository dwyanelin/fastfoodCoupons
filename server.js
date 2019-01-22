const express=require("express");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static("./client/build/"));

app.get("/getKfcCoupons", (req, res)=>{
	let result=[{"code":"40096", "price":59, "description":"雙色地瓜球+小飲", "expireDate":"2019/01/28"}];
	return res.json(result);
});

app.get("/getPizzahutCoupons", (req, res)=>{
	let result=[{"code":"18205", "price":99, "description":"指定口味個人比薩/黃金起司餃1份+薯星星*10+330ml飲", "expireDate":"?"}];
	return res.json(result);
});

app.get("/*", (req, res)=>res.sendFile('index.html', {root: __dirname+'/client/build/'}));

const port=process.env.PORT||5000;

app.listen(port, ()=>console.log(`LISTENING ON PORT ${port}`));
