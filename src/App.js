import React, { Component } from "react";
import "./App.css";

import getMovie from "./actions/movie";
import { Container, Pagination, Grid, Loader, Dimmer } from "semantic-ui-react";
import { MovieDetail, Poster, TopMenu } from "./components";
import shortid from "shortid";

class App extends Component {
    state = {
        movie: [],
        shows: null,
        isLoading: false,
        total_pages: null,
        active_pages: 1,
        movie_detail: false,
        movie_selected: null
    };
    componentDidMount() {
        this.LoadMovie();
    }
    componentWillUpdate() {
        this.LoadMovie();
    }
    async LoadMovie() {
        let { active_pages } = this.state;
        this.setState({ isLoading: !this.state.isLoading });
        // console.log(active_pages);
        let movie = await getMovie(active_pages);
        setTimeout(() => {
            this.setState({
                ...this.state,
                movie: movie.results,
                total_pages: movie.total_pages
            });
            this.setState({ isLoading: !this.state.isLoading });
        }, 1000);
    }
    ChangePage = e => {
        let page = e.target.getAttribute("value");
        this.setState({
            active_pages: +page
        });
    };
    posterClick = e => {
        let find = this.state.movie.filter(
            item => +item.id === +e.target.dataset.id
        );
        this.setState({
            movie_selected: find["0"] || null,
            movie_detail: !this.state.movie_detail
        });
    };
    showPoster() {
        return this.state.movie.map(e => {
            return (
                <Grid.Column
                    mobile={8}
                    tablet={4}
                    computer={3}
                    key={shortid.generate()}
                >
                    <Poster e={e} action={this.posterClick} />
                </Grid.Column>
            );
        });
    }
    MovieGrid() {
        return (
            <Grid centered>
                {this.showPoster()}
                <Grid.Row columns={6}>
                    {this.state.total_pages > 1 ? (
                        <Pagination
                            onPageChange={this.ChangePage}
                            totalPages={this.state.total_pages}
                            activePage={this.state.active_pages}
                        />
                    ) : (
                        ""
                    )}
                </Grid.Row>
            </Grid>
        );
    }
    render() {
        console.log(this.state.isLoading);

        return (
            <Container className="App">
                <TopMenu />
                <Dimmer active={this.state.isLoading}>
                    <Loader content="Loading" />
                </Dimmer>
                {this.MovieGrid()}
                {this.state.movie_detail ? (
                    <MovieDetail
                        open={this.state.movie_detail}
                        close={this.posterClick}
                        mov={this.state.movie_selected}
                    />
                ) : (
                    ""
                )}
            </Container>
        );
    }
}

export default App;
