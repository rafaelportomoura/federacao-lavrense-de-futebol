import Joi from 'joi';



const id_team_schema = Joi.number().min(1).max(99999999999);

export const patch_match_team_body = Joi.object().keys({
  idTime1: id_team_schema.required(),
  idTime2: id_team_schema.required(),
}).required()