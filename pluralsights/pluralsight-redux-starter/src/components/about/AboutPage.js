import React from 'react';
import {Link} from 'react-router';

class AboutPage extends React.Component {
	render() {
		return (
			<div className="jumbotron">
				<h1>About</h1>
				<p>This application uses React, Redux, React Router and other stuff.</p>
				<Link to="/">Go back home</Link>
			</div>
		);
	}
}

export default AboutPage;