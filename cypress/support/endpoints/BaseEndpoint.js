import Joi from 'joi';
import UrlAssembler from 'url-assembler';

class BaseEndpoint {
  constructor() {
    this.baseUrl = '';
    this.path = '';
    this.headers = {};
    this.pathParams = {};
    this.queryParams = {};
  }

  get fullUrl () {
    const pattern = /([^:]\/)\/+/g;
    const url = `${this.baseUrl}/${this.path}`;

    return url.replace(pattern, '$1');
  }

  setPathParams(options) {
    this.urlAssembler = this.urlAssembler || new UrlAssembler().template(this.path);

    this.urlAssembler = this.urlAssembler.param(options, true);
    this.path = decodeURIComponent(this.urlAssembler.toString());
    return this;
  }

  setQueryParams(options) {
    this.urlAssembler = this.urlAssembler || new UrlAssembler().template(this.path).qsConfig({ indices: false });

    this.urlAssembler = this.urlAssembler.query(options);
    this.path = decodeURIComponent(this.urlAssembler.toString());
    return this;
  }

  validateSchema(responseBody) {
    const compliledSchema = Joi.compile(this.schema);
    const  {error } = compliledSchema.validate(responseBody);

    return error || true;
  }
  
}

export default BaseEndpoint;
