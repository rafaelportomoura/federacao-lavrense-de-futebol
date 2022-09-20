import Joi from 'joi';


const name_schema = Joi.string().max(80);
const page_schema = Joi.number().min(1).default(1);
const size_schema = Joi.number().min(1).default(10)
const id_camp_schema = Joi.number().min(1).max(99999999999);
const id_team_schema = Joi.number().min(1).max(99999999999);

export const post_team = Joi.object().keys({
  nome: name_schema.required(),
})

export const get_team = Joi.object().keys({
  page: page_schema,
  size: size_schema,
  id_camp: id_camp_schema,
  nome: name_schema,
})

export const get_individual_team = Joi.object().keys({
  id: id_team_schema.required(),
})

export const put_individual_team_path = Joi.object().keys({
  id: id_team_schema.required(),
})

export const put_individual_team_body = Joi.object().keys({
  nome: name_schema.required(),
})

export const delete_team = Joi.object().keys({
  id: id_team_schema.required(),
})