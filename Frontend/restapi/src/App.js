import React, { useEffect, useState } from 'react';
import './App.css';
import Restaurants from './components/Restaurants';
import PostLoadingComponent from './components/Loading';
import axiosInstance from './axios';

function App() {
	const PostLoading = PostLoadingComponent(Restaurants);
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allPosts = res.data;
			console.log(res.data);
			setAppState({ loading: false, posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);
	return (
		<div className="App">
			<h1>Menu Item's</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default App;
