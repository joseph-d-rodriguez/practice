import React, {PropTypes} from 'react';
import Header from './common/Header';

class App extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<Header />
				{this.props.children}
				<p>Footer here...</p>
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired
};

export default App;