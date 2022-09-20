import Joi from 'joi';

const id_time = Joi.number()
const id_partida = Joi.number()
const id_gol = Joi.number()

export const post_goal = Joi.object().keys({
  idTime: id_time.required(),
  idPartida: id_partida.required(),
})
export const delete_goal = Joi.object().keys({
  id: id_gol.required(),
})