// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");

jest.mock("../src/models/User.js", () => ({create: jest.fn()}));

describe('./musicians endpoint', () => {
    test("testing musician result", async () =>{
        const response = await request(app).get("/musicians")
        expect(response.statusCode).toBe(200);
    })
    test("testing musician id endpoint", async () =>{
        const response = await request(app).get("/musicians/1")
        expect(response.statusCode).toBe(200);
    })
    test("testing musician post", async () =>{
        const response = await request(app)
            .post("/musicians")
            .send({name:'J Cole', instrument: 'Voice'})
        const cole = await Musician.findOne({where: {name: 'J Cole'}})
        expect(response.statusCode).toBe(200);
        expect(cole.instrument).toBe('Voice')
    })
    test("testing musician put", async() => {
        const response = await request(app)
        .put("/musicians/1")
        .send({name:'Hozier'})
        const hozier = await Musician.findByPk(1)
        expect(response.statusCode).toBe(200);
        expect(hozier.name).toBe('Hozier');
    })
    test("testing musician delete", async() => {
        const response = await request(app).delete("/musicians/2")
        const music = await Musician.findByPk(2);
        expect(response.statusCode).toBe(200)
        expect(music).toBe(null)
    })
})