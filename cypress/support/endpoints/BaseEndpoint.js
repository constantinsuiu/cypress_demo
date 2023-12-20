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
    this.baseUrl = this.baseUrl.endsWith('/') && this.path.startsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl;
    let url = !this.path ? this.baseUrl : this.path.startsWith('/') ? `${this.baseUrl}${this.path}` : `${this.baseUrl}/${this.path}`;

    return url;
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
