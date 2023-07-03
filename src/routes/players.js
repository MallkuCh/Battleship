const Router = require('koa-router');

const router = new Router();


router.post('player.pass', '/pass', async (ctx) => {

  const info = ctx.request.body;

  const { jugador_Id, juego_Id }= info;

  try{
    const jugador = await ctx.orm.Player.findOne({where:{id: jugador_Id, game_Id: juego_Id }})

    const energia_nueva = jugador.energia + 2

    await jugador.update({energia: energia_nueva})

    ctx.body = {estado: "exito"}
    ctx.status = 200;

  } catch (error){
    ctx.body = error
    ctx.status = 400
  }
}) 

router.post('player.atack', '/atack', async (ctx) => {
  try {
    const info = ctx.request.body;
    const { barco_atacado_id, game_Id, jugador_id_atacado, jugador_id_atacante} = info;

    if (jugador_id_atacado != jugador_id_atacante){
      
      let player = await ctx.orm.Player.findOne({ where: { id: jugador_id_atacado } });
      let player_atacante = await ctx.orm.Player.findOne({attributes: ["id", "name", "puntaje", "energia"],where: {id: jugador_id_atacante}})
      const nueva_energia = player_atacante.energia -3;
      await player_atacante.update({energia: nueva_energia})
      console.log("player atacante es...")
      console.log(player_atacante)
      
      let barco_atacado = await ctx.orm.Ship.findOne({ where: { id: barco_atacado_id, player_Id: jugador_id_atacado, game_Id:game_Id } });
      await barco_atacado.destroy()
      
      ctx.body = {
        estado: 'movimiento exitoso',
        player_atacante: player_atacante.name,
        barco_vivo: barco_atacado.alive,
        player_atacado: player.name,
      };
      ctx.status = 200;
    }else{
      ctx.body = {
        estado: 'intentalo nuevamente',
        error: "no puedes atacar a tu mismo bando!"
      };
      ctx.status = 200;
    }
    
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
