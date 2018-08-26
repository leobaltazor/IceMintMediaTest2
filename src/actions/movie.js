import MOVIES_LIST from "../types/movie";
import { apiKey } from "../config/config";

export default function getMovie(language = "uk-UA", region = "UA", page = "1", type = "now_playing") {
    const url = "http://api.themoviedb.org/3/movie/";
    // const language = "uk-UA";
    // const region = "UA";
    // const page = "1";
    // const type = "now_playing";
    const request = `${url}${type}?api_key=${apiKey}&language=${language}&region=${region}&page=${page}`;
    fetch(request)
        .then(res => {
            return res.status === 200 ? res.json() : "error";
        })
        .then(data => {
            console.log(data);
            console.log(data.results);
        })
        .catch(err => console.log(err));
}
