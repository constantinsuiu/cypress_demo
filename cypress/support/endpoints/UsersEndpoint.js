import Joi from 'joi';
import BaseEndpoint from './BaseEndpoint';

class UsersEndpoint extends BaseEndpoint {
  constructor() {
    super();
    this.baseUrl = 'https://reqres.in';
    this.path = '/api/users';
    this.dataSchema = Joi.object({
      id: Joi.number().positive(),
      email: Joi.string().pattern(/.+@reqres.in/),
      first_name: Joi.string(),
      last_name: Joi.string(),
      avatar: Joi.string().uri()
    });
    this.supportSchema = Joi.object({
      url: Joi.string().uri(),
      text: Joi.string()
    });
    this.schema = Joi.object({
      page: Joi.number().positive(),
      per_page: Joi.number().positive(),
      total: Joi.number().positive(),
      total_pages: Joi.number().positive(),
      data: Joi.array().items(this.dataSchema),
      support: this.supportSchema
    });
  }
}

UsersEndpoint.User = class User extends UsersEndpoint {
  constructor() {
    super();
    this.path = `${this.path}/:userId`;
    this.schema = Joi.object({
      data: this.dataSchema,
      support: this.supportSchema
    });
  }
};

export default UsersEndpoint;
