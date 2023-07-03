
// const { table } = require('console'); might be useful
const Router = require('koa-router');
// Importamos Op de sequielize para hacer comparación de valores
const { Op } = require('sequelize');

const router = new Router();

function getRandomIntInclusive_valid(min, max, posiciones_ocupadas) {
  const minimun = Math.ceil(min);
  const maximum = Math.floor(max);
  let pos = Math.floor(Math.random() * (maximum - minimun + 1) + minimun);

  while (posiciones_ocupadas.includes(pos)) {
    pos = Math.floor(Math.random() * (maximum - minimun + 1) + minimun);
  }
  return pos;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionar_pos(array) {
  const indices = [];
  while (indices.length < 5) {
    const indice = Math.floor(Math.random() * array.length);

    if (!indices.includes(indice)) {
      indices.push(indice);
    }
  }

  return indices;
}

router.post('game.unirse', '/unirse', async (ctx) => {
  try {
    let accion_final = 'unirse';
    const info = ctx.request.body;

    const { user_Id, username, juego_id } = info;

    const game = await ctx.orm.Game.findOne({ where: { id: juego_id } });
    console.log(game.id);

    const players_id = [game.firstplayer_Id, game.secondplayer_Id, game.thirdplayer_Id];
    console.log(players_id);

    for (let i = 0; i < players_id.length; i++) {
      const valor = players_id[i];
      console.log(`imprimiendo valor: ${valor}`);
      if (valor != 0) {
        const player = await ctx.orm.Player.findOne({ attributes: ['id', 'user_Id', 'name'], where: { id: valor } });
        console.log(`imprimiendo el nombre del player ${player.name}`);
        console.log(`imprimiendo el id de usuario del player: ${player.user_Id}`);
        if (player.user_Id === user_Id) {
          console.log('ya estas en el juego rey, solo debes entrar');
          accion_final = 'entrar';
          break;
        }
      }
    }

    if (accion_final === 'unirse' && game.numPlayers < 3) {
      const new_player_json = {
        name: username,
        user_Id,
        game_Id: game.id,
        puntaje: 0,
        energia: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log(new_player_json);
      console.log('procedemos a crear el nuevo player...');
      const new_player = await ctx.orm.Player.create(new_player_json);
      console.log('imprimiendo nuevo jugador...');
      console.log(new_player);

      if (game.numPlayers === 1) {
        console.log('seras el segundo jugador...');
        await game.update({ numPlayers: 2, secondplayer_Id: new_player.id });
      } else if (game.numPlayers === 2) {
        console.log('serás el último jugador...');
        await game.update({ numPlayers: 3, thirdplayer_Id: new_player.id });
      }

      ctx.body = { accion: accion_final, juego: game, id_de_players: players_id };
      ctx.status = 200;
    } else if (accion_final === 'unirse' && game.numPlayers === 3) {
      ctx.body = { accion: 'está lleno!', juego: game, id_de_players: players_id };
      ctx.status = 200;
    } else if (accion_final === 'entrar') {
      ctx.body = { accion: accion_final, juego: game, id_de_players: players_id };
      ctx.status = 200;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('game.create', '/create', async (ctx) => {
  const info = ctx.request.body;

  const { user_Id, username } = info;

  const game_json = {
    turn: 1,
    winner: false,
    numPlayers: 1,
    firstplayer_Id: 0,
    secondplayer_Id: 0,
    thirdplayer_Id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const new_game = await ctx.orm.Game.create(game_json);

    console.log('imprimiendo id del nuevo juego...');
    console.log(new_game.id);
    const new_player_json = {
      name: username,
      user_Id,
      game_Id: new_game.id,
      puntaje: 0,
      energia: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const new_player = await ctx.orm.Player.create(new_player_json);

    const tupla_x_y = [[4, 4], [5, 5], [3, 5], [5, 4], [3, 4], [4, 5], [3, 3],[6,5 ], [4, 6], [3, 7]];

    const array_indices = seleccionar_pos(tupla_x_y);
    console.log(array_indices);

    const indice_1 = array_indices[0];
    const indice_2 = array_indices[1];
    const indice_3 = array_indices[2];
    const indice_4 = array_indices[3];
    const indice_5 = array_indices[4];

    const pos_xy_1 = tupla_x_y[indice_1];
    const pos_xy_2 = tupla_x_y[indice_2];
    const pos_xy_3 = tupla_x_y[indice_3];
    const pos_xy_4 = tupla_x_y[indice_4];
    const pos_xy_5 = tupla_x_y[indice_5];

    const new_coin_1 = {
      in_table: true,
      value: 2,
      type: 'coin',
      pos_x: pos_xy_1[0],
      pos_y: pos_xy_1[1],
      game_Id: new_game.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const new_coin_2 = {
      in_table: true,
      value: 2,
      type: 'energy',
      pos_x: pos_xy_2[0],
      pos_y: pos_xy_2[1],
      game_Id: new_game.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const new_coin_3 = {
      in_table: true,
      value: 2,
      type: 'coin',
      pos_x: pos_xy_3[0],
      pos_y: pos_xy_3[1],
      game_Id: new_game.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const new_coin_4 = {
      in_table: true,
      value: 2,
      type: 'coin',
      pos_x: pos_xy_4[0],
      pos_y: pos_xy_4[1],
      game_Id: new_game.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const new_coin_5 = {
      in_table: true,
      value: 2,
      type: 'energy',
      pos_x: pos_xy_5[0],
      pos_y: pos_xy_5[1],
      game_Id: new_game.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ctx.orm.Coin.create(new_coin_1);
    await ctx.orm.Coin.create(new_coin_2);
    await ctx.orm.Coin.create(new_coin_3);
    await ctx.orm.Coin.create(new_coin_4);
    await ctx.orm.Coin.create(new_coin_5);

    console.log('imprimiendo id del nuevo playerrr');
    console.log(new_player.id);

    new_game.firstplayer_Id = new_player.id;
    await new_game.save();

    ctx.body = { estado: 'exito', game: new_game, player: new_player };
    ctx.status = 200;
  } catch (error) {
    console.log('ALGO RARO PASAAAAAAAA');
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('game.list', '/', async (ctx) => {
  try {
    const games = await ctx.orm.Game.findAll();
    ctx.body = games;
    ctx.status = 200;
  } catch (error) {
    console.log('algo raro pasa');
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('game.list-disponibles', '/disponibles', async (ctx) => {
  try {
    const games = await ctx.orm.Game.findAll({ attributes: ['id', 'numPlayers', 'turn'] });
    ctx.body = games;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('game.turn', '/turn', async (ctx) => {
  try {
    const info = ctx.request.body;
    const { juego_id } = info;
    const juego = await ctx.orm.Game.findOne({ where: { id: juego_id } });

    if (juego.turn < 3) {
      juego.turn += 1;
      juego.save();
    } else {
      juego.turn = 1;
      juego.save();
    }

    ctx.body = { estado: 'turno avanzado!', turno_actual: juego.turn };
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('game.status', '/status/:id', async (ctx) => {
  try {
    // obtenemos la partida
    const juego = await ctx.orm.Game.findOne({ where: { id: ctx.params.id } });

    // obtenemos el número de jugadores para ver que hacemos
    const numero_jugadores = juego.numPlayers;

    console.log(`numero de jugadores: ${numero_jugadores}`);

    if (numero_jugadores === 1) {
      console.log('marca de que se entro en if de 1 jugador');
      const jugador_1 = await ctx.orm.Player.findOne({ attributes: ['id', 'name', 'user_Id', 'puntaje', 'energia'], where: { id: juego.firstplayer_Id, game_Id: juego.id } });
      const jugador_2 = 'aun no';
      const jugador_3 = 'aun no';

      console.log('marca de que se encontro a los jugadores, solo 1');
      const barcos_jugador_1 = await ctx.orm.Ship.findAll({ attributes: ['id', 'pos_x', 'pos_y', 'player_Id'], where: { player_Id: jugador_1.id, game_Id: juego.id, alive: true } });
      const barcos_jugador_2 = 'nada aun';
      const barcos_jugador_3 = 'nada aun';
      console.log('marca de que se encontro los barcos del primer jugador');

      const monedas_en_tablero = await ctx.orm.Coin.findAll({ attributes: ['value', 'pos_x', 'pos_y', 'in_table'], where: { game_Id: juego.id } });
      console.log('marca de que se buscó las monedas');
      const players = {
        jugador_1,
        jugador_2,
        jugador_3,
      };
      const barcos = {
        barcos_jugador_1,
        barcos_jugador_2,
        barcos_jugador_3,
      };



      ctx.body = {
        numJugadores: numero_jugadores, turno: juego.turn, jugadores: players, barcos, monedas: monedas_en_tablero,
      };
      ctx.status = 200;
    } else if (numero_jugadores === 2) {
      console.log('marca de que entro al if de 2 jugadores');
      const jugador_1 = await ctx.orm.Player.findOne({ attributes: ['id', 'name', 'user_Id', 'puntaje', 'energia'], where: { id: juego.firstplayer_Id, game_Id: juego.id } });
      const jugador_2 = await ctx.orm.Player.findOne({ attributes: ['id', 'name', 'user_Id', 'puntaje', 'energia'], where: { id: juego.secondplayer_Id, game_Id: juego.id } });
      const jugador_3 = 'nada aun';

      console.log('marca de que encontro a los 2 jusgadores');

      const barcos_jugador_1 = 'nada aun';
      console.log('marca de que encontro los barcos del primer jugador');
      const barcos_jugador_2 = 'nada aun ';
      console.log('marca de que encontro a los los barcos del segundo jugador');
      const barcos_jugador_3 = 'nada aun';

      const monedas_en_tablero = await ctx.orm.Coin.findAll({ attributes: ['value', 'pos_x', 'pos_y', 'in_table'], where: { game_Id: juego.id } });

      const players = {
        jugador_1,
        jugador_2,
        jugador_3,
      };
      const barcos = {
        barcos_jugador_1,
        barcos_jugador_2,
        barcos_jugador_3,
      };

      ctx.body = {
        numJugadores: numero_jugadores, turno: juego.turn, jugadores: players, barcos, monedas: monedas_en_tablero,
      };
      ctx.status = 200;
    } else if (numero_jugadores === 3) {
      console.log('marca de que entro al if de 3 jugadores');
      const jugador_1 = await ctx.orm.Player.findOne({ attributes: ['id', 'name', 'user_Id', 'puntaje', 'energia'], where: { id: juego.firstplayer_Id, game_Id: juego.id } });
      const jugador_2 = await ctx.orm.Player.findOne({ attributes: ['id', 'name', 'user_Id', 'puntaje', 'energia'], where: { id: juego.secondplayer_Id, game_Id: juego.id } });
      const jugador_3 = await ctx.orm.Player.findOne({ attributes: ['id', 'name', 'user_Id', 'puntaje', 'energia'], where: { id: juego.thirdplayer_Id, game_Id: juego.id } });

      console.log('marca de que encontro a los 3 jusgadores');

      const barcos_jugador_1 = await ctx.orm.Ship.findAll({ attributes: ['id', 'pos_x', 'pos_y', 'player_Id'], where: { player_Id: jugador_1.id, game_Id: juego.id, alive: true } });
      console.log('marca de que encontro los barcos del primer jugador');
      const barcos_jugador_2 = await ctx.orm.Ship.findAll({ attributes: ['id', 'pos_x', 'pos_y', 'player_Id'], where: { player_Id: jugador_2.id, game_Id: juego.id, alive: true } });
      console.log('marca de que encontro a los los barcos del segundo jugador');
      const barcos_jugador_3 = await ctx.orm.Ship.findAll({ attributes: ['id', 'pos_x', 'pos_y', 'player_Id'], where: { player_Id: jugador_3.id, game_Id: juego.id, alive: true } });

      const monedas_en_tablero = await ctx.orm.Coin.findAll({ attributes: ['value', 'pos_x', 'pos_y', 'in_table'], where: { game_Id: juego.id } });

      const players = {
        jugador_1,
        jugador_2,
        jugador_3,
      };
      const barcos = {
        barcos_jugador_1,
        barcos_jugador_2,
        barcos_jugador_3,
      };

      ctx.body = {
        winner: juego.winner,numJugadores: numero_jugadores, turno: juego.turn, jugadores: players, barcos, monedas: monedas_en_tablero,
      };
      ctx.status = 200;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;

// // const { table } = require('console'); might be useful
// const Router = require('koa-router');
// // Importamos Op de sequielize para hacer comparación de valores
// const { Op } = require('sequelize');
// const router = new Router();

// function getRandomIntInclusive_valid(min, max, posiciones_ocupadas) {
//   const minimun = Math.ceil(min);
//   const maximum = Math.floor(max);
//   let pos = Math.floor(Math.random() * (maximum - minimun + 1) + minimun);

//   while (posiciones_ocupadas.includes(pos)) {
//     pos = Math.floor(Math.random() * (maximum - minimun + 1) + minimun);
//   }
//   return pos;
// }

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }


// router.post('game.unirse', '/unirse', async (ctx) =>{
// try{
//     let accion_final = "unirse"
//     const info = ctx.request.body;

//     const {user_Id, username, juego_id} = info;

//     const game = await ctx.orm.Game.findOne({where:{id:juego_id}})
//     console.log(game.id)

//     const players_id = [game.firstplayer_Id, game.secondplayer_Id, game.thirdplayer_Id]
//     console.log(players_id)

//     for (let i = 0; i < players_id.length; i++) {
//       const valor = players_id[i];
//       console.log(`imprimiendo valor: ${valor}`)
//       if (valor != 0){
//         const player = await ctx.orm.Player.findOne({attributes:["id", "user_Id", "name"],where:{id:valor}})
//         console.log(`imprimiendo el nombre del player ${player.name}`)
//         console.log(`imprimiendo el id de usuario del player: ${player.user_Id}`)
//         if (player.user_Id === user_Id){
//           console.log("ya estas en el juego rey, solo debes entrar")
//           accion_final = "entrar"
//           break
//         } 
//       } 
//     }

//     if (accion_final === "unirse" && game.numPlayers <3){
//       const new_player_json = {
//         "name": username,
//         "user_Id": user_Id,
//         "game_Id": game.id,
//         "puntaje": 0,
//         "energia": 3,
//         'createdAt': new Date(),
//         'updatedAt': new Date()
//       } 

//       console.log(new_player_json)
//       console.log('procedemos a crear el nuevo player...')
//       const new_player = await ctx.orm.Player.create(new_player_json)
//       console.log(`imprimiendo nuevo jugador...`)
//       console.log(new_player)

//       if (game.numPlayers===1){
//         console.log("seras el segundo jugador...")
//         await game.update({numPlayers:2, secondplayer_Id:new_player.id})
        
//       }else if(game.numPlayers===2){
//         console.log("serás el último jugador...")
//         await game.update({numPlayers:3, thirdplayer_Id:new_player.id})
//       }

//       ctx.body = {accion: accion_final,juego: game, id_de_players: players_id}
//       ctx.status=200;
      
//     } else if(accion_final === "unirse" && game.numPlayers === 3){
//       ctx.body = {accion: "está lleno!",juego: game, id_de_players: players_id}
//       ctx.status=200;
//     } else if(accion_final ==="entrar"){
//       ctx.body = {accion: accion_final,juego: game, id_de_players: players_id}
//       ctx.status=200;
//     }


//   }catch (error){
//     ctx.body = error
//     ctx.status = 400;
//   }


// })

// router.post('game.create', '/create', async (ctx) =>{
//   const info = ctx.request.body;

//   const {user_Id, username} = info;

//   const game_json = {
//     turn : 1,
//     winner: false,
//     numPlayers:1,
//     firstplayer_Id:0,
//     secondplayer_Id:0,
//     thirdplayer_Id:0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
  

//   try{

//     const new_game = await ctx.orm.Game.create(game_json)

//     console.log('imprimiendo id del nuevo juego...')
//     console.log(new_game.id)
//     const new_player_json = {
//       "name": username,
//       "user_Id": user_Id,
//       "game_Id": new_game.id,
//       "puntaje": 0,
//       "energia": 3,
//       'createdAt': new Date(),
//       'updatedAt': new Date()
//     } 

//     const new_player = await ctx.orm.Player.create(new_player_json)

//     console.log("imprimiendo id del nuevo playerrr")
//     console.log(new_player.id)
    

    
//     new_game.firstplayer_Id = new_player.id;
//     await new_game.save()

    


//     ctx.body = {estado: "exito", game: new_game, player: new_player};
//     ctx.status = 200;

//   } catch (error) {
//     console.log("ALGO RARO PASAAAAAAAA")
//     ctx.body = error;
//     ctx.status = 400;
//   }
// })

// router.get('game.list', '/', async (ctx) => {
//   try {
//     const games = await ctx.orm.Game.findAll();
//     ctx.body = games;
//     ctx.status = 200;
//   } catch (error) {
//     console.log('algo raro pasa');
//     ctx.body = error;
//     ctx.status = 400;
//   }
// });

// router.get('game.list-disponibles', '/disponibles', async (ctx) => {
//   try {
//     const games = await ctx.orm.Game.findAll({attributes:["id","numPlayers","turn"], where:{winner: false}});
//     ctx.body = games;
//     ctx.status = 200;
//   } catch (error) {
//     ctx.body = error;
//     ctx.status = 400;
//   }
// });

// router.post('game.turn', "/turn", async(ctx) => {
//   try{
//     const info = ctx.request.body;
//     const {juego_id} = info;
//     const juego = await ctx.orm.Game.findOne({where:{id: juego_id}})
    
//     if (juego.turn <3) {
//       juego.turn += 1;
//       juego.save()
//     }else {
//       juego.turn = 1;
//       juego.save()
//     }    

//     ctx.body = {estado: "turno avanzado!", turno_actual: juego.turn}
//     ctx.status = 200;
//   } catch(error){
//     ctx.body = error;
//     ctx.status = 400;
//   }
// })




// router.get('game.status', '/status/:id', async (ctx) => {
//   try {
//     // obtenemos la partida
//     const juego = await ctx.orm.Game.findOne({where: {id: ctx.params.id}});

//   // obtenemos el número de jugadores para ver que hacemos
//     const numero_jugadores = juego.numPlayers

//     console.log(`numero de jugadores: ${numero_jugadores}`)

//     if (numero_jugadores===1){
//       console.log('marca de que se entro en if de 1 jugador')
//       const jugador_1 = await ctx.orm.Player.findOne({ attributes: ['id','name', 'user_Id', 'puntaje', "energia"], where: { id: juego.firstplayer_Id, game_Id:juego.id } });
//       const jugador_2 = "aun no"
//       const jugador_3 = "aun no"

//       console.log('marca de que se encontro a los jugadores, solo 1')
//       const barcos_jugador_1 = await ctx.orm.Ship.findAll({ attributes: ['id', 'pos_x', 'pos_y', 'player_Id'], where: { player_Id: jugador_1.id, game_Id: juego.id, alive: true } });
//       const barcos_jugador_2 = "nada aun"
//       const barcos_jugador_3 = "nada aun"
//       console.log('marca de que se encontro los barcos del primer jugador')

//       const monedas_en_tablero = await ctx.orm.Coin.findAll({ attributes: ['value', 'pos_x', 'pos_y', 'in_table'], where: { game_Id: juego.id } });
//       console.log("marca de que se buscó las monedas")
//       const players = {
//         jugador_1,
//         jugador_2,
//         jugador_3,
//       };
//       const barcos = {
//         barcos_jugador_1,
//         barcos_jugador_2,
//         barcos_jugador_3,
//       };

//       ctx.body = {"winner": juego.winner,"numJugadores": numero_jugadores,"turno": juego.turn ,jugadores: players, barcos, monedas: monedas_en_tablero };
//       ctx.status = 200;




//     } else if (numero_jugadores ===2){
//       console.log("marca de que entro al if de 2 jugadores")
//       const jugador_1 = await ctx.orm.Player.findOne({ attributes: ['id','name', 'user_Id', 'puntaje', "energia"], where: { id: juego.firstplayer_Id, game_Id:juego.id } });
//       const jugador_2 = await ctx.orm.Player.findOne({ attributes: ['id','name', 'user_Id', 'puntaje', "energia"], where: { id: juego.secondplayer_Id, game_Id:juego.id } });
//       const jugador_3 = "nada aun"

//       console.log("marca de que encontro a los 2 jusgadores")

//       const barcos_jugador_1 = "nada aun"
//       console.log("marca de que encontro los barcos del primer jugador")
//       const barcos_jugador_2 = "nada aun "
//       console.log("marca de que encontro a los los barcos del segundo jugador")
//       const barcos_jugador_3 = "nada aun"

//       const monedas_en_tablero = await ctx.orm.Coin.findAll({ attributes: ['value', 'pos_x', 'pos_y', 'in_table'], where: { game_Id: juego.id } });

//       const players = {
//         jugador_1,
//         jugador_2,
//         jugador_3,
//       };
//       const barcos = {
//         barcos_jugador_1,
//         barcos_jugador_2,
//         barcos_jugador_3,
//       };

//       ctx.body = {"numJugadores": numero_jugadores,"turno": juego.turn ,jugadores: players, barcos, monedas: monedas_en_tablero };
//       ctx.status = 200;

//     } else if (numero_jugadores===3){
//       console.log("marca de que entro al if de 3 jugadores")
//       const jugador_1 = await ctx.orm.Player.findOne({ attributes: ['id','name', 'user_Id', 'puntaje', "energia"], where: { id: juego.firstplayer_Id, game_Id:juego.id } });
//       const jugador_2 = await ctx.orm.Player.findOne({ attributes: ['id','name', 'user_Id', 'puntaje', "energia"], where: { id: juego.secondplayer_Id, game_Id:juego.id } });
//       const jugador_3 = await ctx.orm.Player.findOne({ attributes: ['id','name', 'user_Id', 'puntaje', "energia"], where: { id: juego.thirdplayer_Id, game_Id:juego.id } });

//       console.log("marca de que encontro a los 3 jusgadores")


      
//       const barcos_jugador_1 = await ctx.orm.Ship.findAll({ attributes: ['id', 'pos_x', 'pos_y', 'player_Id'], where: { player_Id: jugador_1.id, game_Id: juego.id, alive: true } });
//       console.log("marca de que encontro los barcos del primer jugador")
//       const barcos_jugador_2 = await ctx.orm.Ship.findAll({ attributes: ['id', 'pos_x', 'pos_y', 'player_Id'], where: { player_Id: jugador_2.id, game_Id: juego.id, alive: true } });
//       console.log("marca de que encontro a los los barcos del segundo jugador")
//       const barcos_jugador_3 = await ctx.orm.Ship.findAll({ attributes: ['id', 'pos_x', 'pos_y', 'player_Id'], where: { player_Id: jugador_3.id, game_Id: juego.id, alive: true } });

//       const monedas_en_tablero = await ctx.orm.Coin.findAll({ attributes: ['value', 'pos_x', 'pos_y', 'in_table'], where: { game_Id: juego.id } });


//       const players = {
//         jugador_1,
//         jugador_2,
//         jugador_3,
//       };
//       const barcos = {
//         barcos_jugador_1,
//         barcos_jugador_2,
//         barcos_jugador_3,
//       };

//       ctx.body = {"winner": juego.winner,"numJugadores": numero_jugadores,"turno": juego.turn ,jugadores: players, barcos, monedas: monedas_en_tablero };
//       ctx.status = 200;

//     }
//   } catch (error) {
//     ctx.body = error;
//     ctx.status = 400;
//   }
// });



// module.exports = router;