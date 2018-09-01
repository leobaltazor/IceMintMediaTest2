import React, { Component } from "react";
import "./App.css";

import getMovie from "./actions/movie";
import { Container, Pagination, Grid } from "semantic-ui-react";
import { MovieDetail, Poster } from "./components";
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
    async componentDidMount() {
        this.setState({ isLoading: !this.state.isLoading });
        let movie = await getMovie();
        this.setState({
            ...this.state,
            movie: movie.results,
            total_pages: movie.total_pages
        });
        this.setState({ isLoading: !this.state.isLoading });
    }
    posterClick = e => {
        let find = this.state.movie.filter(
            item => +item.id === +e.target.dataset.id
        );
        console.log(find["0"]);

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
    render() {
        return (
            <Container className="App">
                <Grid centered>
                    {this.showPoster()}
                    <Grid.Row columns={6}>
                        {this.state.total_pages > 1 ? (
                            <Pagination
                                totalPages={this.state.total_pages}
                                activePage={this.state.active_pages}
                            />
                        ) : (
                            ""
                        )}
                    </Grid.Row>
                </Grid>
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
