// import MOVIES_LIST from "../types/movie";
import { apiKey } from "../config/config";

export default function getMovie(
    page = "1",
    type = "now_playing",
    language = "uk-UA",
    region = "ua"
) {
    const url = "http://api.themoviedb.org/3/movie/";
    const request = `${url}${type}?api_key=${apiKey}&language=${language}&region=${region}&page=${page}`;
    return fetch(request)
        .then(res => {
            return res.ok ? res.json() : "error";
        })
        .then(data => {
            return data;
        })
        .catch(err => console.log(err));
}
