const Router = require('koa-router');
const dotenv = require('dotenv');

dotenv.config();

const router = new Router();

router.post('users.update', '/update', async (ctx) => {
  try {
    const info = ctx.request.body;
    const user_id = info.usuario_id;
    const username_info = info.username;
    const new_password = info.nueva_contrasena;
    const user = await ctx.orm.User.findOne({ where: { id: user_id, username: username_info } });
    user.password = new_password;

    user.save();
    ctx.body = {
      estado: 'contraseña actualizada exitosamente!',
      usuario_updated: user,
    };
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('users.delete', '/delete', async (ctx) => {
  try {
    const info = ctx.request.body;
    const user_id = info.usuario_id;
    const username_info = info.username;
    ctx.orm.User.destroy({ where: { id: user_id, username: username_info } });
    ctx.body = 'usuario eliminado exitosamente!';
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('users.list', '/', async (ctx) => {
  try {
    const users = await ctx.orm.User.findAll();
    ctx.body = users;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('user.show', '/:id', async (ctx) => {
  try {
    const user = await ctx.orm.User.findOne({ where: { id: ctx.params.id } });
    ctx.body = user;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});
module.exports = router;
