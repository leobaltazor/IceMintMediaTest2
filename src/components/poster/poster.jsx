import React from "react";
import { string } from "prop-types";

import "./style.css";

const Poster = ({ imgurl, movieTitle, action, movieId }) => {
    return (
        <img
            className="posterPrev"
            src={imgurl}
            alt={movieTitle}
            onClick={action}
            data-id={movieId}
        />
    );
};

Poster.protoTypes = {
    imgurl: string,
    movieTitle: string
};

export default Poster;
