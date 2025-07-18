import { test, expect } from '@playwright/test';
import { UpdateUserRequest } from './UpdateUserRequest';
import { RegisterUserRequest } from './RegisterUserRequest';

const BASE_URL = 'https://reqres.in/api';

test.describe('Reqres.in API Test Suite', () => {
  test('GET list users', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/users?page=2`);
    expect(res.status()).toBe(200);
  const body: UserListResponse = await res.json();
  expect(body.page).toBe(2);
  expect(body.data.length).toBeGreaterThan(0);
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data[0]).toHaveProperty('id');
  expect(body.data[0]).toHaveProperty('email');
  expect(body.support).toHaveProperty('url');
  expect(body.support).toHaveProperty('text');
  });

  test('GET single user', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/users/2`,
    {headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'reqres-free-v1'
              }});
    expect(res.status()).toBe(200);
    const body: UserResponse = await res.json();
    expect(body.data.id).toBe(2);
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('first_name');
    expect(body.data).toHaveProperty('last_name');
    expect(body.data).toHaveProperty('avatar');
    expect(body.support).toHaveProperty('url');
    expect(body.support).toHaveProperty('text');
  });

  test('GET single user not found', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/users/23`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    });
    expect(res.status()).toBe(404);
  });

  test('POST create user', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/users`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
          },
      data: { name: 'morpheus', job: 'leader' }
    });

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.name).toBe('morpheus');
    expect(body.job).toBe('leader');
    expect(body.id).toBeDefined();
  });

  test('PUT update user', async ({ request }) => {
    const updateUserReq: UpdateUserRequest = { name: 'morpheus', job: 'zion resident' };
    const res = await request.put(`${BASE_URL}/users/2`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
     },
    data: updateUserReq
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toBe('morpheus');
    expect(body.job).toBe('zion resident');
  });

  test('PATCH update user', async ({ request }) => {
    const updateUserReq: UpdateUserRequest = { job: 'zion resident' };
    const res = await request.patch(`${BASE_URL}/users/2`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
        data: updateUserReq
        });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.job).toBe('zion resident');
  });

  test('DELETE user', async ({ request }) => {
    const res = await request.delete(`${BASE_URL}/users/2`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    });
    expect(res.status()).toBe(204);
  });

  test('POST register successful', async ({ request }) => {
    const registerReq: RegisterUserRequest = { email: 'eve.holt@reqres.in', password: 'pistol' };
    const res = await request.post(`${BASE_URL}/register`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
        data: registerReq
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.token).toBeDefined();
    expect(body.id).toBeDefined();
  });

  test('POST register unsuccessful', async ({ request }) => {
    const registerReq: RegisterUserRequest = { email: 'sydney@fife' };
    const res = await request.post(`${BASE_URL}/register`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
        data: registerReq
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('Missing password');
  });

  test('POST login successful', async ({ request }) => {
    const loginReq: LoginUserRequest = { email: 'eve.holt@reqres.in', password: 'cityslicka' };
    const res = await request.post(`${BASE_URL}/login`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
        data: loginReq
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.token).toBeDefined();
  });

  test('POST login unsuccessful', async ({ request }) => {
    const loginReq: LoginUserRequest = { email: 'peter@klaven' };
    const res = await request.post(`${BASE_URL}/login`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
        data: loginReq
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('Missing password');
  });

  test('GET list resource', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/unknown`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET single resource', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/unknown/2`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.data.id).toBe(2);
  });

  test('GET single resource not found', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/unknown/23`);
    expect(res.status()).toBe(401);
  });
});