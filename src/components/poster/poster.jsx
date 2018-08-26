import React from "react";
import { string } from "prop-types";

import "./style.css";

const Poster = ({ imgurl, movieTitle }) => {
    return <img className="poster-prev" src={imgurl} alt={movieTitle} />;
};

Poster.protoTypes = {
    imgurl: string,
    movieTitle: string
};

export default Poster;
