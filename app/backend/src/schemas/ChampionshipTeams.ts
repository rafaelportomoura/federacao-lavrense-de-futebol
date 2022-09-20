import Joi from 'joi';


const id_team_schema = Joi.number().min(1).max(99999999999);
const id_championship_schema = Joi.number().min(1).max(99999999999);
const teams_ids_schema = Joi.array().items(id_team_schema).min(1);
const page_schema = Joi.number().min(1).default(1);
const size_schema = Joi.number().min(1).default(10)

export const add_team_championship_path = Joi.object().keys({
  id: id_championship_schema.required(),
})

export const delete_team_championship_path = Joi.object().keys({
  id: id_championship_schema.required(),
})

export const add_team_championship_body = Joi.object().keys({
  teams: teams_ids_schema.required(),
})

export const delete_team_championship_body = Joi.object().keys({
  teams: teams_ids_schema.required(),
})

export const get_championship_teams_query = Joi.object().keys({
  page: page_schema,
  size: size_schema,
})
