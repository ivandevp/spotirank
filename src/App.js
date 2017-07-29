// Destructuring
import React, { Component } from 'react';
import firebase from 'firebase';

import AddSong from './components/AddSong';
import Playlist from './containers/Playlist';

export default class SpotiRank extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playlist: [ 'Shape of You', 'Shaky Shaky', 'Despacito' ]
		};

		// this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
	}

	componentDidMount() {
		const config = {
	    apiKey: "AIzaSyAvifryENNab0IdeFrgBiZdFamBtrCmfvE",
	    authDomain: "spotirank.firebaseapp.com",
	    databaseURL: "https://spotirank.firebaseio.com",
	    projectId: "spotirank",
	    storageBucket: "spotirank.appspot.com",
	    messagingSenderId: "388164618909"
	  };
		const app = firebase.initializeApp(config);
		this.database = app.database();

		const playlistDatabase = this.database.ref('/playlist');

		// Leer la base de datos
		playlistDatabase.on('value', (snapshot) => {
			const playlist = snapshot.val();
			// console.log(playlist);
			this.setState({
				playlist: playlist.songs
			});
		});
	}

	// Escribe en la BD
	savePlaylist(songs) {
		const playlistDatabase = this.database.ref('/playlist');

		playlistDatabase.set({
			songs: songs
		});
	}

	addSongToPlaylist = (song) => {
		let playlist = this.state.playlist;
		playlist.push(song);
		this.setState({
			playlist: playlist
		});
		this.savePlaylist(playlist);
	}

	render() {
		const songs = this.state.playlist;

		return (
			<div>
				<h1>SpotiRank</h1>
				<AddSong addSongToPlaylist={this.addSongToPlaylist} />
				<Playlist songs={songs} />
			</div>
		);
	}
}
