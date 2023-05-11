const request = require('supertest');
const app = require('../app')
require("dotenv").config();

let admin_token = null
let admin_id = null

let merchant_token = null
let merchant_id = null

let company_id = null

let webpage_id = null

let user1_token = null
let user1_id = null
let user2_token = null
let user2_id = null

describe('Admin', () => {
    it('should login as admin', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                "email": process.env.TEST_ADMIN_USERNAME,
                "password": process.env.TEST_ADMIN_PASSWORD
                
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.user.name).toEqual('Admin');
        expect(response.body.user.email).toEqual('admin@gmail.com');
        expect(response.body.user.role).toEqual('admin');
        expect(response.body.user.password).toBeUndefined();

        admin_token = response.body.token;
        admin_id = response.body.user._id;
    });

    it('should NOT register a new merchant', async () => {
        const response = await request(app)
            .post('/api/auth/merchant')
            .send({
                "username": "telepizza_company",
                "password": "Prueba1234!",
                "city": "Malaga",
                "age": "32",
            
                "company_name": "Telepizza",
                "phone": "633098765",
                "address": "El palo, 3",
                "cif": "B12459786",
                "email": "telepizza@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect(401)

    });
    it('should register a new merchant from the admin user', async () => {
        const response = await request(app)
            .post('/api/auth/merchant')
            .auth(admin_token, { type: 'bearer' })
            .send({
                "username": "telepizza_company",
                "password": "Prueba1234!",
                "city": "Malaga",
                "age": "32",
            
                "company_name": "Telepizza",
                "phone": "633098765",
                "address": "El palo, 3",
                "cif": "B12459786",
                "email": "telepizza@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect(200)
            expect(response.body.user.role).toEqual('merchant');
            expect(response.body.user.accepts_offers).toEqual(false);
            expect(response.body.user.password).toBeUndefined();
            
            expect(response.body.company.cif).toEqual('B12459786');
            expect(response.body.company.phone).toEqual('633098765');

            merchant_token = response.body.token;
            merchant_id = response.body.user.id;

            company_id = response.body.company.id
    });  
})

describe('Merchant', () => {
    it('should NOT register a new webpage. Only a merchant can register his own webpage', async () => {
        const response = await request(app)
            .post('/api/webpages/')
            .auth(admin_token, { type: 'bearer' })
            .send({
                "city": "Malaga",
                "interests": ["comida", "bebida", "pizza"],
                "title": "Telepizza Echeverría",
                "summary": "a comer bocatas"
            })
            .set('Accept', 'application/json')
            .expect(403)
    });

    it('should register a new webpage from merchant created above', async () => {
        const response = await request(app)
            .post('/api/webpages/')
            .auth(merchant_token, { type: 'bearer' })
            .send({
                "city": "Madrid",
                "interests": ["comida", "bebida", "pizza"],
                "title": "Telepizza Echeverría",
                "summary": "a comer bocatas"
            })
            .set('Accept', 'application/json')
            .expect(200)

            expect(response.body.city).toEqual('Madrid');

            webpage_id = response.body.id
    });

    it('should modify the webpage from merchant created above', async () => {
        const response = await request(app)
            .put('/api/webpages/id/' + webpage_id)
            .auth(merchant_token, { type: 'bearer' })
            .send({
                "city": "Malaga",
            })
            .set('Accept', 'application/json')
            .expect(200)

            expect(response.body.city).toEqual('Malaga');

    });

})

describe('User', () => {
    it('should register a basic user', async () => {
        const response = await request(app)
            .post('/api/auth/users')
            .send({
                "name": "Juan",
                "age": "23",
                "email": "Juan@gmail.com",
                "password": "Juan1234!",
                "city": "Malaga",
                "accepts_offers": true
              
            })
            .set('Accept', 'application/json')
            .expect(200)
            expect(response.body.user.role).toEqual('user');
            expect(response.body.user.accepts_offers).toEqual(true);
            expect(response.body.user.password).toBeUndefined();

            user1_token = response.body.token;
            user1_id = response.body.user.id;

    });  

    it('should NOT register a basic user. Password is insecure and no email provided', async () => {
        const response = await request(app)
            .post('/api/auth/users')
            .send({
                "name": "Nope",
                "age": "23",
                "password": "badpass",
                "city": "Malaga",
                "accepts_offers": true
              
            })
            .set('Accept', 'application/json')
            .expect(403)

            expect(response.text).toBeDefined();



    });  

    it('should register another basic user.', async () => {
        const response = await request(app)
            .post('/api/auth/users')
            .send({
                "name": "Adri",
                "age": "28",
                "password": "Adri1234!",
                "email": "Adri@gmail.com",
                "city": "Malaga",
                "accepts_offers": true
              
            })
            .set('Accept', 'application/json')
            .expect(200)

            user2_token = response.body.token;
            user2_id = response.body.user.id;

    });  

    it('should create a review from user1 in the webpage created above', async () => {
        const response = await request(app)
            .patch('/api/webpages/id/' +webpage_id)
            .auth(user1_token, { type: 'bearer' })
            .send({
                "score": 1
              
            })
            .set('Accept', 'application/json')
            .expect(200)

            expect(response.text).toBeDefined();

    });

    it('should create another review from user2 in the webpage created above with content', async () => {
        const response = await request(app)
            .patch('/api/webpages/id/' +webpage_id)
            .auth(user1_token, { type: 'bearer' })
            .send({
                "score": 5,
                "content": "I love this pizza."
              
            })
            .set('Accept', 'application/json')
            .expect(200)

            expect(response.text).toBeDefined();

    });  
})


describe('Webpage', () => {
    it('should get all webpages', async () => {
        const response = await request(app)
            .get('/api/webpages/')
            .set('Accept', 'application/json')
            .expect(200)

            expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get the webpage created above, which should have a review scoring of 3 and a review count of 2', async () => {
        const response = await request(app)
            .get('/api/webpages/id/' + webpage_id)
            .set('Accept', 'application/json')
            .expect(200)

            expect(response.body.scoring).toEqual(3)
            expect(response.body.scoring_count).toEqual(2)


    });

    it('should get all webpages from Malaga (at least 1)', async () => {
        const response = await request(app)
            .get('/api/webpages/search/Malaga')
            .set('Accept', 'application/json')
            .expect(200)

            expect(response.body.length).toBeGreaterThan(0);


    });

})

describe('Deletes', () => {
    it('should NEVER delete an admin', async () => {
        const response = await request(app)
            .delete('/api/users/id/' + admin_id)
            .auth(admin_token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(403)

    });

    it('should delete user1 from admin', async () => {
        const response = await request(app)
            .delete('/api/users/id/' + user1_id)
            .auth(admin_token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)

    });

    it('should NOT delete user from merchant', async () => {
        const response = await request(app)
            .delete('/api/users/id/' + user2_id)
            .auth(merchant_id, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(401)

    });

    it('should delete user2 from himself', async () => {
        const response = await request(app)
            .delete('/api/users/id/' + user2_id)
            .auth(user2_token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)

    });

    it('should delete merchant from himself', async () => {
        const response = await request(app)
            .delete('/api/users/id/' + merchant_id)
            .auth(merchant_token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)

    });



})