const { setupBefore, setupChai, removeTestDB } = require('./utils/test-utils');
const chai = setupChai();
const expect = chai.expect;
const chaiJsonSchema = require('chai-json-schema');
chai.use(chaiJsonSchema);

describe("Step #1 Specs", () => {
  let DB_TEST_FILE, SERVER_DB_TEST_FILE, models, server;
  before(async () => ({ server, models, DB_TEST_FILE, SERVER_DB_TEST_FILE } = await setupBefore(__filename)));
  after(async () => await removeTestDB(DB_TEST_FILE));

  describe("GET /bands/:id", () => {
    it("GET /bands/1 returns data about the band with an id of 1 and their musicians", async () => {
      await chai
        .request(server)
        .get("/bands/1")
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          const schema = {
            type: 'object',
            required: ['id', 'name', 'createdAt', 'updatedAt', 'Musicians'],
            properties: {
              id: {
                type: 'number',
                enum: [1]
              },
              name: {
                type: 'string',
                enum: ["The Falling Box"],
              },
              createdAt: {
                type: 'string',
                format: 'date-time'
              },
              updatedAt: {
                type: 'string',
                format: 'date-time'
              },
              Musicians: {
                type: 'array',
                minItems: 3,
                maxItems: 3,
                prefixItems: [
                  {
                    type: 'object',
                    required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                    properties: {
                      id: { type: 'number', enum: [1] },
                      firstName: { type: 'string', enum: ["Adam"] },
                      lastName: { type: 'string', enum: ["Appleby"] },
                      bandId: { type: 'number', enum: [1] },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                    }
                  },
                  {
                    type: 'object',
                    required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                    properties: {
                      id: { type: 'number', enum: [2] },
                      firstName: { type: 'string', enum: ["Anton"] },
                      lastName: { type: 'string', enum: ["Martinovic"] },
                      bandId: { type: 'number', enum: [1] },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                    }
                  },
                  {
                    type: 'object',
                    required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                    properties: {
                      id: { type: 'number', enum: [3]},
                      firstName: { type: 'string', enum: ["Wilson"] },
                      lastName: { type: 'string', enum: ["Holt"] },
                      bandId: { type: 'number', enum: [1] },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                    }
                  }
                ],
                items: false
              },
            }
          };
          expect(res.body).to.be.jsonSchema(schema);
        });
    });

    it("GET /bands/4 returns data about the band with an id of 4 and their musicians", async () => {
      await chai
        .request(server)
        .get("/bands/4")
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          const schema = {
            type: 'object',
            required: ['id', 'name', 'createdAt', 'updatedAt', 'Musicians'],
            properties: {
              id: {
                type: 'number',
                enum: [4]
              },
              name: {
                type: 'string',
                enum: ["Playin Sound"],
              },
              createdAt: {
                type: 'string',
                format: 'date-time'
              },
              updatedAt: {
                type: 'string',
                format: 'date-time'
              },
              Musicians: {
                type: 'array',
                minItems: 2,
                maxItems: 2,
                items: [
                  {
                    type: 'object',
                    required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                    properties: {
                      id: { type: 'number', enum: [8] },
                      firstName: { type: 'string', enum: ["Camila"] },
                      lastName: { type: 'string', enum: ["Nenci"] },
                      bandId: { type: 'number', enum: [4] },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                    }
                  },
                  {
                    type: 'object',
                    required: ['id', 'firstName', 'lastName', 'bandId', 'createdAt', 'updatedAt'],
                    properties: {
                      id: { type: 'number', enum: [7] },
                      firstName: { type: 'string', enum: ["Trenton"] },
                      lastName: { type: 'string', enum: ["Lesley"] },
                      bandId: { type: 'number', enum: [4] },
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
