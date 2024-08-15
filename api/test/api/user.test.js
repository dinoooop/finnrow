import test from 'ava';
import request from 'supertest';
import app from '../../app.js'; // Adjust the path to your app.js file

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc5MGRmNzY1OGE0NWVjY2FhZGM1MjAiLCJpYXQiOjE3MjE3MTQyMzB9.fWW-A2uP-8WHAbxtDXaXMuCet0vjHl5QXFGbYRXc9s4';
test('GET /api/users', async (t) => {
    const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

    t.is(response.status, 200);
    t.is(typeof response.body, 'object');
    t.truthy(response.body.data, 'Response should contain data');
});

test('POST /api/users', async (t) => {
    const newUser = { name: 'Mili', email: 'mili@gmail.com', password: 'welcome', status: 'active', role: 'user'};
    const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send(newUser)
        .expect(201);

    t.is(response.status, 201);
    t.is(typeof response.body, 'object');
    t.truthy(response.body.name, 'Response should contain name');
    t.truthy(response.body.email, 'Response should contain email');
});
