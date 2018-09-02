import React, { Component } from "react";
import "./App.css";

import getMovie from "./actions/movie";
import { Container, Pagination, Grid, Segment } from "semantic-ui-react";
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
        movie_selected: null,
        region: "ua",
        language: "uk-UA"
    };
    componentDidMount() {
        this.LoadMovie();
    }
    async LoadMovie(page, type, movie_id, lng, country) {
        let { active_pages, language, region } = this.state;
        active_pages = page || active_pages;
        language = lng || language;
        region = country || region;
        this.setState({ isLoading: !this.state.isLoading });
        let movie = await getMovie(
            active_pages,
            type,
            movie_id,
            language,
            region
        );
        this.setState({
            ...this.state,
            movie: movie.results,
            total_pages: movie.total_pages
        });
        this.setState({ isLoading: !this.state.isLoading });
    }
    ChangePage = e => {
        let page = e.target.getAttribute("value");
        this.setState({
            movie: [],
            active_pages: +page
        });
        this.LoadMovie(page);
    };
    getCert() {
        return getMovie(
            null,
            "release_dates",
            this.state.movie_selected.id,
            this.state.language,
            null
        );
    }
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
                    computer={2}
                    key={shortid.generate()}
                >
                    <Poster e={e} action={this.posterClick} />
                </Grid.Column>
            );
        });
    }
    MovieGrid() {
        return <Grid centered>{this.showPoster()}</Grid>;
    }
    ChangeLng = (event, data, name) => {
        if (name === "region") {
            let region = data.value;
            this.setState({
                active_pages: 1,
                region: region
            });
            this.LoadMovie(1, null, null, null, region);
        } else if (name === "language") {
            let language = data.value;
            this.setState({
                language: language
            });
            console.log(language);

            this.LoadMovie(this.state.active_pages, null, null, language);
        }
    };
    render() {
        return (
            <Container className="App">
                <TopMenu
                    language={this.state.language}
                    region={this.state.region}
                    action={this.ChangeLng}
                />
                <Segment
                    loading={this.state.isLoading}
                    basic
                    inverted={this.state.isLoading}
                    style={{ minHeight: "50px", transition: "1s ease" }}
                >
                    {this.MovieGrid()}
                </Segment>
                {/* <Segment> */}
                <Grid centered>
                    <Grid.Row columns={6}>
                        {this.state.total_pages > 1 ? (
                            <Pagination
                                firstItem={{
                                    "aria-label": "First item",
                                    content: "First",
                                    className: "custom-pagination"
                                }}
                                lastItem={{
                                    "aria-label": "Last item",
                                    content: "Last",
                                    className: "custom-pagination"
                                }}
                                nextItem={{
                                    "aria-label": "Next item",
                                    content: "Next"
                                }}
                                prevItem={{
                                    "aria-label": "Previous item",
                                    content: "Prev",
                                    color: "pink"
                                }}
                                onPageChange={this.ChangePage}
                                totalPages={this.state.total_pages}
                                activePage={this.state.active_pages}
                            />
                        ) : (
                            ""
                        )}
                    </Grid.Row>
                </Grid>
                {/* </Segment> */}
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
