import assert from 'assert';
import { Given, Then } from '@cucumber/cucumber';
import request from 'supertest';
import { application } from './hooks.steps';

let _request: request.Test;
let _response: request.Response;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.httpServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Given('I send a POST request to {string} with body:', (route: string, body: string) => {
  _request = request(application.httpServer).post(route).send(JSON.parse(body) as string);
});

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('the response content should be:', (response: string) => {
  assert.deepStrictEqual(_response.body, JSON.parse(response));
});
