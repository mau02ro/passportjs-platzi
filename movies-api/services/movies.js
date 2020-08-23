const MongoLib = require('../lib/mongo');

class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongoDb = new MongoLib();
  }
  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = await this.mongoDb.getAll(this.collection, query);
    return movies || [];
  }

  async getMovieId({ movieId }) {
    const movie = await this.mongoDb.get(this.collection, movieId);
    return movie || [];
  }

  async createMovieId({ movie }) {
    const createMovieId = await this.mongoDb.create(this.collection, movie);
    return createMovieId;
  }

  async updateMovieId({ movieId, movie } = {}) {
    const updateMovieId = await this.mongoDb.update(
      this.collection,
      movieId,
      movie
    );
    return updateMovieId;
  }

  async deleteMovieId({ movieId }) {
    const deleteMovieId = await this.mongoDb.delete(this.collection, movieId);
    return deleteMovieId;
  }
}

module.exports = MoviesService;
