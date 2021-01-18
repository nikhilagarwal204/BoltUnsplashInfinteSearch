import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ImgList from './Components/ImgList';
import SearchForm from './Components/SearchForm';


export default class App extends Component {
	constructor() {
		super();
		this.state = {
			imgs: [],
			loadingState: false,
			page: 0,
			prevY: 0

		};
	}

	handleObserver(entities, observer) {
		const y = entities[0].boundingClientRect.y;
		if (this.state.prevY > y) {
		  const lastPhoto = this.state.photos[this.state.imgs.length - 1];
		  const curPage = lastPhoto.albumId;
		  this.performSearch(curPage);
		  this.setState({ page: curPage });
		}
		this.setState({ prevY: y });
	}
	
	componentDidMount() {
		this.performSearch(this.state.page);
		var options = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0
		};		
		this.observer = new IntersectionObserver(
			this.handleObserver.bind(this),
			options
		);
		this.observer.observe(this.loadingRef);
	}


	performSearch = (query = 'sun') => {
		this.setState({ loadingState: true });
		axios
			.get(
				`https://api.unsplash.com/search/photos/?per_page=10000&query=${query}&client_id=${"6c446b49b72a4c559d9b9d67183d5c1de1981d16f309063c3b994086e6ce1a26"}`
			)
			.then(data => {
				this.setState({ imgs: [...this.state.imgs, ...data.data.results] });
				this.setState({ loadingState: false });
			})
			.catch(err => {
				console.log('Error happened during fetching!', err);
			});
	};
     
	render() {
		return (
			<div>
				<div className="main-header">
					<div className="inner">
						<h1 className="main-title">ImageSearch</h1>
						<SearchForm onSearch={this.performSearch} />
					</div>
				</div>
				<div className="main-content">
					{this.state.loadingState
						? <p>Loading</p>
						: <ImgList data={this.state.imgs} />}
				</div>
			</div>
		);
	}
}
