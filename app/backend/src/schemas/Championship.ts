import Joi from 'joi';


const name_schema = Joi.string().max(45);
const page_schema = Joi.number().min(1).default(1);
const size_schema = Joi.number().min(1).default(10)
const id_team_schema = Joi.number().min(1).max(99999999999);
const id_championship_schema = Joi.number().min(1).max(99999999999);

export const post_championship = Joi.object().keys({
  nome: name_schema.required(),
})

export const get_championship = Joi.object().keys({
  page: page_schema,
  size: size_schema,
  id_team: id_team_schema,
  nome: name_schema,
})

export const get_individual_championship = Joi.object().keys({
  id: id_championship_schema.required(),
})

export const put_individual_championship_path = Joi.object().keys({
  id: id_championship_schema.required(),
})

export const put_individual_championship_body = Joi.object().keys({
  nome: name_schema.required(),
})

export const delete_championship = Joi.object().keys({
  id: id_championship_schema.required(),
})

export const get_matches_championship_query = Joi.object().keys({
  page: page_schema,
  size: size_schema,
})


export const add_champions_team_championship_path = Joi.object().keys({
  championship_id: id_championship_schema.required(),
  team_id: id_team_schema.required(),
})