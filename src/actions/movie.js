// import MOVIES_LIST from "../types/movie";
import { apiKey } from "../config/config";

export default function getMovie(
    page,
    type,
    movie_id = "",
    language,
    region
) {
    const url = "http://api.themoviedb.org/3/movie/";
    const api_key = `?api_key=${apiKey}`;
    type = type ? type : "now_playing";
    page = page ? `&page=${page}` : "";
    region = region ? `&region=${region}` : "";
    language = language ? `&language=${language}` : "";
    movie_id = movie_id ? `${movie_id}/` : "";
    const request = `${url}${movie_id}${type}${api_key}${language}${region}${page}`;
    return fetch(request)
        .then(res => {
            return res.ok ? res.json() : "error";
        })
        .then(data => {
            if (data.results["0"].iso_3166_1) {
                let test = data.results.filter(e => e.iso_3166_1 === "US");
                let test2 = test["0"].release_dates.filter(e => {
                    return e.iso_639_1 === "en";
                });
                console.log(test2["0"].certification);
                let certification = test2["0"].certification;
                return { certification: certification };
            }
            return data;
        })
        .catch(err => console.log(err));
}
