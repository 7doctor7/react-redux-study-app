import request from 'supertest';
import { apiRoot } from '../../config';
import express from '../../services/express';
import routes, { Divisions } from '.';

const app = () => express(apiRoot, routes);

let divisions;

beforeEach(async () => {
  divisions = await Divisions.create({});
});

test('POST /divisions 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', createdBy: 'test', createdDate: 'test', description: 'test' });
  expect(status).toBe(201);
  expect(typeof body).toEqual('object');
  expect(body.name).toEqual('test');
  expect(body.createdBy).toEqual('test');
  expect(body.createdDate).toEqual('test');
  expect(body.description).toEqual('test');
});

test('GET /divisions 200', async () => {
  const { status, body } = await request(app()).get(`${apiRoot}`);
  expect(status).toBe(200);
  expect(Array.isArray(body.rows)).toBe(true);
  expect(Number.isNaN(body.count)).toBe(false);
});

test('GET /divisions/:id 200', async () => {
  const { status, body } = await request(app()).get(`${apiRoot}/${divisions.id}`);
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(divisions.id);
});

test('GET /divisions/:id 404', async () => {
  const { status } = await request(app()).get(apiRoot + '/123456789098765432123456');
  expect(status).toBe(404);
});

test('PUT /divisions/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${divisions.id}`)
    .send({ name: 'test', createdBy: 'test', createdDate: 'test', description: 'test' });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(divisions.id);
  expect(body.name).toEqual('test');
  expect(body.createdBy).toEqual('test');
  expect(body.createdDate).toEqual('test');
  expect(body.description).toEqual('test');
});

test('PUT /divisions/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', createdBy: 'test', createdDate: 'test', description: 'test' });
  expect(status).toBe(404);
});

test('DELETE /divisions/:id 204', async () => {
  const { status } = await request(app()).delete(`${apiRoot}/${divisions.id}`);
  expect(status).toBe(204);
});

test('DELETE /divisions/:id 404', async () => {
  const { status } = await request(app()).delete(apiRoot + '/123456789098765432123456');
  expect(status).toBe(404);
});
