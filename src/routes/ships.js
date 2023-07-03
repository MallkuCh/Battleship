const Router = require('koa-router');
const { where } = require('sequelize');

function choose_random() {
  const random = Math.random();
  if (random < 0.7) {
    return 0;
  }
  return 1;
}
function choose_random_2() {
  const random = Math.random();
  if (random < 0.5) {
    return 0;
  }
  return 1;
}

function getRandomIntInclusive_valid(min, max, list_x, list_y) {
  const largo = list_x.length;
  const array = [];
  for (let j = 0; j < largo; j += 1) {
    const posx = list_x[j];
    const posy = list_y[j];
    const tuple_pos = [posx, posy];
    array.push(tuple_pos);
  }

  let new_x; let
    new_y;
  let foundUniqueTuple = false;

  while (!foundUniqueTuple) {
    new_x = getRandomIntInclusive(min, max); // Genera un nuevo valor para new_x
    new_y = getRandomIntInclusive(min, max); // Genera un nuevo valor para new_y
    // Verifica si la nueva tupla [new_x, new_y] es diferente de las existentes en el array
    foundUniqueTuple = array.every(([x, y]) => x !== new_x || y !== new_y);
  }

  return [new_x, new_y];
}

function getRandomIntInclusive(min, max) {
  const minimun = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimun + 1) + minimun);
}

function crear_pos(list_x, list_y) {
  const largo = list_x.length();
}

const router = new Router();

router.post('ship.movement', '/movement/execute', async (ctx) => {
  try {
    const info = ctx.request.body;
    const { barco_id } = info;
    const { jugador_id } = info;
    const { game_Id } = info;
    const { movimiento } = info;
    const juego = await ctx.orm.Game.findOne({where:{id: game_Id}})
    const barco = await ctx.orm.Ship
      .findOne({ where: { id: barco_id, player_Id: jugador_id, game_Id:game_Id } });
    console.log("MARCA: BARCO ENCONTRADO")
    console.log(barco)
    const barcos = await ctx.orm.Ship.findAll({ where: { game_Id: game_Id } });
    console.log(barcos);
    const largo_barcos = Object.keys(barcos).length;
    let valid_move = true;
    if (movimiento === 'abajo') {
      barco.pos_x += 1;
      for (let j = 0; j < largo_barcos; j += 1) {
        const barco_actual = barcos[j];
        const pos_act_x = barco_actual.pos_x;
        const pos_act_y = barco_actual.pos_y;
        if (pos_act_x === barco.pos_x && pos_act_y === barco.pos_y) {
          valid_move = false;
        }
      }
      if (barco.pos_x <= 7 && valid_move) {
        barco.save();
        ctx.body = { estado: 'movimiento hecho', barco_nueva_posicion: barco };
        ctx.status = 200;
      } else {
        console.log('MOVIMIENTO NO VALIDO');
        ctx.body = { estado: 'movimiento no valido' };
        ctx.status = 400;
      }
    } else if (movimiento === 'arriba') {
      barco.pos_x -= 1;
      for (let j = 0; j < largo_barcos; j += 1) {
        const barco_actual = barcos[j];
        const pos_act_x = barco_actual.pos_x;
        const pos_act_y = barco_actual.pos_y;
        if (pos_act_x === barco.pos_x && pos_act_y === barco.pos_y) {
          valid_move = false;
        }
      }
      if (barco.pos_x >= 0 && valid_move) {
        barco.save();
        ctx.body = { estado: 'movimiento hecho', barco_nueva_posicion: barco };
        ctx.status = 200;
      } else {
        console.log('MOVIMIENTO NO VALIDO');
        ctx.body = { estado: 'movimiento no valido' };
        ctx.status = 400;
      }
    } else if (movimiento === 'derecha') {
      barco.pos_y += 1;
      for (let j = 0; j < largo_barcos; j += 1) {
        const barco_actual = barcos[j];
        const pos_act_x = barco_actual.pos_x;
        const pos_act_y = barco_actual.pos_y;
        if (pos_act_x === barco.pos_x && pos_act_y === barco.pos_y) {
          valid_move = false;
        }
      }
      if (barco.pos_y <= 7 && valid_move) {
        barco.save();
        ctx.body = { estado: 'movimiento hecho', barco_nueva_posicion: barco };
        ctx.status = 200;
      } else {
        console.log('MOVIMIENTO NO VALIDO');
        ctx.body = { estado: 'movimiento no valido' };
        ctx.status = 400;
      }
    } else if (movimiento === 'izquierda') {
      barco.pos_y -= 1;
      for (let j = 0; j < largo_barcos; j += 1) {
        const barco_actual = barcos[j];
        const pos_act_x = barco_actual.pos_x;
        const pos_act_y = barco_actual.pos_y;
        if (pos_act_x === barco.pos_x && pos_act_y === barco.pos_y) {
          valid_move = false;
        }
      }
      if (barco.pos_y >= 0 && valid_move) {
        barco.save();
        ctx.body = { estado: 'movimiento hecho', barco_nueva_posicion: barco };
        ctx.status = 200;
      } else {
        console.log('MOVIMIENTO NO VALIDO');
        ctx.body = { estado: 'movimiento no valido' };
        ctx.status = 400;
      }
    }
    /* eslint-disable no-restricted-syntax */
    console.log(valid_move);
    console.log('verificando moneda...');
    const monedas = await ctx.orm.Coin
      .findAll({ attributes: ['value', 'pos_x', 'pos_y', 'in_table', 'type'], where: { game_Id } });
    const largo_monedas = Object.keys(monedas).length;
    const jugador = await ctx.orm.Player.findOne({ where: { id: jugador_id } });
    console.log('PUNTAJE:');
    console.log(jugador.puntaje);
    for (let i = 0; i < largo_monedas; i += 1) {
      const actual_coin = monedas[i];
      console.log(actual_coin);
      const posicion_x = actual_coin.pos_x;
      const posicion_y = actual_coin.pos_y;
      console.log(posicion_x);
      console.log(posicion_y);
      if (posicion_x === barco.pos_x && posicion_y === barco.pos_y) {
        try {
          const value_to_sum = actual_coin.value;
          console.log('VALOR A SUMAR:');
          console.log(actual_coin.type);
          if (actual_coin.type === 'coin') {
            jugador.puntaje += value_to_sum;
            jugador.save();
            if (jugador.puntaje >= 10){
              console.log("parece que hay un ganador!!!, ahora le cambiamos el winner al juego")
              juego.winner = true
              juego.save()
            }
          } else {
            jugador.energia += value_to_sum;
            jugador.save();
          }
          console.log('PUNTAJE DESPUES DE SUMAR LA MONEDA:');
          console.log(jugador.puntaje);
          await ctx.orm.Coin.destroy({ where: { pos_x: posicion_x, pos_y: posicion_y } });
          console.log('SE HA DESTRUIDO LA MONEDA!');
          // Crear nueva moneda
          // const tablero = await ctx.orm.Board.findOne({ where: { game_Id: game_Id } });
          // obtener posiciones
          const posiciones_barcos = await ctx.orm.Ship.findAll({ attributes: ['pos_x', 'pos_y'], where: { game_Id } });
          const posiciones_monedas_activas = await ctx.orm.Coin.findAll({ attributes: ['pos_x', 'pos_y'], where: { game_Id } });
          // Posiciones mapeadas
          const posiciones_x_barcos = posiciones_barcos
            .map((barco_posicion) => barco_posicion.pos_x);
          const posiciones_x_monedas_activas = posiciones_monedas_activas
            .map((moneda) => moneda.pos_x);
          const posiciones_x_totales = posiciones_x_barcos.concat(posiciones_x_monedas_activas);
          const posiciones_y_barcos = posiciones_barcos
            .map((barco_posicion) => barco_posicion.pos_y);
          const posiciones_y_monedas_activas = posiciones_monedas_activas
            .map((moneda) => moneda.pos_y);
          const posiciones_y_totales = posiciones_y_barcos.concat(posiciones_y_monedas_activas);
          // Generamos posiciones random
          console.log(posiciones_x_totales);
          console.log(posiciones_y_totales);
          // eslint-disable-next-line max-len
          const tupla_x_y = getRandomIntInclusive_valid(1, 6, posiciones_x_totales, posiciones_y_totales);
          console.log('imprimiendo tupla de nueva pos de moneda!');
          console.log(tupla_x_y);
          const random_number = choose_random();
          const random_number_2 = choose_random_2();
          const array_type = ['coin', 'energy'];
          const array_values = [2, 3];
          const new_value = array_values[random_number_2];
          const new_type = array_type[random_number];
          console.log(new_type);
          const new_coin_json = {
            in_table: true,
            value: new_value,
            type: new_type,
            pos_x: tupla_x_y[0],
            pos_y: tupla_x_y[1],
            game_Id,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          console.log(new_coin_json);
          // eslint-disable-next-line no-await-in-loop
          await ctx.orm.Coin.create(new_coin_json);
          console.log('moneda creada!');
        } catch (error) {
          console.log(error);
          ctx.body = error;
          ctx.status = 400;
        }
      }
    }
  } catch (error) {
    console.log(error);
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('ship.create', '/createship', async (ctx) => {
  try {
    console.log('entro a el try');
    const info = ctx.request.body;
    const { jugador_Id } = info;
    const { game_Id_create } = info;
    const { turno } = info;
    const barcos = await ctx.orm.Ship.findAll({ where: { game_Id: game_Id_create } });
    const jugador = await ctx.orm.Player.findOne({ where: { id: jugador_Id } });
    const energia_act = jugador.energia;
    console.log(barcos);
    let new_x;
    let new_y;
    if (turno === 1) {
      new_x = 0;
      new_y = 0;
    } else if (turno === 2) {
      new_x = 7;
      new_y = 0;
    } else if (turno > 2) {
      new_x = 0;
      new_y = 7;
    }
    const largo_barcos = Object.keys(barcos).length;
    let valid_create = true;
    for (let j = 0; j < largo_barcos; j += 1) {
      const barco_actual = barcos[j];
      const pos_act_x = barco_actual.pos_x;
      const pos_act_y = barco_actual.pos_y;
      // eslint-disable-next-line no-undef
      if (pos_act_x === new_x && pos_act_y === new_y) {
        valid_create = false;
      }
    }
    console.log(valid_create);
    console.log(energia_act);
    if (energia_act >= 3) {
      if (valid_create) {
        const new_ship = {
          alive: true,
          pos_x: new_x,
          pos_y: new_y,
          player_Id: jugador_Id,
          game_Id:game_Id_create,
        };
        await ctx.orm.Ship.create(new_ship);
        const nueva_energia = Math.max(0, energia_act - 3);
        await jugador.update({ energia: nueva_energia });
        ctx.body = 'Bote creado';
        ctx.status = 200;
      } else {
        ctx.body = 'Posicion no valida';
        ctx.status = 400;
      }
    } else {
      ctx.body = 'energia insuficiente';
      ctx.status = 400;
    }
  } catch (error) {
    console.log(error);
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
