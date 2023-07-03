const Router = require('koa-router');
const jwtMiddleware = require('koa-jwt');
const dotenv = require('dotenv');

dotenv.config();

const users = require('./routes/users');
const games = require('./routes/games');
const ships = require('./routes/ships');
const coins = require('./routes/coins');
const players = require('./routes/players');
const authentication = require('./routes/authentication');
const scope = require('./routes/scope');

const router = new Router();

router.use('/games', games.routes());
router.use('/ships', ships.routes());
router.use('/coins', coins.routes());
router.use('/players', players.routes());
router.use(authentication.routes());

router.use('/users', users.routes());

// A partir de aqui se utiliza JWT
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));
router.use('/users', users.routes());
router.use('/check', scope.routes());

module.exports = router;
