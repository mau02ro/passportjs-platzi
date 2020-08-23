const express = require('express');

const {
  logError,
  errHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers');
const app = express();
const { notFoundHandler } = require('./utils/middleware/notFoundHandler');
//Cpnfiguracion
const { config } = require('./config/index');

///middelwares
app.use(express.json());

//Rutas
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies');
const authApi = require('./routes/auth')
//usar rutas
moviesApi(app);
userMoviesApi(app);
authApi(app);
//Catch 404
app.use(notFoundHandler);
//middelwares error
app.use(logError);
app.use(wrapErrors);
app.use(errHandler);
app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
