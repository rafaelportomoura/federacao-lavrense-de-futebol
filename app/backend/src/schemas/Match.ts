import Joi from 'joi'


const date_regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/

const id_match_schema = Joi.number().min(1).max(99999999999);
const id_championship_schema = Joi.number().min(1).max(99999999999);
const type_schema = Joi.string().max(45);
const data_schema = Joi.string().regex(date_regex)

export const post_match = Joi.object().keys({
  idCampeonato: id_championship_schema.required(),
  tipo: type_schema.required(),
  data: data_schema.required(),
})

export const get_one_match = Joi.object().keys({
  id: id_match_schema.required(),
})

export const put_match_path = Joi.object().keys({
  id: id_match_schema.required(),
})

export const put_match_body = Joi.object().keys({
  idCampeonato: id_championship_schema.required(),
  tipo: type_schema.required(),
  data: data_schema.required(),
})

export const delete_one_match = Joi.object().keys({
  id: id_match_schema.required(),
})