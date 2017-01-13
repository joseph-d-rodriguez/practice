$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homePage');
var About = require('./components/about/aboutPage');
var Header = require('./components/common/header');

// tutorial is having us do a substring(1) which is why i think i have to explicitely add this extra # character or else localhost:PORT won't load anything... must be localhost:PORT/#
window.location = '/#'; 

(function(win) {
	var App = React.createClass({
		render: function() {
			var Child;

			switch(this.props.route) {
				case 'about': Child = About; break;
				default: Child = Home;
			}

			return (
				<div>
					<p>wtf</p>
					<Header/>
					<Child/>
				</div>
			);
		}
	});

	function render() {
		var route = win.location.hash.substr(1);
		React.render(<App route={route} />, document.getElementById('app'));
	}

	win.addEventListener('hashchange', render);

})(window);
