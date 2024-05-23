export type Genre = {
  id: number;
  name: string;
};

const tmdbFetch = async (path: string) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  const response = await fetch(`https://api.themoviedb.org/3${path}`, options);
  return await response.json();
};

export const getMovieGenres = async () => {
  const { genres } = await tmdbFetch("/genre/movie/list");
  return genres as Genre[];
};

export type Movie = {
  id: number;
  title: string;
  release_date: Date;
  poster_path: string;
};

export const getMoviesWithGenre = async (genreIds: number[]) => {
  const genres = genreIds.map(String).join(",");
  const { results } = await tmdbFetch(`/discover/movie?with_genres=${genres}`);
  const movies = results.map((res: any) => ({
    ...res,
    release_date: new Date(res.release_date),
  }));
  return movies as Movie[];
};

export const getAllMovies = async () => {
  return getMoviesWithGenre([]);
};

export const getPosterURL = (movie: Movie) =>
  `https://image.tmdb.org/t/p/w154${movie.poster_path}`;
