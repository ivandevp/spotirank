import React, { Component } from 'react';

export default class Song extends Component {
	render() {
		const name = this.props.name;

		return (
			<li>{name}</li>
		);
	}
}
