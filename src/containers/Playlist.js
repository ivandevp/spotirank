import React, { Component } from 'react';

import Song from '../components/Song';

export default class Playlist extends Component {
	render() {
		const playlist = this.props.songs;

		return (
			<ul>
				{playlist.map((item, i) => <Song key={i} name={item} />)}
			</ul>
		);
	}
}
