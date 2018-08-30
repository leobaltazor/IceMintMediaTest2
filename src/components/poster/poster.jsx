import React from "react";
import { Image } from "semantic-ui-react";

const Poster = ({ e, action }) => (
    <Image
        src={`http://image.tmdb.org/t/p/w342${e.poster_path}`}
        size="medium"
        rounded
        className="posterPrev"
        alt={e.title}
        data-id={e.id}
        centered
        onClick={action}
    />
);

export default Poster;
