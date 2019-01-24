// /client/App.js
import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'reactstrap';

//import './css/bootstrap.min.css';
import './css/fastfoodCoupons.css';

class App extends Component{
	state={
		kfcCouponsShow:[],
		pizzahutCouponsShow:[],
		dominosCouponsShow:[],
		napoliCouponsShow:[],

		kfcIncludeActive:[false, false, false, false, false, false, false, false],//toggle button
		kfcExcludeActive:[false, false, false, false, false, false, false, false],

		pizzahutIncludeActive:[false, false, false, false, false, false, false, false],
		pizzahutExcludeActive:[false, false, false, false, false, false, false, false],
	};
	kfcNames=["炸雞", "蛋塔", "地瓜球", "漢堡", "雞塊", "雞米花", "薯條", "飲品"];
	kfcFilterNames=["炸雞", "蛋塔", "瓜球", "堡", "雞塊", "雞米花", "薯", "飲"];
	pizzahutNames=["雞腿/翅", "鱈魚", "QQ球", "濃湯", "薯星星", "飲料"];
	pizzahutFilterNames=["腿", "鱈魚", "QQ球", "濃湯", "薯星星", "飲"];
	kfcCoupons=[];
	pizzahutCoupons=[];
	dominosCoupons=[];
	napoliCoupons=[];
	kfcIncludeFilters=[];
	kfcExcludeFilters=[];
	pizzahutIncludeFilters=[];
	pizzahutExcludeFilters=[];

	componentDidMount(){
		fetch("/getKfcCoupons")
		.then(res=>res.json())
		.then(kfcCoupons=>{
			this.kfcCoupons=kfcCoupons;
			this.setState({kfcCouponsShow:kfcCoupons});
		})
		.catch(error=>console.log("App.componentDidMount.getKfcCoupons", error));

		fetch("/getPizzahutCoupons")
		.then(res=>res.json())
		.then(pizzahutCoupons=>{
			this.pizzahutCoupons=pizzahutCoupons;
			this.setState({pizzahutCouponsShow:pizzahutCoupons});
		})
		.catch(error=>console.log("App.componentDidMount.getPizzahutCoupons", error));

		fetch("/getDominosCoupons")
		.then(res=>res.json())
		.then(dominosCoupons=>{
			this.dominosCoupons=dominosCoupons;
			this.setState({dominosCouponsShow:dominosCoupons});
		})
		.catch(error=>console.log("App.componentDidMount.getDominosCoupons", error));

		fetch("/getNapoliCoupons")
		.then(res=>res.json())
		.then(napoliCoupons=>{
			this.napoliCoupons=napoliCoupons;
			this.setState({napoliCouponsShow:napoliCoupons});
		})
		.catch(error=>console.log("App.componentDidMount.getNapoliCoupons", error));
	}

	render(){
		const {
			kfcCouponsShow,
			pizzahutCouponsShow,
			dominosCouponsShow,
			napoliCouponsShow,
			kfcIncludeActive,
			kfcExcludeActive,
			pizzahutIncludeActive,
			pizzahutExcludeActive
		}=this.state;

		return (
			<Router>
				<div style={{fontFamily:"Helvetica-W01-Light,微軟正黑體,sans-serif", display:"flex", flexDirection:"column", alignItems:"center"}}>
					<ul style={styles.nav}>
						<NavLink to="/">肯德基</NavLink>
						<NavLink to="/pizzahut">必勝客</NavLink>
						<NavLink to="/dominos">達美樂</NavLink>
						<NavLink to="/napoli">拿坡里</NavLink>
					</ul>

					<Route exact path="/" render={()=>(
						<div style={{display:"flex", flexDirection:"column", alignItems:"center", position:"absolute", top:40}}>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10}}>
								<span>　我一定要：</span>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcInclude(0)} active={kfcIncludeActive[0]}>{this.kfcNames[0]}</Button>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcInclude(1)} active={kfcIncludeActive[1]}>{this.kfcNames[1]}</Button>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcInclude(2)} active={kfcIncludeActive[2]}>{this.kfcNames[2]}</Button>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcInclude(3)} active={kfcIncludeActive[3]}>{this.kfcNames[3]}</Button>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcInclude(4)} active={kfcIncludeActive[4]}>{this.kfcNames[4]}</Button>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcInclude(5)} active={kfcIncludeActive[5]}>{this.kfcNames[5]}</Button>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcInclude(6)} active={kfcIncludeActive[6]}>{this.kfcNames[6]}</Button>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcInclude(7)} active={kfcIncludeActive[7]}>{this.kfcNames[7]}</Button>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10}}>
								<span>我一定不要：</span>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcExclude(0)} active={kfcExcludeActive[0]}>{this.kfcNames[0]}</Button>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcExclude(1)} active={kfcExcludeActive[1]}>{this.kfcNames[1]}</Button>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcExclude(2)} active={kfcExcludeActive[2]}>{this.kfcNames[2]}</Button>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcExclude(3)} active={kfcExcludeActive[3]}>{this.kfcNames[3]}</Button>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcExclude(4)} active={kfcExcludeActive[4]}>{this.kfcNames[4]}</Button>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcExclude(5)} active={kfcExcludeActive[5]}>{this.kfcNames[5]}</Button>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcExclude(6)} active={kfcExcludeActive[6]}>{this.kfcNames[6]}</Button>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.kfcExclude(7)} active={kfcExcludeActive[7]}>{this.kfcNames[7]}</Button>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10}}>
								<span>數量：{kfcCouponsShow.length}</span>
								<Button color="primary" style={{margin:".375rem .75rem"}} onClick={this.kfcReset}>重置</Button>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
								{kfcCouponsShow.map((e, i)=>(
									<div style={{width:330, margin:5, padding:5, border:"1px solid rgba(0,0,0,0.3)", borderRadius:".25rem"}} key={i}>
										<div style={{display:"flex", justifyContent:"space-between"}}>
											<div style={{display:"flex"}}><div style={{marginRight:10}}>{e.code}</div><div>{e.price}</div></div><div>{e.expireDate}</div>
										</div>
										<div>{e.description}</div>
									</div>
								))}
							</div>
						</div>
					)}/>
					<Route path="/pizzahut" render={()=>(
						<div style={{display:"flex", flexDirection:"column", alignItems:"center", position:"absolute", top:40}}>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10}}>
								<span>　我一定要：</span>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.pizzahutInclude(0)} active={pizzahutIncludeActive[0]}>{this.pizzahutNames[0]}</Button>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.pizzahutInclude(1)} active={pizzahutIncludeActive[1]}>{this.pizzahutNames[1]}</Button>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.pizzahutInclude(2)} active={pizzahutIncludeActive[2]}>{this.pizzahutNames[2]}</Button>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.pizzahutInclude(3)} active={pizzahutIncludeActive[3]}>{this.pizzahutNames[3]}</Button>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.pizzahutInclude(4)} active={pizzahutIncludeActive[4]}>{this.pizzahutNames[4]}</Button>
								<Button outline color="success" style={{margin:".375rem .75rem"}} onClick={()=>this.pizzahutInclude(5)} active={pizzahutIncludeActive[5]}>{this.pizzahutNames[5]}</Button>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10}}>
								<span>我一定不要：</span>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.pizzahutExclude(0)} active={pizzahutExcludeActive[0]}>{this.pizzahutNames[0]}</Button>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.pizzahutExclude(1)} active={pizzahutExcludeActive[1]}>{this.pizzahutNames[1]}</Button>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.pizzahutExclude(2)} active={pizzahutExcludeActive[2]}>{this.pizzahutNames[2]}</Button>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.pizzahutExclude(3)} active={pizzahutExcludeActive[3]}>{this.pizzahutNames[3]}</Button>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.pizzahutExclude(4)} active={pizzahutExcludeActive[4]}>{this.pizzahutNames[4]}</Button>
								<Button outline color="danger" style={{margin:".375rem .75rem"}} onClick={()=>this.pizzahutExclude(5)} active={pizzahutExcludeActive[5]}>{this.pizzahutNames[5]}</Button>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10}}>
								<span>數量：{pizzahutCouponsShow.length}</span>
								<Button color="primary" style={{margin:".375rem .75rem"}} onClick={this.pizzahutReset}>重置</Button>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
								{pizzahutCouponsShow.map((e, i)=>(
									<div style={{width:330, margin:5, padding:5, border:"1px solid rgba(0,0,0,0.3)", borderRadius:".25rem"}} key={i}>
										<div style={{display:"flex", justifyContent:"space-between"}}>
											<div style={{display:"flex"}}><div style={{marginRight:10}}>{e.code}</div><div>{e.price}</div></div><div>{e.expireDate}</div>
										</div>
										<div>{e.description}</div>
									</div>
								))}
							</div>
						</div>
					)}/>
					<Route path="/dominos" render={()=>(
						<div style={{display:"flex", flexDirection:"column", alignItems:"center", position:"absolute", top:40}}>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10}}>
								<span>數量：{dominosCouponsShow.length}</span>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
								{dominosCouponsShow.map((e, i)=>(
									<div style={{width:330, margin:5, padding:5, border:"1px solid rgba(0,0,0,0.3)", borderRadius:".25rem"}} key={i}>
										<div style={{display:"flex", justifyContent:"space-between"}}>
											<div style={{display:"flex"}}><div style={{marginRight:10}}>{e.code}</div><div>{e.price}</div></div><div>{e.expireDate}</div>
										</div>
										<div>{e.description}</div>
									</div>
								))}
							</div>
						</div>
					)}/>
					<Route path="/napoli" render={()=>(
						<div style={{display:"flex", flexDirection:"column", alignItems:"center", position:"absolute", top:40}}>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10}}>
								<span>數量：{napoliCouponsShow.length}</span>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
								{napoliCouponsShow.map((e, i)=>(
									<div style={{width:330, margin:5, padding:5, border:"1px solid rgba(0,0,0,0.3)", borderRadius:".25rem"}} key={i}>
										<div style={{display:"flex", justifyContent:"space-between"}}>
											<div style={{display:"flex"}}><div style={{marginRight:10}}>{e.code}</div><div>{e.price}</div></div><div>{e.expireDate}</div>
										</div>
										<div>{e.description}</div>
									</div>
								))}
							</div>
						</div>
					)}/>
				</div>
			</Router>
		);
	}

	kfcInclude=index=>{//按kfc一定要按紐
		const {kfcIncludeActive}=this.state;
		if(kfcIncludeActive[index]===true){//有active，所以點了
			if(this.kfcIncludeFilters.includes(this.kfcFilterNames[index])){//如果filter有，就要刪除
				this.kfcIncludeFilters=this.kfcIncludeFilters.filter(e=>e!==this.kfcFilterNames[index]);
			}
		}
		else{//沒active，所以點了
			if(!this.kfcIncludeFilters.includes(this.kfcFilterNames[index])){//如果filter沒有，就要加入
				this.kfcIncludeFilters.push(this.kfcFilterNames[index]);
			}
		}

		this.setState(prevState=>({//toggle this button active
			kfcIncludeActive:prevState.kfcIncludeActive.map((e,i)=>i===index?!e:e),
		}));

		this.kfcFiltering();
	};

	kfcExclude=index=>{//按kfc一定不要按紐
		const {kfcExcludeActive}=this.state;
		if(kfcExcludeActive[index]===true){//有active，所以點了
			if(this.kfcExcludeFilters.includes(this.kfcFilterNames[index])){//如果filter有，就要刪除
				this.kfcExcludeFilters=this.kfcExcludeFilters.filter(e=>e!==this.kfcFilterNames[index]);
			}
		}
		else{//沒active，所以點了
			if(!this.kfcExcludeFilters.includes(this.kfcFilterNames[index])){//如果filter沒有，就要加入
				this.kfcExcludeFilters.push(this.kfcFilterNames[index]);
			}
		}

		this.setState(prevState=>({//toggle this button active
			kfcExcludeActive:prevState.kfcExcludeActive.map((e,i)=>i===index?!e:e),
		}));

		this.kfcFiltering();
	};

	kfcFiltering=()=>{
		let kfcCouponsShow=[];
		this.kfcCoupons.forEach(kfcCoupon=>{//要全包含include&&全排除exclude
			let includesAll=this.kfcIncludeFilters.every(kfcIncludeFilter=>{
				if(kfcIncludeFilter==="炸雞"){
					return kfcCoupon.description.includes(kfcIncludeFilter)||kfcCoupon.description.includes("雞桶");
				}
				else if(kfcIncludeFilter==="飲"){
					return kfcCoupon.description.includes(kfcIncludeFilter)||kfcCoupon.description.includes("義式")||kfcCoupon.description.includes("紅茶")||kfcCoupon.description.includes("濃湯");
				}
				else{
					return kfcCoupon.description.includes(kfcIncludeFilter);
				}
			});
			let excludesAll=this.kfcExcludeFilters.every(kfcExcludeFilter=>{
				if(kfcExcludeFilter==="炸雞"){
					return !kfcCoupon.description.includes(kfcExcludeFilter)&&!kfcCoupon.description.includes("雞桶");
				}
				else if(kfcExcludeFilter==="飲"){
					return !kfcCoupon.description.includes(kfcExcludeFilter)&&!kfcCoupon.description.includes("義式")&&!kfcCoupon.description.includes("紅茶")&&!kfcCoupon.description.includes("濃湯");
				}
				else{
					return !kfcCoupon.description.includes(kfcExcludeFilter);
				}
			});
			if(includesAll&&excludesAll){
				kfcCouponsShow.push(kfcCoupon);
			}
		});
		this.setState({kfcCouponsShow});
	};

	pizzahutInclude=index=>{//按pizzahut一定要按紐
		const {pizzahutIncludeActive}=this.state;
		if(pizzahutIncludeActive[index]===true){//有active，所以點了
			if(this.pizzahutIncludeFilters.includes(this.pizzahutFilterNames[index])){//如果filter有，就要刪除
				this.pizzahutIncludeFilters=this.pizzahutIncludeFilters.filter(e=>e!==this.pizzahutFilterNames[index]);
			}
		}
		else{//沒active，所以點了
			if(!this.pizzahutIncludeFilters.includes(this.pizzahutFilterNames[index])){//如果filter沒有，就要加入
				this.pizzahutIncludeFilters.push(this.pizzahutFilterNames[index]);
			}
		}

		this.setState(prevState=>({//toggle this button active
			pizzahutIncludeActive:prevState.pizzahutIncludeActive.map((e,i)=>i===index?!e:e),
		}));

		this.pizzahutFiltering();
	};

	pizzahutExclude=index=>{//按pizzahut一定不要按紐
		const {pizzahutExcludeActive}=this.state;
		if(pizzahutExcludeActive[index]===true){//有active，所以點了
			if(this.pizzahutExcludeFilters.includes(this.pizzahutFilterNames[index])){//如果filter有，就要刪除
				this.pizzahutExcludeFilters=this.pizzahutExcludeFilters.filter(e=>e!==this.pizzahutFilterNames[index]);
			}
		}
		else{//沒active，所以點了
			if(!this.pizzahutExcludeFilters.includes(this.pizzahutFilterNames[index])){//如果filter沒有，就要加入
				this.pizzahutExcludeFilters.push(this.pizzahutFilterNames[index]);
			}
		}

		this.setState(prevState=>({//toggle this button active
			pizzahutExcludeActive:prevState.pizzahutExcludeActive.map((e,i)=>i===index?!e:e),
		}));

		this.pizzahutFiltering();
	};

	pizzahutFiltering=()=>{
		let pizzahutCouponsShow=[];
		this.pizzahutCoupons.forEach(pizzahutCoupon=>{//要全包含include&&全排除exclude
			let includesAll=this.pizzahutIncludeFilters.every(pizzahutIncludeFilter=>{
				if(pizzahutIncludeFilter==="腿"){
					return pizzahutCoupon.description.includes(pizzahutIncludeFilter)||pizzahutCoupon.description.includes("翅");
				}
				else if(pizzahutIncludeFilter==="飲"){
					return pizzahutCoupon.description.includes(pizzahutIncludeFilter)||pizzahutCoupon.description.includes("雪碧")||pizzahutCoupon.description.includes("可樂");
				}
				else{
					return pizzahutCoupon.description.includes(pizzahutIncludeFilter);
				}
			});
			let excludesAll=this.pizzahutExcludeFilters.every(pizzahutExcludeFilter=>{
				if(pizzahutExcludeFilter==="腿"){
					return !pizzahutCoupon.description.includes(pizzahutExcludeFilter)&&!pizzahutCoupon.description.includes("翅");
				}
				else if(pizzahutExcludeFilter==="飲"){
					return !pizzahutCoupon.description.includes(pizzahutExcludeFilter)&&!pizzahutCoupon.description.includes("雪碧")&&!pizzahutCoupon.description.includes("可樂");
				}
				else{
					return !pizzahutCoupon.description.includes(pizzahutExcludeFilter);
				}
			});
			if(includesAll&&excludesAll){
				pizzahutCouponsShow.push(pizzahutCoupon);
			}
		});
		this.setState({pizzahutCouponsShow});
	};

	kfcReset=()=>{
		this.setState({
			kfcCouponsShow:this.kfcCoupons,
			kfcIncludeActive:[false, false, false, false, false, false, false, false],
			kfcExcludeActive:[false, false, false, false, false, false, false, false],
		});
		this.kfcIncludeFilters=[];
		this.kfcExcludeFilters=[];
	};

	pizzahutReset=()=>{
		this.setState({
			pizzahutCouponsShow:this.pizzahutCoupons,
			pizzahutIncludeActive:[false, false, false, false, false, false, false, false],
			pizzahutExcludeActive:[false, false, false, false, false, false, false, false],
		});
		this.pizzahutIncludeFilters=[];
		this.pizzahutExcludeFilters=[];
	};
}

export default App;

function NavLink(props){
	return (
		<li style={styles.navItem}>
			<Link {...props}/>
		</li>
	);
}

const styles={};

styles.nav={
	padding:0,
	margin:0,
	position:"absolute",
	top:0,
	height:"40px",
	width:"100%",
	display:"flex",
};

styles.navItem={
	textAlign:"center",
	flex:1,
	listStyleType:"none",
	padding:"10px",
};