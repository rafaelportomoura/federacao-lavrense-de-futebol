import Joi from 'joi';

const password = Joi.string().min(8).max(64);
const user_email = Joi.string().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

export const post_user = Joi.object().keys({
  email: user_email.required(),
  password: password.required(),
});
