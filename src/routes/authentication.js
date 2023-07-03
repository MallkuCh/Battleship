const Router = require('koa-router');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const router = new Router();

router.post('authentication.signup', '/signup', async (ctx) => {
  const authInfo = ctx.request.body;
  let user = await ctx.orm.User.findOne({ where: { mail: authInfo.mail } });
  if (user) {
    ctx.body = `The user by the email '${authInfo.mail}' already exists`;
    ctx.status = 400;
    return;
  }
  try {
    const saltRounds = 10;
    const pass_hash = await bcrypt.hash(authInfo.password, saltRounds);
    user = await ctx.orm.User.create({
      mail: authInfo.mail,
      password: pass_hash,
      username: authInfo.username,
    });
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return;
  }
  ctx.body = {
    username: user.username,
    email: user.mail,
  };
  ctx.status = 201;
});

router.post('authentication.login', '/login', async (ctx) => {
  let user;
  const authInfo = ctx.request.body;
  try {
    user = await ctx.orm.User.findOne({ where: { mail: authInfo.mail } });
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return;
  }
  if (!user) {
    ctx.body = `The user by the email '${authInfo.mail}' was not found`;
    ctx.status = 400;
    return;
  }
  console.log(user.password);
  console.log(authInfo.password);

  const validpass = await bcrypt.compare(authInfo.password, user.password);
  if (validpass) {
    ctx.body = {
      username: user.username,
      mail: user.mail,
    };
    ctx.status = 200;
  } else {
    ctx.body = 'Incorrect password';
    ctx.status = 400;
    return;
  }

  // Creamos el JWT. Si quisieras agregar distintos scopes, como por ejemplo
  // "admin", podrían hacer un llamado a la base de datos y cambiar el payload
  // en base a eso.
  const expirationSeconds = 1 * 60 * 60 * 24;
  const JWT_PRIVATE_KEY = process.env.JWT_SECRET;

  const token = jwt.sign(
    { scope: ['user'], username: user.username.toString() },
    JWT_PRIVATE_KEY,
    { subject: user.id.toString() },
    { expiresIn: expirationSeconds },
  );
  console.log('jwt');
  ctx.body = {
    access_token: token,
    token_type: 'Bearer',
    expires_in: expirationSeconds,
  };
  ctx.status = 200;
});

module.exports = router;
