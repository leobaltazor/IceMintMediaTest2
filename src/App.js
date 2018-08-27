import React, { Component } from "react";
import "./App.css";

import getMovie from "./actions/movie";

class App extends Component {
    state = {
        movie: [],
        shows: null,
        isLoading: false
    };
    async componentDidMount() {
        this.setState({ isLoading: !this.state.isLoading });
        let movie = await getMovie();
        this.setState({
            ...this.state,
            movie: movie.results
        });
        for (let i = 1; i < movie.total_pages; ++i) {
            let element = await getMovie(i + 1);
            element = element.results;
            element = [...element.map(e => e), ...this.state.movie];
            this.setState({
                ...this.state,
                movie: element
            });
        }
        this.setState({ isLoading: !this.state.isLoading });
    }
    render() {
        console.log(this.state.movie.map(e=> e.backdrop_path));
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
            </div>
        );
    }
}

export default App;
