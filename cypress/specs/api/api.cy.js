/// <reference types="cypress" />
import UsersEndpoint from '../../support/endpoints/UsersEndpoint';

describe('Validate GET /users endpoint with path/query params', () => {
  it('Validate GET users endpoint', () => {
    const endpoint = new UsersEndpoint;

    endpoint.setQueryParams({page: 2});
    cy.request(endpoint.fullUrl).as('getUsers');
    validateResponse('@getUsers', endpoint);
  });

  it('Validate GET /users/:userId endpoint', () => {
    const endpoint = new UsersEndpoint.User();

    endpoint.setPathParams({userId: 2});
    cy.request(endpoint.fullUrl).as('getUser');
    validateResponse('@getUser', endpoint);
  });
});

function validateResponse(tag, endpoint) {
  cy.get(tag).should((response) => {
    expect(response.status).to.eq(200);
    expect(endpoint.validateSchema(response.body)).to.be.true;
  });
}
