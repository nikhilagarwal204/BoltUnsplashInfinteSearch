import React from 'react';

const Img = props =>
	<li>
		<a href={props.link}>
			<img src={props.url} alt="Unsplash Pic here" />
		</a>
		<p>
			<a href={props.user}>{props.name}</a>
			{props.caption}
		</p>
	</li>;

export default Img;
