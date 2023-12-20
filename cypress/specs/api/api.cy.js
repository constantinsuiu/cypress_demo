/// <reference types="cypress" />
import UsersEndpoint from '../../support/endpoints/UsersEndpoint';

describe('Validate GET /users endpoint with path/query params', () => {
  it('Validate GET users endpoint', () => {
    const endpoint = new UsersEndpoint;

    endpoint.setQueryParams({page: 2});
    cy.request(endpoint.fullUrl).as('getUsers');
    cy.get('@getUsers').should((response) => {
      expect(response.status).to.eq(200);
      expect(endpoint.validateSchema(response.body)).to.be.true;
    });
  });

  it('Validate GET /users/:userId endpoint', () => {
    const endpoint = new UsersEndpoint.User();

    endpoint.setPathParams({userId: 2});
    cy.request(endpoint.fullUrl).as('getUser');
    cy.get('@getUser').should((response) => {
      expect(response.status).to.eq(200);
      expect(endpoint.validateSchema(response.body)).to.be.true;
    });
  });
});
