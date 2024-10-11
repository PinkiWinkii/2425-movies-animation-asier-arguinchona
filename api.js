import { API_KEY, GENRES } from "./config";
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`
import { movies_json } from "./moviesJson";



export const getMovies = async () => {
    try{
        let response = await fetch(API_URL);
        let json = await response.json();
        //console.log(json);
        const fakeJson = require('./moviesJson')
        
        const movies = fakeJson.results.map(
            ({
                id,
                original_title,
                poster_path,
                backdrop_path,
                vote_average,
                overview,
                release_date,
                genre_ids,
            }) => ({
                key: String(id),
                original_title: original_title,
                poster_path: `${poster_path}`,
                backdrop_path: `${backdrop_path}`,
                vote_average: vote_average,
                description: overview,
                releaseDate: release_date,
                genres: genre_ids.map(id => GENRES[id])
            })
        )
        return movies
    } catch (error) {
        console.error(error);
    }
}
