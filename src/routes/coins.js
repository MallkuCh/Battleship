const Router = require('koa-router');

const router = new Router();

// Changes to minimun and amaximum, added const and changed name from min to minimum
function getRandomIntInclusive_valid(min, max, posiciones_ocupadas) {
  const minimun = Math.ceil(min);
  const maximum = Math.floor(max);
  let pos = Math.floor(Math.random() * (maximum - minimun + 1) + minimun);

  while (posiciones_ocupadas.includes(pos)) {
    pos = Math.floor(Math.random() * (maximum - minimun + 1) + minimun);
  }
  return pos;
}
// endchanges

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

router.post('coin.generate', '/generate', async (ctx) => {
  try {
    // debo buscar todas las posiciones de barcos en el tablero para
    // generar una moneda aleatoria
    const info = ctx.request.body;
    const id_juego = info.juego_id;
    const tablero = await ctx.orm.Board.findOne({ where: { game_Id: id_juego } });
    const posiciones_barcos = await ctx.orm.Ship.findAll({ attributes: ['pos_x', 'pos_y'], where: { board_Id: tablero.id } });
    const posiciones_monedas_activas = await ctx.orm.Coin.findAll({ attributes: ['pos_x', 'pos_y'], where: { board_Id: tablero.id } });

    // aqui obtenemos una lista con todas las posiciones x de barcos y monedas
    // activas en el tablero
    const posiciones_x_barcos = posiciones_barcos.map((barco) => barco.pos_x);
    const posiciones_x_monedas_activas = posiciones_monedas_activas.map((moneda) => moneda.pos_x);
    const posiciones_x_totales = posiciones_x_barcos.concat(posiciones_x_monedas_activas);

    // aqui obtenemos una lista con todas las posiciones "y" de barcos y monedas
    // activas en el tablero
    const posiciones_y_barcos = posiciones_barcos.map((barco) => barco.pos_y);
    const posiciones_y_monedas_activas = posiciones_monedas_activas.map((moneda) => moneda.pos_y);
    const posiciones_y_totales = posiciones_y_barcos.concat(posiciones_y_monedas_activas);

    // aqui generamos posiciones x e y aleatorias asegurandonos de que no sean iguales
    // a alguna posicion x o y utilizando la función getRandomIntInclusive_valid creada al principio

    const new_pos_x = getRandomIntInclusive_valid(1, 9, posiciones_x_totales);
    const new_pos_y = getRandomIntInclusive_valid(1, 9, posiciones_y_totales);

    // ahora creamos una nueva coin con sequelize y la agregamos a la base de datos

    const new_coin_json = {
      in_table: true,
      value: getRandomIntInclusive(1, 3),
      pos_x: new_pos_x,
      pos_y: new_pos_y,
      board_Id: tablero.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const new_coin = await ctx.orm.Coin.create(new_coin_json);

    ctx.body = { estado: 'moneda generada exitosamente!', moneda: new_coin };
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
