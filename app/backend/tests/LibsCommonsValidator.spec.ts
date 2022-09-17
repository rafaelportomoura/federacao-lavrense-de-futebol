/// <reference types="mocha" />
import { expect } from 'chai';

import Joi from 'joi-i18n';
import { schemaValidator } from '../src/Libs/CommonsValidator';


describe('Libs - Commons Validator', () => {
  it('SUCCESS: Validate a schema', () => {
    const schema = Joi.string().trim();
    const data = ' xy ';

    const response = schemaValidator<string>(data, schema);

    expect(response).to.equal('xy');
  })

  it('ERROR: Don\'t validate a schema, and return Joi error', () => {
    const schema = Joi.string().trim();
    const data = 1 as unknown as string;


    let response;
    try {
      response = schemaValidator<string>(data, schema);
    } catch (error) {
      response = error;
    }

    expect(response.code).to.equal('0002');
    expect(response.message).to.equal('BusinessError: [] "value" must be a string');
  })

  it('ERROR: Don\'t validate a schema, and return a custom error', () => {
    const schema = Joi.string().trim().error(new Error('custom'));
    const data = 1 as unknown as string;


    let response;
    try {
      response = schemaValidator<string>(data, schema);
    } catch (error) {
      response = error;
    }

    expect(response.code).to.equal('0002');
    expect(response.message).to.equal('BusinessError: custom');
  })
})