const { setupBefore, setupChai, removeTestDB } = require('../utils/test-utils');
const chai = setupChai();
const expect = chai.expect;
const chaiJsonSchema = require('chai-json-schema');
chai.use(chaiJsonSchema);

describe('Bonus Step #1 Specs', () => {
  let DB_TEST_FILE, SERVER_DB_TEST_FILE, models, server;
  before(async () => ({ server, models, DB_TEST_FILE, SERVER_DB_TEST_FILE } = await setupBefore(__filename)));
  after(async () => await removeTestDB(DB_TEST_FILE));

  describe('GET /musicians/:musicianId', () => {
    it('GET /musicians/1 returns data about the musician with an id of 1 and their respective instruments', async () => {
      await chai
        .request(server)
        .get("/musicians/1")
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          const schema = {
            type: 'object',
            required: ['id', 'firstName', 'lastName', 'createdAt', 'updatedAt', 'Instruments'],
            properties: {
              id: { type: 'number', enum: [1] },
              firstName: { type: 'string', enum: ["Adam"] },
              lastName: { type: 'string', enum: ["Appleby"] },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              Instruments: {
                type: 'array',
                minItems: 2,
                maxItems: 2,
                items: [
                  {
                    type: 'object',
                    required: ['id', 'type', 'createdAt', 'updatedAt'],
                    properties: {
                      id: { type: 'number', enum: [2] },
                      type: { type: 'string', enum: ["guitar"] },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                    }
                  },
                  {
                    type: 'object',
                    required: ['id', 'type', 'createdAt', 'updatedAt'],
                    properties: {
                      id: { type: 'number', enum: [1] },
                      type: { type: 'string', enum: ["piano"] },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                    }
                  }
                ]
              },
            }
          };
          expect(res.body).to.be.jsonSchema(schema);
        });
    });

    it('GET /musicians/4 returns data about the musician with an id of 4 and their respective instruments', async () => {
      await chai
        .request(server)
        .get("/musicians/4")
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          const schema = {
            type: 'object',
            required: ['id', 'firstName', 'lastName', 'createdAt', 'updatedAt', 'Instruments'],
            properties: {
              id: { type: 'number', enum: [4] },
              firstName: { type: 'string', enum: ["Marine"] },
              lastName: { type: 'string', enum: ["Sweet"] },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              Instruments: {
                type: 'array',
                minItems: 1,
                maxItems: 1,
                items: [
                  {
                    type: 'object',
                    required: ['id', 'type', 'createdAt', 'updatedAt'],
                    properties: {
                      id: { type: 'number', enum: [8] },
                      type: { type: 'string', enum: ["saxophone"] },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                    }
                  }
                ]
              },
            }
          };
          expect(res.body).to.be.jsonSchema(schema);
        });
    });
  });
});
