// /client/App.js
import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './css/fastfoodCoupons.css';

function App(){
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/">kfc</Link>
					</li>
					<li>
						<Link to="/pizzahut">pizzahut</Link>
					</li>
				</ul>

				<hr />

				<Route exact path="/" component={kfc} />
				<Route path="/pizzahut" component={pizzahut} />
			</div>
		</Router>
	);
}

class kfc extends Component{
	state={
		coupons:[],
	};

	componentDidMount(){
		fetch("/getKfcCoupons")
		.then(res=>res.json())
		.then(coupons=>this.setState({coupons}))
		.catch(error=>console.log("App.kfc.componentDidMount.getKfcCoupons", error));
	}

	render(){
		const {coupons}=this.state;

		return (
			<div>
				{coupons.map((e, i)=>(
					<div style={{margin:10, fontFamily:"helvetica-w01-light,sans-serif"}} key={i}>
						<div>{e.code}</div>
						<div>{e.price}</div>
						<div>{e.description}</div>
						<div>{e.expireDate}</div>
					</div>
				))}
			</div>
		);
	}
}

class pizzahut extends Component{
	state={
		coupons:[],
	};

	componentDidMount(){
		fetch("/getPizzahutCoupons")
		.then(res=>res.json())
		.then(coupons=>this.setState({coupons}))
		.catch(error=>console.log("App.pizzahut.componentDidMount.getPizzahutCoupons", error));
	}

	render(){
		const {coupons}=this.state;

		return (
			<div>
				{coupons.map((e, i)=>(
					<div style={{margin:10, fontFamily:"helvetica-w01-light,sans-serif"}} key={i}>
						<div>{e.code}</div>
						<div>{e.price}</div>
						<div>{e.description}</div>
						<div>{e.expireDate}</div>
					</div>
				))}
			</div>
		);
	}
}

export default App;
