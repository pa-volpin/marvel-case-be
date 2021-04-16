const { Router } = require('express');
const usersController = require('./users/controller');
const authController = require('./auth/controller');
const passwordResetsController = require('./passwordResets/controller');
const pendingUsersController = require('./pendingUsers/controller');
const favoritesCharactersController = require('./favoritesCharacters/controller');
const favoritesComicsController = require('./favoritesComics/controller');
const favoritesSeriesController = require('./favoritesSeries/controller');
const favoritesStoriesController = require('./favoritesStories/controller');
const favoritesEventsController = require('./favoritesEvents/controller');
const favoritesCreatorsController = require('./favoritesCreators/controller');

const routes = Router();

routes.use('/users', usersController);
routes.use('/auth', authController);
routes.use('/passwordresets', passwordResetsController);
routes.use('/register', pendingUsersController);
routes.use('/favoritescharacters', favoritesCharactersController);
routes.use('/favoritescomics', favoritesComicsController);
routes.use('/favoritesseries', favoritesSeriesController);
routes.use('/favoritesstories', favoritesStoriesController);
routes.use('/favoritesevents', favoritesEventsController);
routes.use('/favoritescreators', favoritesCreatorsController);
routes.use('/favoritescreators', favoritesCreatorsController);

module.exports = routes;
