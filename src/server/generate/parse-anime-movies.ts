import fs from 'fs';
import animeMovie from '../static/anime_movie_batch.json';
import AnimeTvObject from '../classes/animeTvObject';

function parseAnimeMovieGenre(genres: { name: string; }[]) {
  const returnGenres = new Set<String>();
  genres.forEach((genre: { name: string; }) => {
    returnGenres.add(genre.name.toLowerCase());
  });
  return Array.from(returnGenres);
}

const getAnimeMovie = async () => {
  const anime: AnimeTvObject[] = [];
  animeMovie.forEach((movie) => {
    let name = movie.title;
    if (movie.title_english != null) {
      name = movie.title_english;
    }
    anime.push(
      new AnimeTvObject(
        parseAnimeMovieGenre(movie.genres),
        name,
        movie.mal_id,
        movie.images.jpg.large_image_url,
        movie.score,
        movie.scored_by,
      ),
    );
  });

  fs.writeFile('../static/anime_movies.json', JSON.stringify(anime), (err) => {
    if (err) console.log(err);
  });
};

console.log('Parsing anime movies...');
getAnimeMovie();
console.log('Finished parsing anime movies!');
