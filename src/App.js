import React, { Component } from "react";
import "./App.css";

import getMovie from "./actions/movie";
import {
    Container,
    Menu,
    Pagination,
    Grid,
    Image,
    Header
} from "semantic-ui-react";
import MovieDetail from "./components/MovieDetail";
import shortid from "shortid";
import Poster from "./components/Poster";

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
    posterClick = e => {
        // console.log(e.target.dataset.id || null);
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
                    {/* <Image
                        src={`http://image.tmdb.org/t/p/w342${e.poster_path}`}
                        size="medium"
                        rounded
                        className="posterPrev"
                        alt={e.title}
                        data-id={e.id}
                        centered
                        onClick={this.posterClick}
                    /> */}
                </Grid.Column>
            );
        });
    }
    render() {
        // console.log(this.state.movie["0"]);
        return (
            <Container className="App">
                <Menu>
                    <Menu.Item>
                        <Header>
                            <Image src="/img/logo.png" /> Movie
                        </Header>
                    </Menu.Item>
                    <Menu.Menu position="right" />
                </Menu>
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
